import { base } from '../../../../src'

var reviewableRequestHelper = require('./review_request');

function createKYCRequest(testHelper, source, requestID, accountToUpdateKYC, accountTypeToSet,
                          kycLevelToSet, kycData, allTasks) {
    const opts = {
        requestID: requestID,
        accountToUpdateKYC: accountToUpdateKYC,
        accountTypeToSet: accountTypeToSet,
        kycLevelToSet: kycLevelToSet,
        kycData: kycData,
        allTasks: allTasks,
    };
    const operation = base.CreateUpdateKYCRequestBuilder.createUpdateKYCRequest(opts);
    return testHelper.server.submitOperation(operation, source.accountId(), source)
        .then(response => {
            let result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            let id = result.result().results()[0].tr().createUpdateKycRequestResult().success().requestId().toString();
            console.log("UpdateKYCRequest created: " + id);
            return id;
        })
}

function makeKYCRuleKey(accountType, accountTypeToSet) {
    return "kyc_lvlup_rules:" + accountType + ":0:" + accountTypeToSet + ":0";
}

module.exports = {
    createKYCRequest,
    makeKYCRuleKey
};