/**
 * WHAT CHANGED (Oct 8 2026): review photos
 *  - Reviews can now include one customer photo. The script saves it in a Google Drive
 *    folder named "JOIRUSH review photos" (created automatically) and puts the Drive link
 *    in a new "Photo" column on the Reviews tab (added automatically after the ID column).
 *  - ?action=approved now includes a "photo" image link for approved reviews that have one.
 *    Photos only show on the website after you tick Approved, same as the text.
 *  - If the website could not attach the photo to the Web3Forms email, this script emails
 *    the photo to OWNER_EMAIL so it still reaches the inbox.
 *  - Everything else works exactly as before (giveaway entries, reviews, Approve checkbox,
 *    spam and flood limits, 5 minute cache, private reviewer email, Product column).
 *  TO UPDATE: paste this whole file over the old code and Save. Pick "setup" and click Run,
 *  then approve the new Google Drive and email permissions. Then click Deploy, Manage
 *  deployments, the pencil icon, Version: New version, keep "Who has access: Anyone", and
 *  click Deploy. The web app URL stays the same, so the website needs no change.
 *
 * JOIRUSH website helper (one Google Apps Script web app for joirush.com)
 * ======================================================================
 * Bound to the "joirush email list" spreadsheet. It does two jobs:
 *
 *   1. Giveaway entries go to the "Giveaway" tab:
 *        Timestamp | Email | Source Page | Consent | Source
 *   2. Customer reviews go to the "Reviews" tab:
 *        Submitted At | Approved | Name | Rating | Review | Product | Email (private) | Source Page | ID | Photo
 *      Tick the Approved checkbox and the review shows on joirush.com within about 5 minutes.
 *      Untick it to hide the review again. Emails are never shown on the website.
 *      Product is optional (empty when the reviewer did not pick a cookie).
 *      Photo holds a Google Drive link when the reviewer added a photo. The photo shows on
 *      the website only after the review is approved.
 *
 * DEPLOY STEPS (about 5 minutes, done once by the sheet owner)
 *  1. Open the sheet:
 *     https://docs.google.com/spreadsheets/d/1edgaV7qX4pnE680bSXJeOLW0QM64Ky9xI0lWayfj8cc/edit
 *  2. Click Extensions, then Apps Script. Delete any code in Code.gs, paste ALL of this file, click Save.
 *  3. In the toolbar, pick the function "setup" and click Run. Approve the permission prompt
 *     (it asks for this spreadsheet, Google Drive for review photos, and sending email
 *     to you when a photo needs to reach your inbox). The Giveaway and Reviews tabs appear with their headers.
 *  4. Click Deploy, then New deployment. Click the gear next to "Select type" and pick Web app.
 *       Description:      JOIRUSH website
 *       Execute as:       Me
 *       Who has access:   Anyone
 *     Click Deploy and copy the Web app URL (it ends in /exec).
 *  5. Send that URL to your developer. It goes in src/lib/forms.ts as GOOGLE_SCRIPT_URL,
 *     then the site is rebuilt. From then on giveaway entries and reviews land in this sheet.
 *  6. Quick check: open the /exec URL in a browser. It should say the helper is running.
 *     Adding ?action=approved to the end shows the approved reviews the website will display.
 *
 * Editing the code later: click Deploy, Manage deployments, the pencil icon, Version: New version,
 * then Deploy. That keeps the SAME URL. A brand new deployment would create a NEW URL.
 *
 * You can also add a review by hand (for example one sent by text): fill in a new row
 * on the Reviews tab (Submitted At, Name, Rating, Review) and tick Approved.
 */

var SHEET_ID = "1edgaV7qX4pnE680bSXJeOLW0QM64Ky9xI0lWayfj8cc";
var TIME_ZONE = "America/New_York";

var GIVEAWAY_TAB = "Giveaway";
var GIVEAWAY_HEADERS = ["Timestamp", "Email", "Source Page", "Consent", "Source"];
var SKIP_DUPLICATE_EMAILS = true; // one giveaway row per email address
var MAX_GIVEAWAY_PER_HOUR = 300; // whole site, stops floods

