'use strict';

var _ = require('lodash');

var Cache = require('../../lib/cache');

describe('Cache', function() {

  describe('get miss', function() {

    var cache;
    var result;

    beforeEach(function() {
      cache = new Cache();
      result = cache.get('xxx');
    });

    it('returns null', function() {
      expect(result).to.equal(null);
    });

    it('increments attempt stats', function() {
      expect(cache.stats.attempts).to.equal(1);
    });

    it('does not increment hit stats', function() {
      expect(cache.stats.hits).to.equal(0);
    });


  });
  
  describe('put', function() {

    var cache;
    var result;

    beforeEach(function() {
      cache = new Cache();
      result = cache.put('xxx', 'value');
    });

    it('adds to cache', function() {
      expect(cache.cache['xxx']).to.deep.equal({expires: 0, value: 'value'});
    });

    it('returns passed value', function() {
      expect(result).to.equal('value');
    });

  });

  describe('get hit', function() {

    var cache;
    var result;

    beforeEach(function() {
      cache = new Cache();
      cache.put('xxx', 'value');
      result = cache.get('xxx');
    });

    it('returns value', function() {
      expect(result).to.equal('value');
    });

    it('increments attempt stats', function() {
      expect(cache.stats.attempts).to.equal(1);
    });

    it('increments hit stats', function() {
      expect(cache.stats.hits).to.equal(1);
    });

  });

  describe('put with default TTL', function() {

    var cache;
    var result;

    var now;
    var clock;

    beforeEach(function() {

      now = Date.now();
      clock = sinon.useFakeTimers(now);

      cache = new Cache(100);
      cache.put('xxx', 'value');

      clock.tick(50);

    });

    afterEach(function() {
      clock.restore();
    });

    it('adds to cache with expiration', function() {
      expect(cache.cache['xxx']).to.deep.equal({expires: now + 100, value: 'value'});
    });

    it('get hits within expiration', function() {
      expect(cache.get('xxx')).to.equal('value');
    });

    it('get misses after expiration', function() {
      clock.tick(51);
      expect(cache.get('xxx')).to.equal(null);
    });

  });

  describe('put with manual TTL', function() {

    var cache;
    var result;

    var now;
    var clock;

    beforeEach(function() {

      now = Date.now();
      clock = sinon.useFakeTimers(now);

      cache = new Cache();
      cache.put('xxx', 'value', 100);

      clock.tick(50);

    });

    afterEach(function() {
      clock.restore();
    });

    it('adds to cache with expiration', function() {
      expect(cache.cache['xxx']).to.deep.equal({expires: now + 100, value: 'value'});
    });

    it('overrides default cache TTL', function() {
      clock.restore();
      now = Date.now();
      clock = sinon.useFakeTimers(now);
      cache = new Cache(100);
      cache.put('xxx', 'value', 200);
      expect(cache.cache['xxx']).to.deep.equal({expires: now + 200, value: 'value'});
    });

    it('get hits within expiration', function() {
      expect(cache.get('xxx')).to.equal('value');
    });

    it('get misses after expiration', function() {
      clock.tick(51);
      expect(cache.get('xxx')).to.equal(null);
    });

  });

  describe('remove', function() {

    var cache;

    beforeEach(function() {
      cache = new Cache();
      cache.put('xxx', 'value');
    });

    it('returns undefined for invalid entry', function() {
      expect(cache.remove('yyy')).to.equal(undefined);
    });

    it('returns entry for valid entry', function() {
      expect(cache.remove('xxx')).to.equal('value');
    });

    it('removes entry from cache', function() {
      cache.remove('xxx');
      expect(cache.cache['xxx']).to.equal(undefined);
    });

  });

  describe('flush', function() {

    var cache;

    beforeEach(function() {

      cache = new Cache();

      cache.put('xxx', 'value');
      cache.put('yyy', 'value');
      cache.get('xxx');
      cache.get('xxx');
      cache.get('yyy');
      cache.get('zzz');

      expect(cache.stats.attempts).to.equal(4);
      expect(cache.stats.hits).to.equal(3);
      expect(_.keys(cache.cache)).to.have.length(2);

      cache.flush();

    });

    it('clears cache', function() {
      expect(_.keys(cache.cache)).to.have.length(0);
    });

    it('clears statistics', function() {
      expect(cache.stats.attempts).to.equal(0);
      expect(cache.stats.hits).to.equal(0);
    });

  });

});
