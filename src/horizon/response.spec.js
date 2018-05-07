import { cloneDeep } from 'lodash'
import mocks from '../test_helpers/mock_factory'
import { HorizonResponse } from './response'

describe('HorizonResponse', () => {
  let horizon
  let singleItemResponse
  let collectionResponse

  const rawSingleItemResponse = Object.freeze({
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
        'href': 'https://invest-dev.swarm.fund/transactions?order=asc\u0026cursor=134677289504768'
      },
      'succeeds': {
        'href': 'https://invest-dev.swarm.fund/transactions?order=desc\u0026cursor=134677289504768'
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
    'signatures': [
      '6vRpMRva9V+PWX551ONeAGvkGt3LNZoOCzIO7E+H3ttBstxQFtAKT4Eo4w2rZ1unOQce37B4Rn0HU+UZG8R0Aw=='
    ],
    'valid_after': '1970-01-01T00:00:00Z',
    'valid_before': '2018-04-13T12:38:09Z'
  })
  const rawCollectionResponse = Object.freeze({
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
      'records': [
        {
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
              'href': 'https://invest-dev.swarm.fund/transactions?order=asc\u0026cursor=134677289504768'
            },
            'succeeds': {
              'href': 'https://invest-dev.swarm.fund/transactions?order=desc\u0026cursor=134677289504768'
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
          'signatures': [
            '6vRpMRva9V+PWX551ONeAGvkGt3LNZoOCzIO7E+H3ttBstxQFtAKT4Eo4w2rZ1unOQce37B4Rn0HU+UZG8R0Aw=='
          ],
          'valid_after': '1970-01-01T00:00:00Z',
          'valid_before': '2018-04-13T12:38:09Z'
        }
      ]
    }
  })

  beforeEach(() => {
    horizon = mocks.horizon()
    singleItemResponse = new HorizonResponse(
      { data: cloneDeep(rawSingleItemResponse) },
      horizon
    )
    collectionResponse = new HorizonResponse(
      { data: cloneDeep(rawCollectionResponse) },
      horizon
    )
  })

  afterEach(() => {
    horizon.reset()
  })

  describe('.constructor', () => {
    it('Should unwrap single entry response data.', () => {
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
        signatures: [
          '6vRpMRva9V+PWX551ONeAGvkGt3LNZoOCzIO7E+H3ttBstxQFtAKT4Eo4w2rZ1unOQce37B4Rn0HU+UZG8R0Aw=='
        ],
        validAfter: '1970-01-01T00:00:00Z',
        validBefore: '2018-04-13T12:38:09Z'
      })
    })

    it('Should unwrap collection response data.', () => {
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
        signatures: [
          '6vRpMRva9V+PWX551ONeAGvkGt3LNZoOCzIO7E+H3ttBstxQFtAKT4Eo4w2rZ1unOQce37B4Rn0HU+UZG8R0Aw=='
        ],
        validAfter: '1970-01-01T00:00:00Z',
        validBefore: '2018-04-13T12:38:09Z'
      }])
    })

    it('Should resolve root level links.', async () => {
      let expectedProperties = [
        'fetchNext',
        'fetchPrev',
        'fetchSelf'
      ]
      expectedProperties.forEach(prop => {
        expect(collectionResponse)
          .to.have.property(prop)
          .and.to.be.a('function')
      })

      // Follow a link
      horizon
        .onGet(
          `/transactions`,
          {
            params: {
              order: 'asc',
              limit: '10',
              cursor: '134810433495040'
            }
          })
        .reply(200, collectionResponse)

      let linkedResponse = await collectionResponse.fetchNext()

      expect(linkedResponse).to.be.an.instanceOf(HorizonResponse)
    })

    it('Should resolve links inside the inner objects.', async () => {
      horizon
        .onGet(`/ledgers/31357`)
        .reply(200, singleItemResponse)

      let linkedResponse = await collectionResponse.data[0].fetchLedger()

      expect(linkedResponse).to.be.an.instanceOf(HorizonResponse)
    })

    it('Should resolve templated links.', async () => {
      let params = { order: 'asc' }

      horizon
        .onGet(
          `/transactions/3953abd11fc113c5d08aabf8aa601dc04748f636e78db341894c9c74d6dae0f7/operations`,
          { params }
        )
        .reply(200, collectionResponse)

      let response = await singleItemResponse.fetchOperations(params)

      expect(response).to.be.an.instanceOf(HorizonResponse)
    })
  })
})