var REVIEWS_TAB = "Reviews";
var REVIEW_HEADERS = ["Submitted At", "Approved", "Name", "Rating", "Review", "Product", "Email (private)", "Source Page", "ID", "Photo"];
var BASE_REVIEW_COLUMNS = 9; // Submitted At through ID; Photo is found by its header name
var PHOTO_HEADER = "Photo";
var PHOTO_FOLDER_NAME = "JOIRUSH review photos";
var PHOTO_TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
var MAX_PHOTO_BYTES = 5 * 1024 * 1024; // the site sends a resized JPEG, usually well under 1 MB
var OWNER_EMAIL = "joirushshop@gmail.com"; // gets the photo when the website email could not carry it
var LIMITS = { name: 60, reviewMin: 10, reviewMax: 1200, product: 80, email: 254, page: 500, consent: 500, source: 100 };
var MAX_REVIEWS_PER_HOUR = 30; // whole site, stops floods
var MAX_REVIEWS_PER_PERSON_PER_DAY = 3; // same email (or same name when no email)
var DUPLICATE_SCAN_ROWS = 500; // how many recent rows to check for repeats

var APPROVED_CACHE_KEY = "approved_reviews_v2";
var APPROVED_CACHE_SECONDS = 300; // about 5 minutes
var MAX_PUBLIC_REVIEWS = 200;

/* ================================================================== */
/* Web app entry points                                               */
/* ================================================================== */

/** The website posts JSON as text/plain: { type: "giveaway" | "review", ... }. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var data = parseBody_(e);
    var type = String(data.type || "").toLowerCase();
    if (!type) type = data.review ? "review" : "giveaway"; // older site builds sent no type
    if (type === "giveaway") return json_(handleGiveaway_(data));
    if (type === "review") return json_(handleReview_(data));
    return json_({ ok: false, error: "Unknown type." });
  } catch (err) {
    Logger.log("doPost error: " + err);
    return json_({ ok: false, error: "Server error." });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignore) {}
  }
}

/** GET ?action=approved returns approved reviews (public fields only). Plain GET is a health check. */
function doGet(e) {
  var action = e && e.parameter ? String(e.parameter.action || "") : "";
  if (action === "approved") {
    try {
      return ContentService.createTextOutput(getApprovedJson_()).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      Logger.log("doGet error: " + err);
      return json_({ ok: false, reviews: [] });
    }
  }
  return ContentService.createTextOutput("JOIRUSH website helper is running. Giveaway entries and reviews are being saved.");
}

/** Simple trigger: any edit on the Reviews tab clears the cache so approvals show up sooner. */
function onEdit(e) {
  try {
    var sheet = e && e.range ? e.range.getSheet() : null;
    if (!sheet || sheet.getName() === REVIEWS_TAB) CacheService.getScriptCache().remove(APPROVED_CACHE_KEY);
  } catch (ignore) {}
}

/** Run once from the editor: creates and formats both tabs and grants permissions. */
function setup() {
  var ss = getSpreadsheet_();
  formatGiveaway_(getGiveawaySheet_(ss));
  var reviews = getReviewsSheet_(ss);
  formatReviews_(reviews);
  ensurePhotoColumn_(reviews);
  getPhotoFolder_(); // creates the Drive folder and asks for the Drive permission
  if (MailApp.getRemainingDailyQuota() < 1) Logger.log("Email quota is used up for today.");
  CacheService.getScriptCache().remove(APPROVED_CACHE_KEY);
  Logger.log("Setup done. Tabs ready: " + GIVEAWAY_TAB + " and " + REVIEWS_TAB + ". Photos go to the Drive folder " + PHOTO_FOLDER_NAME + ".");
}

/* ================================================================== */
/* Giveaway                                                           */
/* ================================================================== */

