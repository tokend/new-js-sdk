import { base } from '../../../../src'

function createExternalSystemAccountIdPoolEntry(testHelper, externalSystemType, data, parent) {
    let operation = base.ManageExternalSystemAccountIdPoolEntryBuilder.createExternalSystemAccountIdPoolEntry({
        externalSystemType: externalSystemType,
        data: data,
        parent: parent
    });
    return testHelper.sdk.submitOperations(operation)
        .then(response => {
            let result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            let id = result.result().results()[0].tr().manageExternalSystemAccountIdPoolEntryResult().success().poolEntryId().toString();
            console.log("PoolEntry created: " + id);
            return id;
        })
}

function deleteExternalSystemAccountIdPoolEntry(testHelper, poolEntryId) {
    let operation = base.ManageExternalSystemAccountIdPoolEntryBuilder.deleteExternalSystemAccountIdPoolEntry({
       poolEntryId: poolEntryId
    });
    return testHelper.sdk.submitOperations(operation);
}

module.exports = {
    createExternalSystemAccountIdPoolEntry,
    deleteExternalSystemAccountIdPoolEntry
};