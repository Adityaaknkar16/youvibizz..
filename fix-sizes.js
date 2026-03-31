/**
 * Comprehensive page-size fixer
 * 1. Replaces class="app" in imported pages with class="app-inner" (to avoid CSS specificity fights)
 * 2. Removes any min-width / fixed-width overrides in views/ files
 * 3. Removes nested .app divs in views/ files that slip through
 */
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
let fixedCount = 0;

for (const file of files) {
  const rel = path.relative(srcDir, file);
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // ── GLOBAL: Replace class="app" with class="page-content" in ALL imported pages
  // This avoids conflicting with the AppLayout's .app class
  if (rel.startsWith('imported')) {
    // Replace div with class="app" → class="page-content"
    content = content.replace(/class="app"/g, 'class="page-content"');
    // Also update any CSS references in scoped <style> blocks
    content = content.replace(/\.app\s*\{/g, '.page-content {');
    content = content.replace(/\.app::-webkit-scrollbar/g, '.page-content::-webkit-scrollbar');
    content = content.replace(/\.app\s+>/g, '.page-content >');
  }

  // ── VIEWS: Fix RetailerMessages which has a rogue nested .app
  if (rel.startsWith('views')) {
    // Remove hardcoded min-width that breaks 480px layout
    content = content.replace(/min-width\s*:\s*[4-9]\d{2,}px[^;]*;/g, '/* min-width removed for mobile layout */');
    // Remove hardcoded fixed widths >= 400px in style attributes / scoped styles
    content = content.replace(/(?<![a-z-])width\s*:\s*[6-9]\d{2,}px[^;]*;/g, 'width: 100%;');
    content = content.replace(/(?<![a-z-])width\s*:\s*[4-5]\d{2}px[^;]*;/g, 'width: 100%;');
    // Replace nested .app divs in views (they get AppLayout's .app already)
    content = content.replace(/class="app"/g, 'class="page-content"');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', rel);
    fixedCount++;
  }
}

console.log('\nDone. Fixed', fixedCount, 'files.');
