"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ManageAccountSpecificRuleBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _jsXdr = require("js-xdr");

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var ManageAccountSpecificRuleBuilder =
/*#__PURE__*/
function () {
  function ManageAccountSpecificRuleBuilder() {
    (0, _classCallCheck2.default)(this, ManageAccountSpecificRuleBuilder);
  }

  (0, _createClass2.default)(ManageAccountSpecificRuleBuilder, null, [{
    key: "createSaleRule",

    /**
     * Create new account specific rule for sale participation for certain account or global.
     * @param {object} opts
     * @param {string} opts.saleID - ID of poll to voting in
     * @param {boolean} opts.forbids - means rule allow or restrict
     * @param {string} [opts.accountID] - define to create rule for certain account
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.Operation}
     */
    value: function createSaleRule(opts) {
      if ((0, _isUndefined.default)(opts.saleID)) {
        throw new Error('opts.saleID is undefined');
      }

      var attrs = {};
      attrs.ledgerKey = new _xdr_generated.default.LedgerKey.sale(new _xdr_generated.default.LedgerKeySale({
        saleId: _jsXdr.UnsignedHyper.fromString(opts.saleID),
        ext: new _xdr_generated.default.LedgerKeySaleExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));
      return this._createRule(opts, attrs);
    }
  }, {
    key: "_createRule",
    value: function _createRule(opts, attrs) {
      if ((0, _isUndefined.default)(opts.forbids)) {
        throw new Error('opts.forbids is undefined');
      }

      attrs.forbids = opts.forbids;
      attrs.ext = new _xdr_generated.default.CreateAccountSpecificRuleDataExt(_xdr_generated.default.LedgerVersion.emptyVersion());

      if (!(0, _isUndefined.default)(opts.accountID)) {
        if (!_keypair.Keypair.isValidPublicKey(opts.accountID)) {
          throw new Error('opts.accountID is invalid');
        }

        attrs.accountId = _keypair.Keypair.fromAccountId(opts.accountID).xdrAccountId();
      }

      return this._manageRule(opts, new _xdr_generated.default.ManageAccountSpecificRuleOpData.create(new _xdr_generated.default.CreateAccountSpecificRuleData(attrs)));
    }
    /**
     * Delete existing signer for source account.
     * @param {object} opts
     * @param {string} opts.ruleID - ID of account specific rule
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.Operation}
     */

  }, {
    key: "removeRule",
    value: function removeRule(opts) {
      if ((0, _isUndefined.default)(opts.ruleID)) {
        throw new TypeError('opts.ruleID is undefined');
      }

      var removeData = new _xdr_generated.default.RemoveAccountSpecificRuleData({
        ruleId: _jsXdr.UnsignedHyper.fromString(opts.ruleID),
        ext: new _xdr_generated.default.RemoveAccountSpecificRuleDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      return this._manageRule(opts, new _xdr_generated.default.ManageAccountSpecificRuleOpData.remove(removeData));
    }
  }, {
    key: "_manageRule",
    value: function _manageRule(opts, data) {
      var op = new _xdr_generated.default.ManageAccountSpecificRuleOp({
        data: data,
        ext: new _xdr_generated.default.ManageAccountSpecificRuleOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageAccountSpecificRule(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "manageAccountSpecificRuleToObject",
    value: function manageAccountSpecificRuleToObject(result, attrs) {
      switch (attrs.data().switch()) {
        case _xdr_generated.default.ManageAccountSpecificRuleAction.create():
          var createData = attrs.data().createData();
          result.forbids = createData.forbids();
          result.ledgerEntryType = createData.ledgerKey()._switch.value;

          switch (createData.ledgerKey().switch()) {
            case _xdr_generated.default.LedgerEntryType.sale():
              result.saleID = createData.ledgerKey().sale().saleId().toString();
              break;

            default:
              throw new Error('Unexpected ledger entry type in account specific rule' + createData.ledgerKey().type().value);
          }

          if (!(0, _isUndefined.default)(createData.accountId())) {
            result.accountID = _base_operation.BaseOperation.accountIdtoAddress(createData.accountId());
          }

          break;

        case _xdr_generated.default.ManageAccountSpecificRuleAction.remove():
          result.ruleID = attrs.data().removeData().ruleId().toString();
          return;

        default:
          throw new Error('Unexpected manage account specific rule action');
      }
    }
  }]);
  return ManageAccountSpecificRuleBuilder;
}();

exports.ManageAccountSpecificRuleBuilder = ManageAccountSpecificRuleBuilder;