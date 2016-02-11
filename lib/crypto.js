'use strict';

var crypto = require('crypto');

function hashBuffer(secret, salt) {
  return new Buffer(crypto.createHash('sha256').update(secret, 'utf8').update(salt).digest('binary'));
}

function encrypt(value, algorithm, key) {
  var cipher = crypto.createCipher(algorithm, key);
  var encrypted = cipher.update(value, 'utf8', 'hex');
  return encrypted + cipher.final('hex');
}

function decrypt(value, algorithm, key) {
  var decipher = crypto.createDecipher(algorithm, key);
  var decrypted = decipher.update(value, 'hex', 'utf8'  );
  return decrypted + decipher.final('utf8');
}

module.exports = {
  hashBuffer: hashBuffer,
  encrypt: encrypt,
  decrypt: decrypt
};