function handleGiveaway_(data) {
  if (isBot_(data)) return { ok: true };
  var email = clean_(data.email, LIMITS.email).toLowerCase();
  if (!isEmail_(email)) return { ok: false, error: "Invalid email." };
  if (!underHourlyLimit_("giveaway", MAX_GIVEAWAY_PER_HOUR)) return { ok: false, error: "Too many entries right now. Please try again later." };

  var sheet = getGiveawaySheet_(getSpreadsheet_());
  var last = lastDataRow_(sheet);
  if (SKIP_DUPLICATE_EMAILS && last > 1) {
    var existing = sheet.getRange(2, 2, last - 1, 1).getValues();
    for (var i = 0; i < existing.length; i++) {
      if (String(existing[i][0]).toLowerCase() === email) return { ok: true, duplicate: true };
    }
  }

  sheet.getRange(last + 1, 1, 1, GIVEAWAY_HEADERS.length).setValues([[
    new Date(),
    email,
    guard_(clean_(data.sourcePage, LIMITS.page)),
    guard_(clean_(data.consent, LIMITS.consent)),
    guard_(clean_(data.source || "joirush.com", LIMITS.source)),
  ]]);
  countHourly_("giveaway");
  return { ok: true };
}

/* ================================================================== */
/* Reviews                                                            */
/* ================================================================== */

function handleReview_(data) {
  if (isBot_(data)) return { ok: true }; // quietly ignore bots

  var rawReview = data.review != null ? data.review : data.text;
  var name = clean_(data.name, 1000);
  var review = cleanMultiline_(rawReview, 100000);
  var rating = Number(data.rating);
  // The site sends reviewerEmail (not email) so an older giveaway only script ignores reviews.
  var email = clean_(data.reviewerEmail != null ? data.reviewerEmail : data.email, 1000).toLowerCase();
  var product = clean_(data.product, 1000);

  if (!name) return { ok: false, error: "Please add your name." };
  if (name.length > LIMITS.name) return { ok: false, error: "Name is too long." };
  if (!(rating >= 1 && rating <= 5 && Math.floor(rating) === rating)) return { ok: false, error: "Rating must be a whole number from 1 to 5." };
  if (review.length < LIMITS.reviewMin) return { ok: false, error: "Review is too short." };
  if (review.length > LIMITS.reviewMax) return { ok: false, error: "Review is too long." };
  if (email && (email.length > LIMITS.email || !isEmail_(email))) return { ok: false, error: "Invalid email." };
  product = product.slice(0, LIMITS.product);
  if (!underHourlyLimit_("review", MAX_REVIEWS_PER_HOUR)) return { ok: false, error: "Too many reviews right now. Please try again later." };

  var sheet = getReviewsSheet_(getSpreadsheet_());
  var last = lastDataRow_(sheet);

  // Duplicate and flood protection on recent rows.
  if (last > 1) {
    var start = Math.max(2, last - DUPLICATE_SCAN_ROWS + 1);
    var rows = sheet.getRange(start, 1, last - start + 1, BASE_REVIEW_COLUMNS).getValues();
    var textKey = normalize_(review);
    var personKey = email || normalize_(name);
    var dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    var recentFromPerson = 0;
    for (var i = 0; i < rows.length; i++) {
      if (normalize_(unguard_(rows[i][4])) === textKey) return { ok: true, duplicate: true };
      var rowPerson = String(rows[i][6] || "").toLowerCase() || normalize_(unguard_(rows[i][2]));
      var when = rows[i][0] instanceof Date ? rows[i][0].getTime() : 0;
      if (rowPerson === personKey && when >= dayAgo) recentFromPerson++;
    }
    if (recentFromPerson >= MAX_REVIEWS_PER_PERSON_PER_DAY) return { ok: false, error: "Thanks! We already have your recent reviews." };
  }

  var id = makeId_();

  // Optional photo: saved to Drive after the checks above, so spam and repeats never create files.
  var photo = null;
  if (data.photo) {
    try {
      photo = savePhoto_(data.photo, id, name);
    } catch (err) {
      Logger.log("Photo not saved: " + err);
    }
  }

  var row = last + 1;
  sheet.getRange(row, 1, 1, BASE_REVIEW_COLUMNS).setValues([[
    new Date(),
    false,
    guard_(name),
    rating,
    guard_(review),
    guard_(product),
    guard_(email),
    guard_(clean_(data.sourcePage, LIMITS.page)),
    id,
  ]]);
  sheet.getRange(row, 2).setDataValidation(checkboxRule_());
  if (photo) {
    sheet.getRange(row, ensurePhotoColumn_(sheet)).setValue(photo.url);
    if (data.photoInInbox !== true && String(data.photoInInbox) !== "true") emailPhoto_(photo, name, rating, review, product);
  }
  countHourly_("review");
  return { ok: true, id: id, photo: !!photo };
}

