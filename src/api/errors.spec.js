import * as errors from './errors'

describe('ApiErrors', () => {
  describe('.constructor', () => {
    let testCases = [
      {
        name: 'Bad Request',
        originalError: { status: '400' },
        expectedError: errors.BadRequestError
      },
      {
        name: 'Not Allowed',
        originalError: { status: '401' },
        expectedError: errors.NotAllowedError
      },
      {
        name: 'Forbidden',
        originalError: { status: '403' },
        expectedError: errors.ForbiddenRequestError
      },
      {
        name: 'TFA Required',
        originalError: { status: '403', code: 'tfa_required' },
        expectedError: errors.TFARequiredError
      },
      {
        name: 'Verification Required',
        originalError: { status: '403', code: 'verification_required' },
        expectedError: errors.VerificationRequiredError
      },
      {
        name: 'Not Found',
        originalError: { status: '404' },
        expectedError: errors.NotFoundError
      },
      {
        name: 'Conflict',
        originalError: { status: '409' },
        expectedError: errors.ConflictError
      },
      {
        name: 'Internal Server Error',
        originalError: { status: '500' },
        expectedError: errors.InternalServerError
      },
      {
        name: 'Unexpected error',
        originalError: { status: '488' },
        expectedError: errors.ApiError
      }
    ]

    testCases.forEach((testCase) => {
      it(`Should parse "${testCase.name}" error.`, () => {
        let error = new errors.ApiErrors({
          errors: [testCase.originalError]
        })
        expect(error.errors[0])
          .to.be.an.instanceOf(testCase.expectedError)
      })
    })
  })
})
