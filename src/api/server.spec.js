import { ApiResponse } from './response'
import * as errors from './errors'
import * as horizonErrors from '../horizon/errors'
import mocks from '../test_helpers/mock_factory'

describe('ApiServer', () => {
  let api = mocks.tokenDSdk().api

  afterEach(() => {
    api.reset()
  })

  const responseBody = Object.freeze({
    data: {
      id: '1',
      type: 'contacts'
    }
  })

  it('Should parse responses.', async () => {
    api.onGet().reply(200, responseBody)

    let response = await api._makeCallBuilder().get()
    expect(response).to.be.an.instanceOf(ApiResponse)
  })

  it('Should convert request body to snake case.', async () => {
    api.onAny().reply((config) => {
      expect(config.data).to.equal('{"foo_bar":"barFoo"}')
      return [200, responseBody]
    })

    await api._makeCallBuilder().post({ fooBar: 'barFoo' })
  })

  it('Should convert query params to snake case.', async () => {
    api.onAny('/', { params: { 'foo_bar': 'barFoo' } })
      .reply(200, responseBody)

    await api._makeCallBuilder().get({ fooBar: 'barFoo' })
  })

  describe('errors', () => {
    let testCases = [
      {
        name: 'Bad Request',
        status: 400,
        body: { errors: [{}] },
        expectedError: errors.BadRequestError
      },
      {
        name: 'Not Allowed',
        status: 401,
        body: { errors: [{}] },
        expectedError: errors.NotAllowedError
      },
      {
        name: 'Forbidden',
        status: 403,
        body: { errors: [{}] },
        expectedError: errors.ForbiddenRequestError
      },
      {
        name: 'TFA Required',
        status: 403,
        body: { errors: [{ code: 'tfa_required' }] },
        expectedError: errors.TFARequiredError
      },
      {
        name: 'Verification Required',
        status: 403,
        body: { errors: [{ code: 'verification_required' }] },
        expectedError: errors.VerificationRequiredError
      },
      {
        name: 'Not Found',
        status: 404,
        body: { errors: [{}] },
        expectedError: errors.NotFoundError
      },
      {
        name: 'Conflict',
        status: 409,
        body: { errors: [{}] },
        expectedError: errors.ConflictError
      },
      {
        name: 'Internal Server Error',
        status: 500,
        body: { errors: [{}] },
        expectedError: errors.InternalServerError
      },
      {
        name: 'Unexpected error',
        status: 488,
        body: { errors: [{}] },
        expectedError: errors.ApiError
      },
      {
        name: 'Not Found(Horizon)',
        status: 404,
        body: { status: '404', title: 'Not Found' },
        expectedError: horizonErrors.NotFoundError
      },
      {
        name: 'Internal Server Error (Horizon)',
        status: 500,
        body: { status: '500', title: 'Internal Server Error' },
        expectedError: horizonErrors.InternalServerError
      },
      {
        name: 'Unexpected error (Horizon)',
        status: 488,
        body: { status: '488', title: 'Expect the unexpected' },
        expectedError: horizonErrors.HorizonError
      }
    ]

    testCases.forEach((testCase) => {
      it(`Should parse "${testCase.name}" error.`, async () => {
        api.onAny().reply(testCase.status, testCase.body)
        let error = await catchPromise(api._makeCallBuilder().get())
        expect(error).to.be.an.instanceOf(testCase.expectedError)
      })
    })

    it('Should bypass non-API errors.', async () => {
      api.onAny().timeout()

      let error = await catchPromise(api._makeCallBuilder().get())
      expect(error).not.to.be.an.instanceOf(errors.ApiError)
    })
  })
})
