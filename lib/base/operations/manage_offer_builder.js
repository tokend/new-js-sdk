"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageOfferBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var ManageOfferBuilder =
/*#__PURE__*/
function () {
  function ManageOfferBuilder() {
    (0, _classCallCheck2.default)(this, ManageOfferBuilder);
  }

  (0, _createClass2.default)(ManageOfferBuilder, null, [{
    key: "manageOffer",

    /**
       * Returns an XDR ManageOffer. A "manage offer" operations creates offer.
       * @param {object} opts
       * @param {string} opts.baseBalance
       * @param {string} opts.quoteBalance
       * @param {boolean} opts.isBuy - if true - buys base asset, false - sells base asset
       * @param {number|string} opts.amount - Amount of the base asset
       * @param {number|string} opts.price - Price of the offer
       * @param {number|string} opts.orderBookID - 0 - for secondary market, otherwise to participate in sale
       * @returns {xdr.ManageBalanceOp}
       */
    value: function manageOffer(opts) {
      var attributes = {
        ext: new _xdr_generated.default.ManageOfferOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };

      if (!_keypair.Keypair.isValidBalanceKey(opts.baseBalance)) {
        throw new Error('baseBalance is invalid');
      }

      if (!_keypair.Keypair.isValidBalanceKey(opts.quoteBalance)) {
        throw new Error('quoteBalance is invalid');
      }

      if (typeof opts.isBuy !== 'boolean') {
        throw new Error('isBuy must be boolean');
      }

      if (!_base_operation.BaseOperation.isValidAmount(opts.amount, true)) {
        throw new TypeError('amount argument must be of type String and represent a positive number or zero');
      }

      attributes.amount = _base_operation.BaseOperation._toXDRAmount(opts.amount);

      if (!_base_operation.BaseOperation.isValidAmount(opts.price, true)) {
        throw new TypeError('price argument must be of type String and represent a positive number or zero');
      }

      attributes.price = _base_operation.BaseOperation._toXDRAmount(opts.price);

      if (!_base_operation.BaseOperation.isValidAmount(opts.fee, true)) {
        throw new TypeError('fee argument must be of type String and represent a positive number or zero');
      }

      attributes.fee = _base_operation.BaseOperation._toXDRAmount(opts.fee);

      if ((0, _isUndefined.default)(opts.offerID)) {
        opts.offerID = '0';
      }

      if ((0, _isUndefined.default)(opts.orderBookID)) {
        opts.orderBookID = '0';
      }

      attributes.offerId = _jsXdr.UnsignedHyper.fromString(opts.offerID);
      attributes.orderBookId = _jsXdr.UnsignedHyper.fromString(opts.orderBookID);
      attributes.baseBalance = _keypair.Keypair.fromBalanceId(opts.baseBalance).xdrBalanceId();
      attributes.quoteBalance = _keypair.Keypair.fromBalanceId(opts.quoteBalance).xdrBalanceId();
      attributes.isBuy = opts.isBuy;
      var manageOfferOp = new _xdr_generated.default.ManageOfferOp(attributes);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageOffer(manageOfferOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
    /**
       * Returns an XDR ManageOffer. A "manage offer" operations deletes offer.
       * @param {object} opts
       * @param {string} opts.baseBalance
       * @param {string} opts.quoteBalance
       * @param {string} opts.price
       * @param {number|string} opts.offerID - offer id
       * @param {number|string} opts.orderBookID - 0 - for secondary market, otherwise to participate in sale
       * @returns {xdr.ManageBalanceOp}
       */

  }, {
    key: "cancelOffer",
    value: function cancelOffer(opts) {
      opts.isBuy = true;
      opts.amount = '0';
      opts.fee = '0';
      opts.price = '1';
      return ManageOfferBuilder.manageOffer(opts);
    }
  }, {
    key: "manageOfferOpToObject",
    value: function manageOfferOpToObject(result, attrs) {
      result.amount = _base_operation.BaseOperation._fromXDRAmount(attrs.amount());
      result.price = _base_operation.BaseOperation._fromXDRAmount(attrs.price());
      result.fee = _base_operation.BaseOperation._fromXDRAmount(attrs.fee());
      result.isBuy = attrs.isBuy();
      result.baseBalance = _base_operation.BaseOperation.balanceIdtoString(attrs.baseBalance());
      result.quoteBalance = _base_operation.BaseOperation.balanceIdtoString(attrs.quoteBalance());
      result.offerID = attrs.offerId().toString();
      result.orderBookID = attrs.orderBookId().toString();
    }
  }]);
  return ManageOfferBuilder;
}();

exports.ManageOfferBuilder = ManageOfferBuilder;