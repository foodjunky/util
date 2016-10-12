'use strict';

var leftCompare = require('../../lib/object').leftCompare;

describe('Left compare', function() {

  it('Left null, right null', function() {
    expect(leftCompare(null, null)).to.equal(true);
  });

  it('Left null, right object', function() {
    expect(leftCompare(null, { field: 'value' })).to.equal(false);
  });

  it('Left object, right null', function() {
    expect(leftCompare({ field: 'value' }, null)).to.equal(false);
  });

  it('Left object, right primitive', function() {
    expect(leftCompare({ field: 'value' }, 5)).to.equal(false);
  });

  it('Left primitive, right object', function() {
    expect(leftCompare(5, { field: 'value' })).to.equal(false);
  });

  it('Primitive matches', function() {
    expect(leftCompare(5, 5)).to.equal(true);
  });

  it('Primitive does not match', function() {
    expect(leftCompare(5, 6)).to.equal(false);
  });

  it('Exact object match', function() {
    expect(leftCompare({ field: 'value' }, { field: 'value' })).to.equal(true);
  });

  it('Left array, right array match', function() {
    expect(leftCompare(['xxx'], ['xxx'])).to.equal(true);
  });

  it('Left array, right array mismatch', function() {
    expect(leftCompare(['xxx'], ['yyy'])).to.equal(false);
  });

  it('Left subset object match', function() {
    expect(leftCompare({ field: 'value' }, { field: 'value', field2: 'value2' })).to.equal(true);
  });

  it('Right object different values', function() {
    expect(leftCompare({ field: 'value', field2: 'value2' }, { field: 'value', field2: 'value3' })).to.equal(false);
  });

  it('Right object missing fields', function() {
    expect(leftCompare({ field: 'value', field2: 'value2' }, { field: 'value' })).to.equal(false);
  });

  it('Expand left long field paths', function() {
    expect(leftCompare({ 'long.field.path': 'value' }, { long: { field: { path: 'value' } } })).to.equal(true);
  });

  it('Don\'t expand exact match paths', function() {
    expect(leftCompare({ 'long.field.path': 'value' }, { 'long.field.path': 'value' })).to.equal(true);
  });

  it('Right object match, not plain object', function() {

    var Right = function() {
      this.field = 'value';
    };

    expect(leftCompare({ field: 'value' }, new Right())).to.equal(true);

  });

});
