"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ApiResponse = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _url_helper = require("../utils/url_helper");

var _lodash = require("lodash");

var _case_converter = require("../utils/case_converter");

var _response_base = require("../response_base");

/**
 * API response wrapper.
 *
 * @class
 */
var ApiResponse =
/*#__PURE__*/
function (_ResponseBase) {
  (0, _inherits2.default)(ApiResponse, _ResponseBase);

  /**
   * Wrap a raw axios.js response object.
   *
   * @constructor
   * @param {object} rawResponse Raw axios.js response object.
   * @param {TokenD} sdk TokenD instance.
   */
  function ApiResponse(rawResponse, sdk) {
    var _this;

    (0, _classCallCheck2.default)(this, ApiResponse);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ApiResponse).call(this, rawResponse));
    _this._sdk = sdk;

    _this._parseResponse(rawResponse);

    return _this;
  }
  /**
   * Get response data.
   *
   * @override
   */


  (0, _createClass2.default)(ApiResponse, [{
    key: "_parseResponse",
    value: function _parseResponse(response) {
      var _this2 = this;

      // NOTE: API follows the JSON API spec
      if (response.status === 204) {
        return;
      }

      var body = response.data;

      if ((0, _lodash.isArray)(body.data)) {
        this._data = body.data.map(function (item) {
          var parsed = _this2._parseResourceObjectData(item);

          _this2._resolveRelationships(item, parsed, body.included);

          _this2._resolveLinks(item, parsed);

          return parsed;
        });
      } else if (body.url) {
        // Legacy response on doc retrieval
        this._data = body;
      } else {
        this._data = this._parseResourceObjectData(body.data);

        this._resolveRelationships(body.data, this, body.included);
      }

      this._resolveLinks(body, this);

      this._data = (0, _case_converter.toCamelCaseDeep)(this._data);
    }
  }, {
    key: "_parseResourceObjectData",
    value: function _parseResourceObjectData(resourceObject) {
      var data = {
        id: resourceObject.id,
        resourceType: resourceObject.type
      };
      return (0, _assign.default)(data, resourceObject.attributes);
    }
  }, {
    key: "_resolveLinks",
    value: function _resolveLinks(source, target) {
      var _this3 = this;

      if (!source.links) {
        return;
      }

      (0, _lodash.toPairs)(source.links).forEach(function (pair) {
        var key = pair[0];
        var value = pair[1];
        var methodName = (0, _lodash.camelCase)('fetch_' + key);
        var link = (0, _lodash.isString)(value) ? value : value.href;
        target[methodName] = _this3._makeLinkCaller(link);
      });
      delete source.links;
    }
  }, {
    key: "_makeLinkCaller",
    value: function _makeLinkCaller(link) {
      var _this4 = this;

      return function () {
        var query = (0, _url_helper.parseQueryParams)(link);

        var callBuilder = _this4._sdk.api._makeCallBuilder().appendUrlSegment(link);

        if (_this4._sdk.wallet) {
          callBuilder = callBuilder.withSignature();
        }

        return callBuilder.get(query);
      };
    }
  }, {
    key: "_resolveRelationships",
    value: function _resolveRelationships(source, target) {
      var _this5 = this;

      var inclusions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (!source.relationships) {
        return;
      }

      var relationships = {};
      (0, _keys.default)(source.relationships).forEach(function (key) {
        var value = source.relationships[key];
        relationships[key] = {
          id: value.data.id,
          resourceType: value.data.type
        };

        _this5._resolveLinks(value, relationships[key]);

        if (inclusions.length) {
          _this5._findInclusion(inclusions, relationships[key]);
        }
      });
      delete source.relationships;
      target.relationships = (0, _case_converter.toCamelCaseDeep)(relationships);
    }
  }, {
    key: "_findInclusion",
    value: function _findInclusion(inclusions, target) {
      var inclusion = inclusions.find(function (i) {
        return i.type === target.resourceType && i.id === target.id;
      });

      if (inclusion) {
        target.attributes = inclusion.attributes;
      }
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }]);
  return ApiResponse;
}(_response_base.ResponseBase);

exports.ApiResponse = ApiResponse;