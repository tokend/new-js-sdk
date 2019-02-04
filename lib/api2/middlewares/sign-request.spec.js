"use strict";

var _signRequest = require("./sign-request");

var _base = require("../../base");

describe('signRequest', function () {
  it('should properly sign the request', function () {
    var signerKp = _base.Keypair.fromSecret('SANRZWBGCH6L6PPVW5KFHCETRMP6N3NJJD7F2FS54HTCXHVVXMB4BP2F');

    var requestConfig = {
      baseURL: 'https://example.com',
      url: '/foo/bar',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      method: 'GET',
      params: {}
    };
    var result = (0, _signRequest.signRequest)(requestConfig, signerKp);
    expect(result.headers).to.have.property('signature').deep.equal("keyId=\"GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB\",algorithm=\"ed25519-sha256\",headers=\"(request-target)\",signature=\"p4Dc3rOLvjltcor8MmdpXu7/6s9VDxq+4ONbI+iIrRyo8B6WYwvSx4YAsfzI5Hk4eb56zkxyXdWCONNp273YBQ==\"");
  });
});