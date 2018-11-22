"use strict";

var _keypair = require("./keypair");

var _strkey = require("./strkey");

var keypair = _keypair.Keypair.master();

var unencodedBuffer = keypair.rawPublicKey();
var unencoded = unencodedBuffer.toString();
var accountIdEncoded = keypair.accountId();
var seedEncoded = (0, _strkey.encodeCheck)('seed', unencodedBuffer);
describe('decodeCheck', function () {
  it('decodes correctly', function () {
    expectBuffersToBeEqual((0, _strkey.decodeCheck)('accountId', accountIdEncoded), unencodedBuffer);
    expectBuffersToBeEqual((0, _strkey.decodeCheck)('seed', seedEncoded), unencodedBuffer);
  });
  it('throws an error when the version byte is not defined', function () {
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('notreal', 'GBPXXOA5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('broken', 'SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCU');
    });
  });
  it('throws an error when the version byte is wrong', function () {
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('seed', 'GBPXXOA5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('accountId', 'SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCU');
    });
  });
  it('throws an error when decoded data encodes to other string', function () {
    // accountId
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('accountId', 'GBPXX0A5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('accountId', 'GCFZB6L25D26RQFDWSSBDEYQ32JHLRMTT44ZYE3DZQUTYOL7WY43PLBG++');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('accountId', 'GADE5QJ2TY7S5ZB65Q43DFGWYWCPHIYDJ2326KZGAGBN7AE5UY6JVDRRA');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('accountId', 'GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('accountId', 'GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2T');
    }); // seed

    expectThrow(function () {
      return (0, _strkey.decodeCheck)('seed', 'SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYW');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('seed', 'SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYWMEGB2W2');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('seed', 'SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYWMEGB2W2T');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('seed', 'SCMB30FQCIQAWZ4WQTS6SVK37LGMAFJGXOZIHTH2PY6EXLP37G46H6DT');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('seed', 'SAYC2LQ322EEHZYWNSKBEW6N66IRTDREEBUXXU5HPVZGMAXKLIZNM45H++');
    });
  });
  it('throws an error when the checksum is wrong', function () {
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('accountId', 'GBPXXOA5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVT');
    });
    expectThrow(function () {
      return (0, _strkey.decodeCheck)('seed', 'SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCX');
    });
  });
});
describe('encodeCheck', function () {
  it('encodes a buffer correctly', function () {
    expect((0, _strkey.encodeCheck)('accountId', unencodedBuffer)).to.deep.equal(accountIdEncoded);
    expect((0, _strkey.encodeCheck)('seed', unencodedBuffer)).to.deep.equal(seedEncoded);
  });
  it('encodes a buffer correctly', function () {
    expect((0, _strkey.encodeCheck)('accountId', unencodedBuffer)).to.deep.equal(accountIdEncoded);
    expect((0, _strkey.encodeCheck)('seed', unencodedBuffer)).to.deep.equal(seedEncoded);
  });
  it('throws an error when the data is null', function () {
    expectThrow(function () {
      return (0, _strkey.encodeCheck)('seed', null);
    });
    expectThrow(function () {
      return (0, _strkey.encodeCheck)('accountId', null);
    });
  });
  it('throws an error when the version byte is not defined', function () {
    expectThrow(function () {
      return (0, _strkey.encodeCheck)('notreal', unencoded);
    });
    expectThrow(function () {
      return (0, _strkey.encodeCheck)('broken', unencoded);
    });
  });
});

function expectBuffersToBeEqual(left, right) {
  var leftHex = left.toString('hex');
  var rightHex = right.toString('hex');
  expect(leftHex).to.eql(rightHex);
}