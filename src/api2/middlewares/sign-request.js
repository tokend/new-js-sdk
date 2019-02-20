import _ from 'lodash'
import uri from 'urijs'
import { hash, Keypair } from '../../base'

const HEADER_SIGNATURE = 'signature'
const HEADER_REQUEST_TARGET = '(request-target)'
const HEADERS_TO_SIGN = [HEADER_REQUEST_TARGET]

/**
 * @param {object} requestConfig - the axios config of the request
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
  const digest = getRequestDigest(url, config, HEADERS_TO_SIGN)
  const signature = signerKp.sign(digest).toString('base64')
  const signatureHeader = getSignatureHeader(signerKp.accountId(), HEADERS_TO_SIGN, signature)

  config.headers = config.headers || {}
  config.headers[HEADER_SIGNATURE] = signatureHeader

  return config
}

function getRequestUrl (config) {
  let fullUrl = uri(config.url)

  if (config.params) {
    fullUrl = fullUrl.addQuery(config.params)
  }

  return fullUrl.toString()
}

function getRequestDigest (url, config, headersToSign) {
  const toSign = headersToSign.map(header => {
    header = header.toLowerCase()

    switch (header) {
      case HEADER_REQUEST_TARGET:
        return `${HEADER_REQUEST_TARGET}: ${config.method.toLowerCase()} ${url}`
      default:
        return `${header}: ${config.headers[header]}`
    }
  })

  return hash(toSign.join('\n'))
}

function getSignatureHeader (keyId, signedHeaders, signature) {
  const algorithm = 'ed25519-sha256'

  return `keyId="${keyId}",algorithm="${algorithm}",headers="${signedHeaders.join(' ')}",signature="${signature}"`
}
