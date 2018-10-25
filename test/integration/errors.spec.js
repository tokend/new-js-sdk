import { TokenD } from '../../src'
import { NotFoundError } from '../../src/errors'

const config = {
  HORIZON_URL: 'http://0.0.0.0:8001'
}

describe('errors integration test', () => {
  it('should properly parse horizon error in JSON API format', async () => {
    const sdk = await TokenD.create(config.HORIZON_URL, {
      allowHttp: true
    })

    const notExistingAssetCode = 'eutgweukrjwqrh'
    const err = await catchPromise(sdk.horizon.assets.get(notExistingAssetCode))

    expect(err).to.be.an.instanceOf(NotFoundError)
    expect(err.httpStatus).to.not.equal(undefined)
    expect(err.meta).to.not.equal(undefined)
    expect(err.title).to.not.equal(undefined)
    expect(err.detail).to.not.equal(undefined)
  })
})
