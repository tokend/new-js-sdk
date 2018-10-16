import {CreateReferenceBuilder} from "../../../../src/base/operations/create_reference_builder";

function createReference(testHelper, reference, meta) {
  let opts = {
    reference: reference,
    meta: meta
  };
  let operation = CreateReferenceBuilder.createReference(opts);
  return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

module.exports = {
  createReference
};
