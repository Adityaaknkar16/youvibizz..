const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.vue')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Let's check if there is a phone-frame class
      if (content.includes('phone-frame')) {
        // Change classes to display contents
        content = content.replace(/class="phone-frame"/g, 'style="display: contents"');
        content = content.replace(/class="phone-screen"/g, 'style="display: contents; height: 100%;"');
        
        // Hide notch and status bar by turning them into display none
        content = content.replace(/class="phone-notch"/g, 'class="phone-notch" style="display: none !important"');
        content = content.replace(/class="status-bar"/g, 'class="status-bar" style="display: none !important"');
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed', fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));
