"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreateAccountBuilder = void 0;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _base_operation = require("./base_operation");

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _keypair = require("../keypair");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _jsXdr = require("js-xdr");

var _manage_signer_builder = require("./manage_signer_builder");

var CreateAccountBuilder =
/*#__PURE__*/
function () {
  function CreateAccountBuilder() {
    (0, _classCallCheck2.default)(this, CreateAccountBuilder);
  }

  (0, _createClass2.default)(CreateAccountBuilder, null, [{
    key: "createAccount",

    /**
     * Create and fund a non existent account.
     * @param {object} opts
     * @param {string} opts.destination - Destination account ID to create an account for.
     * @param {string} opts.roleID - id of the role for new account.
     * @param {array} opts.signersData - array of signers data
     * * @param {string} opts.signersData.publicKey - public key of new signer
     * * @param {string} opts.signersData.roleID - id of role for signer
     * * @param {string} opts.signersData.weight - weight of signer up to 1000
     * * @param {string} opts.signersData.identity - identity of signer
     * * @param {object} opts.signersData.details - json object with details
     * @param {string} [opts.referrer] - referrer of new account.
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateAccountOp}
     */
    value: function createAccount(opts) {
      if (!_keypair.Keypair.isValidPublicKey(opts.destination)) {
        throw new Error('destination is invalid');
      }

      var attrs = {
        destination: _keypair.Keypair.fromAccountId(opts.destination).xdrAccountId(),
        ext: new _xdr_generated.default.CreateAccountOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if (!(0, _isUndefined.default)(opts.referrer) && !(opts.referrer === '')) {
        console.log(opts.referrer);

        if (!_keypair.Keypair.isValidPublicKey(opts.referrer)) {
          throw new TypeError('referrer is invalid');
        }

        attrs.referrer = _keypair.Keypair.fromAccountId(opts.referrer).xdrAccountId();
      }

      if ((0, _isUndefined.default)(opts.roleID)) {
        throw new Error('roleID is undefined');
      }

      attrs.roleId = _jsXdr.UnsignedHyper.fromString(opts.roleID);

      if ((0, _isUndefined.default)(opts.signersData)) {
        throw new Error('signersData is undefined');
      }

      if (!(0, _isArray.default)(opts.signersData)) {
        throw new Error('signersData is not array');
      }

      if (opts.signersData.length === 0) {
        throw new Error('signersData is empty');
      }

      attrs.signersData = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(opts.signersData), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var signerData = _step.value;
          attrs.signersData.push(_manage_signer_builder.ManageSignerBuilder.prepareUpdateSignerData(signerData));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var op = new _xdr_generated.default.CreateAccountOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createAccount(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createAccountToObject",
    value: function createAccountToObject(result, attrs) {
      result.destination = _base_operation.BaseOperation.accountIdtoAddress(attrs.destination());
      result.roleID = attrs.roleId().toString();

      if (attrs.referrer()) {
        result.referrer = _base_operation.BaseOperation.accountIdtoAddress(attrs.referrer());
      }

      result.signersData = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator2.default)(attrs.signersData()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var signerData = _step2.value;
          result.signersData.push(_manage_signer_builder.ManageSignerBuilder.signerDataToObject(result, signerData));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);
  return CreateAccountBuilder;
}();

exports.CreateAccountBuilder = CreateAccountBuilder;