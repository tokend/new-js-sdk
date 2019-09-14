import { Keypair } from '../../src/base'
import { accountHelper, assetHelper } from '../helpers'
import { Asset } from '../helpers/asset'
import { createAndApproveAsset } from '../scripts/create_asset'
import { logger } from '../logger'

describe('Asset', () => {
  it('Create asset and remove it', async () => {
    const log = logger.new('asset')

    const ownerKp = Keypair.random()
    await accountHelper.createSyndicate(ownerKp.accountId())
    log.info('Created new user')

    const assetCode = Asset.randomCode('BASE')
    await Promise.all([
      createAndApproveAsset({ code: assetCode }),
    ])
    log.info(`Created asset, code: ${assetCode}`)

    await expectPromiseNoThrow(assetHelper.remove({
      code: assetCode,
    }))
    log.info(`Removed asset, code: ${assetCode}`)
  })
})
