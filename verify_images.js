const fs = require('fs');
const https = require('https');
const path = require('path');

const filesToScan = [
  'sub/jejustay_life.html',
  'sub/jejuhotel.html',
  'sub/activities.html',
  'js/jejustay_life.js',
  'css/signup.css',
  'css/main.css',
  'css/login.css'
];

const projectRoot = 'd:\\lsh\\git\\jejuTeam';

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'ERROR', error: e.message });
    });
  });
}

async function main() {
  const allUrls = new Set();
  const fileUrlMap = {};

  for (const relativePath of filesToScan) {
    const fullPath = path.join(projectRoot, relativePath);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const regex = /https:\/\/images\.unsplash\.com\/[^"'\)\s]*/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        let url = match[0];
        // clean up trailing characters that might be captured
        url = url.split('&quot;')[0].split('"')[0].split("'")[0].split(')')[0]; 
        
        allUrls.add(url);
        if (!fileUrlMap[url]) fileUrlMap[url] = [];
        fileUrlMap[url].push(relativePath);
      }
    } catch (err) {
      console.error(`Error reading ${relativePath}:`, err.message);
    }
  }

  console.log(`Found ${allUrls.size} unique URLs.`);
  
  const results = [];
  for (const url of allUrls) {
    const res = await checkUrl(url);
    results.push(res);
    console.log(`${res.status} - ${url}`);
  }

  const broken = results.filter(r => r.status !== 200);
  console.log('\n--- BROKEN URLs ---');
  if (broken.length === 0) {
    console.log('None.');
  } else {
    broken.forEach(b => {
      console.log(`[${b.status}] ${b.url}`);
      console.log(`  Found in: ${fileUrlMap[b.url].join(', ')}`);
    });
  }
}

main();
