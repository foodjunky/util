'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function error(err, statusCode, errorCode, context) {

  err = err instanceof Error ? err : new Error(err);

  if (statusCode) {
    err.statusCode = statusCode;
  }

  if (errorCode) {
    err.code = errorCode;
  }

  if (context) {
    _lodash2['default'].extend(err, context);
  }

  return err;
}

function reject(err, statusCode, errorCode, context) {
  return _q2['default'].reject(error(err, statusCode, errorCode, context));
}

exports['default'] = {
  error: error,
  reject: reject
};
module.exports = exports['default'];
//# sourceMappingURL=errors.js.map
