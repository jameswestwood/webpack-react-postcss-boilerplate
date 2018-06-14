const path = require('path');
import utilities from './utilities';
import puppeteer from 'puppeteer';

test('returns a valid page width', async () => {

  const browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(`file:${path.join(__dirname, '../../../docs/index.html')}`);

  const testDoc = await page.evaluate(() => {
    return {
      documentElement: {
        scrollWidth: document.documentElement.scrollWidth,
        offsetWidth: document.documentElement.offsetWidth,
        clientWidth: document.documentElement.clientWidth
      },
      body: {
        scrollWidth: document.body.scrollWidth,
        offsetWidth: document.body.offsetWidth
      }
    };
  });

  browser.close();

  const pageWidth = utilities.getWidth(testDoc);

  expect(pageWidth).toBeDefined();
  expect(pageWidth).not.toBe(-1);
  expect(pageWidth).toBeGreaterThan(0);
});
