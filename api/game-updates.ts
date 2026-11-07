import https from 'https';

const REPOS = [
  'schlayer1/retrolernspiel',
  'schlayer1/retrolernspielegypt',
  'schlayer1/retrolernspielgreece',
  'schlayer1/retrospielrome',
  'schlayer1/retrolernspielgermanic',
  'schlayer1/retrolernspielvikings',
  'schlayer1/retrolernspielmedfeudal',
  'schlayer1/retrolernspielreformation'
];

function fetchCommit(repo: string, token?: string): Promise<any> {
  return new Promise((resolve) => {
    const headers: Record<string, string> = {
      'User-Agent': 'Epochenhub-Status-Checker',
      'Accept': 'application/vnd.github.v3+json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const req = https.request({
      hostname: 'api.github.com',
      path: `/repos/${repo}/commits?per_page=1`,
      method: 'GET',
      headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const c = parsed[0];
              const dateStr = c.commit?.committer?.date || c.commit?.author?.date;
              if (dateStr) {
                const dateObj = new Date(dateStr);
                const formattedDate = dateObj.toLocaleDateString('de-DE', {
                  timeZone: 'Europe/Berlin',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                });
                const formattedTime = dateObj.toLocaleTimeString('de-DE', {
                  timeZone: 'Europe/Berlin',
                  hour: '2-digit',
                  minute: '2-digit'
                }) + ' Uhr';

                resolve({
                  repo,
                  updatedAt: dateStr,
                  formattedDate,
                  formattedTime,
                  displayLabel: `Letztes Update am ${formattedDate} um ${formattedTime}`,
                  commitMessage: c.commit?.message ? c.commit.message.split('\n')[0] : '',
                  commitSha: (c.sha || '').slice(0, 7),
                  commitUrl: c.html_url || `https://github.com/${repo}/commit/${c.sha}`
                });
                return;
              }
            }
          } catch (e) {
            // parsing error
          }
        }
        resolve(null);
      });
    });
    req.on('error', () => resolve(null));
    req.end();
  });
}

export default async function handler(req: any, res: any) {
  const token = process.env.GITHUB_TOKEN;

  try {
    const results = await Promise.all(REPOS.map(repo => fetchCommit(repo, token)));
    const map: Record<string, any> = {};
    for (const r of results) {
      if (r && r.repo) {
        map[r.repo] = r;
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;
    res.end(JSON.stringify(map));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err?.message || 'Internal Server Error' }));
  }
}
