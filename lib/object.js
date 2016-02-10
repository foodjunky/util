'use strict';

import _ from 'lodash';

function extendResult(target, src, deep) {

  deep = typeof deep === 'undefined' ? true : deep;

  var changed = false;

  for (var k in src) {
    if (src.hasOwnProperty(k)) {
      if (deep && target[k]) {
        if (_.isObject(src[k]) && _.isObject(target[k])) {
          changed = extendResult(target[k], src[k]) || changed;
        } else if (target[k] !== src[k]) {
          target[k] = src[k];
          changed = true;
        }
      } else {
        if (!_.isEqual(src[k], target[k])) {
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
    return left === right;
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
        return false;
      }
    } else {
      if (!_.isEqual(v, t)) {
        // Special case, null and undefined treated equally
        if ((v === null || v === undefined) && (t === null || t === undefined)) {
          return true;
        }
        match = false;
        return false;
      }
    }

  });

  return match;

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

export default {
  extend: extend,
  flatten: flatten,
  leftCompare: leftCompare
};
