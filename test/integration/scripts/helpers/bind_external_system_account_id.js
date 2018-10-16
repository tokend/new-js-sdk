import { base } from '../../../../src'

function bindExternalSystemAccountId(testHelper, source, externalSystemType) {
    let operation = base.BindExternalSystemAccountIdBuilder.createBindExternalSystemAccountIdOp({
        externalSystemType: externalSystemType,
    });
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

module.exports = {
    bindExternalSystemAccountId
};