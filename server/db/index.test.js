const dbHelper = require('./index');

describe('Database helpers', () => {
  afterAll((done) => {
    dbHelper.db.close(done);
  });

  it('should query seeded roles successfully', async () => {
    const roles = await dbHelper.all('SELECT * FROM roles ORDER BY name ASC');
    expect(roles.length).toBeGreaterThan(0);
    
    const roleNames = roles.map(r => r.name);
    expect(roleNames).toContain('super_admin');
    expect(roleNames).toContain('admin');
    expect(roleNames).toContain('accountant');
  });

  it('should verify the initial admin user was seeded', async () => {
    const adminUser = await dbHelper.get('SELECT * FROM users WHERE username = ?', ['admin']);
    expect(adminUser).toBeDefined();
    expect(adminUser.username).toBe('admin');
    expect(adminUser.status).toBe('active');
  });

  it('should query outlet types successfully', async () => {
    const types = await dbHelper.all('SELECT name FROM outlet_types');
    const names = types.map(t => t.name);
    expect(names).toContain('Wholesale');
    expect(names).toContain('Retail');
  });
});
