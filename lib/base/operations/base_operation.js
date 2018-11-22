"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseOperation = void 0;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

var _parseFloat2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-float"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var _strkey = require("../strkey");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _continued_fraction = require("../util/continued_fraction");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

var _isFinite = _interopRequireDefault(require("lodash/isFinite"));

var ONE = 1000000;
var DECIMAL_PLACES = 6;
var MAX_INT64 = '9223372036854775807';
var MAX_INT64_AMOUNT = '9223372036854.775807';

var BaseOperation =
/*#__PURE__*/
function () {
  function BaseOperation() {
    (0, _classCallCheck2.default)(this, BaseOperation);
  }

  (0, _createClass2.default)(BaseOperation, null, [{
    key: "isPayment",
    value: function isPayment(op) {
      if (!(op instanceof _xdr_generated.default.Operation)) {
        throw new Error('should be used for operations');
      }

      return op.body().switch().name === 'payment';
    }
  }, {
    key: "isValidAsset",
    value: function isValidAsset(value) {
      return BaseOperation.isValidString(value, 1, 16);
    }
  }, {
    key: "isValidString",
    value: function isValidString(value, minSize, maxSize) {
      if (!(0, _isString.default)(value)) {
        return false;
      }

      if (!(0, _isUndefined.default)(minSize) && value.length < minSize) {
        return false;
      }

      if (!(0, _isUndefined.default)(maxSize) && value.length > maxSize) {
        return false;
      }

      return true;
    }
  }, {
    key: "isValidSubject",
    value: function isValidSubject(value) {
      return BaseOperation.isValidString(value, 0, 256);
    }
  }, {
    key: "isValidArray",
    value: function isValidArray(value, minSize) {
      return (0, _isArray.default)(value) && value.length >= minSize;
    }
  }, {
    key: "isValidArrayOfClass",
    value: function isValidArrayOfClass(value, minSize, cls) {
      if (!BaseOperation.isValidArray(value, minSize)) {
        return false;
      }

      for (var i = 0; i < value.length; i++) {
        if (!(value[i] instanceof cls)) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isValidPeriod",
    value: function isValidPeriod(value) {
      var allowZero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!(0, _isString.default)(value)) {
        return false;
      }

      var period;

      try {
        period = new _bignumber.default(value);
      } catch (e) {
        return false;
      } // == 0


      if (!allowZero && period.isZero()) {
        return false;
      } // < 0


      if (period.isNegative()) {
        return false;
      }

      if (period.decimalPlaces() > 0) {
        return false;
      } // Infinity


      if (!period.isFinite()) {
        return false;
      } // NaN


      if (period.isNaN()) {
        return false;
      }

      return true;
    }
  }, {
    key: "isValidAmount",
    value: function isValidAmount(value) {
      var allowZero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var min = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      if (!(0, _isString.default)(value)) {
        return false;
      }

      var amount;

      try {
        amount = new _bignumber.default(value);
      } catch (e) {
        return false;
      } // == 0


      if (!allowZero && amount.isZero()) {
        return false;
      } // < 0


      if (amount.isNegative()) {
        return false;
      } // > Max value


      if (amount.times(ONE).greaterThan(new _bignumber.default(MAX_INT64).toString())) {
        return false;
      }

      if (max && amount.greaterThan(new _bignumber.default(max).toString())) {
        return false;
      }

      if (min && new _bignumber.default(min).greaterThan(amount.toString())) {
        return false;
      } // Decimal places


      if (amount.decimalPlaces() > DECIMAL_PLACES) {
        return false;
      } // Infinity


      if (!amount.isFinite()) {
        return false;
      } // NaN


      if (amount.isNaN()) {
        return false;
      }

      return true;
    }
    /**
       * Returns value converted to uint32 value or undefined.
       * If `value` is not `Number`, `String` or `Undefined` then throws an error.
       * Used in {@link Operation.setOptions}.
       * @private
       * @param {string} name Name of the property (used in error message only)
       * @param {*} value Value to check
       * @param {function(value, name)} isValidFunction Function to check other constraints (the argument will be a `Number`)
       * @returns {undefined|Number}
       * @private
       */

  }, {
    key: "_checkUnsignedIntValue",
    value: function _checkUnsignedIntValue(name, value) {
      var isValidFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if ((0, _isUndefined.default)(value)) {
        return undefined;
      }

      if ((0, _isString.default)(value)) {
        value = (0, _parseFloat2.default)(value);
      }

      if (!(0, _isNumber.default)(value) || !(0, _isFinite.default)(value) || value % 1 !== 0) {
        throw new Error("".concat(name, " value is invalid"));
      }

      if (value < 0) {
        throw new Error("".concat(name, " value must be unsigned"));
      }

      if (!isValidFunction || isValidFunction && isValidFunction(value, name)) {
        return value;
      }

      throw new Error("".concat(name, " value is invalid"));
    }
  }, {
    key: "calcPercentFee",
    value: function calcPercentFee(amountValue, percentValue) {
      var amount = new _bignumber.default(amountValue);
      var rate = new _bignumber.default(percentValue).div(100);
      return amount.times(rate).toString();
    }
    /**
       * @private
       */

  }, {
    key: "_toXDRAmount",
    value: function _toXDRAmount(value) {
      var amount = new _bignumber.default(value).mul(ONE);
      return _jsXdr.Hyper.fromString(amount.toString());
    }
    /**
       * @private
       */

  }, {
    key: "_toUnsignedXDRAmount",
    value: function _toUnsignedXDRAmount(value) {
      var amount = new _bignumber.default(value).mul(ONE);
      return _jsXdr.UnsignedHyper.fromString(amount.toString());
    }
    /**
       * @private
       */

  }, {
    key: "_fromXDRAmount",
    value: function _fromXDRAmount(value) {
      return new _bignumber.default(value).div(ONE).toString();
    }
    /**
       * @private
       */

  }, {
    key: "_fromXDRPrice",
    value: function _fromXDRPrice(price) {
      var n = new _bignumber.default(price.n());
      return n.div(new _bignumber.default(price.d())).toString();
    }
    /**
       * @private
       */

  }, {
    key: "_toXDRPrice",
    value: function _toXDRPrice(price) {
      var xdrObject;

      if (price.n && price.d) {
        xdrObject = new _xdr_generated.default.Price(price);
      } else {
        price = new _bignumber.default(price);
        var approx = (0, _continued_fraction.bestR)(price);
        xdrObject = new _xdr_generated.default.Price({
          n: (0, _parseInt2.default)(approx[0]),
          d: (0, _parseInt2.default)(approx[1])
        });
      }

      if (xdrObject.n() < 0 || xdrObject.d() < 0) {
        throw new Error('price must be positive');
      }

      return xdrObject;
    }
  }, {
    key: "_accountTypeFromNumber",
    value: function _accountTypeFromNumber(rawAccountType) {
      if (!BaseOperation._isValidAccountType(rawAccountType)) {
        throw new Error("XDR Read Error: Unknown AccountType member for value ".concat(rawAccountType));
      }

      return _xdr_generated.default.AccountType._byValue.get(rawAccountType);
    }
  }, {
    key: "isFeeValid",
    value: function isFeeValid(fee) {
      return BaseOperation.isValidAmount(fee.fixed, true) && BaseOperation.isValidAmount(fee.percent, true);
    }
  }, {
    key: "feeToXdr",
    value: function feeToXdr(fee) {
      var attrs = {
        fixed: BaseOperation._toUnsignedXDRAmount(fee.fixed),
        percent: BaseOperation._toUnsignedXDRAmount(fee.percent),
        ext: new _xdr_generated.default.FeeExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      return new _xdr_generated.default.Fee(attrs);
    }
  }, {
    key: "_requestTypeFromNumber",
    value: function _requestTypeFromNumber(rawRequestType) {
      if (!BaseOperation._isValidRequestType(rawRequestType)) {
        throw new Error("XDR Read Error: Unknown RequestType member for value ".concat(rawRequestType));
      }

      return _xdr_generated.default.RequestType._byValue.get(rawRequestType);
    }
  }, {
    key: "_isValidAccountType",
    value: function _isValidAccountType(rawAccountType) {
      return _xdr_generated.default.AccountType._byValue.has(rawAccountType);
    }
  }, {
    key: "_isValidRequestType",
    value: function _isValidRequestType(rawRequestType) {
      return _xdr_generated.default.RequestType._byValue.has(rawRequestType);
    }
  }, {
    key: "accountIdtoAddress",
    value: function accountIdtoAddress(accountId) {
      return (0, _strkey.encodeCheck)('accountId', accountId.ed25519());
    }
  }, {
    key: "balanceIdtoString",
    value: function balanceIdtoString(balanceId) {
      return (0, _strkey.encodeCheck)('balanceId', balanceId.ed25519());
    }
    /**
       * This operation set SourceAccount
       * @param {object} [opts]
       * @returns undefined
       */

  }, {
    key: "setSourceAccount",
    value: function setSourceAccount(opAttributes, opts) {
      if (opts.source) {
        if (!_keypair.Keypair.isValidPublicKey(opts.source)) {
          throw new Error('Source address is invalid');
        }

        opAttributes.sourceAccount = _keypair.Keypair.fromAccountId(opts.source).xdrAccountId();
      }
    }
  }, {
    key: "MAX_INT64",
    get: function get() {
      return MAX_INT64;
    }
  }, {
    key: "ONE",
    get: function get() {
      return ONE;
    }
  }, {
    key: "MAX_INT64_AMOUNT",
    get: function get() {
      return MAX_INT64_AMOUNT;
    }
  }]);
  return BaseOperation;
}();

exports.BaseOperation = BaseOperation;