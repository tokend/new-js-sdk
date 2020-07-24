"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.HorizonResponse = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _lodash = require("lodash");

var urlHelper = _interopRequireWildcard(require("../utils/url_helper"));

var _case_converter = require("../utils/case_converter");

var _response_base = require("../response_base");

/**
 * Horizon response wrapper.
 *
 * @class
 */
var HorizonResponse =
/*#__PURE__*/
function (_ResponseBase) {
  (0, _inherits2.default)(HorizonResponse, _ResponseBase);

  /**
   * Wrap a raw axios response.
   *
   * @param {object} rawResponse Raw axios.js response object.
   * @param {TokenD} sdk TokenD SDK instance.
   */
  function HorizonResponse(rawResponse, sdk) {
    var _this;

    (0, _classCallCheck2.default)(this, HorizonResponse);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HorizonResponse).call(this, rawResponse));
    _this._sdk = sdk;
    _this._data = rawResponse.data;
    _this._data = _this._resolveLinks(_this._data);
    _this._data = _this._unwrapCollection(_this._data);
    _this._data = (0, _case_converter.toCamelCaseDeep)(_this._data);
    return _this;
  }
  /**
   * Get response data.
   *
   * @override
   */


  (0, _createClass2.default)(HorizonResponse, [{
    key: "_resolveLinks",
    value: function _resolveLinks(data) {
      var _this2 = this;

      if (data._links) {
        (0, _lodash.toPairs)(data._links).forEach(function (pair) {
          var key = pair[0];
          var value = pair[1];
          var methodName = (0, _lodash.camelCase)('fetch_' + key);
          _this2[methodName] = _this2._makeLinkCaller(value.href, value.templated);
        });
        delete data._links;
      }

      for (var key in data) {
        this._resolveNestedLinks(data[key]);
      }

      return data;
    }
  }, {
    key: "_resolveNestedLinks",
    value: function _resolveNestedLinks(obj) {
      var _this3 = this;

      if (!((0, _lodash.isObject)(obj) || (0, _lodash.isArray)(obj))) {
        return;
      }

      if (obj._links) {
        (0, _lodash.toPairs)(obj._links).forEach(function (pair) {
          var key = pair[0];
          var value = pair[1];
          var methodName = (0, _lodash.camelCase)('fetch_' + key);
          obj[methodName] = _this3._makeLinkCaller(value.href, value.templated);
        });
        delete obj._links;
      }

      for (var key in obj) {
        this._resolveNestedLinks(obj[key]);
      }
    }
  }, {
    key: "_unwrapCollection",
    value: function _unwrapCollection(data) {
      return data._embedded ? data._embedded.records : data;
    }
  }, {
    key: "_makeLinkCaller",
    value: function _makeLinkCaller(link, templated) {
      var _this4 = this;

      return function (params) {
        if (templated) {
          link = urlHelper.resolveTemplate(link, params);
        }

        var query = urlHelper.parseQueryParams(link);

        var callBuilder = _this4._sdk.horizon._makeCallBuilder().appendUrlSegment(link);

        if (_this4._sdk.wallet) {
          callBuilder = callBuilder.withSignature();
        }

        return callBuilder.get(query);
      };
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }]);
  return HorizonResponse;
}(_response_base.ResponseBase);

exports.HorizonResponse = HorizonResponse;