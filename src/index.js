// TokenD classes to expose
import * as commonErrors from './errors'
import { errors as apiErrors } from './api'
import { errors as horizonErrors } from './horizon'

export * from './tokend_sdk'
export { default as base } from './base'

// Typed errors
export const errors = {
  common: commonErrors,
  api: apiErrors,
  horizon: horizonErrors
}
