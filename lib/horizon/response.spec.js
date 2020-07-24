"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _lodash = require("lodash");

var _mock_factory = _interopRequireDefault(require("../test_helpers/mock_factory"));

var _response = require("./response");

describe('HorizonResponse', function () {
  var sdk;
  var singleItemResponse;
  var collectionResponse;
  var rawSingleItemResponse = (0, _freeze.default)({
    '_links': {
      'self': {
        'href': 'https://invest-dev.swarm.fund/transactions/3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7'
      },
      'account': {
        'href': 'https://invest-dev.swarm.fund/accounts/GDF6CDA63MU2IW6CQJPNOYEHQBHFF2XNHAPLR6ZUOJP3SBQRKROZFO7Z'
      },
      'ledger': {
        'href': 'https://invest-dev.swarm.fund/ledgers/31357'
      },
      'operations': {
        'href': 'https://invest-dev.swarm.fund/transactions/3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7/operations{?cursor,limit,order}',
        'templated': true
      },
      'precedes': {
        'href': "https://invest-dev.swarm.fund/transactions?order=asc&cursor=134677289504768"
      },
      'succeeds': {
        'href': "https://invest-dev.swarm.fund/transactions?order=desc&cursor=134677289504768"
      }
    },
    'id': '3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7',
    'paging_token': '134677289504768',
    'hash': '3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7',
    'ledger': 31357,
    'created_at': '2018-04-06T13:38:08Z',
    'source_account': 'GDF6CDA63MU2IW6CQJPNOYEHQBHFF2XNHAPLR6ZUOJP3SBQRKROZFO7Z',
    'fee_paid': 0,
    'operation_count': 1,
    'envelope_xdr': 'AAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAAAAAAAAAAAAAAAAAAAAAABa0KSwAAAAAAAAAAEAAAAAAAAACwAAAAAAAAAAAAAAAAAAAANFVEgAAAAAAFQobTOCPd0s7Q7xGP+q2K8Cw/+f2OYbn2p8+JEVTr1bf/////////8AAAAAAAAAAAAAABoAAABweyJuYW1lIjoiRVRIIG5hbWUiLCJsb2dvIjp7InVybCI6ImxvZ29fdXJsIiwidHlwZSI6ImxvZ29fdHlwZSIsImtleSI6IiJ9LCJ0ZXJtcyI6eyJrZXkiOiIiLCJ0eXBlIjoiIiwibmFtZSI6IiJ9fQAAAAAAAAAAAAAAAAAAAAERVF2SAAAAQOr0aTEb2vVfj1l+edTjXgBr5BrdyzWaDgsyDuxPh97bQbLcUBbQCk+BKOMNq2dbpzkHHt+weEZ9B1PlGRvEdAM=',
    'result_xdr': 'AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAALAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAA',
    'result_meta_xdr': 'AAAAAAAAAAEAAAAGAAAAAAAAen0AAAAPAAAAAAAAAAGcG4WW0K0ZHgfVtXOmUjHG2f/MemyqXoczDKt+1zc0IwAAAADL4Qwe2ymkW8KCXtdgh4BOUurtOB64+zRyX7kGEVRdkgAAAAAAAAAAy+EMHtsppFvCgl7XYIeATlLq7TgeuPs0cl+5BhFUXZIAAAABAAAAA0VUSAAAAAAAWsd4QAAAAAAAAAADRVRIAAAAAABUKG0zgj3dLO0O8Rj/qtivAsP/n9jmG59qfPiRFU69W3//////////AAAAAAAAAAAAAAAaAAAAcHsibmFtZSI6IkVUSCBuYW1lIiwibG9nbyI6eyJ1cmwiOiJsb2dvX3VybCIsInR5cGUiOiJsb2dvX3R5cGUiLCJrZXkiOiIifSwidGVybXMiOnsia2V5IjoiIiwidHlwZSI6IiIsIm5hbWUiOiIifX0AAAAAAAAAAAAAAAAAAAACAAAADwAAAAAAAAABAAAAAAAAAAAAAHp9AAAABAAAAABHpRUSjLeMcIkCxDSDaMsUhga+5qbpX/JFqj2BAo80FwAAAANFVEgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAen0AAAAEAAAAAH78X5ySesJbjkK71KTVdWimtDYGofp92YhC5WA52c6PAAAAA0VUSAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6fQAAAAQAAAAAh9w/WJWp/tJVxKFhtgK3kPf33AU3/eM7FwdmKCK9Y4cAAAADRVRIAAAAAADL4Qwe2ymkW8KCXtdgh4BOUurtOB64+zRyX7kGEVRdkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHp9AAAABgAAAANFVEgAAAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAFQobTOCPd0s7Q7xGP+q2K8Cw/+f2OYbn2p8+JEVTr1bAAAAcHsibmFtZSI6IkVUSCBuYW1lIiwibG9nbyI6eyJ1cmwiOiJsb2dvX3VybCIsInR5cGUiOiJsb2dvX3R5cGUiLCJrZXkiOiIifSwidGVybXMiOnsia2V5IjoiIiwidHlwZSI6IiIsIm5hbWUiOiIifX1//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAAA==',
    'fee_meta_xdr': 'AAAAAA==',
    'memo_type': 'none',
    'signatures': ['6vRpMRva9V+PWX551ONeAGvkGt3LNZoOCzIO7E+H3ttBstxQFtAKT4Eo4w2rZ1unOQce37B4Rn0HU+UZG8R0Aw=='],
    'valid_after': '1970-01-01T00:00:00Z',
    'valid_before': '2018-04-13T12:38:09Z'
  });
  var rawCollectionResponse = (0, _freeze.default)({
    '_links': {
      'self': {
        'href': 'https://invest-dev.swarm.fund/transactions?order=asc&limit=10&cursor='
      },
      'next': {
        'href': 'https://invest-dev.swarm.fund/transactions?order=asc&limit=10&cursor=134810433495040'
      },
      'prev': {
        'href': 'https://invest-dev.swarm.fund/transactions?order=desc&limit=10&cursor=134677289504768'
      }
    },
    '_embedded': {
      'meta': {
        'latest_ledger': {
          'sequence': 31388,
          'closed_at': '2018-04-06T13:40:43Z'
        }
      },
      'records': [{
        '_links': {
          'self': {
            'href': 'https://invest-dev.swarm.fund/transactions/3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7'
          },
          'account': {
            'href': 'https://invest-dev.swarm.fund/accounts/GDF6CDA63MU2IW6CQJPNOYEHQBHFF2XNHAPLR6ZUOJP3SBQRKROZFO7Z'
          },
          'ledger': {
            'href': 'https://invest-dev.swarm.fund/ledgers/31357'
          },
          'operations': {
            'href': 'https://invest-dev.swarm.fund/transactions/3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7/operations{?cursor,limit,order}',
            'templated': true
          },
          'precedes': {
            'href': "https://invest-dev.swarm.fund/transactions?order=asc&cursor=134677289504768"
          },
          'succeeds': {
            'href': "https://invest-dev.swarm.fund/transactions?order=desc&cursor=134677289504768"
          }
        },
        'id': '3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7',
        'paging_token': '134677289504768',
        'hash': '3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7',
        'ledger': 31357,
        'created_at': '2018-04-06T13:38:08Z',
        'source_account': 'GDF6CDA63MU2IW6CQJPNOYEHQBHFF2XNHAPLR6ZUOJP3SBQRKROZFO7Z',
        'fee_paid': 0,
        'operation_count': 1,
        'envelope_xdr': 'AAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAAAAAAAAAAAAAAAAAAAAAABa0KSwAAAAAAAAAAEAAAAAAAAACwAAAAAAAAAAAAAAAAAAAANFVEgAAAAAAFQobTOCPd0s7Q7xGP+q2K8Cw/+f2OYbn2p8+JEVTr1bf/////////8AAAAAAAAAAAAAABoAAABweyJuYW1lIjoiRVRIIG5hbWUiLCJsb2dvIjp7InVybCI6ImxvZ29fdXJsIiwidHlwZSI6ImxvZ29fdHlwZSIsImtleSI6IiJ9LCJ0ZXJtcyI6eyJrZXkiOiIiLCJ0eXBlIjoiIiwibmFtZSI6IiJ9fQAAAAAAAAAAAAAAAAAAAAERVF2SAAAAQOr0aTEb2vVfj1l+edTjXgBr5BrdyzWaDgsyDuxPh97bQbLcUBbQCk+BKOMNq2dbpzkHHt+weEZ9B1PlGRvEdAM=',
        'result_xdr': 'AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAALAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAA',
        'result_meta_xdr': 'AAAAAAAAAAEAAAAGAAAAAAAAen0AAAAPAAAAAAAAAAGcG4WW0K0ZHgfVtXOmUjHG2f/MemyqXoczDKt+1zc0IwAAAADL4Qwe2ymkW8KCXtdgh4BOUurtOB64+zRyX7kGEVRdkgAAAAAAAAAAy+EMHtsppFvCgl7XYIeATlLq7TgeuPs0cl+5BhFUXZIAAAABAAAAA0VUSAAAAAAAWsd4QAAAAAAAAAADRVRIAAAAAABUKG0zgj3dLO0O8Rj/qtivAsP/n9jmG59qfPiRFU69W3//////////AAAAAAAAAAAAAAAaAAAAcHsibmFtZSI6IkVUSCBuYW1lIiwibG9nbyI6eyJ1cmwiOiJsb2dvX3VybCIsInR5cGUiOiJsb2dvX3R5cGUiLCJrZXkiOiIifSwidGVybXMiOnsia2V5IjoiIiwidHlwZSI6IiIsIm5hbWUiOiIifX0AAAAAAAAAAAAAAAAAAAACAAAADwAAAAAAAAABAAAAAAAAAAAAAHp9AAAABAAAAABHpRUSjLeMcIkCxDSDaMsUhga+5qbpX/JFqj2BAo80FwAAAANFVEgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAen0AAAAEAAAAAH78X5ySesJbjkK71KTVdWimtDYGofp92YhC5WA52c6PAAAAA0VUSAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6fQAAAAQAAAAAh9w/WJWp/tJVxKFhtgK3kPf33AU3/eM7FwdmKCK9Y4cAAAADRVRIAAAAAADL4Qwe2ymkW8KCXtdgh4BOUurtOB64+zRyX7kGEVRdkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHp9AAAABgAAAANFVEgAAAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAFQobTOCPd0s7Q7xGP+q2K8Cw/+f2OYbn2p8+JEVTr1bAAAAcHsibmFtZSI6IkVUSCBuYW1lIiwibG9nbyI6eyJ1cmwiOiJsb2dvX3VybCIsInR5cGUiOiJsb2dvX3R5cGUiLCJrZXkiOiIifSwidGVybXMiOnsia2V5IjoiIiwidHlwZSI6IiIsIm5hbWUiOiIifX1//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAAA==',
        'fee_meta_xdr': 'AAAAAA==',
        'memo_type': 'none',
        'signatures': ['6vRpMRva9V+PWX551ONeAGvkGt3LNZoOCzIO7E+H3ttBstxQFtAKT4Eo4w2rZ1unOQce37B4Rn0HU+UZG8R0Aw=='],
        'valid_after': '1970-01-01T00:00:00Z',
        'valid_before': '2018-04-13T12:38:09Z'
      }]
    }
  });
  beforeEach(function () {
    sdk = _mock_factory.default.tokenDSdk();
    singleItemResponse = new _response.HorizonResponse({
      data: (0, _lodash.cloneDeep)(rawSingleItemResponse)
    }, sdk);
    collectionResponse = new _response.HorizonResponse({
      data: (0, _lodash.cloneDeep)(rawCollectionResponse)
    }, sdk);
  });
  afterEach(function () {
    sdk.horizon.reset();
  });
  describe('.constructor', function () {
    it('Should unwrap single entry response data.', function () {
      expect(singleItemResponse).to.have.a.property('data').jsonEqual({
        id: '3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7',
        pagingToken: '134677289504768',
        hash: '3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7',
        ledger: 31357,
        createdAt: '2018-04-06T13:38:08Z',
        sourceAccount: 'GDF6CDA63MU2IW6CQJPNOYEHQBHFF2XNHAPLR6ZUOJP3SBQRKROZFO7Z',
        feePaid: 0,
        operationCount: 1,
        envelopeXdr: 'AAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAAAAAAAAAAAAAAAAAAAAAABa0KSwAAAAAAAAAAEAAAAAAAAACwAAAAAAAAAAAAAAAAAAAANFVEgAAAAAAFQobTOCPd0s7Q7xGP+q2K8Cw/+f2OYbn2p8+JEVTr1bf/////////8AAAAAAAAAAAAAABoAAABweyJuYW1lIjoiRVRIIG5hbWUiLCJsb2dvIjp7InVybCI6ImxvZ29fdXJsIiwidHlwZSI6ImxvZ29fdHlwZSIsImtleSI6IiJ9LCJ0ZXJtcyI6eyJrZXkiOiIiLCJ0eXBlIjoiIiwibmFtZSI6IiJ9fQAAAAAAAAAAAAAAAAAAAAERVF2SAAAAQOr0aTEb2vVfj1l+edTjXgBr5BrdyzWaDgsyDuxPh97bQbLcUBbQCk+BKOMNq2dbpzkHHt+weEZ9B1PlGRvEdAM=',
        resultXdr: 'AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAALAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAA',
        resultMetaXdr: 'AAAAAAAAAAEAAAAGAAAAAAAAen0AAAAPAAAAAAAAAAGcG4WW0K0ZHgfVtXOmUjHG2f/MemyqXoczDKt+1zc0IwAAAADL4Qwe2ymkW8KCXtdgh4BOUurtOB64+zRyX7kGEVRdkgAAAAAAAAAAy+EMHtsppFvCgl7XYIeATlLq7TgeuPs0cl+5BhFUXZIAAAABAAAAA0VUSAAAAAAAWsd4QAAAAAAAAAADRVRIAAAAAABUKG0zgj3dLO0O8Rj/qtivAsP/n9jmG59qfPiRFU69W3//////////AAAAAAAAAAAAAAAaAAAAcHsibmFtZSI6IkVUSCBuYW1lIiwibG9nbyI6eyJ1cmwiOiJsb2dvX3VybCIsInR5cGUiOiJsb2dvX3R5cGUiLCJrZXkiOiIifSwidGVybXMiOnsia2V5IjoiIiwidHlwZSI6IiIsIm5hbWUiOiIifX0AAAAAAAAAAAAAAAAAAAACAAAADwAAAAAAAAABAAAAAAAAAAAAAHp9AAAABAAAAABHpRUSjLeMcIkCxDSDaMsUhga+5qbpX/JFqj2BAo80FwAAAANFVEgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAen0AAAAEAAAAAH78X5ySesJbjkK71KTVdWimtDYGofp92YhC5WA52c6PAAAAA0VUSAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6fQAAAAQAAAAAh9w/WJWp/tJVxKFhtgK3kPf33AU3/eM7FwdmKCK9Y4cAAAADRVRIAAAAAADL4Qwe2ymkW8KCXtdgh4BOUurtOB64+zRyX7kGEVRdkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHp9AAAABgAAAANFVEgAAAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAFQobTOCPd0s7Q7xGP+q2K8Cw/+f2OYbn2p8+JEVTr1bAAAAcHsibmFtZSI6IkVUSCBuYW1lIiwibG9nbyI6eyJ1cmwiOiJsb2dvX3VybCIsInR5cGUiOiJsb2dvX3R5cGUiLCJrZXkiOiIifSwidGVybXMiOnsia2V5IjoiIiwidHlwZSI6IiIsIm5hbWUiOiIifX1//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAAA==',
        feeMetaXdr: 'AAAAAA==',
        memoType: 'none',
        signatures: ['6vRpMRva9V+PWX551ONeAGvkGt3LNZoOCzIO7E+H3ttBstxQFtAKT4Eo4w2rZ1unOQce37B4Rn0HU+UZG8R0Aw=='],
        validAfter: '1970-01-01T00:00:00Z',
        validBefore: '2018-04-13T12:38:09Z'
      });
    });
    it('Should unwrap collection response data.', function () {
      expect(collectionResponse).to.have.a.property('data').jsonEqual([{
        id: '3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7',
        pagingToken: '134677289504768',
        hash: '3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7',
        ledger: 31357,
        createdAt: '2018-04-06T13:38:08Z',
        sourceAccount: 'GDF6CDA63MU2IW6CQJPNOYEHQBHFF2XNHAPLR6ZUOJP3SBQRKROZFO7Z',
        feePaid: 0,
        operationCount: 1,
        envelopeXdr: 'AAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAAAAAAAAAAAAAAAAAAAAAABa0KSwAAAAAAAAAAEAAAAAAAAACwAAAAAAAAAAAAAAAAAAAANFVEgAAAAAAFQobTOCPd0s7Q7xGP+q2K8Cw/+f2OYbn2p8+JEVTr1bf/////////8AAAAAAAAAAAAAABoAAABweyJuYW1lIjoiRVRIIG5hbWUiLCJsb2dvIjp7InVybCI6ImxvZ29fdXJsIiwidHlwZSI6ImxvZ29fdHlwZSIsImtleSI6IiJ9LCJ0ZXJtcyI6eyJrZXkiOiIiLCJ0eXBlIjoiIiwibmFtZSI6IiJ9fQAAAAAAAAAAAAAAAAAAAAERVF2SAAAAQOr0aTEb2vVfj1l+edTjXgBr5BrdyzWaDgsyDuxPh97bQbLcUBbQCk+BKOMNq2dbpzkHHt+weEZ9B1PlGRvEdAM=',
        resultXdr: 'AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAALAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAA',
        resultMetaXdr: 'AAAAAAAAAAEAAAAGAAAAAAAAen0AAAAPAAAAAAAAAAGcG4WW0K0ZHgfVtXOmUjHG2f/MemyqXoczDKt+1zc0IwAAAADL4Qwe2ymkW8KCXtdgh4BOUurtOB64+zRyX7kGEVRdkgAAAAAAAAAAy+EMHtsppFvCgl7XYIeATlLq7TgeuPs0cl+5BhFUXZIAAAABAAAAA0VUSAAAAAAAWsd4QAAAAAAAAAADRVRIAAAAAABUKG0zgj3dLO0O8Rj/qtivAsP/n9jmG59qfPiRFU69W3//////////AAAAAAAAAAAAAAAaAAAAcHsibmFtZSI6IkVUSCBuYW1lIiwibG9nbyI6eyJ1cmwiOiJsb2dvX3VybCIsInR5cGUiOiJsb2dvX3R5cGUiLCJrZXkiOiIifSwidGVybXMiOnsia2V5IjoiIiwidHlwZSI6IiIsIm5hbWUiOiIifX0AAAAAAAAAAAAAAAAAAAACAAAADwAAAAAAAAABAAAAAAAAAAAAAHp9AAAABAAAAABHpRUSjLeMcIkCxDSDaMsUhga+5qbpX/JFqj2BAo80FwAAAANFVEgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAen0AAAAEAAAAAH78X5ySesJbjkK71KTVdWimtDYGofp92YhC5WA52c6PAAAAA0VUSAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6fQAAAAQAAAAAh9w/WJWp/tJVxKFhtgK3kPf33AU3/eM7FwdmKCK9Y4cAAAADRVRIAAAAAADL4Qwe2ymkW8KCXtdgh4BOUurtOB64+zRyX7kGEVRdkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHp9AAAABgAAAANFVEgAAAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAFQobTOCPd0s7Q7xGP+q2K8Cw/+f2OYbn2p8+JEVTr1bAAAAcHsibmFtZSI6IkVUSCBuYW1lIiwibG9nbyI6eyJ1cmwiOiJsb2dvX3VybCIsInR5cGUiOiJsb2dvX3R5cGUiLCJrZXkiOiIifSwidGVybXMiOnsia2V5IjoiIiwidHlwZSI6IiIsIm5hbWUiOiIifX1//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAAA==',
        feeMetaXdr: 'AAAAAA==',
        memoType: 'none',
        signatures: ['6vRpMRva9V+PWX551ONeAGvkGt3LNZoOCzIO7E+H3ttBstxQFtAKT4Eo4w2rZ1unOQce37B4Rn0HU+UZG8R0Aw=='],
        validAfter: '1970-01-01T00:00:00Z',
        validBefore: '2018-04-13T12:38:09Z'
      }]);
    });
    it('Should resolve root level links.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var expectedProperties, linkedResponse;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              expectedProperties = ['fetchNext', 'fetchPrev', 'fetchSelf'];
              expectedProperties.forEach(function (prop) {
                expect(collectionResponse).to.have.property(prop).and.to.be.a('function');
              }); // Follow a link

              sdk.horizon.onGet("/transactions", {
                params: {
                  order: 'asc',
                  limit: '10',
                  cursor: '134810433495040'
                }
              }).reply(200, collectionResponse);
              _context.next = 5;
              return collectionResponse.fetchNext();

            case 5:
              linkedResponse = _context.sent;
              expect(linkedResponse).to.be.an.instanceOf(_response.HorizonResponse);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('Should resolve links inside the inner objects.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var linkedResponse;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sdk.horizon.onGet("/ledgers/31357").reply(200, singleItemResponse);
              _context2.next = 3;
              return collectionResponse.data[0].fetchLedger();

            case 3:
              linkedResponse = _context2.sent;
              expect(linkedResponse).to.be.an.instanceOf(_response.HorizonResponse);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('Should resolve templated links.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var params, response;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = {
                order: 'asc'
              };
              sdk.horizon.onGet("/transactions/3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7/operations", {
                params: params
              }).reply(200, collectionResponse);
              _context3.next = 4;
              return singleItemResponse.fetchOperations(params);

            case 4:
              response = _context3.sent;
              expect(response).to.be.an.instanceOf(_response.HorizonResponse);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should sign link requests if a wallet is present.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      var linkedResponse;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // Follow a link
              sdk.horizon.onAny().reply(function (config) {
                if (!config.authorized) {
                  return [401];
                }

                return [200, sdk.horizon.makeGenericResponse()];
              });
              _context4.next = 3;
              return collectionResponse.fetchNext();

            case 3:
              linkedResponse = _context4.sent;
              expect(linkedResponse).to.be.an.instanceOf(_response.HorizonResponse);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Should perform link requests w/o signature if no wallet provided.',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5() {
      var linkedResponse;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              sdk.ejectWallet(); // Follow a link

              sdk.horizon.onAny().reply(200, sdk.horizon.makeGenericResponse());
              _context5.next = 4;
              return collectionResponse.fetchNext();

            case 4:
              linkedResponse = _context5.sent;
              expect(linkedResponse).to.be.an.instanceOf(_response.HorizonResponse);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});