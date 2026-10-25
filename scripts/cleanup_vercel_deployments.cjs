const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

function getToken() {
  if (process.env.VERCEL_TOKEN) {
    return process.env.VERCEL_TOKEN.trim();
  }
  const authPath = path.join(os.homedir(), '.vercel', 'auth.json');
  if (fs.existsSync(authPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(authPath, 'utf8'));
      if (data.token) return data.token.trim();
    } catch (e) {}
  }
  return null;
}

const TOKEN = getToken();
const KEEP_COUNT = parseInt(process.argv[2] || '2', 10);

if (!TOKEN) {
  console.error('❌ Kein Vercel-Token gefunden in VERCEL_TOKEN oder ~/.vercel/auth.json');
  process.exit(1);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function api(endpoint, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.vercel.com',
      path: endpoint,
      method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(b) });
        } catch (e) {
          resolve({ status: res.statusCode, body: b });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function getAllProjects() {
  const res = await api('/v9/projects?limit=100');
  return res.body?.projects || [];
}

async function getProjectDeployments(projectId) {
  const allDeps = [];
  let until = null;
  while (true) {
    const url = `/v6/deployments?projectId=${projectId}&limit=100${until ? '&until=' + until : ''}`;
    const res = await api(url);
    const deps = res.body?.deployments || [];
    if (!deps.length) break;
    allDeps.push(...deps);
    if (res.body?.pagination?.next) {
      until = res.body.pagination.next;
    } else {
      break;
    }
  }
  // Sort descending by creation date (newest first)
  allDeps.sort((a, b) => b.createdAt - a.createdAt);
  return allDeps;
}

async function run() {
  console.log('====================================================');
  console.log('🧹 VERCEL DEPLOYMENT CLEANUP');
  console.log(`📌 Behalte die neuesten ${KEEP_COUNT} Deployments pro Projekt`);
  console.log('====================================================\n');

  const projects = await getAllProjects();
  console.log(`Gefundene Projekte: ${projects.length}\n`);

  let totalDeleted = 0;
  let totalKept = 0;
  let totalErrors = 0;

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`[${i + 1}/${projects.length}] 📁 ${p.name}`);

    const deployments = await getProjectDeployments(p.id);
    const kept = deployments.slice(0, KEEP_COUNT);
    const toDelete = deployments.slice(KEEP_COUNT);

    totalKept += kept.length;

    console.log(`   Gesamt: ${deployments.length} | Behalten: ${kept.length} | Zu löschen: ${toDelete.length}`);

    if (toDelete.length === 0) {
      console.log('   ✅ Bereits sauber.\n');
      continue;
    }

    let deletedInProject = 0;
    for (const dep of toDelete) {
      const dateStr = new Date(dep.createdAt).toLocaleDateString('de-DE');
      process.stdout.write(`   🗑️ Lösche ${dep.uid} (${dateStr} - ${dep.url})... `);
      const del = await api(`/v13/deployments/${dep.uid}`, 'DELETE');
      if (del.status === 200 && del.body?.state === 'DELETED') {
        console.log('✅ gelöscht');
        deletedInProject++;
        totalDeleted++;
      } else {
        console.log(`⚠️ HTTP ${del.status}: ${JSON.stringify(del.body)}`);
        totalErrors++;
      }
      // Sanftes Rate-Limiting
      await sleep(120);
    }

    console.log(`   ✨ Projekt fertig: ${deletedInProject} Deployments entfernt.\n`);
  }

  console.log('====================================================');
  console.log('🎉 BEREINIGUNG VOLLSTÄNDIG ABGESCHLOSSEN!');
  console.log(`✅ Erfolgreich gelöscht:  ${totalDeleted} Deployments`);
  console.log(`🛡️ Sicher erhalten:      ${totalKept} Deployments`);
  if (totalErrors > 0) {
    console.log(`⚠️ Fehler:                ${totalErrors}`);
  }
  console.log('====================================================');
}

run().catch(console.error);
