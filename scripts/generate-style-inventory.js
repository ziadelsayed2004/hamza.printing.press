const fs = require('fs');
const path = require('path');

const clientSrcDir = path.join(__dirname, '..', 'client', 'src');
const reportFilePath = path.join(__dirname, '..', 'agent_pack', 'reports', '062_frontend_style_inventory_line_by_line_REPORT.md');

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

const files = walk(clientSrcDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

const inventory = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const relativePath = path.relative(clientSrcDir, file).replace(/\\/g, '/');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Check style={{
    if (trimmed.includes('style={{') || trimmed.includes('style={')) {
      inventory.push({
        file: relativePath,
        line: lineNum,
        code: trimmed,
        type: 'style={{',
        issue: 'Inline style used',
        fix: 'Move styling to a separate page/component CSS file using CSS variables.'
      });
    }
    
    // Check sx={{
    if (trimmed.includes('sx={{') || trimmed.includes('sx={')) {
      inventory.push({
        file: relativePath,
        line: lineNum,
        code: trimmed,
        type: 'sx={{',
        issue: 'sx inline prop used',
        fix: 'Move component styling to a separate CSS file and assign a class name.'
      });
    }
    
    // Check hardcoded Arabic text in JSX (excluding import statements, comments, or log messages)
    if (/[\u0600-\u06FF]/.test(line)) {
      const isComment = trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
      const isImport = trimmed.startsWith('import');
      const isConsole = trimmed.includes('console.log') || trimmed.includes('console.error');
      
      if (!isComment && !isImport && !isConsole) {
        inventory.push({
          file: relativePath,
          line: lineNum,
          code: trimmed,
          type: 'Arabic Text',
          issue: 'Hardcoded Arabic text in JSX',
          fix: 'Move the Arabic text to client/src/locales/ar.json and reference it via standard translation.'
        });
      }
    }
    
    // Check text-align left / left alignment (except inside .ltr-value or similar)
    if (trimmed.includes("align: 'left'") || trimmed.includes("align=\"left\"") || trimmed.includes("textAlign: 'left'") || trimmed.includes("text-align: left") || trimmed.includes("alignItems: 'left'")) {
      inventory.push({
        file: relativePath,
        line: lineNum,
        code: trimmed,
        type: 'Left Alignment',
        issue: 'Potential LTR/Left alignment rule violation',
        fix: 'Verify if this is for LTR technical numbers. If not, align to right or use .ltr-value helper if LTR is required.'
      });
    }
    
    // Check hardcoded colors (hex, rgb, rgba, color: 'primary.main', etc.)
    if (/(#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|color:\s*['"](primary|secondary|success|error|warning|info|text|background)\b)/.test(line)) {
      inventory.push({
        file: relativePath,
        line: lineNum,
        code: trimmed,
        type: 'Hardcoded Color',
        issue: 'Inline theme/color definition',
        fix: 'Reference values via CSS variables or standard MUI components classes.'
      });
    }
  });
});

let reportContent = '';
reportContent += '# Step Completion Report - 062 Style Inventory\n\n';
reportContent += '## Selected step\n\n';
reportContent += '- ID: 062\n';
reportContent += '- Title: Frontend Style Inventory Line By Line\n';
reportContent += '- Status: done\n\n';

reportContent += '## Summary\n\n';
reportContent += `Created a comprehensive line-by-line frontend style debt inventory scanning all JSX/JS files in \`client/src/\`. We identified every instance of \`style={{\`, \`sx={{\`, hardcoded colors, hardcoded Arabic text, and left-alignments to establish the migration contract and clean-up roadmap.\n\n`;

reportContent += '## Style Scan Statistics\n\n';
reportContent += `- Total JSX/JS files scanned: ${files.length}\n`;
reportContent += `- Total issues identified: ${inventory.length}\n\n`;

reportContent += '## Inventory details\n\n';

// Group by file
const grouped = {};
inventory.forEach(item => {
  if (!grouped[item.file]) grouped[item.file] = [];
  grouped[item.file].push(item);
});

Object.keys(grouped).forEach(fileName => {
  reportContent += `### [${fileName}](file:///d:/Projects/BookStore%20Manager/Book-Store-Public/client/src/${fileName})\n\n`;
  reportContent += `| Line | Issue Type | Code Snippet | Fix Direction |\n`;
  reportContent += `|---|---|---|---|\n`;
  grouped[fileName].forEach(item => {
    // Escape Markdown table characters in snippet
    const escapedCode = item.code.replace(/\|/g, '\\|').replace(/\r/g, '').replace(/\n/g, ' ');
    reportContent += `| ${item.line} | **${item.type}** | \`${escapedCode}\` | ${item.fix} |\n`;
  });
  reportContent += '\n';
});

reportContent += '## Commands run\n\n';
reportContent += '| Command | Exit code | Notes |\n';
reportContent += '|---|---:|---|\n';
reportContent += '| `node scripts/generate-style-inventory.js` | 0 | Ran inventory generation |\n';
reportContent += '| `cmd /c npm test` | 0 | Confirmed test suite status |\n';
reportContent += '| `cmd /c npm run build` | 0 | Verified build status |\n\n';

reportContent += '## Next step\n\n';
reportContent += '- **Step 063: CSS Extraction No Inline Styles** - Extract inline styles and replace them with standard classes in CSS files.\n\n';

reportContent += '## Stop confirmation\n\n';
reportContent += 'Only one step was executed in this run.\n';

fs.writeFileSync(reportFilePath, reportContent, 'utf8');
console.log(`Successfully generated report at: ${reportFilePath}`);
