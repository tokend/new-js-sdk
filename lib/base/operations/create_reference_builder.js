"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateReferenceBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var CreateReferenceBuilder =
/*#__PURE__*/
function () {
  function CreateReferenceBuilder() {
    (0, _classCallCheck2.default)(this, CreateReferenceBuilder);
  }

  (0, _createClass2.default)(CreateReferenceBuilder, null, [{
    key: "createReference",

    /**
     * Creates new reference entry
     * @param {object} opts
     * @param {string} opts.reference - unique reference calculated on client 64 symbols length
     * @param {object} opts.meta - details about document or something else
     * @param {string} opts.meta.file_name - name of file
     * @param {string} opts.meta.document_type - type of document
     * @param {string} opts.meta.creator - information about document creator
     * @param {string} opts.meta.counterparty - participant
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     * @returns {xdr.Operation} (CreateReferenceOp)
     */
    value: function createReference(opts) {
      if (!_base_operation.BaseOperation.isValidString(opts.reference, 1, 64)) {
        throw new Error('opts.reference is invalid');
      }

      if ((0, _isUndefined.default)(opts.meta.file_name)) {
        throw new Error('opts.meta.file_name is undefined');
      }

      if ((0, _isUndefined.default)(opts.meta.document_type)) {
        throw new Error('opts.meta.document_type is undefined');
      }

      if ((0, _isUndefined.default)(opts.meta.creator)) {
        throw new Error('opts.meta.creator is undefined');
      }

      if ((0, _isUndefined.default)(opts.meta.counterparty)) {
        throw new Error('opts.meta.counterparty is undefined');
      }

      var attrs = {
        reference: opts.reference,
        meta: (0, _stringify.default)(opts.meta),
        ext: new _xdr_generated.default.CreateReferenceOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      var opAttributes = {};
      opAttributes.body = new _xdr_generated.default.OperationBody.createReference(new _xdr_generated.default.CreateReferenceOp(attrs));

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createReferenceToObject",
    value: function createReferenceToObject(result, attrs) {
      result.reference = attrs.reference().toString();
      result.meta = JSON.parse(attrs.meta());
    }
  }]);
  return CreateReferenceBuilder;
}();

exports.CreateReferenceBuilder = CreateReferenceBuilder;