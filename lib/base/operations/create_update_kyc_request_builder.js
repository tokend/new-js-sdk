"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUpdateKYCRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var CreateUpdateKYCRequestBuilder =
/*#__PURE__*/
function () {
  function CreateUpdateKYCRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateUpdateKYCRequestBuilder);
  }

  (0, _createClass2.default)(CreateUpdateKYCRequestBuilder, null, [{
    key: "createUpdateKYCRequest",

    /**
       * Creates operation to create KYC request
       * @param {object} opts
       * @param {number|string} opts.requestID - set to zero to create new request
       * @param {string} opts.accountToUpdateKYC
       * @param {string} opts.accountTypeToSet
       * @param {number} opts.kycLevelToSet
       * @param {object} opts.kycData
       * @param {number|string} opts.allTasks
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.CreateUpdateKycRequestOp}
       */
    value: function createUpdateKYCRequest(opts) {
      var attrs = {};

      if ((0, _isUndefined.default)(opts.requestID)) {
        throw new Error('opts.requestID is invalid');
      }

      if (!_keypair.Keypair.isValidPublicKey(opts.accountToUpdateKYC)) {
        throw new Error('opts.accountToUpdateKYC is invalid');
      }

      attrs.accountToUpdateKyc = _keypair.Keypair.fromAccountId(opts.accountToUpdateKYC).xdrAccountId();
      attrs.accountTypeToSet = _base_operation.BaseOperation._accountTypeFromNumber(opts.accountTypeToSet);
      attrs.kycLevelToSet = opts.kycLevelToSet;
      attrs.kycData = (0, _stringify.default)(opts.kycData);
      attrs.allTasks = _base_operation.BaseOperation._checkUnsignedIntValue('allTasks', opts.allTasks);
      attrs.ext = new _xdr_generated.default.UpdateKycRequestDataExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var updateKYCRequestData = new _xdr_generated.default.UpdateKycRequestData(attrs);
      var kycRequestOp = new _xdr_generated.default.CreateUpdateKycRequestOp({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        updateKycRequestData: updateKYCRequestData,
        ext: new _xdr_generated.default.CreateUpdateKycRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createKycRequest(kycRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createUpdateKYCRequestOpToObject",
    value: function createUpdateKYCRequestOpToObject(result, attrs) {
      result.requestID = attrs.requestId;
      result.accountToUpdateKYC = _base_operation.BaseOperation.accountIdtoAddress(attrs.updateKycRequestData().accountToUpdateKyc());
      result.accountTypeToSet = attrs.updateKycRequestData().accountTypeToSet().value;
      result.kycLevelToSet = attrs.updateKycRequestData().kycLevelToSet();
      result.kycData = JSON.parse(attrs.updateKycRequestData().kycData());
      result.allTasks = attrs.updateKycRequestData().allTasks();
    }
  }]);
  return CreateUpdateKYCRequestBuilder;
}();

exports.CreateUpdateKYCRequestBuilder = CreateUpdateKYCRequestBuilder;