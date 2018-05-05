import { Keypair } from './keypair'
import { decodeCheck, encodeCheck } from './strkey'

let keypair = Keypair.master()
let unencodedBuffer = keypair.rawPublicKey()
let unencoded = unencodedBuffer.toString()
let accountIdEncoded = keypair.accountId()
let seedEncoded = encodeCheck('seed', unencodedBuffer)

describe('decodeCheck', () => {
  it('decodes correctly', () => {
    expectBuffersToBeEqual(decodeCheck('accountId', accountIdEncoded), unencodedBuffer)
    expectBuffersToBeEqual(decodeCheck('seed', seedEncoded), unencodedBuffer)
  })

  it('throws an error when the version byte is not defined', () => {
    expectThrow(() => decodeCheck('notreal', 'GBPXXOA5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL'))
    expectThrow(() => decodeCheck('broken', 'SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCU'))
  })

  it('throws an error when the version byte is wrong', () => {
    expectThrow(() => decodeCheck('seed', 'GBPXXOA5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL'))
    expectThrow(() => decodeCheck('accountId', 'SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCU'))
  })

  it('throws an error when decoded data encodes to other string', () => {
    // accountId
    expectThrow(() => decodeCheck('accountId', 'GBPXX0A5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL'))
    expectThrow(() => decodeCheck('accountId', 'GCFZB6L25D26RQFDWSSBDEYQ32JHLRMTT44ZYE3DZQUTYOL7WY43PLBG++'))
    expectThrow(() => decodeCheck('accountId', 'GADE5QJ2TY7S5ZB65Q43DFGWYWCPHIYDJ2326KZGAGBN7AE5UY6JVDRRA'))
    expectThrow(() => decodeCheck('accountId', 'GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2'))
    expectThrow(() => decodeCheck('accountId', 'GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2T'))
    // seed
    expectThrow(() => decodeCheck('seed', 'SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYW'))
    expectThrow(() => decodeCheck('seed', 'SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYWMEGB2W2'))
    expectThrow(() => decodeCheck('seed', 'SB7OJNF5727F3RJUG5ASQJ3LUM44ELLNKW35ZZQDHMVUUQNGYWMEGB2W2T'))
    expectThrow(() => decodeCheck('seed', 'SCMB30FQCIQAWZ4WQTS6SVK37LGMAFJGXOZIHTH2PY6EXLP37G46H6DT'))
    expectThrow(() => decodeCheck('seed', 'SAYC2LQ322EEHZYWNSKBEW6N66IRTDREEBUXXU5HPVZGMAXKLIZNM45H++'))
  })

  it('throws an error when the checksum is wrong', () => {
    expectThrow(() => decodeCheck('accountId', 'GBPXXOA5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVT'))
    expectThrow(() => decodeCheck('seed', 'SBGWKM3CD4IL47QN6X54N6Y33T3JDNVI6AIJ6CD5IM47HG3IG4O36XCX'))
  })
})

describe('encodeCheck', () => {
  it('encodes a buffer correctly', () => {
    expect(encodeCheck('accountId', unencodedBuffer)).to.deep.equal(accountIdEncoded)
    expect(encodeCheck('seed', unencodedBuffer)).to.deep.equal(seedEncoded)
  })

  it('encodes a buffer correctly', () => {
    expect(encodeCheck('accountId', unencodedBuffer)).to.deep.equal(accountIdEncoded)
    expect(encodeCheck('seed', unencodedBuffer)).to.deep.equal(seedEncoded)
  })

  it('throws an error when the data is null', () => {
    expectThrow(() => encodeCheck('seed', null))
    expectThrow(() => encodeCheck('accountId', null))
  })

  it('throws an error when the version byte is not defined', () => {
    expectThrow(() => encodeCheck('notreal', unencoded))
    expectThrow(() => encodeCheck('broken', unencoded))
  })
})

function expectBuffersToBeEqual (left, right) {
  let leftHex = left.toString('hex')
  let rightHex = right.toString('hex')

  expect(leftHex).to.eql(rightHex)
}