/** JSON string of approved reviews with public fields only. Cached for about 5 minutes. */
function getApprovedJson_() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(APPROVED_CACHE_KEY);
  if (cached) return cached;

  var sheet = getSpreadsheet_().getSheetByName(REVIEWS_TAB);
  var reviews = [];
  var last = sheet ? lastDataRow_(sheet) : 0;
  if (last > 1) {
    var width = Math.max(sheet.getLastColumn(), BASE_REVIEW_COLUMNS);
    var values = sheet.getRange(1, 1, last, width).getValues();
    var col = columnMap_(values[0]);
    for (var r = 1; r < values.length; r++) {
      var row = values[r];
      if (!isChecked_(row[col.approved])) continue;
      var text = unguard_(cleanMultiline_(row[col.review], LIMITS.reviewMax));
      var rating = Number(row[col.rating]);
      if (!text || !(rating >= 1 && rating <= 5)) continue;
      var submitted = row[col.submitted];
      var photoUrl = col.photo >= 0 ? publicPhotoUrl_(row[col.photo]) : "";
      reviews.push({
        id: String(row[col.id] || "row" + (r + 1)),
        name: unguard_(clean_(row[col.name], LIMITS.name)) || "JOIRUSH customer",
        rating: Math.round(rating),
        text: text,
        product: unguard_(clean_(row[col.product], LIMITS.product)),
        date: submitted instanceof Date ? Utilities.formatDate(submitted, TIME_ZONE, "yyyy-MM-dd") : "",
        _t: submitted instanceof Date ? submitted.getTime() : 0,
      });
      if (photoUrl) reviews[reviews.length - 1].photo = photoUrl;
    }
  }
  reviews.sort(function (a, b) {
    return b._t - a._t;
  });
  reviews = reviews.slice(0, MAX_PUBLIC_REVIEWS).map(function (item) {
    delete item._t;
    return item;
  });

  var out = JSON.stringify({ ok: true, count: reviews.length, reviews: reviews });
  try {
    cache.put(APPROVED_CACHE_KEY, out, APPROVED_CACHE_SECONDS);
  } catch (ignore) {} // over the cache size limit; just skip caching
  return out;
}

/** Finds columns by header name so the owner can reorder or add columns safely. */
function columnMap_(headerRow) {
  var map = { submitted: 0, approved: 1, name: 2, rating: 3, review: 4, product: 5, id: 8, photo: -1 };
  var names = { "submitted at": "submitted", approved: "approved", name: "name", rating: "rating", review: "review", product: "product", id: "id", photo: "photo" };
  for (var c = 0; c < headerRow.length; c++) {
    var key = names[String(headerRow[c]).trim().toLowerCase()];
    if (key) map[key] = c;
  }
  return map;
}

/* ================================================================== */
/* Sheet helpers                                                      */
/* ================================================================== */

function getSpreadsheet_() {
  var ss = null;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet(); // works when the script is bound to the sheet
  } catch (ignore) {}
  return ss || SpreadsheetApp.openById(SHEET_ID);
}

function getGiveawaySheet_(ss) {
  var sheet = ss.getSheetByName(GIVEAWAY_TAB);
  if (!sheet) {
    // Reuse the empty starter tab (Sheet1) instead of leaving it blank next to the new tabs.
    var starter = ss.getSheetByName("Sheet1");
    if (starter && (starter.getLastRow() === 0 || headersMatch_(starter, GIVEAWAY_HEADERS))) {
      starter.setName(GIVEAWAY_TAB);
      sheet = starter;
    } else {
      sheet = ss.insertSheet(GIVEAWAY_TAB);
    }
  }
  if (sheet.getLastRow() === 0) formatGiveaway_(sheet);
  return sheet;
}

