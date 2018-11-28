"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _operation = require("../operation");

var _create_reference_builder = require("./create_reference_builder");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

describe('CreateReferenceBuilder', function () {
  it('Success', function () {
    var opts = {
      reference: '123456789012345678901234567890123456789012345678901234567890123a',
      meta: {
        file_name: 'Large Tokenization FAQ',
        document_type: 'pdf',
        creator: 'Researcher',
        counterparty: 'Team'
      }
    };

    var op = _create_reference_builder.CreateReferenceBuilder.createReference(opts);

    var xdrOp = op.toXDR('hex');

    var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal(_xdr_generated.default.OperationType.createReference().name);
    expect(obj.reference).to.be.equal(opts.reference);
    expect((0, _isEqual.default)(opts.meta, obj.meta)).to.be.true;
  });
});