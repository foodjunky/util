'use strict';

import Q from 'q';
import _ from 'lodash';

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
  return Q.reject(error(err, statusCode, errorCode, context));
}

export default {
  error: error,
  reject: reject
};
