"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deriveWalletId = deriveWalletId;
exports.deriveWalletKey = deriveWalletKey;
exports.randomBytes = randomBytes;
exports.encryptData = encryptData;
exports.decryptData = decryptData;
exports.calculateMasterKey = calculateMasterKey;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _lodash = require("lodash");

var _crypto = _interopRequireDefault(require("crypto"));

var _sjclTokend = _interopRequireDefault(require("sjcl-tokend"));

var ivLength = 96 / 8; // bytes

function deriveWalletId(masterKey) {
  return deriveFromKeyFunction('WALLET_ID', masterKey);
}

function deriveWalletKey(masterKey) {
  return deriveFromKeyFunction('WALLET_KEY', masterKey);
}

function deriveFromKeyFunction(token, masterKey) {
  // eslint-disable-next-line new-cap
  var hmac = new _sjclTokend.default.misc.hmac(masterKey, _sjclTokend.default.hash.sha256);
  return hmac.encrypt(token);
}

function randomBytes(length) {
  var buffer = Buffer.alloc(length);

  _crypto.default.randomFillSync(buffer);

  return buffer;
}

function encryptData(data, key) {
  if (!(0, _lodash.isString)(data)) {
    throw new TypeError('data must be a String.');
  }

  var cipherName = 'aes';
  var modeName = 'gcm';
  var cipher = new _sjclTokend.default.cipher[cipherName](key);
  var rawIV = randomBytes(ivLength).toString('hex');

  var encryptedData = _sjclTokend.default.mode[modeName].encrypt(cipher, _sjclTokend.default.codec.utf8String.toBits(data), rawIV);

  data = (0, _stringify.default)({
    IV: _sjclTokend.default.codec.base64.fromBits(rawIV),
    cipherText: _sjclTokend.default.codec.base64.fromBits(encryptedData),
    cipherName: cipherName,
    modeName: modeName
  });
  return base64Encode(data);
}

function decryptData(encryptedData, key) {
  var rawCipherText;
  var rawIV;
  var cipherName;
  var modeName;

  try {
    var resultObject = JSON.parse(base64Decode(encryptedData));
    rawIV = _sjclTokend.default.codec.base64.toBits(resultObject.IV);
    rawCipherText = _sjclTokend.default.codec.base64.toBits(resultObject.cipherText);
    cipherName = resultObject.cipherName;
    modeName = resultObject.modeName;
  } catch (e) {
    throw new Error('Corrupt data.');
  }

  var cipher = new _sjclTokend.default.cipher[cipherName](key);

  var rawData = _sjclTokend.default.mode[modeName].decrypt(cipher, rawCipherText, rawIV);

  return _sjclTokend.default.codec.utf8String.fromBits(rawData);
}

function calculateMasterKey(s0, email, password, kdfParams) {
  if (kdfParams.id === 2) {
    email = email.toLowerCase();
  }

  var versionBits = _sjclTokend.default.codec.hex.toBits('0x01');

  var s0Bits = _sjclTokend.default.codec.base64.toBits(s0);

  var emailBits = _sjclTokend.default.codec.utf8String.toBits(email);

  var unhashedSaltBits = (0, _lodash.reduce)([versionBits, s0Bits, emailBits], _sjclTokend.default.bitArray.concat);

  var salt = _sjclTokend.default.hash.sha256.hash(unhashedSaltBits);

  return _sjclTokend.default.misc.scrypt(password, salt, kdfParams.n, kdfParams.r, kdfParams.p, kdfParams.bits);
}

function base64Encode(str) {
  return Buffer.from(str).toString('base64');
}

function base64Decode(str) {
  return Buffer.from(str, 'base64').toString();
}