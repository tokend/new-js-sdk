"use strict";

var _signing = require("./signing");

// NOTE: key and signature constants were generated using rbnacl
// seed: 1123740522f11bfef6b3671f51e159ccf589ccf8965262dd5f97d1721d383dd4
var publicKey = Buffer.from('ffbdd7ef9933fe7249dc5ca1e7120b6d7b7b99a7a367e1a2fc6cb062fe420437', 'hex');
var secretKey = Buffer.from('1123740522f11bfef6b3671f51e159ccf589ccf8965262dd5f97d1721d383dd4ffbdd7ef9933fe7249dc5ca1e7120b6d7b7b99a7a367e1a2fc6cb062fe420437', 'hex');
describe('sign', function () {
  var expectedSig = '587d4b472eeef7d07aafcd0b049640b0bb3f39784118c2e2b73a04fa2f64c9c538b4b2d0f5335e968a480021fdc23e98c0ddf424cb15d8131df8cb6c4bb58309';
  it('can sign an string properly', function () {
    var data = 'hello world';
    var actualSig = (0, _signing.sign)(data, secretKey).toString('hex');
    expect(actualSig).to.eql(expectedSig);
  });
  it('can sign an buffer properly', function () {
    var data = Buffer.from('hello world', 'utf8');
    var actualSig = (0, _signing.sign)(data, secretKey).toString('hex');
    expect(actualSig).to.eql(expectedSig);
  });
  it('can sign an array of bytes properly', function () {
    var data = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100];
    var actualSig = (0, _signing.sign)(data, secretKey).toString('hex');
    expect(actualSig).to.eql(expectedSig);
  });
});
describe('verify', function () {
  var sig = Buffer.from('587d4b472eeef7d07aafcd0b049640b0bb3f39784118c2e2b73a04fa2f64c9c538b4b2d0f5335e968a480021fdc23e98c0ddf424cb15d8131df8cb6c4bb58309', 'hex');
  var badSig = Buffer.from('687d4b472eeef7d07aafcd0b049640b0bb3f39784118c2e2b73a04fa2f64c9c538b4b2d0f5335e968a480021fdc23e98c0ddf424cb15d8131df8cb6c4bb58309', 'hex');
  it('can verify an string properly', function () {
    var data = 'hello world';
    expect((0, _signing.verify)(data, sig, publicKey)).to.be.true;
    expect((0, _signing.verify)('corrupted', sig, publicKey)).to.be.false;
    expect((0, _signing.verify)(data, badSig, publicKey)).to.be.false;
  });
  it('can verify an buffer properly', function () {
    var data = Buffer.from('hello world', 'utf8');
    expect((0, _signing.verify)(data, sig, publicKey)).to.be.true;
    expect((0, _signing.verify)('corrupted', sig, publicKey)).to.be.false;
    expect((0, _signing.verify)(data, badSig, publicKey)).to.be.false;
  });
  it('can verify an array of bytes properly', function () {
    var data = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100];
    expect((0, _signing.verify)(data, sig, publicKey)).to.be.true;
    expect((0, _signing.verify)('corrupted', sig, publicKey)).to.be.false;
    expect((0, _signing.verify)(data, badSig, publicKey)).to.be.false;
  });
});