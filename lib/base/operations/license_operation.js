"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.LicenseBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _hashing = require("../hashing");

var _jsXdr = require("js-xdr");

var LicenseBuilder =
/*#__PURE__*/
function () {
  function LicenseBuilder() {
    (0, _classCallCheck2.default)(this, LicenseBuilder);
  }

  (0, _createClass2.default)(LicenseBuilder, null, [{
    key: "licenseOp",

    /**
     * Returns an XDR LicenseOp. A "license" operations are used for license prolongation/setting
     * @param {object} opts
     * @param {number|string} [opts.adminCount] - maximum number of admins to be set
     *                                            to be set in the system.
     * @param {number|string} [opts.dueDate] - Unix timestamp tiil which license is valid.
     * @param {string} [opts.prevLicenseHash] - full hash of previous license,
     *                                                  saved in the recent Stamp.
     * @param {string} [opts.ledgerHash] - ledger hash, saved in the recent Stamp.
     * @param {array} [opts.signatures] - Decorated signatures, by default 2 required.
     * @param {string} [opts.source] - The source account (defaults to transaction source).
     * @returns {xdr.LicenseOp}
     */
    value: function licenseOp(opts) {
      var attributes = {
        ext: new _xdr_generated.default.LicenseOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      attributes.adminCount = _jsXdr.UnsignedHyper.fromString(opts.adminCount);
      attributes.dueDate = _jsXdr.UnsignedHyper.fromString(opts.dueDate);
      attributes.prevLicenseHash = opts.prevLicenseHash;
      attributes.ledgerHash = opts.ledgerHash;
      attributes.signatures = [];

      for (var i = 0; i < opts.signatures.length; i++) {
        attributes.signatures.push(opts.signatures[i]);
      }

      var licenseOp = new _xdr_generated.default.LicenseOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.license(licenseOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "licenseToObject",
    value: function licenseToObject(result, attrs) {
      result.adminCount = attrs.adminCount();
      result.dueDate = attrs.dueDate();
      result.ledgerHash = attrs.ledgerHash();
      result.prevLicenseHash = attrs.prevLicenseHash();
      result.signatures = [];

      for (var i = 0; i < attrs.signatures().length; i++) {
        result.signatures.push(attrs.signatures[i]);
      }
    }
    /**
     *
     * @param {object} opts
     * @param {number|string} [opts.adminCount] - maximum number of admins to be set
     *                                            to be set in the system.
     * @param {number|string} [opts.dueDate] - Unix timestamp tiil which license is valid.
     * @param {string} [opts.prevLicenseHash] - full hash of previous license,
     *                                                  saved in the recent Stamp.
     * @param {string} [opts.ledgerHash] - ledger hash, saved in the recent Stamp.
     */

  }, {
    key: "_getSignatureData",
    value: function _getSignatureData(opts) {
      if ((0, _isUndefined.default)(opts.adminCount)) {
        throw new Error('opts.adminCount is invalid');
      }

      if ((0, _isUndefined.default)(opts.dueDate)) {
        throw new Error('opts.dueDate is invalid');
      }

      if ((0, _isUndefined.default)(opts.prevLicenseHash)) {
        throw new Error('opts.prevLicenseHash is invalid');
      }

      if ((0, _isUndefined.default)(opts.ledgerHash)) {
        throw new Error('opts.ledgerHash is invalid');
      }

      var rawSignatureData = "".concat(opts.adminCount, ":").concat(opts.dueDate, ":").concat(opts.ledgerHash.toString('hex'), ":").concat(opts.prevLicenseHash.toString('hex'));
      return (0, _hashing.hash)(rawSignatureData);
    }
    /**
      * @param {array} [keys] - keys to sign license with
     */

    /**
     * @param opts
     * @param keys
     */

  }, {
    key: "signLicense",
    value: function signLicense(opts, keys) {
      var contentHash = this._getSignatureData(opts);

      var signatures = [];

      for (var i = 0; i < keys.length; i++) {
        var signature = keys[i].signDecorated(contentHash);
        signatures.push(signature);
      }

      return signatures;
    }
  }, {
    key: "buildAndSign",
    value: function buildAndSign(opts, keys) {
      var signatures = this.signLicense(opts, keys);
      var licenseOpts = {
        adminCount: opts.adminCount,
        dueDate: opts.dueDate,
        ledgerHash: opts.ledgerHash,
        prevLicenseHash: opts.prevLicenseHash,
        signatures: signatures
      };
      return this.licenseOp(licenseOpts);
    }
  }]);
  return LicenseBuilder;
}();

exports.LicenseBuilder = LicenseBuilder;