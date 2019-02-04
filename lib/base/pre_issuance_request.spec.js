"use strict";

var _keypair = require("./keypair");

var _pre_issuance_request = require("./pre_issuance_request");

describe('PreIssuanceRequest', function () {
  it('success', function () {
    var amount = '200.123';
    var reference = 'test';
    var asset = 'BLC';

    var keyPair = _keypair.Keypair.random();

    var preIssuanceRequest = _pre_issuance_request.PreIssuanceRequest.build({
      amount: amount,
      reference: reference,
      asset: asset,
      keyPair: keyPair
    });

    var recovered = _pre_issuance_request.PreIssuanceRequest.dataFromXdr(preIssuanceRequest);

    expect(reference).to.be.equal(recovered.reference);
    expect(amount).to.be.equal(recovered.amount);
    expect(asset).to.be.equal(recovered.asset);

    var isSigned = _pre_issuance_request.PreIssuanceRequest.isXdrPreIssuanceRequestSigned(preIssuanceRequest, keyPair);

    expect(isSigned).to.be.true;
  });
});