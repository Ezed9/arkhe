// screenshot.js — ARKHE AQA Renderer
// Run: node screenshot.js
// Output: render.png (1440x900 @2x retina)

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1440×900 @2x = 2880×1800 actual pixels — honest retina critique
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5999', { waitUntil: 'networkidle0' });

  // Wait for fonts + hero particle animation
  await new Promise(r => setTimeout(r, 2500));

  // Scroll through entire page in steps to trigger all whileInView animations
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 600;
  for (let y = 0; y < pageHeight; y += step) {
    await page.evaluate(pos => window.scrollTo(0, pos), y);
    await new Promise(r => setTimeout(r, 120));
  }
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));

  // Wait for all animations to settle
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: 'render.png', fullPage: true });
  console.log('✓ render.png saved — open for AQA critique.');

  await browser.close();
})();
