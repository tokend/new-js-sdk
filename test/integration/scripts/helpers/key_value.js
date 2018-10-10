import { base } from '../../../../src'

function putKeyValue(testHelper, source, key, value, entryType) {
    let opts = {
        key: key,
        value: value,
        entryType: entryType
    };
    let operation = base.ManageKeyValueBuilder.putKeyValue(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function deleteKeyValue(testHelper, source, key) {
    let operation = base.ManageKeyValueBuilder.deleteKeyValue({
        key: key
    });
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

module.exports = {
    putKeyValue,
    deleteKeyValue
};
