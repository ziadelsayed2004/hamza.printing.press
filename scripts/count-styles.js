const fs = require('fs');
const path = require('path');

const clientSrcDir = path.join(__dirname, '..', 'client', 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(clientSrcDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.tsx') || f.endsWith('.ts'));

let totalSx = 0;
let totalStyle = 0;
const details = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = path.relative(clientSrcDir, file).replace(/\\/g, '/');
  
  // Simple regex matching (not parsing, but standard for audits)
  const sxMatches = content.match(/sx\s*=\s*\{/g) || [];
  const styleMatches = content.match(/style\s*=\s*\{/g) || [];
  
  if (sxMatches.length > 0 || styleMatches.length > 0) {
    details.push({
      file: relativePath,
      sx: sxMatches.length,
      style: styleMatches.length
    });
    totalSx += sxMatches.length;
    totalStyle += styleMatches.length;
  }
});

console.log('--- SCAN DETAILS ---');
details.sort((a, b) => (b.sx + b.style) - (a.sx + a.style)).forEach(d => {
  console.log(`${d.file}: sx = ${d.sx}, style = ${d.style}`);
});

console.log('\n--- SUMMARY ---');
console.log(`Total files scanned: ${files.length}`);
console.log(`Total 'sx=' occurrences: ${totalSx}`);
console.log(`Total 'style=' occurrences: ${totalStyle}`);
