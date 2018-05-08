import { HorizonResponse } from './response'
import * as errors from './errors'
import mocks from '../test_helpers/mock_factory'

describe('Horizon', () => {
  let horizon = mocks.tokenDSdk().horizon

  afterEach(() => {
    horizon.reset()
  })

  describe('Error parsers.', () => {
    const testCases = [
      {
        name: 'Bad Request',
        status: 400,
        expectedError: errors.BadRequestError
      },
      {
        name: 'Unauthorized',
        status: 401,
        expectedError: errors.UnauthorizedError
      },
      {
        name: 'Not Found',
        status: 404,
        expectedError: errors.NotFoundError
      },
      {
        name: 'Internal Server Error',
        status: 500,
        expectedError: errors.InternalServerError
      }
    ]

    testCases.forEach(testCase => {
      it(`Should parse and wrap "${testCase.name}" error.`, async () => {
        horizon.onAny().reply(testCase.status)

        let error = await catchPromise(
          horizon._makeCallBuilder().get()
        )
        expect(error).to.be.an.instanceOf(testCase.expectedError)
      })
    })
  })

  it('Should parse responses.', async () => {
    const body = { foo: 'bar' }
    horizon.onGet().reply(200, body)

    let response = await horizon._makeCallBuilder().get()
    expect(response).to.be.an.instanceOf(HorizonResponse)
  })
})
