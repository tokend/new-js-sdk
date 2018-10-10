import { base } from '../../../../src'

function createAMLAlert(testHelper, balanceID, amount) {
    const opts = {
        balanceID: balanceID,
        amount: amount, 
        reason: "Testing",
        reference: base.Keypair.random().accountId(),
    };
    const operation = base.CreateAMLRequestBuilder.createAMLAlert(opts);
    return testHelper.server.submitOperation(operation, testHelper.master.accountId(), testHelper.master)
        .then(response => {
            var result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            return result.result().results()[0].tr().createAmlAlertRequestResult().success().requestId().toString();
        })
}

module.exports = {
    createAMLAlert
}