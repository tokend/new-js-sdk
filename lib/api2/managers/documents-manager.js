"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.DocumentsManager = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _formData = _interopRequireDefault(require("form-data"));

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _apiCaller = require("../api-caller");

var _errors = require("../../errors");

var HEADER_CONTENT_TYPE = 'Content-Type';
var MIME_TYPE_MULTIPART_FORM_DATA = 'multipart/form-data';
/**
 * DocumentsManager uploads a document to the storage server
 */

var DocumentsManager =
/*#__PURE__*/
function () {
  /**
   * @param {object} opts
   * @param {ApiCaller} [opts.apiCaller] API caller instance.
   * @param {string} [opts.storageURL] Storage base URL.
   */
  function DocumentsManager() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, DocumentsManager);
    this._axios = _axios.default.create();

    if (opts.apiCaller) {
      this.useApi(opts.apiCaller);
    }

    if (opts.storageURL) {
      this.useStorageURL(opts.storageURL);
    }
  }
  /**
   * Use an API caller to create document's config.
   *
   * @param {ApiCaller} api API caller instance.
   */


  (0, _createClass2.default)(DocumentsManager, [{
    key: "useApi",
    value: function useApi(api) {
      if (!(api instanceof _apiCaller.ApiCaller)) {
        throw new TypeError('An ApiCaller instance expected');
      }

      this._apiCaller = api;
    }
    /**
     * Use a storage URL to upload documents.
     *
     * @param {string} url Storage base URL.
     */

  }, {
    key: "useStorageURL",
    value: function useStorageURL(url) {
      this._storageURL = url;
    }
    /**
     * Returns document URL by provided storage key.
     *
     * @param {string} key File storage key.
     *
     * @return {string} - Document URL
     */

  }, {
    key: "getDocumentUrlByKey",
    value: function getDocumentUrlByKey(key) {
      if (key) {
        return "".concat(this._storageURL, "/").concat(key);
      } else {
        return '';
      }
    }
    /**
     * Uploads the document into storage
     *
     * @param {object} opts
     * @param {string} opts.type - Type of the document
     * (!! nothing common with MIME-type)
     * @param {string} opts.mimeType - MIME-type of the file being uploaded
     * @param {ArrayBuffer} opts.file - File itself
     * @param {string} [accountId] - Document's owner account ID.
     * User wallet's account ID by default
     *
     * @return {string} - File storage key
     */

  }, {
    key: "uploadDocument",
    value: function () {
      var _uploadDocument = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_ref) {
        var type, mimeType, file, accountId, config, formData;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                type = _ref.type, mimeType = _ref.mimeType, file = _ref.file, accountId = _ref.accountId;
                _context.next = 3;
                return this._createDocumentAnchorConfig({
                  type: type,
                  mimeType: mimeType,
                  accountId: accountId
                });

              case 3:
                config = _context.sent;
                formData = this._createFileFormData({
                  file: file,
                  policy: (0, _omit2.default)(config, ['id', 'url', 'type'])
                });
                _context.next = 7;
                return this._postFormData(formData);

              case 7:
                return _context.abrupt("return", config.key);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function uploadDocument(_x) {
        return _uploadDocument.apply(this, arguments);
      }

      return uploadDocument;
    }()
  }, {
    key: "_createDocumentAnchorConfig",
    value: function () {
      var _createDocumentAnchorConfig2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_ref2) {
        var type, mimeType, accountId, _ref3, config;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                type = _ref2.type, mimeType = _ref2.mimeType, accountId = _ref2.accountId;
                _context2.next = 3;
                return this._apiCaller.postWithSignature('/documents', {
                  data: {
                    type: type,
                    attributes: {
                      content_type: mimeType
                    },
                    relationships: {
                      owner: {
                        data: {
                          id: accountId || this._apiCaller.wallet.accountId
                        }
                      }
                    }
                  }
                });

              case 3:
                _ref3 = _context2.sent;
                config = _ref3.data;
                return _context2.abrupt("return", config);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _createDocumentAnchorConfig(_x2) {
        return _createDocumentAnchorConfig2.apply(this, arguments);
      }

      return _createDocumentAnchorConfig;
    }()
  }, {
    key: "_createFileFormData",
    value: function _createFileFormData(_ref4) {
      var file = _ref4.file,
          policy = _ref4.policy;
      var formData = new _formData.default();

      for (var key in policy) {
        formData.append((0, _kebabCase2.default)(key), policy[key]);
      }

      formData.append('file', file);
      return formData;
    }
  }, {
    key: "_postFormData",
    value: function () {
      var _postFormData2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(formData) {
        var config;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                config = {
                  headers: (0, _defineProperty2.default)({}, HEADER_CONTENT_TYPE, MIME_TYPE_MULTIPART_FORM_DATA)
                };
                _context3.prev = 1;
                _context3.next = 4;
                return this._axios.post(this._storageURL, formData, config);

              case 4:
                _context3.next = 9;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](1);
                throw new _errors.StorageServerError(_context3.t0, this._axios);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 6]]);
      }));

      function _postFormData(_x3) {
        return _postFormData2.apply(this, arguments);
      }

      return _postFormData;
    }()
  }]);
  return DocumentsManager;
}();

exports.DocumentsManager = DocumentsManager;