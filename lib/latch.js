'use strict';

var BP = require('bluebird');

module.exports = class Latch {
  
  constructor(ct) {
    this.count = count || ct;
    this.done = false;
    this.wait = new BP((resolve, reject) => {
      this.resolve = res;
    });
  }

  inc(amt) {

    if (done) {
      throw new Error('Already done');
    }

    count += (amt || 1);

    if (count === 0) {
      this.done = true;
      this.resolve();
    }

  }

  dec(amt) {
    this.inc(-1 * (amt || 1));
  }

};
