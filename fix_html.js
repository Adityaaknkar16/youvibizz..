const fs = require('fs');
const path = require('path');
const { parse } = require('@vue/compiler-sfc');

const dir = path.join(process.cwd(), 'src/views');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.vue'));

let fixedCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Clean up corrupted notch if present (non-regex just split/replace strings)
    const badNotchStr = '<div class="phone-notch">\n      <div class="notch-speaker">\n      <div class="notch-camera">';
    if (content.includes(badNotchStr)) {
        content = content.replace(badNotchStr, '');
    }
    
    // Also there is often an empty hero-inner or extra bad tabs. That gets complex to automatically remove, 
    // but what we MUST do is balance the divs.
    
    let templateEndIndex = content.lastIndexOf('</template>');
    if (templateEndIndex !== -1) {
        let templateContent = content.substring(0, templateEndIndex);
        
        // Count divs safely
        // <div class="..."> or <div>
        let openDivs = 0;
        let closedDivs = 0;
        
        let openMatch = templateContent.match(/<div(\s|>)/g);
        if (openMatch) openDivs = openMatch.length;
        
        let closedMatch = templateContent.match(/<\/div>/g);
        if (closedMatch) closedDivs = closedMatch.length;
        
        let missingDivs = openDivs - closedDivs;

        if (missingDivs > 0) {
            let closingTags = '\n' + '  </div>\n'.repeat(missingDivs);
            content = templateContent + closingTags + content.substring(templateEndIndex);
        }
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Fixed ${missingDivs} missing closing divs in ${file}`);
            fixedCount++;
        }
    }
});

console.log(`Total files repaired: ${fixedCount}`);
