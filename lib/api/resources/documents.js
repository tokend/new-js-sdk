"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Documents = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _lodash = require("lodash");

var _case_converter = require("../../utils/case_converter");

var _resource_group_base = require("../../resource_group_base");

var types = (0, _freeze.default)({
  assetLogo: 'asset_logo',
  fundLogo: 'fund_logo',
  fundDocument: 'fund_document',
  navReport: 'nav_report'
});
var supportedMimeTypes = (0, _freeze.default)({
  pdf: 'application/pdf',
  jpeg: 'image/jpeg',
  tiff: 'image/tiff',
  png: 'image/png',
  gif: 'image/gif'
});
/**
 * Documents.
 */

var Documents =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Documents, _ResourceGroupBase);

  function Documents() {
    (0, _classCallCheck2.default)(this, Documents);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Documents).apply(this, arguments));
  }

  (0, _createClass2.default)(Documents, [{
    key: "create",

    /**
     * Create a document upload config.
     *
     * @param {string} documentType Document type.
     * @param {string} mimeType Content type.
     * @param {Buffer} data Document contents.
     *
     * @return {Promise.<Object>} Upload URL and form data.
     */
    value: function () {
      var _create = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(documentType, mimeType) {
        var response, url, formData;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._makeCallBuilder().post({
                  data: {
                    type: documentType,
                    attributes: {
                      contentType: mimeType
                    }
                  }
                });

              case 2:
                response = _context.sent;
                url = response.data.url;
                formData = (0, _lodash.omit)(response.data, ['id', 'url', 'resourceType']);
                formData = (0, _case_converter.toSnakeCaseDeep)(formData);
                return _context.abrupt("return", {
                  url: url,
                  formData: formData
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function create(_x, _x2) {
        return _create.apply(this, arguments);
      };
    }()
    /**
     * Get document details by ID.
     *
     * @param {string} documentId Document ID.
     * @return {ApiResponse} Response containing an access URL.
     */

  }, {
    key: "get",
    value: function get(documentId) {
      return this._makeCallBuilder().appendUrlSegment(documentId).get();
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('users').appendAccountId().appendUrlSegment('documents').withSignature();
    }
  }, {
    key: "types",

    /**
     * Document types.
     */
    get: function get() {
      return types;
    }
    /**
     * Supported content types.
     */

  }, {
    key: "supportedMimeTypes",
    get: function get() {
      return supportedMimeTypes;
    }
  }]);
  return Documents;
}(_resource_group_base.ResourceGroupBase);

exports.Documents = Documents;