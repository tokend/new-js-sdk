"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedError = exports.InternalServerError = exports.ConflictError = exports.NotFoundError = exports.VerificationRequiredError = exports.TFARequiredError = exports.ForbiddenRequestError = exports.NotAllowedError = exports.BadRequestError = exports.ServerError = exports.ServerErrorBase = exports.TimeoutError = exports.NetworkError = void 0;

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

var _case_converter = require("./utils/case_converter");

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
  }, {
    key: "requestPath",
    get: function get() {
      return this.originalError.response.request.path;
    }
  }]);
  return ServerErrorBase;
}(_extendableBuiltin5(Error));
/**
 * Generic server error response.
 */


exports.ServerErrorBase = ServerErrorBase;

var ServerError =
/*#__PURE__*/
function (_ServerErrorBase) {
  (0, _inherits2.default)(ServerError, _ServerErrorBase);

  function ServerError(originalError, axios) {
    var _this4;

    (0, _classCallCheck2.default)(this, ServerError);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(ServerError).call(this, originalError, axios));
    var unwrappedError = originalError.response.data.errors[0];
    _this4._title = unwrappedError.title;
    _this4._detail = unwrappedError.detail;
    _this4._meta = (0, _case_converter.toCamelCaseDeep)(unwrappedError.meta || {});
    return _this4;
  }

  return ServerError;
}(ServerErrorBase);
/**
 * "Bad Request" error.
 * `error.nestedErrors` may contain per-field errors.
 *
 * @export
 * @class
 */


exports.ServerError = ServerError;

var BadRequestError =
/*#__PURE__*/
function (_ServerError) {
  (0, _inherits2.default)(BadRequestError, _ServerError);

  /**
   * Wrap a raw API error response.
   *
   * @constructor
   *
   * @param {Error} originalError Original error response.
   * @param {axios} axios Axios instance used for the request.
   */
  function BadRequestError(originalError, axios) {
    var _this5;

    (0, _classCallCheck2.default)(this, BadRequestError);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(BadRequestError).call(this, originalError, axios));
    var errors = originalError.response.data.errors;

    if (errors.length > 1) {
      _this5._title = 'Request contains some errors.';
      _this5._detail = 'Request contains some errors. Check "nestedErrors"';
      _this5._nestedErrors = errors.map(function (err) {
        return {
          title: err.title,
          detail: err.detail,
          meta: (0, _case_converter.toCamelCaseDeep)(err.meta)
        };
      });
    }

    return _this5;
  }
  /**
   * Errors for every invalid field.
   */


  (0, _createClass2.default)(BadRequestError, [{
    key: "nestedErrors",
    get: function get() {
      return this._nestedErrors;
    }
  }]);
  return BadRequestError;
}(ServerError);
/**
 * User is not allowed to perform this action.
 *
 * @export
 * @class
 */


exports.BadRequestError = BadRequestError;

var NotAllowedError =
/*#__PURE__*/
function (_ServerError2) {
  (0, _inherits2.default)(NotAllowedError, _ServerError2);

  function NotAllowedError() {
    (0, _classCallCheck2.default)(this, NotAllowedError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(NotAllowedError).apply(this, arguments));
  }

  return NotAllowedError;
}(ServerError);
/**
 * Forbidden.
 *
 * @export
 * @class
 */


exports.NotAllowedError = NotAllowedError;

var ForbiddenRequestError =
/*#__PURE__*/
function (_ServerError3) {
  (0, _inherits2.default)(ForbiddenRequestError, _ServerError3);

  function ForbiddenRequestError() {
    (0, _classCallCheck2.default)(this, ForbiddenRequestError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(ForbiddenRequestError).apply(this, arguments));
  }

  return ForbiddenRequestError;
}(ServerError);
/**
 * Two Factor auth required.
 *
 * @export
 * @class
 */


exports.ForbiddenRequestError = ForbiddenRequestError;

var TFARequiredError =
/*#__PURE__*/
function (_ServerError4) {
  (0, _inherits2.default)(TFARequiredError, _ServerError4);

  function TFARequiredError() {
    (0, _classCallCheck2.default)(this, TFARequiredError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(TFARequiredError).apply(this, arguments));
  }

  return TFARequiredError;
}(ServerError);
/**
 * Account verification required.
 *
 * @export
 * @class
 */


exports.TFARequiredError = TFARequiredError;

var VerificationRequiredError =
/*#__PURE__*/
function (_ServerError5) {
  (0, _inherits2.default)(VerificationRequiredError, _ServerError5);

  function VerificationRequiredError() {
    (0, _classCallCheck2.default)(this, VerificationRequiredError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(VerificationRequiredError).apply(this, arguments));
  }

  return VerificationRequiredError;
}(ServerError);
/**
 * The requested resource was not found.
 *
 * @export
 * @class
 */


exports.VerificationRequiredError = VerificationRequiredError;

var NotFoundError =
/*#__PURE__*/
function (_ServerError6) {
  (0, _inherits2.default)(NotFoundError, _ServerError6);

  function NotFoundError() {
    (0, _classCallCheck2.default)(this, NotFoundError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(NotFoundError).apply(this, arguments));
  }

  return NotFoundError;
}(ServerError);
/**
 * The request could not be completed due to a conflict with the current state of the target resource.
 *
 * @export
 * @class
 */


exports.NotFoundError = NotFoundError;

var ConflictError =
/*#__PURE__*/
function (_ServerError7) {
  (0, _inherits2.default)(ConflictError, _ServerError7);

  function ConflictError() {
    (0, _classCallCheck2.default)(this, ConflictError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(ConflictError).apply(this, arguments));
  }

  return ConflictError;
}(ServerError);
/**
 * Internal server error (500)
 *
 * @export
 * @class
 */


exports.ConflictError = ConflictError;

var InternalServerError =
/*#__PURE__*/
function (_ServerError8) {
  (0, _inherits2.default)(InternalServerError, _ServerError8);

  function InternalServerError() {
    (0, _classCallCheck2.default)(this, InternalServerError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(InternalServerError).apply(this, arguments));
  }

  return InternalServerError;
}(ServerError);
/**
 * Horizon 401(Unauthorized) error.
 *
 * @class
 */


exports.InternalServerError = InternalServerError;

var UnauthorizedError =
/*#__PURE__*/
function (_ServerError9) {
  (0, _inherits2.default)(UnauthorizedError, _ServerError9);

  function UnauthorizedError() {
    (0, _classCallCheck2.default)(this, UnauthorizedError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(UnauthorizedError).apply(this, arguments));
  }

  return UnauthorizedError;
}(ServerError);

exports.UnauthorizedError = UnauthorizedError;