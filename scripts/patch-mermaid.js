const fs = require('fs');
const path = require('path');

const targetFiles = [
  'node_modules/mermaid/dist/mermaid.js',
  'node_modules/mermaid/dist/chunks/mermaid.esm/chunk-ROCK7MPB.mjs',
  'node_modules/mermaid/dist/chunks/mermaid.esm/diagram-AIXSHS4Z.mjs',
  'node_modules/mermaid/dist/chunks/mermaid.esm/classDiagram-v2-VIXIN2NZ.mjs',
  'node_modules/mermaid/dist/chunks/mermaid.esm/stateDiagram-v2-JL6P27WA.mjs',
  'node_modules/mermaid/dist/chunks/mermaid.core/diagram-3B7GL73J.mjs',
  'node_modules/mermaid/dist/chunks/mermaid.core/classDiagram-v2-L25IHNXF.mjs',
  'node_modules/mermaid/dist/chunks/mermaid.core/chunk-QB3YPZ4I.mjs',
  'node_modules/mermaid/dist/chunks/mermaid.core/stateDiagram-v2-FJ4FJNEA.mjs'
];

targetFiles.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
      'tooltipElem.transition().duration(200).style("opacity", ".9")',
      '(tooltipElem.transition ? tooltipElem.transition().duration(200) : tooltipElem).style("opacity", ".9")'
    ).replace(
      'tooltipElem.transition().duration(500).style("opacity", 0)',
      '(tooltipElem.transition ? tooltipElem.transition().duration(500) : tooltipElem).style("opacity", 0)'
    );
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

const chunkHF = path.resolve(__dirname, '../node_modules/mermaid/dist/chunks/mermaid.core/chunk-HFQBQIA3.mjs');
if (fs.existsSync(chunkHF)) {
  let content = fs.readFileSync(chunkHF, 'utf8');
  if (content.includes('return tooltipElem;') && !content.includes('if (!tooltipElem.transition)')) {
    content = content.replace(
      'return tooltipElem;',
      'if (!tooltipElem.transition) { tooltipElem.transition = function() { return { duration: () => this, style: (k,v) => tooltipElem.style(k,v), text: (t) => tooltipElem.text(t), html: (h) => tooltipElem.html(h) }; }; }\n  return tooltipElem;'
    );
    fs.writeFileSync(chunkHF, content, 'utf8');
  }
}

console.log('✅ Mermaid tooltip transition safety patches applied successfully.');
