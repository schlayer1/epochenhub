const { spawn } = require('child_process');
const puppeteer = require('/Users/nicolekeller/Desktop/Antigravity Projekte/Promptbaukasten/node_modules/puppeteer');
const path = require('path');

const ARTIFACT_DIR = '/Users/nicolekeller/.gemini/antigravity/brain/2ddcde7d-abe5-445e-9ee6-79116d528bb6';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function verify() {
  console.log('Starte Vite Preview Server auf Port 4180...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4180', '--strictPort'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe'
  });

  await sleep(2000);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    console.log('Öffne http://localhost:4180/ ...');
    await page.goto('http://localhost:4180/', { waitUntil: 'networkidle0' });
    await sleep(800);

    // Screenshot Desktop Header with Guide Button
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'header_with_guide_btn.png') });
    console.log('✅ Captured header_with_guide_btn.png');

    // 1. Klicke auf 'Anleitung' Button im Header
    console.log('Klicke auf Schüler-Leitfaden Button im Header...');
    const guideBtn = await page.$('button[title*="Schüler-Leitfaden"]');
    if (guideBtn) {
      await guideBtn.click();
      await sleep(1000);
    } else {
      console.error('Guide-Button nicht gefunden!');
    }

    // Screenshot Desktop Guide Modal
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'guide_modal_desktop.png') });
    console.log('✅ Captured guide_modal_desktop.png');

    // Mobile Viewport
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await sleep(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'guide_modal_mobile.png') });
    console.log('✅ Captured guide_modal_mobile.png');

  } catch (err) {
    console.error('Fehler während der Verifikation:', err);
  } finally {
    await browser.close();
    server.kill();
    console.log('Server und Browser beendet.');
    process.exit(0);
  }
}

verify();
