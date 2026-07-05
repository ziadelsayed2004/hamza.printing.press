const config = require('./index');

describe('Config Loader', () => {
  it('should load environment configuration with defaults', () => {
    expect(config.env).toBe('test');
    expect(config.port).toBe(3000);
    expect(config.sessionSecret).toBe('dev-session-secret-key-1234567890');
    expect(config.databasePath.endsWith('database.sqlite') || config.databasePath.endsWith('database_test.sqlite')).toBe(true);
  });
});
