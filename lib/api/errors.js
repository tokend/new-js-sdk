"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalServerError = exports.ConflictError = exports.NotFoundError = exports.VerificationRequiredError = exports.TFARequiredError = exports.ForbiddenRequestError = exports.NotAllowedError = exports.BadRequestError = exports.ApiError = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _errors = require("../errors");

var _case_converter = require("../utils/case_converter");

/**
 * Generic API error response.
 */
var ApiError =
/*#__PURE__*/
function (_ServerErrorBase) {
  (0, _inherits2.default)(ApiError, _ServerErrorBase);

  /**
   * Wrap a raw API error response.
   *
   * @constructor
   *
   * @param {Error} originalError Original error response.
   * @param {axios} axios Axios instance used for the request.
   */
  function ApiError(originalError, axios) {
    var _this;

    (0, _classCallCheck2.default)(this, ApiError);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ApiError).call(this, originalError, axios));
    var unwrappedError = originalError.response.data.errors[0];
    _this._title = unwrappedError.title;
    _this._detail = unwrappedError.detail;
    _this._meta = (0, _case_converter.toCamelCaseDeep)(unwrappedError.meta || {});
    return _this;
  }

  return ApiError;
}(_errors.ServerErrorBase);
/**
 * "Bad Request" error.
 * `error.nestedErrors` may contain per-field errors.
 *
 * @export
 * @class
 */


exports.ApiError = ApiError;

var BadRequestError =
/*#__PURE__*/
function (_ApiError) {
  (0, _inherits2.default)(BadRequestError, _ApiError);

  /**
   * Wrap a raw API error response.
   *
   * @constructor
   *
   * @param {Error} originalError Original error response.
   * @param {axios} axios Axios instance used for the request.
   */
  function BadRequestError(originalError, axios) {
    var _this2;

    (0, _classCallCheck2.default)(this, BadRequestError);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BadRequestError).call(this, originalError, axios));
    var errors = originalError.response.data.errors;

    if (errors.length > 1) {
      _this2._title = 'Request contains some errors.';
      _this2._detail = 'Request contains some errors. Check "nestedErrors"';
      _this2._nestedErrors = errors.map(function (err) {
        return {
          title: err.title,
          detail: err.detail,
          meta: (0, _case_converter.toCamelCaseDeep)(err.meta)
        };
      });
    }

    return _this2;
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
}(ApiError);
/**
 * User is not allowed to perform this action.
 *
 * @export
 * @class
 */


exports.BadRequestError = BadRequestError;

var NotAllowedError =
/*#__PURE__*/
function (_ApiError2) {
  (0, _inherits2.default)(NotAllowedError, _ApiError2);

  function NotAllowedError() {
    (0, _classCallCheck2.default)(this, NotAllowedError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NotAllowedError).apply(this, arguments));
  }

  return NotAllowedError;
}(ApiError);
/**
 * Forbidden.
 *
 * @export
 * @class
 */


exports.NotAllowedError = NotAllowedError;

var ForbiddenRequestError =
/*#__PURE__*/
function (_ApiError3) {
  (0, _inherits2.default)(ForbiddenRequestError, _ApiError3);

  function ForbiddenRequestError() {
    (0, _classCallCheck2.default)(this, ForbiddenRequestError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ForbiddenRequestError).apply(this, arguments));
  }

  return ForbiddenRequestError;
}(ApiError);
/**
 * Two Factor auth required.
 *
 * @export
 * @class
 */


exports.ForbiddenRequestError = ForbiddenRequestError;

var TFARequiredError =
/*#__PURE__*/
function (_ApiError4) {
  (0, _inherits2.default)(TFARequiredError, _ApiError4);

  function TFARequiredError() {
    (0, _classCallCheck2.default)(this, TFARequiredError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TFARequiredError).apply(this, arguments));
  }

  return TFARequiredError;
}(ApiError);
/**
 * Account verification required.
 *
 * @export
 * @class
 */


exports.TFARequiredError = TFARequiredError;

var VerificationRequiredError =
/*#__PURE__*/
function (_ApiError5) {
  (0, _inherits2.default)(VerificationRequiredError, _ApiError5);

  function VerificationRequiredError() {
    (0, _classCallCheck2.default)(this, VerificationRequiredError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(VerificationRequiredError).apply(this, arguments));
  }

  return VerificationRequiredError;
}(ApiError);
/**
 * The requested resource was not found.
 *
 * @export
 * @class
 */


exports.VerificationRequiredError = VerificationRequiredError;

var NotFoundError =
/*#__PURE__*/
function (_ApiError6) {
  (0, _inherits2.default)(NotFoundError, _ApiError6);

  function NotFoundError() {
    (0, _classCallCheck2.default)(this, NotFoundError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NotFoundError).apply(this, arguments));
  }

  return NotFoundError;
}(ApiError);
/**
 * The request could not be completed due to a conflict with the current state of the target resource.
 *
 * @export
 * @class
 */


exports.NotFoundError = NotFoundError;

var ConflictError =
/*#__PURE__*/
function (_ApiError7) {
  (0, _inherits2.default)(ConflictError, _ApiError7);

  function ConflictError() {
    (0, _classCallCheck2.default)(this, ConflictError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConflictError).apply(this, arguments));
  }

  return ConflictError;
}(ApiError);
/**
 * Internal server error.
 *
 * @export
 * @class
 */


exports.ConflictError = ConflictError;

var InternalServerError =
/*#__PURE__*/
function (_ApiError8) {
  (0, _inherits2.default)(InternalServerError, _ApiError8);

  function InternalServerError() {
    (0, _classCallCheck2.default)(this, InternalServerError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InternalServerError).apply(this, arguments));
  }

  return InternalServerError;
}(ApiError);

exports.InternalServerError = InternalServerError;