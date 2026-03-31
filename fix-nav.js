const fs = require('fs');
const path = require('path');

// Views that go through AppLayout (they get BottomNav injected by AppLayout)
// We should remove their inline <nav class="bottom-nav"> blocks
const viewsDir = path.join(__dirname, 'src', 'views');

// All other imported pages have their own nav - those we want to keep but fix with CSS

let fixedCount = 0;

function removeBottomNavFromFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('class="bottom-nav"')) return;

  // Match <nav class="bottom-nav"> ... </nav> block (possibly multiline)
  // We'll do a simple approach: find and remove the entire nav block
  const before = content;

  // Strategy: remove everything from <nav class="bottom-nav"> to its closing </nav>
  // We need to handle nesting, so count tags
  let result = '';
  let i = 0;
  while (i < content.length) {
    // Look for opening <nav class="bottom-nav"
    const navOpen = content.indexOf('<nav class="bottom-nav"', i);
    if (navOpen === -1) {
      result += content.slice(i);
      break;
    }

    // Add everything before this nav
    result += content.slice(i, navOpen);

    // Now find the closing </nav> - count nesting
    let depth = 1;
    let j = navOpen + '<nav class="bottom-nav"'.length;
    while (j < content.length && depth > 0) {
      const nextOpen = content.indexOf('<nav', j);
      const nextClose = content.indexOf('</nav>', j);

      if (nextClose === -1) break; // malformed, bail

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        j = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) {
          j = nextClose + '</nav>'.length;
        } else {
          j = nextClose + '</nav>'.length;
        }
      }
    }

    i = j;
  }

  if (result !== before) {
    fs.writeFileSync(filePath, result, 'utf8');
    console.log('Removed bottom-nav from:', path.basename(filePath));
    fixedCount++;
  }
}

// Process all files in views/ directory
const viewFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.vue'));
for (const file of viewFiles) {
  removeBottomNavFromFile(path.join(viewsDir, file));
}

console.log(`\nDone. Removed inline bottom-nav from ${fixedCount} view files.`);
console.log('Pages in src/imported/ keep their own nav (they route directly, not through AppLayout).');
