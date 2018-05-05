import { isString, isArray } from 'lodash'
import crypto from 'crypto'

export function hash (data) {
  let hasher = crypto.createHash('sha256')

  if (isString(data)) {
    data = Buffer.from(data, 'utf8')
  } else if (isArray(data)) {
    data = Buffer.from(data)
  }
  hasher.update(data)

  return hasher.digest()
}
