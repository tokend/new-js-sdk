import { Keypair } from '../../src/base'
import { Asset } from '../helpers/asset'

import { accountHelper } from '../helpers'
import { assetHelper } from '../helpers'
import { keyValueHelper } from '../helpers'
import { requestHelper } from '../helpers'

import { KEY_VALUE_KEYS } from '../../src/const'

/**
 * Creates a syndicate account, creates an asset and reviews it
 * @param opts
 * * @param {number} [opts.policies]
 *
 */
export async function createAsset (opts = {}) {
  const ownerKp = Keypair.random()
  const assetCode = Asset.randomCode()

  await Promise.all([
    accountHelper.createSyndicate(ownerKp.accountId()),
    keyValueHelper.putEntries({
      [KEY_VALUE_KEYS.assetCreateTasks]: 1
    })
  ])
  const requestId = await assetHelper.create({
    policies: opts.policies,
    code: assetCode,
  }, ownerKp)
  await requestHelper.approve(requestId)

  return {
    ownerKp: ownerKp,
    ownerId: ownerKp.accountId(),
    assetCode,
  }
}
