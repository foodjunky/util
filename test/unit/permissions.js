'use strict';

var perms = require('../../lib/permissions');

describe('User permission actions', function () {
    
  it('test explicit permission', function () {
    var role = {
      name: 'Test Role',
      permissions: [
        { app: 'MODULE', type: 'TYPE', action: 'READ', instance: 'INSTANCE' }
      ]
    };
    assert(perms.role(role, 'MODULE::TYPE::READ::INSTANCE'), 'permission denied');
    assert(!perms.role(role, 'MODULE::TYPE::READ::INSTANCE2'), 'permission approved');
    assert(!perms.role(role, 'MODULE::TYPE::*'), 'permission approved');
  });

  it('test wildcard permission', function () {
    var role = {
      name: 'Test Role',
      permissions: [
        { app: 'MODULE', type: 'TYPE' }
      ]
    };
    assert(perms.role(role, 'MODULE::TYPE::READ::INSTANCE'), 'permission denied');
    assert(perms.role(role, 'MODULE::TYPE::READ::INSTANCE2'), 'permission denied');
    assert(perms.role(role, 'MODULE::TYPE'), 'permission denied');
    assert(!perms.role(role, 'MODULE::TYPE2::*'), 'permission approved');
  });

  it('test multi permissions', function () {
    var role = {
      name: 'Test Role',
      permissions: [
        { app: 'MODULE', type: 'TYPE' },
        { app: 'MODULE', type: 'TYPE2', action: 'READ', instance: 'INSTANCE' }
      ]
    };
    assert(perms.role(role, 'MODULE::TYPE::READ::INSTANCE'), 'permission denied');
    assert(perms.role(role, 'MODULE::TYPE::READ::INSTANCE2'), 'permission denied');
    assert(perms.role(role, 'MODULE::TYPE'), 'permission denied');
    assert(perms.role(role, 'MODULE::TYPE2::READ::INSTANCE'), 'permission approved');
    assert(!perms.role(role, 'MODULE::TYPE2::*'), 'permission approved');
  });

  it('check user permissions populated', function() {
    var user = {
      username: 'test',
      email: 'test@example.com',
      roles: [ {
        name: 'Test Role',
        permissions: [
          { app: 'MODULE', type: 'TYPE' }
        ]
      } ]
    };
    return perms.user(user, 'MODULE::TYPE');
  });

  it('check user permissions unpopulated', function() {
    var user = {
      username: 'test',
      email: 'test@example.com',
      roles: [ 'id' ]
    };
    return perms.user(user, 'MODULE::TYPE').then(function() {
      assert.fail('Permit should fail');
    }).catch(function(err) { });
  });

});
