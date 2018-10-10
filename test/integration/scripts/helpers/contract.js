import { base } from '../../../../src'

function createContractRequest(testHelper, source, customer, escrow, details, startTime, endTime) {
    const opts = {
        customer: customer.accountId(),
        escrow: escrow.accountId(),
        startTime: startTime,
        endTime: endTime,
        details: details
    };
    const operation = base.ManageContractRequestBuilder.createContractRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation)
        .then(response => {
            let result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            let success = result.result().results()[0].tr().manageContractRequestResult().success();
            let id = success.details().response().requestId().toString();
            console.log(id, ' <-- Contract request successfully created');
            return id;
        });
}

function removeContractRequest(testHelper, source, requestId) {
    const opts = {
        requestId: requestId,
    };
    const operation = base.ManageContractRequestBuilder.removeContractRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function addDetails(testHelper, source, contractID, details){
    const opts = {
        contractID: contractID,
        details: details
    };
    const operation = base.ManageContractBuilder.addDetails(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function confirmCompleted(testHelper, source, contractID){
    const opts = {
        contractID: contractID,
    };
    const operation = base.ManageContractBuilder.confirmCompleted(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function startDispute(testHelper, source, contractID, disputeReason){
    const opts = {
        contractID: contractID,
        disputeReason: disputeReason
    };
    const operation = base.ManageContractBuilder.startDispute(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function resolveDispute(testHelper, source, contractID, isRevert){
    const opts = {
        contractID: contractID,
        isRevert: isRevert
    };
    const operation = base.ManageContractBuilder.resolveDispute(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

module.exports = {
    createContractRequest,
    removeContractRequest,
    addDetails,
    confirmCompleted,
    startDispute,
    resolveDispute,
};