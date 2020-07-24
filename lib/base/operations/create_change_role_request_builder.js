"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreateChangeRoleRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var CreateChangeRoleRequestBuilder =
/*#__PURE__*/
function () {
  function CreateChangeRoleRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateChangeRoleRequestBuilder);
  }

  (0, _createClass2.default)(CreateChangeRoleRequestBuilder, null, [{
    key: "createChangeRoleRequest",

    /**
       * Creates operation to create KYC request
       * @param {object} opts
       * @param {number|string} opts.requestID - set to zero to create new request
       * @param {string} opts.destinationAccount
       * @param {string} opts.accountRoleToSet
       * @param {object} opts.creatorDetails
       * @param {number|string} opts.allTasks
       * @param {string} opts.creatorDetails - request details set by creator
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.CreateChangeRoleRequestOp}
       */
    value: function createChangeRoleRequest(opts) {
      var attrs = {};

      if ((0, _isUndefined.default)(opts.requestID)) {
        throw new Error('opts.requestID is invalid');
      }

      if (!_keypair.Keypair.isValidPublicKey(opts.destinationAccount)) {
        throw new Error('opts.accountToUpdateKYC is invalid');
      }

      attrs.destinationAccount = _keypair.Keypair.fromAccountId(opts.destinationAccount).xdrAccountId();
      attrs.accountRoleToSet = _jsXdr.UnsignedHyper.fromString(opts.accountRoleToSet);
      attrs.creatorDetails = (0, _stringify.default)(opts.creatorDetails);
      attrs.requestId = _jsXdr.UnsignedHyper.fromString(opts.requestID);
      attrs.allTasks = _base_operation.BaseOperation._checkUnsignedIntValue('allTasks', opts.allTasks);
      attrs.ext = new _xdr_generated.default.CreateChangeRoleRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var kycRequestOp = new _xdr_generated.default.CreateChangeRoleRequestOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createChangeRoleRequest(kycRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createChangeRoleRequestOpToObject",
    value: function createChangeRoleRequestOpToObject(result, attrs) {
      result.requestID = attrs.requestId;
      result.destinationAccount = _base_operation.BaseOperation.accountIdtoAddress(attrs.destinationAccount());
      result.accountRoleToSet = attrs.accountRoleToSet().toString();
      result.creatorDetails = JSON.parse(attrs.creatorDetails());
      result.allTasks = attrs.allTasks();
    }
  }]);
  return CreateChangeRoleRequestBuilder;
}();

exports.CreateChangeRoleRequestBuilder = CreateChangeRoleRequestBuilder;