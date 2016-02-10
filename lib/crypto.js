'use strict';

import crypto from 'crypto';

function hashBuffer(secret, salt) {
  return new Buffer(crypto.createHash('sha256').update(secret, 'utf8').update(salt).digest('binary'));
}

export default {
  hashBuffer: hashBuffer
};
