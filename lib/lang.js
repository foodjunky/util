'use strict';

import _ from 'lodash';
import fs from 'fs';
import BP from 'bluebird';

function bind(fn, ctx) {
  return function() {
    return fn.apply(ctx, arguments);
  };
}

// Bind a list of methods to the source object for easy callback chaining
function bindAll(obj, methods) {

  if (!methods) {
    methods = _.functions(obj);
  } else if (!_.isArray(methods)) {
    methods = [methods];
  }

  methods.forEach(function(m) {
    var current = obj[m];
    if (current) {
      obj[m] = bind(obj[m], obj);
      obj[m].restore = function() {
        obj[m] = current;
      };
    }
  });

}

/*
 * Include all server startup / configuration snippets.
 *
 * Each include should return function(app, config, services) and may return
 * a value or Promise. Includes will be loaded in filename sort order, and
 * are guaranteed to be loaded consecutively rather than concurrently even
 * if they return a Promise.
 */

function requireAll() {

  if (!arguments.length) {
    throw new Error('No directory specified');
  }

  var directory = arguments[0];
  var args = [];

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var results = {};

  return BP.promisify(fs.readdir)(directory).then(function(files) {

    return files
      .sort(function(a, b) {
        return a < b ? -1 : 1;
      })
      .reduce(function (p, f) {
        if (f && f !== 'index.js' && f[0] !== '.' && f.indexOf('.js') === f.length - 3) {
          return p.then(function() {
            return BP.resolve(require(directory + '/' + f).apply(null, args)).then(function(result) {
              results[f.substring(0, f.indexOf('.js'))] = result;
            });
          });
        }
        return p;
      }, BP.resolve());

  }).then(function() {
    return results;
  });

}

export default {
  requireAll: requireAll,
  bind: bind,
  bindAll: bindAll
};
