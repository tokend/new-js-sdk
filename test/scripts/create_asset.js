import { Keypair } from '../../src/base'
import { Asset } from '../helpers/asset'

import { ASSET_POLICIES, KEY_VALUE_KEYS } from '../../src/const'

import {
  accountHelper,
  assetHelper,
  requestHelper
} from '../helpers'

import { log } from '../log'
import { getKvEntryWithFallback } from './get_task_from_kv'

/**
 * Creates a syndicate account, creates key-value an asset and reviews it.
 * @param [opts] - see all possible opts: {@link Asset.create}
 */
export async function createAssetFromScratch (opts = {}) {
  const ownerKp = Keypair.random()
  const code = Asset.randomCode()

  await accountHelper.createSyndicate(ownerKp.accountId())
  log.info(`Created the syndicate account, id: ${ownerKp.accountId()}`)
  // If asset code is provided through opts, the random code will be ignored

  await createAndApproveAsset({ code, ...opts }, ownerKp)
  log.info(`Created asset, code: ${code}`)

  return {
    ownerKp: ownerKp,
    ownerId: ownerKp.accountId(),
    assetCode: code
  }
}

/**
 * Creates the asset request and reviews it. Also will chech for k/v entry for
 * asset create tasks and create one if entry doesn't exist
 *
 * @param {object} [opts] - see all possible opts: {@link Asset.create}
 * * @param {object} [opts.code]
 * * @param {object} [opts.policies]
 * @param {Keypair} [ownerKp] - master will be owner if not provided
 */
export async function createAndApproveAsset (opts, ownerKp) {
  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.assetCreateTasks, 1
  )
  log.info('tasks to remove for asset_create defined, value: ' + tasksToRemove)

  const requestId = await assetHelper.create(opts, ownerKp)
  log.info(`Asset created, code: ${opts.code}`)

  const response = await requestHelper.approve(requestId, { tasksToRemove })
  log.info(`Asset creation request #${requestId} approved`)

  return response.data
}

/**
 * Creates and returns the stats quote asset. If stats quote asset already
 * exists, the script will just return it without creating the new one
 */
export async function createStatsQuoteAsset () {
  let asset = await assetHelper.loadStatsQuoteAsset()

  if (asset) {
    log.info('Found existing stats quote asset: ' + asset.code)
    return asset
  }

  const assetCode = Asset.randomCode('USD')
  await createAndApproveAsset({
    code: assetCode,
    policies: ASSET_POLICIES.statsQuoteAsset
  })
  log.info('Created stats quote asset: ' + assetCode)

  asset = await assetHelper.mustLoad(assetCode)
  log.debug('Loaded the stats quote asset' + asset.code)
  return asset
}
