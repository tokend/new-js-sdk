"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreateKYCRecoveryRequestBuilder = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var _manage_signer_builder = require("./manage_signer_builder");

var validators = _interopRequireWildcard(require("../../utils/validators"));

var CreateKYCRecoveryRequestBuilder =
/*#__PURE__*/
function () {
  function CreateKYCRecoveryRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateKYCRecoveryRequestBuilder);
  }

  (0, _createClass2.default)(CreateKYCRecoveryRequestBuilder, null, [{
    key: "_createKYCRecoveryRequest",

    /**
     * Creates operation to create KYC request
     * @param {object} opts
     * @param {string} opts.requestID - set to zero to create new request
     * @param {string} opts.targetAccount
     * @param {object[]} opts.signers - new signers for the target account
     * @param {string} opts.signers[].publicKey - public key of new signer
     * @param {string} opts.signers[].roleID - id of role for signer
     * @param {string} opts.signers[].weight - weight of signer up to 1000
     * @param {string} opts.signers[].identity - identity of signer
     * @param {object} opts.signers[].details - json object with details
     * @param {object} opts.creatorDetails
     * @param {number|string} opts.allTasks
     * @param {string} opts.creatorDetails - request details set by creator
     * @returns {xdr.CreateKYCRecoveryRequestOp}
     */
    value: function _createKYCRecoveryRequest(opts) {
      var attrs = {};
      validators.validatePublicKey({
        value: opts.targetAccount,
        fieldName: 'opts.targetAccount'
      });
      validators.validateCreatorDetails({
        value: opts.creatorDetails,
        fieldName: 'opts.creatorDetails'
      });
      validators.validateUint64({
        value: opts.requestID,
        fieldName: 'opts.requestID'
      });
      validators.validateArray({
        value: opts.signers,
        fieldName: 'opts.signers',
        minLength: 1
      });
      opts.signers.forEach(function (item) {
        validators.validatePublicKey({
          value: item.publicKey,
          fieldName: 'opts.signers[].publicKey'
        });
        validators.validateUint64({
          value: item.roleID,
          fieldName: 'signers[].roleID'
        });
        validators.validateUint64({
          value: item.weight,
          fieldName: 'opts.signers[].weight',
          max: 1000
        });
        validators.validateUint64({
          value: item.identity,
          fieldName: 'opts.signers[].identity',
          min: 1
        });
      });
      attrs.targetAccount = _keypair.Keypair.fromAccountId(opts.targetAccount).xdrAccountId();
      attrs.creatorDetails = (0, _stringify.default)(opts.creatorDetails);
      attrs.requestId = _jsXdr.UnsignedHyper.fromString(opts.requestID);
      attrs.allTasks = _base_operation.BaseOperation._checkUnsignedIntValue('allTasks', opts.allTasks);
      attrs.ext = new _xdr_generated.default.CreateKycRecoveryRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var signersData = [];
      opts.signers.forEach(function (item) {
        signersData.push(_manage_signer_builder.ManageSignerBuilder.prepareUpdateSignerData(item));
      });
      attrs.signersData = signersData;
      var kycRequestOp = new _xdr_generated.default.CreateKycRecoveryRequestOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createKycRecoveryRequest(kycRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
     * @param {object} opts
     * @param {string} opts.targetAccount
     * @param {object[]} opts.signers - new signers for the target account
     * @param {string} opts.signers[].publicKey - public key of new signer
     * @param {string} opts.signers[].roleID - id of role for signer
     * @param {string} opts.signers[].weight - weight of signer up to 1000
     * @param {string} opts.signers[].identity - identity of signer
     * @param {object} opts.signers[].details - json object with details
     * @param {object} opts.creatorDetails
     * @param {number|string} opts.allTasks
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     * @return {xdr.CreateKYCRecoveryRequestOp}
     */

  }, {
    key: "create",
    value: function create(opts) {
      return this._createKYCRecoveryRequest((0, _objectSpread2.default)({}, opts, {
        requestID: '0'
      }));
    }
    /**
     * @param {object} opts
     * @param {string} opts.targetAccount
     * @param {object[]} opts.signers - new signers for the target account
     * @param {string} opts.signers[].publicKey - public key of new signer
     * @param {string} opts.signers[].roleID - id of role for signer
     * @param {string} opts.signers[].weight - weight of signer up to 1000
     * @param {string} opts.signers[].identity - identity of signer
     * @param {object} opts.signers[].details - json object with details
     * @param {object} opts.creatorDetails
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     * @return {xdr.CreateKYCRecoveryRequestOp}
     */

  }, {
    key: "update",
    value: function update(opts, requestID) {
      return this._createKYCRecoveryRequest((0, _objectSpread2.default)({}, opts, {
        requestID: requestID
      }));
    }
  }, {
    key: "createKYCRecoveryRequestOpToObject",
    value: function createKYCRecoveryRequestOpToObject(result, attrs) {
      result.requestID = attrs.requestId().toString();
      result.targetAccount = _base_operation.BaseOperation.accountIdtoAddress(attrs.targetAccount());
      result.signers = [];
      attrs.signersData().forEach(function (item) {
        var data = {};

        _manage_signer_builder.ManageSignerBuilder.signerDataToObject(data, item);

        result.signers.push(data);
      });
      result.creatorDetails = JSON.parse(attrs.creatorDetails());
      result.allTasks = attrs.allTasks();
    }
  }]);
  return CreateKYCRecoveryRequestBuilder;
}();

exports.CreateKYCRecoveryRequestBuilder = CreateKYCRecoveryRequestBuilder;