"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJsonapiResponse = parseJsonapiResponse;
exports.JsonapiResponse = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _jsona = _interopRequireDefault(require("jsona"));

var _case_converter = require("../../utils/case_converter");

function parseJsonapiResponse(response) {
  return new JsonapiResponse(response);
}
/**
 * API response wrapper.
 *
 * @class
 */


var JsonapiResponse =
/*#__PURE__*/
function () {
  /**
   * Wrap a raw axios.js response object.
   *
   * @constructor
   * @param {object} rawResponse Raw axios.js response object.
   */
  function JsonapiResponse(rawResponse) {
    (0, _classCallCheck2.default)(this, JsonapiResponse);
    this._rawResponse = rawResponse;

    this._parseResponse(rawResponse);

    this._parseLinks(rawResponse);
  }
  /**
   * Get response data.
   */


  (0, _createClass2.default)(JsonapiResponse, [{
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
    key: "_parseResponse",
    value: function _parseResponse(response) {
      if (response.status === 204) {
        return;
      }

      var formatter = new _jsona.default();
      var parsed = formatter.deserialize(response);
      this._data = (0, _case_converter.toCamelCaseDeep)(parsed);
    }
  }, {
    key: "_parseLinks",
    value: function _parseLinks(response) {
      if (response.links) {
        this._links = response.links;
      } else {
        this._links = {};
      }
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
    /**
     * Get response links.
     */

  }, {
    key: "links",
    get: function get() {
      return this._links;
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
  return JsonapiResponse;
}();

exports.JsonapiResponse = JsonapiResponse;