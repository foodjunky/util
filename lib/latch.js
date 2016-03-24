'use strict';

var BP = require('bluebird');

module.exports = class Latch {
  
  constructor(ct) {
    this.count = ct || 0;
    this.done = false;
    this.wait = new BP((resolve, reject) => {
      this.resolve = resolve;
    });
  }

  inc(amt) {

    if (this.done) {
      throw new Error('Already done');
    }

    this.count += (amt || 1);

    if (this.count === 0) {
      this.done = true;
      this.resolve();
    }

  }

  dec(amt) {
    this.inc(-1 * (amt || 1));
  }

};
