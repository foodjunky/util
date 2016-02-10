'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function hashBuffer(secret, salt) {
  return new Buffer(_crypto2['default'].createHash('sha256').update(secret, 'utf8').update(salt).digest('binary'));
}

function encrypt(value, algorithm, key) {
  var cipher = _crypto2['default'].createCipher(algorithm, key);
  var encrypted = cipher.update(value, 'utf8', 'hex');
  return encrypted + cipher.final('hex');
}

function decrypt(value, algorithm, key) {
  var decipher = _crypto2['default'].createDecipher(algorithm, key);
  var decrypted = decipher.update(value, 'hex', 'utf8');
  return decrypted + decipher.final('utf8');
}

exports['default'] = {
  hashBuffer: hashBuffer,
  encrypt: encrypt,
  decrypt: decrypt
};
module.exports = exports['default'];
//# sourceMappingURL=crypto.js.map
