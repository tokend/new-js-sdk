import { base } from '../../../../src'

function createInvoiceRequest(testHelper, source, sender, asset, amount, details, contractID = undefined) {
    const opts = {
        sender: sender.accountId(),
        asset: asset,
        amount: amount,
        details: details,
        contractID: contractID
    };
    const operation = base.ManageInvoiceRequestBuilder.createInvoiceRequest(opts);
    return testHelper.sdk.submitOperations(operation)
        .then(response => {
            let result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            let success = result.result().results()[0].tr().manageInvoiceRequestResult().success();
            let id = success.details().response().requestId().toString();
            let sourceBalanceID = base.BaseOperation.balanceIdtoString(success.details().response().senderBalance());
            let destBalanceID = base.BaseOperation.balanceIdtoString(success.details().response().receiverBalance());
            console.log(id, ' <-- Invoice Request successfully created');
            console.log('source: ', sourceBalanceID);
            console.log('dest: ', destBalanceID);
            return {id, sourceBalanceID, destBalanceID};
        });
}

function removeInvoiceRequest(testHelper, source, requestId) {
    const opts = {
        requestId: requestId,
    };
    const operation = base.ManageInvoiceRequestBuilder.removeInvoiceRequest(opts);
    return testHelper.sdk.submitOperations(operation);
}

module.exports = {
    createInvoiceRequest,
    removeInvoiceRequest
};