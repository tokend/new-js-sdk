import { HorizonResponse } from './response'
import * as errors from './errors'
import { TFARequiredError } from '../api/errors'
import mocks from '../test_helpers/mock_factory'

describe('HorizonServer', () => {
  let horizon = mocks.tokenDSdk().horizon

  afterEach(() => {
    horizon.reset()
  })

  describe('.getNetworkDetails', () => {
    it('Should get network details.', async () => {
      horizon.onGet('/').reply(200, horizon.makeGenericResponse)
      let response = await horizon.getNetworkDetails()
      expect(response).to.be.an.instanceOf(HorizonResponse)
    })
  })

  describe('Error parsers.', () => {
    const testCases = [
      {
        name: 'Bad Request',
        status: 400,
        body: {
          title: 'Bad Request',
          details: 'Bad Request'
        },
        expectedError: errors.BadRequestError
      },
      {
        name: 'Unauthorized',
        status: 401,
        body: {
          title: 'Unauthorized',
          details: 'Unauthorized'
        },
        expectedError: errors.UnauthorizedError
      },
      {
        name: 'Not Found',
        status: 404,
        body: {
          title: 'Not Found',
          details: 'Not Found'
        },
        expectedError: errors.NotFoundError
      },
      {
        name: 'Internal Server Error',
        status: 500,
        body: {
          title: 'Internal Server Error',
          details: 'Internal Server Error'
        },
        expectedError: errors.InternalServerError
      }
    ]

    testCases.forEach(testCase => {
      it(`Should parse and wrap "${testCase.name}" error.`, async () => {
        horizon.onAny().reply(testCase.status, testCase.body)

        let error = await catchPromise(
          horizon._makeCallBuilder().get()
        )
        expect(error).to.be.an.instanceOf(testCase.expectedError)
      })
    })

    it('Should parse error details.', async () => {
      let rawError = {
        title: 'Bad request',
        details: 'Details',
        extras: {
          tx: 'tsfsdfsd',
          tx_hash: 'le hash'
        }
      }

      horizon.onAny().reply(400, rawError)

      let error = await catchPromise(horizon._makeCallBuilder().get())

      expect(error).to.have.a.property('detail').equal(rawError.details)
      expect(error).to.have.a.property('meta').deep.equal({
        tx: rawError.extras.tx,
        txHash: rawError.extras.tx_hash
      })
    })

    it('Should parse 2FA errors from the API.', async () => {
      horizon.onAny().reply(403, {
        errors: [{
          title: '2FA required.',
          details: '2FA required.'
        }]
      })

      let error = await catchPromise(horizon._makeCallBuilder().get())

      expect(error).to.be.an.instanceOf(TFARequiredError)
    })
  })

  it('Should parse responses.', async () => {
    const body = { foo: 'bar' }
    horizon.onGet().reply(200, body)

    let response = await horizon._makeCallBuilder().get()
    expect(response).to.be.an.instanceOf(HorizonResponse)
  })
})
