#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const outDir = path.resolve(__dirname, 'dist');

const files = [
  'index.html',
  'privacy.html',
  'terms.html',
  'contact.html',
];

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const srcPath = path.join(srcDir, file);
  let html = fs.readFileSync(srcPath, 'utf8');

  html = html.replace(
    /<script type="text\/babel" src="([^"]+)"><\/script>/g,
    (_, src) => {
      const jsxPath = path.resolve(srcDir, src);
      const content = fs.readFileSync(jsxPath, 'utf8');
      return `<script type="text/babel">\n${content}\n</script>`;
    },
  );

  const outPath = path.join(outDir, file);
  fs.writeFileSync(outPath, html);
  console.log(`Built: ${outPath}`);
}
