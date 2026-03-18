// screenshot.js — ARKHE AQA Renderer
// Run: node screenshot.js
// Output: render.png (1440x900 @2x retina)

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1440×900 @2x = 2880×1800 actual pixels — honest retina critique
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const filePath = path.resolve(__dirname, 'index.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Wait for Google Fonts + hero animation
  await new Promise(r => setTimeout(r, 2200));

  // Force-trigger ALL scroll animations (IntersectionObserver unreliable in headless)
  await page.evaluate(() => {
    document.querySelectorAll('[data-anim]').forEach(el => {
      el.classList.add('is-visible');
    });
  });

  // Wait for all animations to fully complete (longest is 1s for reveal-scale)
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'render.png', fullPage: true });
  console.log('✓ render.png saved — open for AQA critique.');

  await browser.close();
})();