function getReviewsSheet_(ss) {
  var sheet = ss.getSheetByName(REVIEWS_TAB);
  if (!sheet) sheet = ss.insertSheet(REVIEWS_TAB);
  if (sheet.getLastRow() === 0) formatReviews_(sheet);
  return sheet;
}

function formatGiveaway_(sheet) {
  writeHeaders_(sheet, GIVEAWAY_HEADERS);
  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 240);
  sheet.setColumnWidth(3, 260);
  sheet.setColumnWidth(4, 360);
}

function formatReviews_(sheet) {
  writeHeaders_(sheet, REVIEW_HEADERS);
  var rows = Math.max(sheet.getMaxRows() - 1, 1);
  sheet.getRange(2, 2, rows, 1).setDataValidation(checkboxRule_()).setHorizontalAlignment("center");
  sheet.getRange(2, 5, rows, 1).setWrap(true);
  var widths = [160, 90, 140, 70, 420, 200, 220, 220, 120, 260];
  for (var c = 0; c < widths.length; c++) sheet.setColumnWidth(c + 1, widths[c]);
}

function writeHeaders_(sheet, headers) {
  if (!headersMatch_(sheet, headers)) {
    if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    else Logger.log("Tab " + sheet.getName() + " already has a different first row; left it as is.");
  }
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#fde7ef");
  sheet.setFrozenRows(1);
}

function headersMatch_(sheet, headers) {
  if (sheet.getLastRow() === 0) return false;
  var first = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  for (var i = 0; i < headers.length; i++) if (String(first[i]).trim() !== headers[i]) return false;
  return true;
}

/** Last row with something in column A (checkbox cells alone do not count). */
function lastDataRow_(sheet) {
  var last = sheet.getLastRow();
  if (last === 0) return 0;
  var values = sheet.getRange(1, 1, last, 1).getValues();
  for (var r = values.length - 1; r >= 0; r--) {
    if (values[r][0] !== "" && values[r][0] != null) return r + 1;
  }
  return 0;
}

function checkboxRule_() {
  return SpreadsheetApp.newDataValidation().requireCheckbox().setAllowInvalid(false).build();
}

/* ================================================================== */
/* Review photos                                                      */
/* ================================================================== */

/** Column number (1 based) of the Photo column. Adds the header after the last header if missing. */
function ensurePhotoColumn_(sheet) {
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var lastHeader = 0;
  for (var c = 0; c < header.length; c++) {
    var text = String(header[c]).trim();
    if (text.toLowerCase() === PHOTO_HEADER.toLowerCase()) return c + 1;
    if (text) lastHeader = c + 1;
  }
  var col = Math.max(lastHeader + 1, BASE_REVIEW_COLUMNS + 1);
  if (col > sheet.getMaxColumns()) sheet.insertColumnsAfter(sheet.getMaxColumns(), col - sheet.getMaxColumns());
  sheet.getRange(1, col).setValue(PHOTO_HEADER).setFontWeight("bold").setBackground("#fde7ef");
  sheet.setColumnWidth(col, 260);
  return col;
}

