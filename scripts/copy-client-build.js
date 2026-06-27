const fs = require('fs');
const path = require('path');

const publicIndex = path.join(__dirname, '../public/index.html');

console.log('--- Verification of Client Build ---');
if (fs.existsSync(publicIndex)) {
  console.log('✅ Client successfully built and output configured to root public/ directory.');
} else {
  console.warn('⚠️ Warning: client/public index.html was not found. Please verify the build step completed successfully.');
}
console.log('------------------------------------');
