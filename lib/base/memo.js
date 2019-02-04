"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Memo = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("./generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _jsXdr = require("js-xdr");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

/**
 * `Memo` represents memos attached to transactions. Use static methods to create memos.
 *
 * @see [Transactions concept](https://www.stellar.org/developers/learn/concepts/transactions.html)
 * @class Memo
 */
var Memo =
/*#__PURE__*/
function () {
  function Memo() {
    (0, _classCallCheck2.default)(this, Memo);
  }

  (0, _createClass2.default)(Memo, null, [{
    key: "none",

    /**
       * Returns an empty memo (`MEMO_NONE`).
       * @returns {xdr.Memo}
       */
    value: function none() {
      return _xdr_generated.default.Memo.memoNone();
    }
    /**
       * Creates and returns a `MEMO_TEXT` memo.
       * @param {string} text - memo text
       * @returns {xdr.Memo}
       */

  }, {
    key: "text",
    value: function text(_text) {
      if (!(0, _isString.default)(_text)) {
        throw new Error('Expects string type got a ' + (0, _typeof2.default)(_text));
      }

      if (Buffer.byteLength(_text, 'utf8') > 28) {
        throw new Error('Text should be <= 28 bytes. Got ' + Buffer.byteLength(_text, 'utf8'));
      }

      return _xdr_generated.default.Memo.memoText(_text);
    }
    /**
       * Creates and returns a `MEMO_ID` memo.
       * @param {string} id - 64-bit number represented as a string
       * @returns {xdr.Memo}
       */

  }, {
    key: "id",
    value: function id(_id) {
      var error = new Error('Expects a int64 as a string. Got ' + _id);

      if (!(0, _isString.default)(_id)) {
        throw error;
      }

      var number;

      try {
        number = new _bignumber.default(_id);
      } catch (e) {
        throw error;
      } // Infinity


      if (!number.isFinite()) {
        throw error;
      } // NaN


      if (number.isNaN()) {
        throw error;
      }

      return _xdr_generated.default.Memo.memoId(_jsXdr.UnsignedHyper.fromString(_id));
    }
    /**
       * Creates and returns a `MEMO_HASH` memo.
       * @param {array|string} hash - 32 byte hash or hex encoded string
       * @returns {xdr.Memo}
       */

  }, {
    key: "hash",
    value: function hash(_hash) {
      var error = new Error('Expects a 32 byte hash value or hex encoded string. Got ' + _hash);

      if ((0, _isUndefined.default)(_hash)) {
        throw error;
      }

      if ((0, _isString.default)(_hash)) {
        if (!/^[0-9A-Fa-f]{64}$/g.test(_hash)) {
          throw error;
        }

        _hash = Buffer.from(_hash, 'hex');
      }

      if (!_hash.length || _hash.length !== 32) {
        throw error;
      }

      return _xdr_generated.default.Memo.memoHash(_hash);
    }
    /**
       * Creates and returns a `MEMO_RETURN` memo.
       * @param {array|string} hash - 32 byte hash or hex encoded string
       * @returns {xdr.Memo}
       */

  }, {
    key: "returnHash",
    value: function returnHash(hash) {
      var error = new Error('Expects a 32 byte hash value or hex encoded string. Got ' + hash);

      if ((0, _isUndefined.default)(hash)) {
        throw error;
      }

      if ((0, _isString.default)(hash)) {
        if (!/^[0-9A-Fa-f]{64}$/g.test(hash)) {
          throw error;
        }

        hash = Buffer.from(hash, 'hex');
      }

      if (!hash.length || hash.length !== 32) {
        throw error;
      }

      return _xdr_generated.default.Memo.memoReturn(hash);
    }
  }]);
  return Memo;
}();

exports.Memo = Memo;