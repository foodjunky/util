/*
 * Generic cache.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Cache = (function () {
  function Cache(ttl) {
    _classCallCheck(this, Cache);

    this.ttl = ttl;
    this.cache = {};
    this.stats = {
      attempts: 0,
      hits: 0
    };
  }

  _createClass(Cache, [{
    key: 'get',
    value: function get(id) {

      if (this.stats.attempts >= Number.MAX_VALUE) {
        // Reset counters so they are in agreement after roll
        this.stats.attempts = 0;
        this.stats.hits = 0;
      }

      this.stats.attempts++;

      var entry = this.cache[id];

      if (entry) {

        var expires = entry.expires;

        if (!expires || expires >= Date.now()) {
          this.stats.hits++;
          return entry.value;
        } else if (expires && expires < Date.now()) {
          this.remove(id);
        }
      }

      return null;
    }
  }, {
    key: 'put',
    value: function put(id, value, ttl) {

      this.cache[id] = {
        expires: ttl || this.ttl ? Date.now() + (ttl || this.ttl) : 0,
        value: value
      };

      return value;
    }
  }, {
    key: 'remove',
    value: function remove(id) {

      var entry = this.cache[id];

      if (entry) {
        delete this.cache[id];
        return entry.value;
      }

      return entry;
    }
  }, {
    key: 'flush',
    value: function flush() {
      this.cache = {};
      this.stats.attempts = 0;
      this.stats.hits = 0;
    }
  }]);

  return Cache;
})();

exports['default'] = Cache;
module.exports = exports['default'];
//# sourceMappingURL=cache.js.map
