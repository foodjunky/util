'use strict';

var _ = require('lodash');

function _isBuiltIn(value) {
  return typeof(value) !== 'object' || value instanceof Date;
}

function plain(object, forceCopy) {

  if (object) {

    if (Array.isArray(object)) {
      return object.map(plain);
    }

    if (object.toObject) {
      return object.toObject();
    }

    if (forceCopy) {
      return _.cloneDeep(object);
    }

  }

  return object;

}

function extendResult(target, src, deep, seen) {

  deep = typeof deep === 'undefined' ? true : deep;
  seen = seen || [];

  // Convert from mongoose model to plain object
  src = plain(src);

  var circular = seen.indexOf(src) > -1;
  seen.push(src);

  var changed = false;

  for (var k in src) {
    if (src.hasOwnProperty(k)) {
      if (deep && target[k]) {
        if (_.isArray(src[k]) && _.isArray(target[k])) {

          let i = 0;
          let sl = src[k].length;

          for (i; i < target[k].length; i++) {
            if (sl > i) {
              if (_.isObject(src[k]) && _.isObject(target[k][i]) && !_isBuiltIn(src[k][i])) {
                changed = extendResult(target[k][i], src[k][i], deep, seen) || changed;
              } else {
                //target[k][i] = src[k][i];
                target[k].splice(i, 1, src[k][i]);
              }
            } else {
              target[k].splice(i, target[k].length);
              break;
            }
          }

          if (sl > i) {
            for (i; i < sl; i++) {
              target[k].push(src[k][i]);
            }
          }

          // Mutate original array
          //target[k].splice(0);
          //src[k].forEach(v => target[k].push(v));

        } else if (!circular && _.isObject(src[k]) && _.isObject(target[k]) && !_isBuiltIn(src[k])) {
          // Extend sub object
          changed = extendResult(target[k], src[k], deep, seen) || changed;
        } else if (target[k] !== src[k]) {
          // Set (replace) value
          target[k] = src[k];
          changed = true;
        }
      } else {
        if (!_.isEqual(src[k], target[k])) {
          // Set (replace) value
          target[k] = src[k];
          changed = true;
        }
      }
    }
  }

  return changed;

}

function extend(target, src, deep) {
  extendResult(target, src, deep);
  return target;
}

extend.result = extendResult;

function leftCompare(left, right) {

  if (!left || !_.isPlainObject(left)) {
    return equal(left, right);
  }

  if (!right) {
    return false;
  }

  var match = true;

  _.forOwn(left, function(v, k) {

    var t = right[k] || _.get(right, k);

    if (_.isPlainObject(v) || _.isArray(v)) {
      if (!leftCompare(v, t)) {
        match = false;
      }
    } else {
      if (!equal(v, t)) {
        match = false;
      }
    }

  });

  return match;

}

function equal(left, right) {

  if (!_.isEqual(left, right)) {

    // Special case, null and undefined treated equally
    if ((left === null || left === undefined) && (right === null || right === undefined)) {
      return true;
    }

    return false;

  }

  return true;

}

// Flatten a plain JS object tree into a single-level dotted-path object
function flatten(obj, prefix, value, ignore) {
  value = value || obj;
  _.forOwn(value, function(v, k) {
    if (!ignore || !ignore.test(k)) {
      if (_.isPlainObject(v)) {
        flatten(obj, (prefix || '') + k + '.', v);
        delete value[k];
      } else if (prefix) {
        obj[prefix + k] = v;
      }
    }
  });
  return obj;
}

module.exports = {
  extend: extend,
  merge: extend,
  plain: plain,
  flatten: flatten,
  leftCompare: leftCompare
};
