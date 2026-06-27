const db = require('../../db');
const usersService = require('../users/usersService');
const rolesService = require('../roles/rolesService');
const authService = require('./authService');

describe('Auth & Users Service', () => {
  beforeEach(async () => {
    // Clean up test users between tests
    await db.run('DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE username LIKE "test_%")');
    await db.run('DELETE FROM users WHERE username LIKE "test_%"');
  });

  afterAll((done) => {
    db.db.close(done);
  });

  it('should create a user with a hashed password', async () => {
    const user = await usersService.createUser({
      username: 'test_john',
      password: 'secretPassword123',
      fullName: 'John Doe'
    });

    expect(user.id).toBeDefined();
    expect(user.username).toBe('test_john');

    const dbUser = await usersService.findByUsername('test_john');
    expect(dbUser.password_hash).not.toBe('secretPassword123'); // must be hashed
    expect(dbUser.password_hash.startsWith('$2b$')).toBe(true); // bcrypt signature
  });

  it('should authenticate a user with correct credentials', async () => {
    await usersService.createUser({
      username: 'test_alice',
      password: 'passwordAlice',
      fullName: 'Alice Smith'
    });

    const user = await authService.authenticate('test_alice', 'passwordAlice');
    expect(user).not.toBeNull();
    expect(user.username).toBe('test_alice');
    expect(user.full_name).toBe('Alice Smith');
    expect(user.password_hash).toBeUndefined(); // should not return password hash
  });

  it('should reject wrong credentials', async () => {
    await usersService.createUser({
      username: 'test_bob',
      password: 'passwordBob',
      fullName: 'Bob Builder'
    });

    const success = await authService.authenticate('test_bob', 'wrongPassword');
    expect(success).toBeNull();
  });

  it('should prevent deactivated users from logging in', async () => {
    await usersService.createUser({
      username: 'test_deactivated',
      password: 'passwordSec',
      fullName: 'Deactivated User',
      status: 'disabled'
    });

    await expect(authService.authenticate('test_deactivated', 'passwordSec'))
      .rejects
      .toThrow('Account is deactivated');
  });

  it('should compile and compile permissions for super_admin bypass and normal users', async () => {
    // 1. Create a test user
    const alice = await usersService.createUser({
      username: 'test_perm_alice',
      password: 'passwordAlice',
      fullName: 'Perm Alice'
    });

    // 2. Fetch role IDs
    const roles = await rolesService.getAllRoles();
    const superAdminRole = roles.find(r => r.name === 'super_admin');
    const accountantRole = roles.find(r => r.name === 'accountant');

    // 3. Assign accountant role to Alice
    await usersService.assignRole(alice.id, accountantRole.id);

    // 4. Retrieve and verify permissions
    const permissions = await usersService.getUserPermissions(alice.id);
    expect(permissions).toContain('invoices.view');
    expect(permissions).toContain('payments.view');
    expect(permissions).not.toContain('users.create'); // Accountant shouldn't have users.create

    // 5. Assign super_admin role to Alice and verify bypass gets all permissions
    await usersService.assignRole(alice.id, superAdminRole.id);
    const superPermissions = await usersService.getUserPermissions(alice.id);
    expect(superPermissions).toContain('users.create'); // Now should have everything
  });
});
