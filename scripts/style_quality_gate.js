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

// Find all JSX/TSX source files and CSS files
const allFiles = walk(clientSrcDir);
const sourceFiles = allFiles.filter(
  f => f.endsWith('.jsx') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.ts')
);

const violations = [];

// Helper to register violation
function addViolation(file, line, checkType, message, snippet) {
  violations.push({
    file: path.relative(clientSrcDir, file).replace(/\\/g, '/'),
    line,
    checkType,
    message,
    snippet: snippet ? snippet.trim() : ''
  });
}

// Check 1: Sibling CSS Check
// Every .jsx component/page must have a matching .css file in the same folder.
sourceFiles.forEach(file => {
  if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
    const normalizedPath = file.replace(/\\/g, '/');
    const isComponentOrPage = normalizedPath.includes('/components/') || normalizedPath.includes('/pages/');
    if (isComponentOrPage) {
      const cssPath = file.slice(0, -4) + '.css';
      if (!fs.existsSync(cssPath)) {
        addViolation(file, 0, 'Missing Sibling CSS', `Missing matching .css stylesheet beside this component/page.`);
      }
    }
  }
});

// Baseline limits for heavy sx props. DOM style props have a strict zero policy below.
const BASELINE = {
  'App.jsx': { sx: 0 },
  'layouts/MainLayout.jsx': { sx: 0 },
  'pages/AuditLogs.jsx': { sx: 1 },
  'pages/Dashboard.jsx': { sx: 1 },
  'pages/Exports.jsx': { sx: 2 },
  'pages/Finance.jsx': { sx: 7 },
  'pages/Inventory.jsx': { sx: 4 },
  'pages/Invoices.jsx': { sx: 2 },
  'pages/Login.jsx': { sx: 4 },
  'pages/Payments.jsx': { sx: 2 },
  'pages/Products.jsx': { sx: 0 },
  'pages/Reports.jsx': { sx: 3 },
  'pages/Shipments.jsx': { sx: 3 },
  'pages/Users.jsx': { sx: 0 },
  'theme/ThemeConfig.jsx': { sx: 0 },
};

