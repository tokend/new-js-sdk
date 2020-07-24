"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.InitiateKYCRecoveryBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var validators = _interopRequireWildcard(require("../../utils/validators"));

var InitiateKYCRecoveryBuilder =
/*#__PURE__*/
function () {
  function InitiateKYCRecoveryBuilder() {
    (0, _classCallCheck2.default)(this, InitiateKYCRecoveryBuilder);
  }

  (0, _createClass2.default)(InitiateKYCRecoveryBuilder, null, [{
    key: "initiateKycRecovery",

    /**
     * Creates operation to create KYC request
     * @param {object} opts
     * @param {string} opts.targetAccount - target account to initiate recovery for
     * @param {string} opts.signer - signer is to be added instead of existing ones
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     * @returns {xdr.initiateKycRecoveryOp}
     */
    value: function initiateKycRecovery(opts) {
      var attrs = {};
      validators.validatePublicKey({
        value: opts.targetAccount,
        fieldName: 'opts.targetAccount'
      });
      validators.validatePublicKey({
        value: opts.signer,
        fieldName: 'opts.signer'
      });
      attrs.account = _keypair.Keypair.fromAccountId(opts.targetAccount).xdrAccountId();
      attrs.signer = _keypair.Keypair.fromAccountId(opts.signer).xdrPublicKey();
      attrs.ext = new _xdr_generated.default.InitiateKycRecoveryOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var kycRequestOp = new _xdr_generated.default.InitiateKycRecoveryOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.initiateKycRecovery(kycRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "initiateKYCRecoveryToObject",
    value: function initiateKYCRecoveryToObject(result, attrs) {
      result.account = _base_operation.BaseOperation.accountIdtoAddress(attrs.account());
      result.signer = _base_operation.BaseOperation.accountIdtoAddress(attrs.signer());
    }
  }]);
  return InitiateKYCRecoveryBuilder;
}();

exports.InitiateKYCRecoveryBuilder = InitiateKYCRecoveryBuilder;