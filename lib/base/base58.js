"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeBase58 = decodeBase58;
exports.decodeBase58Check = decodeBase58Check;
exports.encodeBase58 = encodeBase58;
exports.encodeBase58Check = encodeBase58Check;

var _bs = _interopRequireDefault(require("./vendor/bs58"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isNull = _interopRequireDefault(require("lodash/isNull"));

var _hashing = require("./hashing");

var versionBytes = {
  'accountId': 0x00,
  // decimal 0
  'none': 0x01,
  // decimal 1
  'seed': 0x21 // decimal 33

};

function decodeBase58(encoded) {
  return Buffer.from(_bs.default.decode(encoded));
}

function decodeBase58Check(versionByteName, encoded) {
  var decoded = _bs.default.decode(encoded);

  var versionByte = decoded[0];
  var payload = decoded.slice(0, decoded.length - 4);
  var data = payload.slice(1);
  var checksum = decoded.slice(decoded.length - 4);
  var expectedVersion = versionBytes[versionByteName];

  if ((0, _isUndefined.default)(expectedVersion)) {
    throw new Error("".concat(versionByteName, " is not a valid version byte name.  expected one of \"accountId\", \"seed\", or \"none\""));
  }

  if (versionByte !== expectedVersion) {
    throw new Error("invalid version byte.  expected ".concat(expectedVersion, ", got ").concat(versionByte));
  }

  var expectedChecksum = calculateChecksum(payload);

  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error("invalid checksum");
  }

  if (versionByteName === 'accountId' && decoded.length !== 37) {
    throw new Error("Decoded address length is invalid. Expected 37, got ".concat(decoded.length));
  }

  return Buffer.from(data);
}

function encodeBase58(data) {
  if ((0, _isNull.default)(data) || (0, _isUndefined.default)(data)) {
    throw new Error('cannot encode null data');
  }

  return _bs.default.encode(data);
}

function encodeBase58Check(versionByteName, data) {
  if ((0, _isNull.default)(data) || (0, _isUndefined.default)(data)) {
    throw new Error('cannot encode null data');
  }

  var versionByte = versionBytes[versionByteName];

  if ((0, _isUndefined.default)(versionByte)) {
    throw new Error("".concat(versionByteName, " is not a valid version byte name.  expected one of \"accountId\", \"seed\", or \"none\""));
  }

  data = Buffer.from(data);
  var versionBuffer = Buffer.from([versionByte]);
  var payload = Buffer.concat([versionBuffer, data]);
  var checksum = calculateChecksum(payload);
  var unencoded = Buffer.concat([payload, checksum]);
  return encodeBase58(unencoded);
}

function calculateChecksum(payload) {
  var inner = (0, _hashing.hash)(payload);
  var outer = (0, _hashing.hash)(inner);
  return outer.slice(0, 4);
}

function verifyChecksum(expected, actual) {
  if (expected.length !== actual.length) {
    return false;
  }

  if (expected.length === 0) {
    return true;
  }

  for (var i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      return false;
    }
  }

  return true;
}