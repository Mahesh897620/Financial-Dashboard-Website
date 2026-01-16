const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom');

// Load the HTML file before each test
beforeEach(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  document.documentElement.innerHTML = html;
});
