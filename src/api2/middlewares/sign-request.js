import _ from 'lodash'
import uri from 'urijs'
import { hash, Keypair } from '../../base'

const HEADER_SIGNATURE = 'signature'

/**
 * @param {object} requestConfig - the config of the request
 * @param {Keypair} signerKp - keypair to sign with
 *
 * @return {object} requestConfig - modified config with header signature
 */
export function signRequest (requestConfig, signerKp) {
  if (!Keypair.isValidSecretKey(signerKp.secret())) {
    throw new Error('Invalid keypair provided')
  }

  const config = _.cloneDeep(requestConfig)

  const url = getRequestUrl(config)
  const digest = getRequestDigest(url, config)
  const signature = getRequestSignature(digest, signerKp)

  config.headers = config.headers || {}
  config.headers[HEADER_SIGNATURE] = signature

  return config
}

function getRequestUrl (config) {
  let fullUrl = uri(config.url)

  if (config.params) {
    fullUrl = fullUrl.addQuery(config.params)
  }

  return fullUrl.toString()
}

const REQUEST_TARGET_HEADER = '(request-target)'
const SIGNED_HEADERS = [REQUEST_TARGET_HEADER]

function getRequestDigest (url, config) {
  let toSign = SIGNED_HEADERS.map(header => {
    header = header.toLowerCase()

    if (header === REQUEST_TARGET_HEADER) {
      return `${REQUEST_TARGET_HEADER}: ${config.method.toLowerCase()} ${url}`
    }

    return `${header}: ${config.headers[header]}`
  })

  return hash(toSign.join('\n'))
}

function getRequestSignature (digest, keypair) {
  const signature = keypair.sign(digest).toString('base64')
  const keyId = keypair.accountId()
  const algorithm = 'ed25519-sha256'

  return `keyId="${keyId}",algorithm="${algorithm}",headers="${SIGNED_HEADERS.join(' ')}",signature="${signature}"`
}
