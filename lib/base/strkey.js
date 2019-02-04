"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeCheck = decodeCheck;
exports.encodeCheck = encodeCheck;

var _base = _interopRequireDefault(require("base32.js"));

var _crc = _interopRequireDefault(require("crc"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isNull = _interopRequireDefault(require("lodash/isNull"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var versionBytes = {
  accountId: 0x30,
  balanceId: 0x08,
  seed: 0x90
};

function decodeCheck(versionByteName, encoded) {
  if (!(0, _isString.default)(encoded)) {
    throw new TypeError('encoded argument must be of type String');
  }

  var decoded = _base.default.decode(encoded);

  var versionByte = decoded[0];
  var payload = decoded.slice(0, -2);
  var data = payload.slice(1);
  var checksum = decoded.slice(-2);

  if (encoded !== _base.default.encode(decoded)) {
    throw new Error('invalid encoded string');
  }

  var expectedVersion = versionBytes[versionByteName];

  if ((0, _isUndefined.default)(expectedVersion)) {
    throw new Error("".concat(versionByteName, " is not a valid version byte name.  expected one of \"accountId\" or \"seed\""));
  }

  if (versionByte !== expectedVersion) {
    throw new Error("invalid version byte. expected ".concat(expectedVersion, ", got ").concat(versionByte));
  }

  var expectedChecksum = calculateChecksum(payload);

  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error("invalid checksum");
  }

  return Buffer.from(data);
}

function encodeCheck(versionByteName, data) {
  if ((0, _isNull.default)(data) || (0, _isUndefined.default)(data)) {
    throw new Error('cannot encode null data');
  }

  var versionByte = versionBytes[versionByteName];

  if ((0, _isUndefined.default)(versionByte)) {
    throw new Error("".concat(versionByteName, " is not a valid version byte name.  expected one of \"accountId\" or \"seed\""));
  }

  data = Buffer.from(data);
  var versionBuffer = Buffer.from([versionByte]);
  var payload = Buffer.concat([versionBuffer, data]);
  var checksum = calculateChecksum(payload);
  var unencoded = Buffer.concat([payload, checksum]);
  return _base.default.encode(unencoded);
}

function calculateChecksum(payload) {
  // This code calculates CRC16-XModem checksum of payload
  // and returns it as Buffer in little-endian order.
  var checksum = Buffer.alloc(2);
  checksum.writeUInt16LE(_crc.default.crc16xmodem(payload), 0);
  return checksum;
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