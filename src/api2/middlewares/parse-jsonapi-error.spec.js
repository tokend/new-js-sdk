import * as errors from '../../errors'
import { parseJsonapiError } from './parse-jsonapi-error'

describe('errors', () => {
  let testCases = [
    {
      name: 'Bad Request',
      status: 400,
      data: { errors: [{}] },
      expectedError: errors.BadRequestError
    },
    {
      name: 'Not Allowed',
      status: 401,
      data: { errors: [{}] },
      expectedError: errors.NotAllowedError
    },
    {
      name: 'Forbidden',
      status: 403,
      data: { errors: [{}] },
      expectedError: errors.ForbiddenRequestError
    },
    {
      name: 'TFA Required',
      status: 403,
      data: { errors: [{ code: 'tfa_required' }] },
      expectedError: errors.TFARequiredError
    },
    {
      name: 'Verification Required',
      status: 403,
      data: { errors: [{ code: 'verification_required' }] },
      expectedError: errors.VerificationRequiredError
    },
    {
      name: 'Not Found',
      status: 404,
      data: { errors: [{}] },
      expectedError: errors.NotFoundError
    },
    {
      name: 'Conflict',
      status: 409,
      data: { errors: [{}] },
      expectedError: errors.ConflictError
    },
    {
      name: 'Internal Server Error',
      status: 500,
      data: { errors: [{}] },
      expectedError: errors.InternalServerError
    },
    {
      name: 'Unexpected error',
      status: 488,
      data: { errors: [{}] },
      expectedError: errors.ServerError
    }
  ]

  testCases.forEach((testCase) => {
    it(`Should parse "${testCase.name}" error.`, () => {
      const error = parseJsonapiError({
        response: {
          status: testCase.status,
          data: testCase.data
        }
      })

      expect(error).to.be.an.instanceOf(testCase.expectedError)
    })
  })
})
