"use strict";

var _setJsonapiHeaders = require("./set-jsonapi-headers");

describe('setJsonapiHeaders', function () {
  it('should set proper set of headers', function () {
    var config = (0, _setJsonapiHeaders.setJsonapiHeaders)({
      headers: {}
    });
    expect(config.headers).to.deep.equal({
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    });
  });
});