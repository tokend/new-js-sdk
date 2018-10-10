import {CreateReferenceBuilder} from "../../../../src/base/operations/create_reference_builder";

function createReference(testHelper, meta) {
  let opts = {
    meta: meta
  };
  let operation = CreateReferenceBuilder.createReference(opts);
  return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

module.exports = {
  createReference
};
