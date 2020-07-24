"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.PreIssuanceRequest = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _base_operation = require("./operations/base_operation");

var _xdr_generated = _interopRequireDefault(require("./generated/xdr_generated"));

var _hashing = require("./hashing");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var PreIssuanceRequest =
/*#__PURE__*/
function () {
  function PreIssuanceRequest() {
    (0, _classCallCheck2.default)(this, PreIssuanceRequest);
  }

  (0, _createClass2.default)(PreIssuanceRequest, null, [{
    key: "build",

    /**
       * Creates pre issuance request
       * @param {object} opts
       * @param {string} opts.amount - amount to be preissued
       * @param {string} opts.reference - reference of the request
       * @param {string} opts.asset - asset to be pre issued
       * @param {string} opts.creatorDetails - details set by request creator
       * @param {KeyPair} opts.keyPair - signer of the pre issued asset request
       * @returns {xdr.PreIssuanceRequest}
       */
    value: function build(opts) {
      if (!_base_operation.BaseOperation.isValidAmount(opts.amount, false)) {
        throw new TypeError('amount must be of type String and represent a positive number');
      }

      if (!_base_operation.BaseOperation.isValidString(opts.reference, 4, 64)) {
        throw new TypeError('reference must be 4-64 string');
      }

      if (!_base_operation.BaseOperation.isValidAsset(opts.asset)) {
        throw new TypeError('asset is invalid');
      }

      if ((0, _isUndefined.default)(opts.keyPair)) {
        throw new TypeError('opts.keyPair is invalid');
      }

      if ((0, _isUndefined.default)(opts.creatorDetails)) {
        throw new TypeError('opts.creatorDetails is invalid');
      }

      opts.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);
      var signature = opts.keyPair.signDecorated(this._getSignatureData(opts));
      return new _xdr_generated.default.PreIssuanceRequest({
        reference: opts.reference,
        amount: opts.amount,
        asset: opts.asset,
        signature: signature,
        creatorDetails: (0, _stringify.default)(opts.creatorDetails),
        ext: new _xdr_generated.default.PreIssuanceRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
    }
  }, {
    key: "xdrFromData",
    value: function xdrFromData(data) {
      return new _xdr_generated.default.PreIssuanceRequest({
        reference: data.reference,
        amount: _base_operation.BaseOperation._toUnsignedXDRAmount(data.amount),
        asset: data.asset,
        signature: data.signature
      });
    }
  }, {
    key: "dataFromXdr",
    value: function dataFromXdr(xdr) {
      var attributes = {};
      attributes.amount = _base_operation.BaseOperation._fromXDRAmount(xdr.amount());
      attributes.reference = xdr.reference().toString();
      attributes.asset = xdr.asset().toString();
      attributes.signature = xdr.signature();
      attributes.creatorDetails = JSON.parse(xdr.creatorDetails().toString());
      return attributes;
    }
  }, {
    key: "isXdrPreIssuanceRequestSigned",
    value: function isXdrPreIssuanceRequestSigned(attributes, keyPair) {
      var signature = attributes.signature();

      var signatureData = this._getSignatureData({
        reference: attributes.reference(),
        asset: attributes.asset(),
        amount: attributes.amount()
      });

      return keyPair.verify(signatureData, signature.signature());
    }
  }, {
    key: "_getSignatureData",
    value: function _getSignatureData(opts) {
      if ((0, _isUndefined.default)(opts.reference)) {
        throw new Error('opts.reference is invalid');
      }

      if ((0, _isUndefined.default)(opts.asset)) {
        throw new Error('opts.asset is invalid');
      }

      var rawSignatureData = "".concat(opts.reference, ":").concat(opts.amount.toString(), ":").concat(opts.asset);
      return (0, _hashing.hash)(rawSignatureData);
    }
  }]);
  return PreIssuanceRequest;
}();

exports.PreIssuanceRequest = PreIssuanceRequest;