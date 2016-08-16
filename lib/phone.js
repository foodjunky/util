'use strict';

var libpn = require('google-libphonenumber');
var PNF = libpn.PhoneNumberFormat;
var phoneUtil = libpn.PhoneNumberUtil.getInstance();

function parse(number, country) {

  var parsed = phoneUtil.parse(number, country || 'US');

  if (!phoneUtil.isValidNumber(parsed)) {
    throw new Error('Invalid phone number: ' + number);
  }

  return parsed;

}

function format(parsed, type) {

  if (!parsed || !phoneUtil.isValidNumber(parsed)) {
    throw new Error('Invalid phone number');
  }

  return phoneUtil.format(parsed, PNF[type || 'E164'])

}

function normalize(number, country, fmt) {
  return format(parse(number, country), fmt);
}

module.exports = {
  parse: parse,
  format: format,
  normalize: normalize
};
