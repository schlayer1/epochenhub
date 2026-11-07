const { spawn } = require('child_process');
const path = require('path');
const puppeteer = require('/Users/nicolekeller/Desktop/Antigravity Projekte/Promptbaukasten/node_modules/puppeteer');

const ARTIFACT_DIR = '/Users/nicolekeller/.gemini/antigravity/brain/cb984cf5-e4ad-47fb-afff-271acd8a7f92';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function verify() {
  console.log('Starte Vite Dev Server auf Port 3045...');
  const server = spawn('npx', ['vite', '--port', '3045', '--strictPort'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe'
  });

  server.stdout.on('data', d => console.log('[Vite stdout]', d.toString().trim()));
  server.stderr.on('data', d => console.error('[Vite stderr]', d.toString().trim()));

  await sleep(2500);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    console.log('Navigiere zu http://localhost:3045/ ...');
    await page.goto('http://localhost:3045/', { waitUntil: 'networkidle0' });
    await sleep(1500);

    // Scroll slightly to view cards clearly
    await page.evaluate(() => window.scrollBy(0, 420));
    await sleep(500);

    const timelineScreenshot = path.join(ARTIFACT_DIR, 'badge_timeline_view.png');
    await page.screenshot({ path: timelineScreenshot });
    console.log('✅ Screenshot Timeline View gespeichert:', timelineScreenshot);

    // Switch to Grid View
    const gridBtn = await page.$('button[title*="Raster"]');
    if (gridBtn) {
      console.log('Wechsle zu Rasteransicht...');
      await gridBtn.click();
      await sleep(1000);
      const gridScreenshot = path.join(ARTIFACT_DIR, 'badge_grid_view.png');
      await page.screenshot({ path: gridScreenshot });
      console.log('✅ Screenshot Grid View gespeichert:', gridScreenshot);
    }
  } catch (err) {
    console.error('Fehler bei der Verifikation:', err);
  } finally {
    await browser.close();
    server.kill();
    console.log('Verifikation beendet.');
  }
}

verify();
