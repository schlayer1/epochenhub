const { spawn } = require('child_process');
const puppeteer = require('/Users/nicolekeller/Desktop/Antigravity Projekte/Promptbaukasten/node_modules/puppeteer');
const path = require('path');

const ARTIFACT_DIR = '/Users/nicolekeller/.gemini/antigravity/brain/2ddcde7d-abe5-445e-9ee6-79116d528bb6';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function verify() {
  console.log('Starte Vite Preview Server auf Port 4178...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4178', '--strictPort'], {
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

    console.log('Öffne http://localhost:4178/ ...');
    await page.goto('http://localhost:4178/', { waitUntil: 'networkidle0' });
    await sleep(800);

    // 1. Klicke auf 'Natur-Atlas' im Header
    console.log('Klicke auf Natur-Atlas Button im Header...');
    const atlasBtn = await page.$('button[title*="Natur-Atlas"]');
    if (atlasBtn) {
      await atlasBtn.click();
      await sleep(1000);
    }

    // Screenshot Desktop Atlas
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'atlas_desktop_view.png') });
    console.log('✅ Captured atlas_desktop_view.png');

    // 2. Klicke auf die erste Tierkarte (Bastet-Katze)
    console.log('Öffne Steckbrief-Modal für die Katze...');
    const firstCard = await page.$('.group.cursor-pointer');
    if (firstCard) {
      await firstCard.click();
      await sleep(1000);

      // Screenshot Modal
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'atlas_modal_bastet.png') });
      console.log('✅ Captured atlas_modal_bastet.png');

      // Schließe Modal mit Escape
      await page.keyboard.press('Escape');
      await sleep(500);
    }

    // 3. Tablet Ansicht (1024x768)
    await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
    await sleep(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'atlas_tablet_view.png') });
    console.log('✅ Captured atlas_tablet_view.png');

    // 4. Mobile Ansicht (390x844)
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await sleep(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'atlas_mobile_view.png') });
    console.log('✅ Captured atlas_mobile_view.png');

    console.log('\nAlle Verifikations-Screenshots erfolgreich erfasst!');
  } finally {
    await browser.close();
    server.kill();
  }
}

verify().catch(console.error);
