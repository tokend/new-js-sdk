"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _keypair = require("./keypair");

var _pre_issuance_request = require("./pre_issuance_request");

describe('PreIssuanceRequest', function () {
  it('success', function () {
    var amount = '200.123';
    var reference = 'test';
    var asset = 'BLC';

    var keyPair = _keypair.Keypair.random();

    var creatorDetails = {
      'data': 'some details'
    };

    var preIssuanceRequest = _pre_issuance_request.PreIssuanceRequest.build({
      amount: amount,
      reference: reference,
      asset: asset,
      keyPair: keyPair,
      creatorDetails: creatorDetails
    });

    var recovered = _pre_issuance_request.PreIssuanceRequest.dataFromXdr(preIssuanceRequest);

    expect(reference).to.be.equal(recovered.reference);
    expect(amount).to.be.equal(recovered.amount);
    expect(asset).to.be.equal(recovered.asset);

    var isSigned = _pre_issuance_request.PreIssuanceRequest.isXdrPreIssuanceRequestSigned(preIssuanceRequest, keyPair);

    expect(isSigned).to.be.true;
    expect((0, _stringify.default)(creatorDetails)).to.equal((0, _stringify.default)(recovered.creatorDetails));
  });
});