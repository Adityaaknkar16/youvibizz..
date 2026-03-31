const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, results);
    else if (f.endsWith('.vue')) results.push(full);
  }
  return results;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);
const issues = [];

for (const file of files) {
  const rel = path.relative(srcDir, file);
  const content = fs.readFileSync(file, 'utf8');
  const problems = [];

  if (/min-width\s*:\s*[3-9]\d{2,}px/.test(content)) problems.push('min-width > 300px');
  if (/width\s*:\s*[4-9]\d{2,}px/.test(content)) problems.push('fixed width >= 400px');
  if (/class="app"/.test(content)) problems.push('has nested .app div');
  if (/class="phone-screen"/.test(content)) problems.push('still has phone-screen');

  const hasBottomNav = /import BottomNav/.test(content) || /BottomNav/.test(content);
  const isInViews = rel.startsWith('views');
  if (hasBottomNav && isInViews) problems.push('duplicate BottomNav in views/');

  if (problems.length) issues.push({ file: rel, problems });
}

for (const issue of issues) {
  console.log('\n' + issue.file);
  for (const p of issue.problems) console.log('  - ' + p);
}
console.log('\nTotal files with issues:', issues.length);
