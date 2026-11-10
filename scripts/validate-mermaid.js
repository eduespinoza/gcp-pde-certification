const fs = require('fs');
const path = require('path');
const mermaid = require('mermaid').default;

mermaid.initialize({ startOnLoad: false });

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const mdFiles = walk('docs');
console.log('Validating Mermaid in', mdFiles.length, 'markdown files...');

async function validate() {
  let totalDiagrams = 0;
  let errorCount = 0;
  const errors = [];

  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /```mermaid\n([\s\S]*?)```/g;
    let match;
    let index = 0;

    while ((match = regex.exec(content)) !== null) {
      totalDiagrams++;
      index++;
      const code = match[1].trim();
      try {
        await mermaid.parse(code);
      } catch (err) {
        errorCount++;
        errors.push({ file, index, error: err.message || String(err), code });
      }
    }
  }

  console.log(`Tested ${totalDiagrams} diagrams across ${mdFiles.length} files.`);
  if (errorCount > 0) {
    console.log(`❌ Found ${errorCount} diagrams with parse errors:`);
    errors.forEach((e, idx) => {
      console.log(`\n[${idx + 1}] ${e.file} (diagram #${e.index}):`);
      console.log('Error:', e.error);
      console.log('Code:\n' + e.code);
    });
    process.exit(1);
  } else {
    console.log('✅ ALL diagrams parsed successfully with 0 errors!');
  }
}

validate().catch(err => {
  console.error('Validation script error:', err);
  process.exit(1);
});
