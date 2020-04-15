"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _lodash = require("lodash");

var _mock_factory = _interopRequireDefault(require("../test_helpers/mock_factory"));

var _response = require("./response");

describe('ApiResponse', function () {
  var rawSingleItemResponse = (0, _freeze.default)({
    data: {
      type: 'articles',
      id: '1',
      attributes: {
        title: 'foo',
        text: 'bar'
      },
      relationships: {
        author: {
          links: {
            self: '/authors/1'
          },
          data: {
            id: 1,
            type: 'authors'
          }
        }
      }
    }
  });
  var rawCollectionResponse = (0, _freeze.default)({
    links: {
      self: '/articles?page=1',
      next: '/articles?page=2'
    },
    data: [{
      links: {
        self: {
          href: '/articles/1'
        }
      },
      type: 'articles',
      id: '1',
      attributes: {
        title: 'JSON API paints my bikeshed!'
      },
      relationships: {
        author: {
          links: {
            self: '/authors/1'
          },
          data: {
            id: 1,
            type: 'authors'
          }
        }
      }
    }, {
      links: {
        self: '/articles/2'
      },
      type: 'articles',
      id: '2',
      attributes: {
        title: 'Rails is Omakase'
      },
      relationships: {
        author: {
          links: {
            self: '/authors/1'
          },
          data: {
            id: 1,
            type: 'authors'
          }
        }
      }
    }]
  });

  var sdk = _mock_factory.default.tokenDSdk();

  var singleItemResponse;
  var collectionResponse;
  beforeEach(function () {
    singleItemResponse = new _response.ApiResponse({
      data: (0, _lodash.cloneDeep)(rawSingleItemResponse)
    }, sdk);
    collectionResponse = new _response.ApiResponse({
      data: (0, _lodash.cloneDeep)(rawCollectionResponse)
    }, sdk);
  });
  afterEach(function () {
    sdk.api.reset();
  });
  describe('.constructor', function () {
    it('Should extract a single item response data.', function () {
      expect(singleItemResponse).to.have.a.property('data').jsonEqual({
        id: '1',
        resourceType: 'articles',
        title: 'foo',
        text: 'bar'
      });
    });
    it('Should extract a collection response data.', function () {
      expect(collectionResponse).to.have.a.property('data').jsonEqual([{
        id: '1',
        resourceType: 'articles',
        title: 'JSON API paints my bikeshed!',
        relationships: {
          author: {
            id: 1,
            resourceType: 'authors'
          }
        }
      }, {
        id: '2',
        resourceType: 'articles',
        title: 'Rails is Omakase',
        relationships: {
          author: {
            id: 1,
            resourceType: 'authors'
          }
        }
      }]);
    });
    it('Should parse legacy document retrieval response.', function () {
      var rawLegacyResponse = (0, _freeze.default)({
        url: 'https://foo.bar/fdsfdsfdsfd'
      });
      var response = new _response.ApiResponse({
        data: rawLegacyResponse
      });
      expect(response).to.have.a.property('data').jsonEqual(rawLegacyResponse);
    });
    it('Should resolve root level links.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var params, nextResponse;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expect(collectionResponse).to.have.a.property('fetchSelf').a('function');
              expect(collectionResponse).to.have.a.property('fetchNext').a('function');
              params = {
                page: '2'
              };
              sdk.api.onGet("/articles", {
                params: params
              }).reply(200, (0, _lodash.cloneDeep)(rawCollectionResponse));
              _context.next = 6;
              return collectionResponse.fetchNext();

            case 6:
              nextResponse = _context.sent;
              expect(nextResponse).to.be.an.instanceOf(_response.ApiResponse);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('Should resolve links in collection items.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var selfResponse;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              expect(collectionResponse.data[0]).to.have.a.property('fetchSelf').a('function');
              sdk.api.onGet("/articles/1").reply(200, (0, _lodash.cloneDeep)(rawSingleItemResponse));
              _context2.next = 4;
              return collectionResponse.data[0].fetchSelf();

            case 4:
              selfResponse = _context2.sent;
              expect(selfResponse).to.be.an.instanceOf(_response.ApiResponse);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('Should resolve root level relationships.', function () {
      expect(singleItemResponse.relationships).to.have.a.property('author').jsonEqual({
        id: 1,
        resourceType: 'authors'
      });
    });
    it('Should resolve relationships in the collection items.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              expect(collectionResponse.data[0].relationships).to.have.a.property('author').jsonEqual({
                id: 1,
                resourceType: 'authors'
              });

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should resolve included relationships', function () {
      var rawResponse = (0, _lodash.cloneDeep)(rawSingleItemResponse);
      rawResponse.included = [{
        id: 1,
        type: 'authors',
        attributes: {
          first_name: 'John',
          last_name: 'Doe',
          age: 45
        }
      }];
      var response = new _response.ApiResponse({
        data: rawResponse
      }, sdk);
      expect(response.relationships).to.have.a.property('author').jsonEqual({
        id: 1,
        resourceType: 'authors',
        attributes: {
          firstName: 'John',
          lastName: 'Doe',
          age: 45
        }
      });
    });
    it('Should resolve included relationships', function () {
      var rawResponse = (0, _lodash.cloneDeep)(rawCollectionResponse);
      rawResponse.included = [{
        id: 1,
        type: 'authors',
        attributes: {
          first_name: 'John',
          last_name: 'Doe',
          age: 45
        }
      }];
      var response = new _response.ApiResponse({
        data: rawResponse
      }, sdk);
      expect(response.data[0].relationships).to.have.a.property('author').jsonEqual({
        id: 1,
        resourceType: 'authors',
        attributes: {
          firstName: 'John',
          lastName: 'Doe',
          age: 45
        }
      });
      expect(response.data[1].relationships).to.have.a.property('author').jsonEqual({
        id: 1,
        resourceType: 'authors',
        attributes: {
          firstName: 'John',
          lastName: 'Doe',
          age: 45
        }
      });
    });
    it('Should resolve relationship links',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      var selfResponse;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              expect(singleItemResponse.relationships.author).to.have.a.property('fetchSelf').a('function');
              sdk.api.onGet("/authors/1").reply(200, (0, _lodash.cloneDeep)(rawSingleItemResponse));
              _context4.next = 4;
              return singleItemResponse.relationships.author.fetchSelf();

            case 4:
              selfResponse = _context4.sent;
              expect(selfResponse).to.be.an.instanceOf(_response.ApiResponse);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Should sign link requests if a wallet is present.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5() {
      var nextResponse;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              sdk.api.onAny().reply(function (config) {
                if (!config.authorized) {
                  return [401];
                }

                return [200, sdk.api.makeGenericResponse()];
              });
              _context5.next = 3;
              return collectionResponse.fetchNext();

            case 3:
              nextResponse = _context5.sent;
              expect(nextResponse).to.be.an.instanceOf(_response.ApiResponse);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('Should perform link requests w/o signature if no wallet provided.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6() {
      var nextResponse;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              sdk.ejectWallet();
              sdk.api.onAny().reply(200, sdk.api.makeGenericResponse());
              _context6.next = 4;
              return collectionResponse.fetchNext();

            case 4:
              nextResponse = _context6.sent;
              expect(nextResponse).to.be.an.instanceOf(_response.ApiResponse);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  it('Should parse 204(No Content)', function () {
    var noContentResponse = {
      status: 204,
      data: ''
    };
    expectNoThrow(function () {
      return new _response.ApiResponse(noContentResponse, sdk.api);
    });
  });
});