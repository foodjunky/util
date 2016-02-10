/*
 * Generic cache.
 */
'use strict';

export default class Cache {
  
  constructor(ttl) {
    this.ttl = ttl;
    this.cache = {};
    this.stats = {
      attempts: 0,
      hits: 0
    };
  }

  get(id) {

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

  put(id, value, ttl) {

    this.cache[id] = {
      expires: (ttl || this.ttl) ? Date.now() + (ttl || this.ttl) : 0,
      value: value
    };

    return value;

  }

  remove(id) {

    var entry = this.cache[id];

    if (entry) {
      delete this.cache[id];
      return entry.value;
    }

    return entry;

  }

  flush() { 
    this.cache = {};
    this.stats.attempts = 0;
    this.stats.hits = 0;
  }

}
