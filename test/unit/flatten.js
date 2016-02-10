'use strict';

var flatten = require('../../lib/object').flatten;

describe('Flatten', function() {

  it('flatten tree', function() {

    var result = flatten({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: 4
        }
      }
    });

    assert.deepEqual(result, {
      'a': 1,
      'b.c': 2,
      'b.d.e': 3,
      'b.d.f': 4
    });

  });

  it('already flattened', function() {

    var result = flatten({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6
    });

    assert.deepEqual(result, {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6
    });

  });

  it('flatten null', function() {
    assert.equal(flatten(null), null);
  });


});
