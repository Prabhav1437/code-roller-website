const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.git') && !dirFile.includes('dist')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.html')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(__dirname);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<script src="/src/polyfills.js"></script>')) {
        content = content.replace('<script src="/src/polyfills.js"></script>', '<script type="module" src="/src/polyfills.js"></script>');
        fs.writeFileSync(file, content);
        console.log(`Fixed polyfills script tag in ${file}`);
    }
});
