import { sign, verify } from './signing'

// NOTE: key and signature constants were generated using rbnacl
// seed: 1123740522f11bfef6b3671f51e159ccf589ccf8965262dd5f97d1721d383dd4
let publicKey = Buffer.from('ffbdd7ef9933fe7249dc5ca1e7120b6d7b7b99a7a367e1a2fc6cb062fe420437', 'hex')
let secretKey = Buffer.from('1123740522f11bfef6b3671f51e159ccf589ccf8965262dd5f97d1721d383dd4ffbdd7ef9933fe7249dc5ca1e7120b6d7b7b99a7a367e1a2fc6cb062fe420437', 'hex')

describe('sign', () => {
  let expectedSig = '587d4b472eeef7d07aafcd0b049640b0bb3f39784118c2e2b73a04fa2f64c9c538b4b2d0f5335e968a480021fdc23e98c0ddf424cb15d8131df8cb6c4bb58309'

  it('can sign an string properly', () => {
    let data = 'hello world'
    let actualSig = sign(data, secretKey).toString('hex')
    expect(actualSig).to.eql(expectedSig)
  })

  it('can sign an buffer properly', () => {
    let data = Buffer.from('hello world', 'utf8')
    let actualSig = sign(data, secretKey).toString('hex')
    expect(actualSig).to.eql(expectedSig)
  })

  it('can sign an array of bytes properly', () => {
    let data = [ 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ]
    let actualSig = sign(data, secretKey).toString('hex')
    expect(actualSig).to.eql(expectedSig)
  })
})

describe('verify', () => {
  let sig = Buffer.from('587d4b472eeef7d07aafcd0b049640b0bb3f39784118c2e2b73a04fa2f64c9c538b4b2d0f5335e968a480021fdc23e98c0ddf424cb15d8131df8cb6c4bb58309', 'hex')
  let badSig = Buffer.from('687d4b472eeef7d07aafcd0b049640b0bb3f39784118c2e2b73a04fa2f64c9c538b4b2d0f5335e968a480021fdc23e98c0ddf424cb15d8131df8cb6c4bb58309', 'hex')

  it('can verify an string properly', () => {
    let data = 'hello world'
    expect(verify(data, sig, publicKey)).to.be.true
    expect(verify('corrupted', sig, publicKey)).to.be.false
    expect(verify(data, badSig, publicKey)).to.be.false
  })

  it('can verify an buffer properly', () => {
    let data = Buffer.from('hello world', 'utf8')
    expect(verify(data, sig, publicKey)).to.be.true
    expect(verify('corrupted', sig, publicKey)).to.be.false
    expect(verify(data, badSig, publicKey)).to.be.false
  })

  it('can verify an array of bytes properly', () => {
    let data = [ 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ]
    expect(verify(data, sig, publicKey)).to.be.true
    expect(verify('corrupted', sig, publicKey)).to.be.false
    expect(verify(data, badSig, publicKey)).to.be.false
  })
})
