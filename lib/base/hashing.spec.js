"use strict";

var _hashing = require("./hashing");

describe('hash', function () {
  it('hashes a string properly, using SHA256', function () {
    var msg = 'hello world';
    var expectedHex = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    var actualHex = (0, _hashing.hash)(msg).toString('hex');
    expect(actualHex).to.eql(expectedHex);
  });
  it('hashes a buffer properly, using SHA256', function () {
    var msg = Buffer.from('hello world', 'utf8');
    var expectedHex = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    var actualHex = (0, _hashing.hash)(msg).toString('hex');
    expect(actualHex).to.eql(expectedHex);
  });
  it('hashes an array of bytes properly, using SHA256', function () {
    var msg = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100];
    var expectedHex = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    var actualHex = (0, _hashing.hash)(msg).toString('hex');
    expect(actualHex).to.eql(expectedHex);
  });
});