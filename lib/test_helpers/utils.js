"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchPromise = catchPromise;
exports.expectThrow = expectThrow;
exports.expectNoThrow = expectNoThrow;

var _chai = require("chai");

function catchPromise(promise) {
  return promise.then(function () {
    _chai.expect.fail('resolved', 'rejected', 'This promise expected to be rejected but resolved successfully.');
  }).catch(function (err) {
    return err;
  });
}

function expectThrow(func) {
  try {
    func();

    _chai.expect.fail('throw', 'no throw', 'The function is expected to throw.');
  } catch (err) {}
}

function expectNoThrow(func) {
  try {
    func();
  } catch (err) {
    _chai.expect.fail('no throw', 'throw', 'The function is expected to not throw.');
  }
}