// Check 2: Content scan on source files (.jsx, .js)
sourceFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(clientSrcDir, file).replace(/\\/g, '/');

  let sxCount = 0;
  // Check for heavy sx={{ prop
  // We extract all sx={...} blocks and analyze them
  const sxRegex = /sx\s*=\s*\{/g;
  let match;
  while ((match = sxRegex.exec(content)) !== null) {
    const startIdx = match.index;
    let braceCount = 0;
    let endIdx = -1;
    let colons = 0;
    
    for (let i = startIdx; i < content.length; i++) {
      if (content[i] === '{') {
        braceCount++;
      } else if (content[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIdx = i;
          break;
        }
      } else if (content[i] === ':' && braceCount === 2) {
        colons++;
      }
    }
    
    if (endIdx !== -1) {
      const blockText = content.substring(startIdx, endIdx + 1);
      const linesInBlock = blockText.split('\n').length;
      
      if (colons > 4 || linesInBlock > 5) {
        sxCount++;
        const baselineLimit = BASELINE[relPath] ? BASELINE[relPath].sx : 0;
        if (sxCount > baselineLimit) {
          const startLineNum = content.substring(0, startIdx).split('\n').length;
          addViolation(
            file,
            startLineNum,
            'Heavy sx Prop',
            `Heavy sx={{...}} usage detected (${colons} attributes, ${linesInBlock} lines). Limit is ${baselineLimit}. Move styles to CSS.`,
            blockText
          );
        }
      }
    }
  }

  // Scan line-by-line for other issues
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    // Inline DOM styles are forbidden, both as JSX props and nested prop objects.
    if (/\bstyle\s*(?:=|:)/.test(trimmed)) {
      addViolation(
        file,
        lineNum,
        'Inline style',
        'Inline style usage is not allowed. Move the rule to the component stylesheet.',
        trimmed
      );
    }

    // Hardcoded old identity
    const lowerTrimmed = trimmed.toLowerCase();
    if (lowerTrimmed.includes('hamza') || lowerTrimmed.includes('printing_press') || trimmed.includes('مطبعة') || trimmed.includes('حمزة')) {
      // Exclude comments, import statements, and testing mocks
      if (!trimmed.includes('import') && !trimmed.includes('test_prices_') && !trimmed.includes('test_notif_')) {
        addViolation(file, lineNum, 'Legacy Identity', 'Found references to legacy identity ("hamza", "printing_press"). Use modern names.', trimmed);
      }
    }

    // Hardcoded currency other than EGP (using word boundaries and non-template dollar matching)
    if (/\b(?:JOD|JD|USD|EUR|د\.أ|دينار)\b|\$(?!\{)/i.test(trimmed)) {
      if (!trimmed.includes('import') && !trimmed.includes('currencyRegex') && !trimmed.includes('//')) {
        addViolation(file, lineNum, 'Legacy Currency', 'Found hardcoded non-EGP currency. Only EGP is allowed.', trimmed);
      }
    }

    // Direct ISO date display rendering in user-facing JSX
    if (trimmed.includes('.toISOString()') || trimmed.includes('.split(\'T\')[0]') || trimmed.includes('.toLocaleDateString()')) {
      // Allow ISO format mapping for date inputs initial state or max/min attributes
      const isInputAttr = trimmed.includes('value=') || trimmed.includes('defaultValue=') || trimmed.includes('min=') ||
                          trimmed.includes('max=') || trimmed.includes('onChange=') || trimmed.includes('useState(') ||
                          trimmed.includes('setPayFormDate(') || trimmed.includes('setFormDate(') || trimmed.includes('setRcDate(') ||
                          trimmed.includes('const ') || trimmed.includes('let ') || trimmed.includes(' = ') ||
                          trimmed.includes('return new Date()') || trimmed.includes('new Date()');
      if (!isInputAttr && !trimmed.includes('//') && !file.endsWith('formatters.js')) {
        addViolation(file, lineNum, 'Direct Date Display', 'Do not render ISO date display strings directly in JSX. Use formatEgyptDate / formatEgyptDateTime helpers.', trimmed);
      }
    }

    // textAlign: 'left' / text-align: left outside CSS files
    if (trimmed.includes("textAlign: 'left'") || trimmed.includes("text-align: left") || trimmed.includes("align: 'left'") || trimmed.includes('align="left"')) {
      // Allow alignment overrides for numeric LTR alignment if class is mentioned, or specific table header defaults
      const hasLtrSafe = trimmed.includes('ltr-value') || trimmed.includes('numeric') || trimmed.includes('id') ||
                         trimmed.includes('amount') || trimmed.includes('quantity') || trimmed.includes('phone') ||
                         trimmed.includes('value=') || trimmed.includes("direction: 'ltr'") || trimmed.includes('direction: "ltr"');
      if (!hasLtrSafe && !trimmed.includes('//')) {
        addViolation(file, lineNum, 'Left Alignment', 'Prefer right alignment or auto RTL classes. Use .ltr-value only for technical numbers.', trimmed);
      }
    }
  });
});

// Check 3: CSS Files check
let totalImportantCount = 0;
const CSS_BASELINE_LIMIT = 0;

allFiles.filter(f => f.endsWith('.css')).forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const importantMatches = content.match(/!important/g);
  if (importantMatches) {
    totalImportantCount += importantMatches.length;
  }
});

if (totalImportantCount > CSS_BASELINE_LIMIT) {
  violations.push({
    file: 'Global CSS Check',
    line: 0,
    checkType: 'CSS Quality Gate',
    message: `Total !important count exceeded the baseline limit of ${CSS_BASELINE_LIMIT} (found ${totalImportantCount}). Do not add new !important rules.`,
    snippet: ''
  });
}

// Output Results
console.log('--- Style & Layout Quality Gate ---');
if (violations.length === 0) {
  console.log('✅ Success: All style/design quality gate checks passed!');
  process.exit(0);
} else {
  console.error(`❌ Failure: Found ${violations.length} style quality gate violations:\n`);
  violations.forEach(v => {
    const lineStr = v.line > 0 ? `L${v.line}` : 'File-level';
    console.error(`[${v.checkType}] at ${v.file}:${lineStr}`);
    console.error(`  Message: ${v.message}`);
    if (v.snippet) {
      console.error(`  Code:    ${v.snippet}`);
    }
    console.error();
  });
  process.exit(1);
}
