"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerErrorBase = exports.TimeoutError = exports.NetworkError = void 0;

var _create = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/create"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-prototype-of"));

var _setPrototypeOf = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/set-prototype-of"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _construct = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/reflect/construct"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

function _extendableBuiltin5(cls) {
  function ExtendableBuiltin() {
    var instance = (0, _construct.default)(cls, (0, _from.default)(arguments));
    (0, _setPrototypeOf.default)(instance, (0, _getPrototypeOf2.default)(this));
    return instance;
  }

  ExtendableBuiltin.prototype = (0, _create.default)(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (_setPrototypeOf.default) {
    (0, _setPrototypeOf.default)(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

function _extendableBuiltin3(cls) {
  function ExtendableBuiltin() {
    var instance = (0, _construct.default)(cls, (0, _from.default)(arguments));
    (0, _setPrototypeOf.default)(instance, (0, _getPrototypeOf2.default)(this));
    return instance;
  }

  ExtendableBuiltin.prototype = (0, _create.default)(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (_setPrototypeOf.default) {
    (0, _setPrototypeOf.default)(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = (0, _construct.default)(cls, (0, _from.default)(arguments));
    (0, _setPrototypeOf.default)(instance, (0, _getPrototypeOf2.default)(this));
    return instance;
  }

  ExtendableBuiltin.prototype = (0, _create.default)(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (_setPrototypeOf.default) {
    (0, _setPrototypeOf.default)(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

/**
 * Network error.
 *
 * @class
 */
var NetworkError =
/*#__PURE__*/
function (_extendableBuiltin2) {
  (0, _inherits2.default)(NetworkError, _extendableBuiltin2);

  function NetworkError(message, data) {
    var _this;

    (0, _classCallCheck2.default)(this, NetworkError);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(NetworkError).call(this, message));
    _this.data = data;
    return _this;
  }

  return NetworkError;
}(_extendableBuiltin(Error));

exports.NetworkError = NetworkError;
;
/**
 * Request timeout error.
 *
 * @class
 */

var TimeoutError =
/*#__PURE__*/
function (_extendableBuiltin4) {
  (0, _inherits2.default)(TimeoutError, _extendableBuiltin4);

  function TimeoutError(message, data) {
    var _this2;

    (0, _classCallCheck2.default)(this, TimeoutError);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(TimeoutError).call(this, message));
    _this2.data = data;
    return _this2;
  }

  return TimeoutError;
}(_extendableBuiltin3(Error));
/**
 * Base class for server errors.
 */


exports.TimeoutError = TimeoutError;

var ServerErrorBase =
/*#__PURE__*/
function (_extendableBuiltin6) {
  (0, _inherits2.default)(ServerErrorBase, _extendableBuiltin6);

  /**
   * Wrap a raw axios error.
   *
   * @param {object} originalError Raw axios response.
   * @param {axios} axios Axios instance used for request.
   */
  function ServerErrorBase(originalError, axios) {
    var _this3;

    (0, _classCallCheck2.default)(this, ServerErrorBase);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(ServerErrorBase).call(this, originalError.message));
    _this3.originalError = originalError;
    _this3._axios = axios;
    return _this3;
  }
  /**
   * Response HTTP status.
   */


  (0, _createClass2.default)(ServerErrorBase, [{
    key: "retryRequest",

    /**
     * Retry the failed request.
     * Use it to retry requests after 2FA.
     */
    value: function retryRequest() {
      var config = this.originalError.config;
      return this._axios(config);
    }
  }, {
    key: "httpStatus",
    get: function get() {
      return this.originalError.response.status;
    }
    /**
     * Error meta.
     */

  }, {
    key: "meta",
    get: function get() {
      return this._meta;
    }
    /**
     * A short, human-readable summary of the problem.
     */

  }, {
    key: "title",
    get: function get() {
      return this._title;
    }
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     */

  }, {
    key: "detail",
    get: function get() {
      return this._detail;
    }
  }]);
  return ServerErrorBase;
}(_extendableBuiltin5(Error));

exports.ServerErrorBase = ServerErrorBase;