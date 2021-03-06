'use strict';

var _ = require('lodash');
var fs = require('fs');
var BP = require('bluebird');

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

  return BP.promisify(fs.readdir)(directory)
    .then(function(files) {

      return files.sort((a, b) => a < b ? -1 : 1)
        .reduce((p, f) => {

          if (f && f !== 'index.js' && f[0] !== '.' && (f.endsWith('.js') || f.endsWith('.json'))) {

            return p.then(() => {

              var data = require(directory + '/' + f);

              if (_.isFunction(data)) {
                return BP.resolve(data.apply(null, args))
                  .then(result => {
                    results[f.substring(0, f.lastIndexOf('.js'))] = result;
                  });
              }

              results[f.substring(0, f.lastIndexOf('.js'))] = data;
              return data;

            });

          }

          return p;

        }, BP.resolve());

    })
    .then(() => results);

}

module.exports = {
  requireAll: requireAll,
  bind: bind,
  bindAll: bindAll
};
