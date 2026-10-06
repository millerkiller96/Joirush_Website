/**
 * JOIRUSH giveaway email logger (Google Apps Script web app)
 * ==========================================================
 * Appends one row per giveaway entry to the "joirush email list" sheet:
 *   Timestamp | Email | Source Page | Consent | Source
 *
 * DEPLOY STEPS (about 5 minutes, done once by the sheet owner):
 *  1. Open the sheet:
 *     https://docs.google.com/spreadsheets/d/1edgaV7qX4pnE680bSXJeOLW0QM64Ky9xI0lWayfj8cc/edit
 *  2. Menu: Extensions > Apps Script. Delete any code in Code.gs and paste ALL of this file. Click Save.
 *  3. (Optional test) Choose the function "setupHeaders" in the toolbar and click Run.
 *     Approve the permission prompt (it only needs access to this spreadsheet).
 *     The header row appears in Sheet1.
 *  4. Click Deploy > New deployment. Click the gear icon next to "Select type" and pick "Web app".
 *       Description:      JOIRUSH giveaway
 *       Execute as:       Me
 *       Who has access:   Anyone
 *     Click Deploy, approve access if asked, then copy the "Web app URL" (it ends in /exec).
 *  5. Send that URL to your developer (or paste it yourself) into
 *     src/lib/forms.ts  ->  GIVEAWAY_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/.../exec";
 *     then rebuild and deploy the site. From then on every giveaway entry also lands in the sheet.
 *  6. Quick check: open the /exec URL in a browser. It should say
 *     "JOIRUSH giveaway logger is running."
 *
 * If you edit this code later, use Deploy > Manage deployments > (pencil) > Version: New version
 * so the SAME URL keeps working. A brand new deployment creates a NEW URL.
 */

var SHEET_ID = "1edgaV7qX4pnE680bSXJeOLW0QM64Ky9xI0lWayfj8cc";
var SHEET_NAME = "Sheet1";
var HEADERS = ["Timestamp", "Email", "Source Page", "Consent", "Source"];
var SKIP_DUPLICATE_EMAILS = true; // one row per email address

function getSheet_() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet(); // works when the script is bound to the sheet
  } catch (err) {
    ss = null;
  }
  if (!ss) ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

/** Run once from the editor to create the header row and grant permissions. */
function setupHeaders() {
  getSheet_();
}

function clean_(value, maxLength) {
  var text = value == null ? "" : String(value);
  text = text.replace(/[\r\n\t]+/g, " ").trim();
  // Stop spreadsheet formula injection (cells starting with = + - @).
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text.slice(0, maxLength || 500);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** The website posts JSON as text/plain: { email, sourcePage, consent, source }. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var email = clean_(data.email, 254).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json_({ ok: false, error: "invalid email" });
    }

    var sheet = getSheet_();

    if (SKIP_DUPLICATE_EMAILS && sheet.getLastRow() > 1) {
      var existing = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
      for (var i = 0; i < existing.length; i++) {
        if (String(existing[i][0]).toLowerCase() === email) {
          return json_({ ok: true, duplicate: true });
        }
      }
    }

    sheet.appendRow([
      new Date(),
      email,
      clean_(data.sourcePage, 500),
      clean_(data.consent, 500),
      clean_(data.source || "joirush.com", 100),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignore) {}
  }
}

function doGet() {
  return ContentService.createTextOutput("JOIRUSH giveaway logger is running.");
}
