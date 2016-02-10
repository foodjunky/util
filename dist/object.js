'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function extendResult(target, src, deep) {

  deep = typeof deep === 'undefined' ? true : deep;

  var changed = false;

  for (var k in src) {
    if (src.hasOwnProperty(k)) {
      if (deep && target[k]) {
        if (_lodash2['default'].isObject(src[k]) && _lodash2['default'].isObject(target[k])) {
          changed = extendResult(target[k], src[k]) || changed;
        } else if (target[k] !== src[k]) {
          target[k] = src[k];
          changed = true;
        }
      } else {
        if (!_lodash2['default'].isEqual(src[k], target[k])) {
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

  if (!left || !_lodash2['default'].isPlainObject(left)) {
    return left === right;
  }

  if (!right) {
    return false;
  }

  var match = true;

  _lodash2['default'].forOwn(left, function (v, k) {

    var t = right[k] || _lodash2['default'].get(right, k);

    if (_lodash2['default'].isPlainObject(v) || _lodash2['default'].isArray(v)) {
      if (!leftCompare(v, t)) {
        match = false;
        return false;
      }
    } else {
      if (!_lodash2['default'].isEqual(v, t)) {
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
  _lodash2['default'].forOwn(value, function (v, k) {
    if (!ignore || !ignore.test(k)) {
      if (_lodash2['default'].isPlainObject(v)) {
        flatten(obj, (prefix || '') + k + '.', v);
        delete value[k];
      } else if (prefix) {
        obj[prefix + k] = v;
      }
    }
  });
  return obj;
}

exports['default'] = {
  extend: extend,
  flatten: flatten,
  leftCompare: leftCompare
};
module.exports = exports['default'];
//# sourceMappingURL=object.js.map
