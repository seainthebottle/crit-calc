const fs = require('fs');
const path = require('path');

// 1. Read package.json to get the version
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

console.log(`Current version in package.json: ${version}`);

// 2. Update www/index.html
const indexPath = path.join(__dirname, 'www', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Update version tag in title: e.g., <span class="version-tag">v.2</span> -> v.3
// Regex looks for v. followed by digits
indexHtml = indexHtml.replace(/<span class="version-tag">v\.\d+<\/span>/, `<span class="version-tag">v.${version}</span>`);

// Update asset URLs: e.g., style.css?v=2 -> style.css?v=3
// We use a regex dealing with ?v=digits
indexHtml = indexHtml.replace(/((?:src|href)="[^"]+\?v=)\d+(")/g, `$1${version}$2`);

fs.writeFileSync(indexPath, indexHtml);
console.log(`Updated www/index.html to version ${version}`);

// 3. Update www/service-worker.js
const swPath = path.join(__dirname, 'www', 'service-worker.js');
let swJs = fs.readFileSync(swPath, 'utf8');

// Update CACHE_NAME: e.g., 'critcalc-v1' -> 'critcalc-v3'
swJs = swJs.replace(/(const CACHE_NAME = 'critcalc-v)\d+(';)/, `$1${version}$2`);

// Update asset URLs in CACHE list: e.g., style.css?v=2 -> style.css?v=3
swJs = swJs.replace(/('\.\/[a-zA-Z0-9-]+\.(?:css|js|json)\?v=)\d+(')/g, `$1${version}$2`);

fs.writeFileSync(swPath, swJs);
console.log(`Updated www/service-worker.js to version ${version}`);

console.log('Version update complete!');
