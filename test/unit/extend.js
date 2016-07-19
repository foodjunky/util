'use strict';

var safeExtend = require('../../lib/object').extend;

describe('Safe extend', function() {

  it('flat/flat, shallow extend', function() {
    var result = safeExtend({ a: 1, b: 2 }, { a: 1, c: 3 }, false);
    assert.deepEqual(result, { a: 1, b: 2, c: 3 });
  });

  it('flat/flat, shallow extend', function() {
    var result = safeExtend({ a: 1, b: 2 }, { a: 1, c: 3 }, false);
    assert.deepEqual(result, { a: 1, b: 2, c: 3 });
  });

  it('flat/deep, shallow extend', function() {
    var result = safeExtend({ a: 1, b: 2 }, { a: 1, c: { d: 3 } }, false);
    assert.deepEqual(result, { a: 1, b: 2, c: { d: 3 } });
    result = safeExtend({ a: 1, b: 2, c: 3 }, { a: 1, c: { d: 3 } }, false);
    assert.deepEqual(result, { a: 1, b: 2, c: { d: 3 } });
  });

  it('deep/deep, shallow extend', function() {
    var result = safeExtend({ a: 1, b: 2, e: { f: 4 } }, { a: 1, c: { d: 3 } }, false);
    assert.deepEqual(result, { a: 1, b: 2, c: { d: 3 }, e: { f: 4 } });
    result = safeExtend({ a: 1, b: 2, c: { g: 4 }, e: { f: 4 } }, { a: 1, c: { d: 3 } }, false);
    assert.deepEqual(result, { a: 1, b: 2, c: { d: 3 }, e: { f: 4 } });
  });

  it('deep/flat, shallow extend', function() {
    var result = safeExtend({ a: 1, b: { d: 2 } }, { a: 1, c: 3 }, false);
    assert.deepEqual(result, { a: 1, b: { d: 2 }, c: 3 });
    result = safeExtend({ a: 1, b: { d: 2 }, c: { e: 4 } }, { a: 1, c: 3 }, false);
    assert.deepEqual(result, { a: 1, b: { d: 2 }, c: 3 });
  });

  it('flat/flat, deep extend', function() {
    var result = safeExtend({ a: 1, b: 2 }, { a: 1, c: 3 }, true);
    assert.deepEqual(result, { a: 1, b: 2, c: 3 });
  });

  it('flat/deep, deep extend', function() {
    var result = safeExtend({ a: 1, b: 2 }, { a: 1, c: { d: 3 } }, true);
    assert.deepEqual(result, { a: 1, b: 2, c: { d: 3 } });
    result = safeExtend({ a: 1, b: 2, c: 3 }, { a: 1, c: { d: 3 } }, true);
    assert.deepEqual(result, { a: 1, b: 2, c: { d: 3 } });
  });

  it('deep/deep, deep extend', function() {
    var result = safeExtend({ a: 1, b: 2, e: { f: 4 } }, { a: 1, c: { d: 3 } }, true);
    assert.deepEqual(result, { a: 1, b: 2, c: { d: 3 }, e: { f: 4 } });
    result = safeExtend({ a: 1, b: 2, c: { g: 4 }, e: { f: 4 } }, { a: 1, c: { d: 3 } }, true);
    assert.deepEqual(result, { a: 1, b: 2, c: { d: 3, g: 4 }, e: { f: 4 } });
  });

  it('deep/flat, deep extend', function() {
    var result = safeExtend({ a: 1, b: { d: 2 } }, { a: 1, c: 3 }, true);
    assert.deepEqual(result, { a: 1, b: { d: 2 }, c: 3 });
    result = safeExtend({ a: 1, b: { d: 2 }, c: { e: 4 } }, { a: 1, c: 3 }, true);
    assert.deepEqual(result, { a: 1, b: { d: 2 }, c: 3 });
  });

  it('circular extend', function() {

    var src = { a: 1 };
    src.b = src;

    var target = { a: 1 };
    target.b = target;

    var result = safeExtend(target, src, true);

  });

  it('ignore equal properties to prevent setter calls', function() {

    var av = 1;
    var amod = false;

    var bv = 2;
    var bmod = false;

    var target = {
      set a(v) {
        av = v;
        amod = true;
      },
      get a() {
        return av;
      },
      set b(v) {
        bv = v;
        bmod = true;
      },
      get b() {
        return bv;
      }
    };

    var result = safeExtend(target, { a: 1, b: 3 }, true);
    assert.deepEqual(result, { a: 1, b: 3 });
    assert(!amod, 'a was modified');
    assert(bmod, 'b was not modified');

    av = 1;
    amod = false;

    bv = { c: 3 };
    bmod = false;

    result = safeExtend(target, { a: 2, b: { c: 3 } }, true);
    assert.deepEqual(result, { a: 2, b: { c: 3 } });
    assert(amod, 'a was not modified');
    assert(!bmod, 'b was modified');

    av = 1;
    amod = false;

    var cv = 3;
    var cmod = false;

    bv = {
      set c(v) {
        cv = v;
        cmod = true;
      },
      get c() {
        return cv;
      }
    };

    bmod = false;

    result = safeExtend(target, { a: 1, b: { c: 4 } }, true);
    assert.deepEqual(result, { a: 1, b: { c: 4 } });
    assert(!amod, 'a was modified');
    assert(!bmod, 'b was modified');
    assert(cmod, 'b was not modified');

  });

  it('extend result', function() {
    assert(safeExtend.result({ a: 1, b: 2 }, { a: 1, c: 3 }), 'no properties changed');
    assert(!safeExtend.result({ a: 1, b: 2 }, { a: 1, b: 2 }), 'properties changed');
  });

});
