import { expect } from 'chai'

export function catchPromise (promise) {
  return promise
    .then(() => {
      expect.fail('resolved', 'rejected', 'This promise expected to be rejected but resolved successfully.')
    })
    .catch((err) => {
      return err
    })
}

export function expectThrow (func) {
  try {
    func()
    expect.fail('throw', 'no throw', 'The function is expected to throw.')
  } catch (err) {
  }
}

export function expectNoThrow (func) {
  try {
    func()
  } catch (err) {
    expect.fail('no throw', 'throw', 'The function is expected to not throw.')
  }
}

/**
 * @param promise - promise to check
 * @param [err] - can be provided to check rejection for specific error type. Leave blank
 * to ensure that promise was not rejected
 * @return {*}
 */
export function shouldNotBeRejected (promise, err) {
  return promise.should.not.be.rejectedWith(err)
}
