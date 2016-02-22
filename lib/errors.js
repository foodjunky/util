'use strict';

var BP = require('bluebird');
var _ = require('lodash');

function error(err, statusCode, errorCode, context) {

  err = err instanceof Error ? err : new Error(err);

  if (statusCode) {
    err.statusCode = statusCode;
  }

  if (errorCode) {
    err.code = errorCode;
  }

  if (context) {
    _.extend(err, context);
  }

  return err;

}

function reject(err, statusCode, errorCode, context) {
  return BP.reject(error(err, statusCode, errorCode, context));
}

module.exports = {
  error: error,
  reject: reject
};
