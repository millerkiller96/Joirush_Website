const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceImage = path.join(__dirname, '../public/images/brand/avatar.jpg');
const publicDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../src/app');

async function generateFavicons() {
  console.log('Generating favicon assets from:', sourceImage);

  // Check if source exists
  if (!fs.existsSync(sourceImage)) {
    console.error('Source image not found:', sourceImage);
    process.exit(1);
  }

  // Generate icon.png (32x32) for public folder
  await sharp(sourceImage)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'icon.png'));
  console.log('Created: public/icon.png (32x32)');

  // Generate icon-48.png (48x48) for public folder
  await sharp(sourceImage)
    .resize(48, 48, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'icon-48.png'));
  console.log('Created: public/icon-48.png (48x48)');

  // Generate apple-touch-icon.png (180x180) for public folder
  await sharp(sourceImage)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created: public/apple-touch-icon.png (180x180)');

  // Generate favicon.ico (16x16, 32x32, 48x48 sizes in ICO)
  // ICO format - we'll use PNG embedded in ICO-like approach
  // Sharp can create PNG; for true ICO we'd need another tool, but we can create a 32x32 PNG named favicon.ico
  // Most modern browsers accept PNG with .ico extension
  await sharp(sourceImage)
    .resize(32, 32, { fit: 'cover' })
    .toFormat('png')
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created: public/favicon.ico (32x32 PNG)');

  // Also create icon.png and apple-icon.png in src/app for App Router conventions
  await sharp(sourceImage)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(path.join(appDir, 'icon.png'));
  console.log('Created: src/app/icon.png (32x32)');

  await sharp(sourceImage)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(path.join(appDir, 'apple-icon.png'));
  console.log('Created: src/app/apple-icon.png (180x180)');

  console.log('\nAll favicon assets generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
