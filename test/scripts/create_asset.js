import { Keypair } from '../../src/base'
import { Asset } from '../helpers/asset'

import { ASSET_POLICIES, KEY_VALUE_KEYS } from '../../src/const'

import {
  accountHelper,
  assetHelper,
  keyValueHelper,
  requestHelper
} from '../helpers'

import { log } from '../log'

/**
 * Creates a syndicate account, creates key-value an asset and reviews it.
 * @param [opts] - see all possible opts: {@link Asset.create}
 */
export async function createAssetFromScratch (opts = {}) {
  log.debug('createAssetFromScratch script execution started')

  const ownerKp = Keypair.random()
  const code = Asset.randomCode()

  log.debug('Creating the syndicate account')
  await accountHelper.createSyndicate(ownerKp.accountId())
  log.debug('Created the syndicate account')
  // If asset code is provided through opts, the random code will be ignored
  log.debug('Creating and approving asset')
  await createAndApproveAsset({ code, ...opts }, ownerKp)
  log.debug('Asset created and approved')

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
  log.debug('createAndApproveAsset script execution started')

  log.debug('Trying to define tasks to remove')
  let tasksToRemove = await keyValueHelper.getEntryValue(
    KEY_VALUE_KEYS.assetCreateTasks
  )

  if (!tasksToRemove) {
    log.debug('Tasks to remove not set in the k/v storage')
    tasksToRemove = 1
    log.debug('Creating k/v entry for tasks to remove, value: ' + tasksToRemove)
    await keyValueHelper.putEntries({
      [KEY_VALUE_KEYS.assetCreateTasks]: tasksToRemove
    })
  }
  log.debug('tasks to remove value defined, value: ' + tasksToRemove)

  log.debug('Creating the request')
  const requestId = await assetHelper.create(opts, ownerKp)
  log.debug('Approving the request')
  const response = await requestHelper.approve(requestId, { tasksToRemove })
  log.debug('Request approved, ending createAndApproveAsset script execution')

  return response.data
}

/**
 * Creates and returns the stats quote asset. If stats quote asset already
 * exists, the script will just return it without creating the new one
 */
export async function createStatsQuoteAsset () {
  log.debug('createStatsQuoteAsset script execution started')
  log.debug('Checking for stats quote asset presence')
  let asset = await assetHelper.loadStatsQuoteAsset()

  if (asset) {
    log.debug('Stats quote asset exist: ' + asset.code)
    log.debug('ending createStatsQuoteAsset execution')
    return asset
  }

  log.info('Stats quote asset doesn\'t exist')
  const assetCode = Asset.randomCode('USD')
  await createAndApproveAsset({
    code: assetCode,
    policies: ASSET_POLICIES.statsQuoteAsset
  })
  log.debug('Created the stats quote asset: ' + assetCode)

  log.debug('Loading the stats quote asset')
  asset = await assetHelper.mustLoad(assetCode)
  log.debug('Loaded the stats quote asset' + asset.code)

  log.debug('ending createStatsQuoteAsset execution')
  return asset
}
