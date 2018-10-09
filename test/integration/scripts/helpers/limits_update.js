import { base } from '../../../../src'
var reviewableRequestHelper = require('./review_request');

function createLimitsUpdateRequest(testHelper, source, details, requestID) {
    const opts = {
        details: details,
        requestID: requestID
    };
    const operation = base.CreateManageLimitsRequestBuilder.createManageLimitsRequest(opts);
    return testHelper.sdk.submitOperations(operation)
        .then(response => {
            var result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            var id = result.result().results()[0].tr().createManageLimitsRequestResult().success().manageLimitsRequestId().toString();
            console.log("LimitsUpdateRequest created: " + id);
            return id
        })
}

module.exports = {
    createLimitsUpdateRequest
};