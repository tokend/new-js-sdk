"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponseBase = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

/**
 * Base class for request responses.
 *
 * @class
 */
var ResponseBase =
/*#__PURE__*/
function () {
  /**
   * Wrap a raw axios.js response object.
   *
   * @param {object} rawResponse Raw axios.js response object.
   */
  function ResponseBase(rawResponse) {
    (0, _classCallCheck2.default)(this, ResponseBase);
    this._rawResponse = rawResponse;
  }
  /**
   * Get response data.
   */


  (0, _createClass2.default)(ResponseBase, [{
    key: "toJSON",

    /**
     * Override JSON serialization.
     *
     * @return {object} Data to be serialized.
     */
    value: function toJSON() {
      return this.data;
    }
  }, {
    key: "data",
    get: function get() {
      return this._rawResponse.data;
    }
    /**
     * Get response HTTP status.
     */

  }, {
    key: "httpStatus",
    get: function get() {
      return this._rawResponse.status;
    }
    /**
     * Get response headers.
     */

  }, {
    key: "headers",
    get: function get() {
      return this._rawResponse.headers;
    }
  }]);
  return ResponseBase;
}();

exports.ResponseBase = ResponseBase;