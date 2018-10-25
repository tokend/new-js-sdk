import { TokenD } from '../../src'
import { NotFoundError } from '../../src/horizon/errors'

const config = {
  HORIZON_URL: 'http://0.0.0.0:8001'
}

describe('errors integration test', () => {
  it('should properly parse horizon error in legacy format', async () => {
    const sdk = await TokenD.create(config.HORIZON_URL, {
      allowHttp: true
    })

    const notExistingAssetCode = 'eutgweukrjwqrh'
    const err = await catchPromise(sdk.horizon.assets.get(notExistingAssetCode))
    console.log('LEGACY')
    console.log(err.httpStatus)
    console.log(err.meta)
    console.log(err.title)
    console.log(err.detail)
    expect(err).to.be.an.instanceOf(NotFoundError)
  })

  it('should properly parse horizon error in JSON API format', async () => {
    const sdk = await TokenD.create(config.HORIZON_URL, {
      allowHttp: true
    })

    const notExistingAssetCode = 'eutgweukrjwqrh'
    const err = await catchPromise(sdk.horizon.assets.get(notExistingAssetCode))
    console.log('NOT LEGACY')
    console.log(err.httpStatus)
    console.log(err.meta)
    console.log(err.title)
    console.log(err.detail)
    expect(err).to.be.an.instanceOf(NotFoundError)
  })
})
