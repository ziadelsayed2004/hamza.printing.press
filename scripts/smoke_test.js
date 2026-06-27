const app = require('../app');
const config = require('../server/config');

console.log('--- Smoke Test Starting ---');
console.log(`Loaded environment: ${config.env}`);
console.log(`Database Path: ${config.databasePath}`);
console.log(`Session Secret Configured: ${config.sessionSecret ? 'YES' : 'NO'}`);

// Stub request and response to mock /api/health
const req = {};
const res = {
  statusCode: 200,
  json(data) {
    console.log('Response JSON:', JSON.stringify(data, null, 2));
    if (data.status === 'healthy') {
      console.log('✓ Health check endpoint verified successfully!');
      process.exit(0);
    } else {
      console.error('✗ Health check endpoint returned unexpected status:', data.status);
      process.exit(1);
    }
  },
  status(code) {
    this.statusCode = code;
    return this;
  },
  send(msg) {
    console.log(`Response text: ${msg}`);
    process.exit(0);
  }
};

// Retrieve the health check route handler
const healthRoute = app._router.stack.find(s => s.route && s.route.path === '/api/health');

if (!healthRoute) {
  console.error('✗ Failed to find /api/health route in Express app.');
  process.exit(1);
}

console.log('Simulating request to /api/health...');
healthRoute.route.stack[0].handle(req, res);
