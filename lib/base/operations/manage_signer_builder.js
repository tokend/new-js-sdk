"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ManageSignerBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _parseInt = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/parse-int"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _keypair = require("../keypair");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _jsXdr = require("js-xdr");

var _base_operation = require("./base_operation");

var ManageSignerBuilder =
/*#__PURE__*/
function () {
  function ManageSignerBuilder() {
    (0, _classCallCheck2.default)(this, ManageSignerBuilder);
  }

  (0, _createClass2.default)(ManageSignerBuilder, null, [{
    key: "createSigner",

    /**
     * Create new signer for source account.
     * @param {object} opts
     * @param {string} opts.publicKey - public key of new signer
     * @param {string} opts.roleID - id of role for signer
     * @param {string} opts.weight - weight of signer up to 1000
     * @param {string} opts.identity - identity of signer
     * @param {object} opts.details - json object with details
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.ManageSignerOp}
     */
    value: function createSigner(opts) {
      var attrs = {
        data: new _xdr_generated.default.ManageSignerOpData.create(ManageSignerBuilder.prepareUpdateSignerData(opts)),
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      var op = new _xdr_generated.default.ManageSignerOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageSigner(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
     * Update existing signer for source account.
     * @param {object} opts
     * @param {string} opts.publicKey - public key of existing signer
     * @param {string} opts.roleID - id of role for signer
     * @param {string} opts.weight - weight of signer up to 1000
     * @param {string} opts.identity - identity of signer
     * @param {object} opts.details - json object with details
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.ManageSignerOp}
     */

  }, {
    key: "updateSigner",
    value: function updateSigner(opts) {
      var attrs = {
        data: new _xdr_generated.default.ManageSignerOpData.update(ManageSignerBuilder.prepareUpdateSignerData(opts)),
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      var op = new _xdr_generated.default.ManageSignerOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageSigner(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
     * Delete existing signer for source account.
     * @param {object} opts
     * @param {string} opts.publicKey - public key of existing signer
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.ManageSignerOp}
     */

  }, {
    key: "deleteSigner",
    value: function deleteSigner(opts) {
      if (!_keypair.Keypair.isValidPublicKey(opts.publicKey)) {
        throw new TypeError('invalid public key of signer');
      }

      var removeData = new _xdr_generated.default.RemoveSignerData({
        publicKey: _keypair.Keypair.fromAccountId(opts.publicKey).xdrPublicKey(),
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var attrs = {
        data: new _xdr_generated.default.ManageSignerOpData.remove(removeData),
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      var op = new _xdr_generated.default.ManageSignerOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageSigner(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
     * Validate data for UpdateSignerData, return xdr.UpdateSignerData if all ok
     * @param {object} opts
     * @param {string} opts.publicKey
     * @param {string} opts.roleID
     * @param {string} opts.weight
     * @param {string} opts.identity
     * @param {object} opts.details
     * @returns {xdr.UpdateSignerData}
     */

  }, {
    key: "prepareUpdateSignerData",
    value: function prepareUpdateSignerData(opts) {
      if (!_keypair.Keypair.isValidPublicKey(opts.publicKey)) {
        throw new TypeError('invalid public key of signer');
      }

      if ((0, _isUndefined.default)(opts.roleID)) {
        throw new Error('roleID of signer is undefined');
      }

      if ((0, _isUndefined.default)(opts.identity)) {
        throw new Error('identity of signer is undefined');
      }

      if ((0, _isUndefined.default)(opts.weight)) {
        throw new Error('weight of signer is undefined');
      }

      var weight = (0, _parseInt.default)(opts.weight, 10);

      if (weight > 1000) {
        throw new Error('weight must not be greater than 1000');
      }

      var attrs = {
        publicKey: _keypair.Keypair.fromAccountId(opts.publicKey).xdrPublicKey(),
        roleId: _jsXdr.UnsignedHyper.fromString(opts.roleID),
        weight: weight,
        identity: (0, _parseInt.default)(opts.identity, 10),
        details: (0, _stringify.default)(opts.details),
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      return new _xdr_generated.default.UpdateSignerData(attrs);
    }
  }, {
    key: "manageSignerToObject",
    value: function manageSignerToObject(result, attrs) {
      switch (attrs.data().switch()) {
        case _xdr_generated.default.ManageSignerAction.create():
          return this.signerDataToObject(result, attrs.data().createData());

        case _xdr_generated.default.ManageSignerAction.update():
          return this.signerDataToObject(result, attrs.data().updateData());

        case _xdr_generated.default.ManageSignerAction.remove():
          result.publicKey = _base_operation.BaseOperation.accountIdtoAddress(attrs.data().removeData().publicKey());
          return;

        default:
          throw new Error('Unexpected manage signer action');
      }
    }
  }, {
    key: "signerDataToObject",
    value: function signerDataToObject(result, signerData) {
      result.publicKey = _base_operation.BaseOperation.accountIdtoAddress(signerData.publicKey());
      result.roleID = signerData.roleId().toString();
      result.weight = signerData.weight().toString();
      result.identity = signerData.identity().toString();
      result.details = JSON.parse(signerData.details());
    }
  }]);
  return ManageSignerBuilder;
}();

exports.ManageSignerBuilder = ManageSignerBuilder;