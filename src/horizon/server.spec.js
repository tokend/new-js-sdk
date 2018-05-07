import AxiosMock from 'axios-mock-adapter'
import { HorizonResponse } from './response'
import * as errors from './errors'

import { Horizon } from './server'

describe('Horizon', () => {
  let horizon
  let axiosMock

  beforeEach(() => {
    horizon = new Horizon('https://horizon.distlab.com')
    axiosMock = new AxiosMock(horizon._axios)
  })

  afterEach(() => {
    axiosMock.restore()
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
        axiosMock.onAny().reply(testCase.status)

        let error = await catchPromise(
          horizon._makeCallBuilder().get()
        )
        expect(error).to.be.an.instanceOf(testCase.expectedError)
      })
    })
  })

  it('Should parse responses.', async () => {
    const body = { foo: 'bar' }
    axiosMock.onGet().reply(200, body)

    let response = await horizon._makeCallBuilder().get()
    expect(response).to.be.an.instanceOf(HorizonResponse)
  })
})
