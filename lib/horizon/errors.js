"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalServerError = exports.NotFoundError = exports.UnauthorizedError = exports.BadRequestError = exports.HorizonError = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _errors = require("../errors");

var _case_converter = require("../utils/case_converter");

/**
 * Generic Horizon error response.
 *
 * @class
 */
var HorizonError =
/*#__PURE__*/
function (_ServerErrorBase) {
  (0, _inherits2.default)(HorizonError, _ServerErrorBase);

  /**
   * Wrap a raw axios error.
   *
   * @param {object} originalError Raw axios response.
   * @param {axios} axios Axios instance used for request.
   */
  function HorizonError(originalError, axios) {
    var _this;

    (0, _classCallCheck2.default)(this, HorizonError);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HorizonError).call(this, originalError, axios));
    var response = originalError.response.data;
    _this._detail = response.details;
    _this._title = response.title;

    if (response.extras) {
      _this._meta = (0, _case_converter.toCamelCaseDeep)(response.extras);
    }

    return _this;
  }

  return HorizonError;
}(_errors.ServerErrorBase);
/**
 * Horizon 400(BadRequest) error.
 *
 * @class
 */


exports.HorizonError = HorizonError;

var BadRequestError =
/*#__PURE__*/
function (_HorizonError) {
  (0, _inherits2.default)(BadRequestError, _HorizonError);

  function BadRequestError() {
    (0, _classCallCheck2.default)(this, BadRequestError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BadRequestError).apply(this, arguments));
  }

  return BadRequestError;
}(HorizonError);
/**
 * Horizon 401(Unauthorized) error.
 *
 * @class
 */


exports.BadRequestError = BadRequestError;

var UnauthorizedError =
/*#__PURE__*/
function (_HorizonError2) {
  (0, _inherits2.default)(UnauthorizedError, _HorizonError2);

  function UnauthorizedError() {
    (0, _classCallCheck2.default)(this, UnauthorizedError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UnauthorizedError).apply(this, arguments));
  }

  return UnauthorizedError;
}(HorizonError);
/**
 * Horizon 404(Not Found) error.
 *
 * @class
 */


exports.UnauthorizedError = UnauthorizedError;

var NotFoundError =
/*#__PURE__*/
function (_HorizonError3) {
  (0, _inherits2.default)(NotFoundError, _HorizonError3);

  function NotFoundError() {
    (0, _classCallCheck2.default)(this, NotFoundError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NotFoundError).apply(this, arguments));
  }

  return NotFoundError;
}(HorizonError);
/**
 * Horizon 500(Internal Server Error) error.
 *
 * @class
 */


exports.NotFoundError = NotFoundError;

var InternalServerError =
/*#__PURE__*/
function (_HorizonError4) {
  (0, _inherits2.default)(InternalServerError, _HorizonError4);

  function InternalServerError() {
    (0, _classCallCheck2.default)(this, InternalServerError);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InternalServerError).apply(this, arguments));
  }

  return InternalServerError;
}(HorizonError);

exports.InternalServerError = InternalServerError;