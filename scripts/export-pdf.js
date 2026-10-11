#!/usr/bin/env node
// One-command PDF export — drives headless Chromium the same way Chrome's own
// File > Print > Save as PDF (A4, Landscape, No margins, Background graphics on) would,
// but scripted so it's repeatable and nobody has to do it by hand.
//
// Usage:  node scripts/export-pdf.js [output.pdf]
// Or:     npm run pdf

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const root = path.resolve(__dirname, '..');
  const indexPath = path.join(root, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('index.html not found at ' + indexPath);
    process.exit(1);
  }

  const outPath = path.resolve(root, process.argv[2] || 'stucknot-portfolio.pdf');
  const fileUrl = 'file:///' + indexPath.replace(/\\/g, '/');

  console.log('Loading ' + fileUrl);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('console', (msg) => { if (msg.type() === 'error') pageErrors.push(msg.text()); });

  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Fail loudly rather than silently shipping a broken PDF.
  const missingImages = await page.evaluate(() =>
    [...document.querySelectorAll('img')]
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.getAttribute('src'))
  );
  if (missingImages.length) {
    console.error('Missing/broken screenshot(s), aborting export:\n  ' + missingImages.join('\n  '));
    await browser.close();
    process.exit(1);
  }
  if (pageErrors.length) {
    console.error('Page threw error(s), aborting export:\n  ' + pageErrors.join('\n  '));
    await browser.close();
    process.exit(1);
  }

  // Printing switches on @media print, which already forces the cover's typewriter
  // animation to its finished state (see .ln / .cursor rules in index.html) — no
  // need to wait out the animation here.
  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: outPath,
    printBackground: true,
    preferCSSPageSize: true, // respects the file's own @page{size:297mm 210mm} (A4 landscape, no margin)
  });

  await browser.close();

  const sizeKB = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`Wrote ${path.relative(root, outPath)} (${sizeKB} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
