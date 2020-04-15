"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.parseJsonapiResponse = parseJsonapiResponse;
exports.JsonapiResponse = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _jsona = _interopRequireDefault(require("jsona"));

var _lodash = require("lodash");

var _case_converter = require("../../utils/case_converter");

var _urijs = _interopRequireDefault(require("urijs"));

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
   * @param {ApiCaller} api - Instance of api that made the request
   */
  function JsonapiResponse(rawResponse, api) {
    (0, _classCallCheck2.default)(this, JsonapiResponse);
    this._api = api;
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
    key: "makeLinkCallers",
    value: function makeLinkCallers(api) {
      var _this = this;

      var _loop = function _loop() {
        var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var methodName = (0, _lodash.camelCase)('fetch_' + key);
        var link = (0, _lodash.isString)(value) ? value : value.href;

        _this[methodName] = function (_) {
          return api.get(link);
        };
      };

      for (var _i = 0, _Object$entries = (0, _entries.default)(this.links); _i < _Object$entries.length; _i++) {
        _loop();
      }
    }
  }, {
    key: "makeLinkCallersWithSignature",
    value: function makeLinkCallersWithSignature(api) {
      var _this2 = this;

      var _loop2 = function _loop2() {
        var _Object$entries3$_i = (0, _slicedToArray2.default)(_Object$entries3[_i2], 2),
            key = _Object$entries3$_i[0],
            value = _Object$entries3$_i[1];

        var methodName = (0, _lodash.camelCase)('fetch_' + key);
        var link = (0, _lodash.isString)(value) ? value : value.href;
        var url = (0, _urijs.default)(link);
        var path = url.path();
        var query = url.search(true);

        _this2[methodName] = function (_) {
          return api.getWithSignature(path, query);
        };
      };

      for (var _i2 = 0, _Object$entries3 = (0, _entries.default)(this.links); _i2 < _Object$entries3.length; _i2++) {
        _loop2();
      }
    }
  }, {
    key: "_parseResponse",
    value: function _parseResponse(response) {
      if (response.status === 204) {
        return;
      }

      var formatter = new _jsona.default({
        DeserializeCache: DeserializeCacheStub
      });
      var parsed = formatter.deserialize(response.data);
      this._data = (0, _case_converter.toCamelCaseDeep)(parsed);
    }
  }, {
    key: "_parseLinks",
    value: function _parseLinks(response) {
      if (response.data && response.data.links) {
        this._links = response.data.links;
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
}(); // A stub class implementing Jsona IDeserealizeCache interface.
//
// The purpose of using this stub is disabling caching when resolving
// response relationships. It prevents root data to be recursively
// included into resolved relationship structure.
//
// Example of JSON file:
// {
//   "data": {
//     "id": "foo",
//     "type": "bar",
//     "relationships": {
//       "fizz": {
//         "id": "foo",
//         "type": "bar"
//       }
//     }
//   }
// }


exports.JsonapiResponse = JsonapiResponse;

var DeserializeCacheStub =
/*#__PURE__*/
function () {
  function DeserializeCacheStub() {
    (0, _classCallCheck2.default)(this, DeserializeCacheStub);
  }

  (0, _createClass2.default)(DeserializeCacheStub, [{
    key: "getCachedModel",
    value: function getCachedModel(data) {
      return null;
    }
  }, {
    key: "handleModel",
    value: function handleModel(model, data) {}
  }, {
    key: "createCacheKey",
    value: function createCacheKey(data) {
      return '';
    }
  }]);
  return DeserializeCacheStub;
}();