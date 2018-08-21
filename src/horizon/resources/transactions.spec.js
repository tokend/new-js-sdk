import mocks from '../../test_helpers/mock_factory'
import { HorizonResponse } from '../response'
import { SUBMIT_TRANSACTION_TIMEOUT } from './transactions'
import { Transaction } from '../../base/transaction'
import {
  testRequestSignature,
  testGetRequest
} from './generic_test_cases.spec'

describe('Transactions', () => {
  const sdk = mocks.tokenDSdk()
  const horizon = sdk.horizon
  const resourceGroup = horizon.transactions

  const transactionId = '68719480833'

  afterEach(() => {
    sdk.horizon.reset()
  })

  describe('.submit', () => {
    const envelope = 'AAAAAMvhDB7bKaRbwoJe12CHgE5S6u04Hrj7NHJfuQYRVF2SAAAAAAAAAAAAAAAAAAAAAAAAAABa4YTFAAAAAAAAAAEAAAAAAAAACwAAAAAAAAAAAAAAAAAAAANSVEsAAAAAABxxsbIBflvnblgRbh/x+FJnbZiUO4JNs6EC7uEsplhdAAAALpDt0AAAAAAAAAAAAAAAAAAAAABUeyJuYW1lIjoiUi1Db2luIiwibG9nbyI6eyJrZXkiOiIiLCJ0eXBlIjoiIn0sInRlcm1zIjp7ImtleSI6IiIsInR5cGUiOiIiLCJuYW1lIjoiIn19AAAAAAAAAAAAAAAAAAAAASymWF0AAABAM7pWrpFZT+pYlCidEDPT/3oZ+64RORGxt4Z0FsiiwjjbnbVpFHhLHZR8w8to5Z2SV3nm0FjIQEDmEfxiI+osAg=='

    it('Should submit transaction.', async () => {
      let tx = new Transaction(envelope)

      sdk.horizon
        .onPost('/transactions')
        .reply(config => {
          expect(config.timeout).to.equal(SUBMIT_TRANSACTION_TIMEOUT)
          expect(config.data).equal(JSON.stringify({ tx: envelope }))

          return [200, sdk.horizon.makeGenericResponse()]
        })

      let response = await sdk.horizon.transactions.submit(tx)

      expect(response).to.be.an.instanceOf(HorizonResponse)
    })
  })

  describe('.get', () => {
    const method = 'get'

    testGetRequest({
      title: `get the transaction by ID`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [transactionId],
      path: `/transactions/${transactionId}`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      args: [transactionId],
      path: `/transactions/${transactionId}`
    })
  })

  describe('.getPage', () => {
    const method = 'getPage'

    const query = Object.freeze({
      order: 'asc',
      cursor: '242343242342',
      limit: 20
    })

    testGetRequest({
      title: `get the page of transactions`,
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      path: `/transactions`
    })

    testRequestSignature({
      horizon: horizon,
      resourceGroup,
      method,
      args: [query],
      params: query,
      path: `/transactions`
    })
  })
})
