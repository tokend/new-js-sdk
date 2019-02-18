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
    const envelope = 'AAAAAEbAFnrmnfA9KAdoytnSJKQrGsyrC4nrCcU6I3XrBS7mAAAAAAAAAAIAAAAAAAAAAD//////////AAAAAAAAAAEAAAAAAAAAAAAAAADvhLukBQ6Bf9K9FW3OZjokDIc2UAYfQZzHF+Ncc2MiPQAAAAAAAAAAAAAAAwAAAAIAAAAAHYbV2UX7KElUBiZls6aX8XnwaxwFtwq9KHLkvQzscH4AAAAAAAAAAQAAA+gAAAABAAAAAnt9AAAAAAAAAAAAAO+Eu6QFDoF/0r0Vbc5mOiQMhzZQBh9BnMcX41xzYyI9AAAAAAAAAAEAAAPoAAAAAQAAAAJ7fQAAAAAAAAAAAAAAAAAAAAAAAesFLuYAAABAdgSjRrVGvQnxnJkwTItNPXOON+We1qflBpxISI9vrfFIDa75bHgPKlce6LyynPkgOt1hQTYGVoVklBJ/Fh6dDw=='

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
