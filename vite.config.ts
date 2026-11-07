import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const LOCAL_PROJECT_MAP: Record<string, string> = {
  'schlayer1/retrolernspiel': 'SNES Retro Game',
  'schlayer1/retrolernspielegypt': 'SNES Retro Game Aegypten',
  'schlayer1/retrolernspielgreece': 'SNES Retro Game Greek',
  'schlayer1/retrospielrome': 'SNES Retro Game Rome',
  'schlayer1/retrolernspielgermanic': 'SNES Retro Game German Tribe',
  'schlayer1/retrolernspielvikings': 'SNES Retro Game Vikings',
  'schlayer1/retrolernspielmedfeudal': 'SNES Retro Game Medieval Feudal',
  'schlayer1/retrolernspielreformation': 'SNES Retro Game Reformation'
};

function localGameUpdatesPlugin(): Plugin {
  return {
    name: 'local-game-updates',
    configureServer(server) {
      server.middlewares.use('/api/game-updates', (req, res) => {
        const map: Record<string, any> = {};

        for (const [repo, folder] of Object.entries(LOCAL_PROJECT_MAP)) {
          const localPath = path.resolve(process.cwd(), '..', folder);
          if (fs.existsSync(path.join(localPath, '.git'))) {
            try {
              const gitOut = execSync('git log -1 --format="%cI|||%s|||%h"', {
                cwd: localPath,
                encoding: 'utf8'
              }).trim();
              const [isoDate, msg, sha] = gitOut.split('|||');
              const d = new Date(isoDate);
              const formattedDate = d.toLocaleDateString('de-DE', {
                timeZone: 'Europe/Berlin',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              });
              const formattedTime = d.toLocaleTimeString('de-DE', {
                timeZone: 'Europe/Berlin',
                hour: '2-digit',
                minute: '2-digit'
              }) + ' Uhr';

              map[repo] = {
                repo,
                updatedAt: isoDate,
                formattedDate,
                formattedTime,
                displayLabel: `Letztes Update am ${formattedDate} um ${formattedTime}`,
                commitMessage: msg,
                commitSha: sha,
                commitUrl: `https://github.com/${repo}/commit/${sha}`
              };
            } catch (err) {
              // ignore
            }
          }
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(map));
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localGameUpdatesPlugin()
  ],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});
