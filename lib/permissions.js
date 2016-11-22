'use strict';

var _ = require('lodash');
var BP = require('bluebird');
var errors = require('./errors');

function match(check, allowed) {
  return !allowed || allowed === '*' || !check || check === allowed;
}

function parse(token) {

  if (token.token) {
    token = token.token;
  }

  if (!_.isString(token)) {
    // Already parsed
    return token;
  }

  var f = token.split(/::/);

  return {
    app: f.length > 0 ? f[0].toUpperCase() : undefined,
    type: f.length > 1 ? f[1].toUpperCase() : undefined,
    action: f.length > 2 ? f[2].toUpperCase() : undefined,
    instance: f.length > 3 ? f[3] : undefined
  };

}

function instances(permission, token) {
  var p = parse(token);
  permission = parse(permission);
  if (match(p.app, permission.app) &&
      match(p.type, permission.type) &&
      match(p.action, permission.action)) {
    return permission.instance ? permission.instance : '*';
  }
  return null;
}

function roleInstances(role, token) {

  var ids = (role.permissions || []).reduce(function(accum, permission) {
    var inst = instances(permission, token);
    if (inst) {
      accum.push(inst);
    }
    return accum;
  }, []);

  if (ids.length && ids.indexOf('*') > -1) {
    return ['*'];
  }

  return ids;

}

function userInstances(user, token) {

  var ids = [];

  if (user.roles && user.roles.length) {

    if (_.isString(user.roles[0])) {
      throw new Error('user roles have not been populated');
    }

    ids = user.roles.reduce(function(accum, role) {
      return accum.concat(roleInstances(role, token));
    }, ids);

  }

  if (user.permissions && user.permissions.length) {
    user.permissions.reduce(function(accum, perm) {
      accum.push(instances(perm, token));
      return accum;
    }, ids);
  }

  if (ids.indexOf('*') > -1) {
    return '*';
  }

  if (ids.length) {
    return _.without(_.uniq(ids), null);
  }

  return false;

}

function permit(permission, token) {
  var p = parse(token);
  permission = parse(permission);
  return match(p.app, permission.app) &&
    match(p.type, permission.type) &&
    match(p.action, permission.action) &&
    match(p.instance, permission.instance);
}

function rolePermit(role, token) {
  return (role.permissions || []).some(function(permission) {
    return permit(permission, token);
  });
}

function userPermit(user, token) {

  if (!user) {
    return errors.reject('You do not have permission to perform this action.', 403, 'PERMISSION_DENIED');
  }

  if ((user.roles || []).some(function(r) { return rolePermit(r, token); }) ||
      (user.permissions || []).some(function(p) { return permit(p, token); })) {
    return BP.resolve();
  } else {
    return errors.reject('You do not have permission to perform this action.', 403, 'PERMISSION_DENIED');
  }

}

function userAction(user, permission, action) {
  return userPermit(user, permission).then(function() {
    return action ?
      BP.resolve(action(userInstances(user, permission))) :
      BP.resolve(userInstances(user, permission));
  });
}

module.exports = {
  do: userAction,
  user: userPermit,
  role: rolePermit,
  permission: permit,
  instances: instances,
  parse: parse
};
