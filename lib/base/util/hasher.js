"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hasher = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var Hasher =
/*#__PURE__*/
function () {
  function Hasher() {
    (0, _classCallCheck2.default)(this, Hasher);
  }

  (0, _createClass2.default)(Hasher, null, [{
    key: "hash",

    /**
       * Creates and returns a `xdr.Hash`.
       * @param {array|string} hash - 32 byte hash or hex encoded string
       * @returns {xdr.Hash}
       */
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

      return _hash;
    }
  }]);
  return Hasher;
}();

exports.Hasher = Hasher;