function getPhotoFolder_() {
  var folders = DriveApp.getFoldersByName(PHOTO_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(PHOTO_FOLDER_NAME);
}

/** Saves a base64 data URL image to Drive. Returns { url, id, blob } or null when it is not a valid image. */
function savePhoto_(dataUrl, reviewId, name) {
  var match = /^data:(image\/(?:jpeg|jpg|png|webp));base64,([A-Za-z0-9+\/=\s]+)$/.exec(String(dataUrl));
  if (!match) return null;
  var mime = match[1] === "image/jpg" ? "image/jpeg" : match[1];
  var bytes = Utilities.base64Decode(match[2].replace(/\s+/g, ""));
  if (!bytes.length || bytes.length > MAX_PHOTO_BYTES) return null;
  var safeName = normalize_(name).replace(/ /g, "_").slice(0, 30) || "customer";
  var blob = Utilities.newBlob(bytes, mime, reviewId + "_" + safeName + "." + PHOTO_TYPES[mime]);
  var file = getPhotoFolder_().createFile(blob);
  file.setDescription("JOIRUSH review " + reviewId + " from " + name);
  try {
    // Link sharing lets the website show the photo once the review is approved. The link is
    // only published by ?action=approved after you tick Approved.
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) {
    Logger.log("Could not turn on link sharing for the photo: " + err);
  }
  return { url: file.getUrl(), id: file.getId(), blob: blob };
}

/** Emails the photo to the shop inbox (used when the website email could not attach it). */
function emailPhoto_(photo, name, rating, review, product) {
  try {
    if (!OWNER_EMAIL || MailApp.getRemainingDailyQuota() < 1) return;
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: "Photo for the new " + rating + " star review from " + name,
      body:
        "A customer added a photo to their review. It is attached and saved in Google Drive:\n" + photo.url +
        "\n\nName: " + name + "\nRating: " + rating + " out of 5\nProduct: " + (product || "Not chosen") +
        "\nReview: " + review + "\n\nTick Approved on the Reviews tab to publish it on joirush.com.",
      attachments: [photo.blob],
      name: "JOIRUSH Reviews",
    });
  } catch (err) {
    Logger.log("Photo email not sent: " + err);
  }
}

/** Public image link for the website: Drive links become a direct image URL; other https links pass through. */
function publicPhotoUrl_(value) {
  var text = String(value == null ? "" : value).trim();
  if (!text) return "";
  var id = /\/d\/([A-Za-z0-9_-]{10,})/.exec(text) || /[?&]id=([A-Za-z0-9_-]{10,})/.exec(text);
  if (id && /google\.com/.test(text)) return "https://drive.google.com/thumbnail?id=" + id[1] + "&sz=w1600";
  return /^https:\/\/[^\s"'<>]+$/.test(text) ? text : "";
}

/* ================================================================== */
/* Small utilities                                                    */
/* ================================================================== */

function parseBody_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      var parsed = JSON.parse(e.postData.contents);
      if (parsed && typeof parsed === "object") return parsed;
    } catch (ignore) {}
  }
  return (e && e.parameter) || {};
}

/** Honeypot: real visitors never fill these hidden fields. */
function isBot_(data) {
  return !!(data.botcheck || data.company || data.website);
}

function isEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isChecked_(value) {
  if (value === true) return true;
  var text = String(value).trim().toLowerCase();
  return text === "true" || text === "yes" || text === "x";
}

function clean_(value, maxLength) {
  var text = value == null ? "" : String(value);
  return text.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, maxLength || 500);
}

/** Like clean_ but keeps single line breaks (paragraphs in a review). */
function cleanMultiline_(value, maxLength) {
  var text = value == null ? "" : String(value);
  text = text.replace(/\r\n?/g, "\n").replace(/[\t ]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return text.slice(0, maxLength || 2000);
}

/** Stop spreadsheet formula injection: text starting with an equals, plus, minus or at sign is stored as plain text. */
function guard_(text) {
  text = text == null ? "" : String(text);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function unguard_(value) {
  var text = value == null ? "" : String(value);
  return /^'[=+\-@]/.test(text) ? text.slice(1) : text;
}

function normalize_(text) {
  return String(text == null ? "" : text).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function makeId_() {
  var stamp = Utilities.formatDate(new Date(), TIME_ZONE, "yyMMdd");
  var random = Utilities.getUuid().replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase();
  return "R" + stamp + random;
}

function hourKey_(kind) {
  return "count_" + kind + "_" + Math.floor(Date.now() / 3600000);
}

function underHourlyLimit_(kind, max) {
  var count = Number(CacheService.getScriptCache().get(hourKey_(kind)) || 0);
  return count < max;
}

function countHourly_(kind) {
  var cache = CacheService.getScriptCache();
  var key = hourKey_(kind);
  cache.put(key, String(Number(cache.get(key) || 0) + 1), 3700);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
