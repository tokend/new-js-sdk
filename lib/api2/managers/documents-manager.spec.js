"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _sinon = _interopRequireDefault(require("sinon"));

var _documentsManager = require("./documents-manager");

var _apiCaller = require("../api-caller");

describe('documents-manager unit test', function () {
  var sandbox;
  var documentsManager;
  beforeEach(function () {
    sandbox = _sinon.default.createSandbox();

    var apiCaller = _apiCaller.ApiCaller.getInstance('https://api.com');

    documentsManager = new _documentsManager.DocumentsManager({
      apiCaller: apiCaller
    });
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('method', function () {
    describe('uploadDocument', function () {
      it('calls proper methods and returns file storage key',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sandbox.stub(documentsManager, '_createDocumentAnchorConfig').resolves({
                  id: 'id',
                  url: 'https://storage.com',
                  type: 'type',
                  key: 'doc-key',
                  somePolicy: 'value'
                });
                sandbox.stub(documentsManager, '_createFileFormData').returns({
                  key: 'value'
                });
                sandbox.stub(documentsManager, '_postFormData').resolves();
                _context.next = 5;
                return documentsManager.uploadDocument({
                  type: 'type',
                  mimeType: 'mime-type',
                  file: {
                    name: 'file'
                  },
                  accountId: 'SOME_ACCOUNT_ID'
                });

              case 5:
                result = _context.sent;
                expect(result).to.equal('doc-key');
                expect(documentsManager._createDocumentAnchorConfig).calledOnceWithExactly({
                  type: 'type',
                  mimeType: 'mime-type',
                  accountId: 'SOME_ACCOUNT_ID'
                });
                expect(documentsManager._createFileFormData).calledOnceWithExactly({
                  file: {
                    name: 'file'
                  },
                  policy: {
                    key: 'doc-key',
                    somePolicy: 'value'
                  }
                });
                expect(documentsManager._postFormData).calledOnceWithExactly({
                  key: 'value'
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    });
    describe('_createDocumentAnchorConfig', function () {
      it('calls apiCaller.postWithSignature method with provided params',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var result;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sandbox.stub(documentsManager._apiCaller, 'wallet').get(function (_) {
                  return {
                    accountId: 'SOME_ACCOUNT_ID'
                  };
                });
                sandbox.stub(documentsManager._apiCaller, 'postWithSignature').resolves({
                  data: {
                    key: 'doc-key'
                  }
                });
                _context2.next = 4;
                return documentsManager._createDocumentAnchorConfig({
                  type: 'doc-type',
                  mimeType: 'mime-type'
                });

              case 4:
                result = _context2.sent;
                expect(documentsManager._apiCaller.postWithSignature).to.have.been.calledOnceWithExactly('/documents', {
                  data: {
                    type: 'doc-type',
                    attributes: {
                      content_type: 'mime-type'
                    },
                    relationships: {
                      owner: {
                        data: {
                          id: 'SOME_ACCOUNT_ID'
                        }
                      }
                    }
                  }
                });
                expect(result).to.deep.equal({
                  key: 'doc-key'
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    });
    describe('_postFormData', function () {
      it('posts file form data',
      /*#__PURE__*/
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sandbox.stub(documentsManager._axios, 'post').resolves();
                documentsManager.useStorageURL('https://storage.com');
                _context3.next = 4;
                return documentsManager._postFormData({
                  key: 'value'
                });

              case 4:
                expect(documentsManager._axios.post).calledOnceWithExactly('https://storage.com', {
                  key: 'value'
                }, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
    });
  });
});