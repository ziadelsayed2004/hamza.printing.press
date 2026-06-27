process.env.NODE_ENV = 'test';

const { spawnSync } = require('child_process');
const path = require('path');
const resetDb = require('../server/db/reset');

console.log('--- Test Runner: Bootstrapping Test Database ---');

resetDb()
  .then(() => {
    console.log('--- Test Runner: Database ready. Launching Jest ---');
    
    // Run Jest directly via Node using the local package bin script
    const jestBin = path.resolve(__dirname, '../node_modules/jest/bin/jest.js');
    const result = spawnSync(process.execPath, [jestBin, '--runInBand'], {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    });
    
    console.log(`--- Test Runner: Jest exited with status code: ${result.status} ---`);
    process.exit(result.status || 0);
  })
  .catch((err) => {
    console.error('--- Test Runner: Failed to setup test database ---', err);
    process.exit(1);
  });
