"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _response_base = require("./response_base");

describe('ResponseBase', function () {
  var response;
  var rawResponse = (0, _freeze.default)({
    data: {
      foo: 'bar'
    },
    status: 200,
    headers: {
      'X-Foo': 'Bar'
    }
  });
  beforeEach(function () {
    response = new _response_base.ResponseBase(rawResponse);
  });
  describe('.constructor', function () {
    it('Should wrap a raw axios.js response.', function () {
      expectNoThrow(function () {
        return new _response_base.ResponseBase(rawResponse);
      });
    });
  });
  describe('.data', function () {
    it('Should unwrap response data.', function () {
      expect(response).to.have.a.property('data').deep.equal(rawResponse.data);
    });
  });
  describe('.httpStatus', function () {
    it('Should expose response status.', function () {
      expect(response).to.have.a.property('httpStatus').deep.equal(rawResponse.status);
    });
  });
  describe('.headers', function () {
    it('Should expose response headers.', function () {
      expect(response).to.have.a.property('headers').deep.equal(rawResponse.headers);
    });
  });
  describe('.toJSON', function () {
    it('Should serialize only response body.', function () {
      expect(response).to.jsonEqual(rawResponse.data);
    });
  });
});