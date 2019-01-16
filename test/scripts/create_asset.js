import { Keypair } from '../../src/base'
import { Asset } from '../helpers/asset'

import { ASSET_POLICIES, KEY_VALUE_KEYS } from '../../src/const'

import {
  accountHelper, assetHelper, keyValueHelper, requestHelper
} from '../helpers'

/**
 * Creates a syndicate account, creates key-value an asset and reviews it.
 * @param [opts] - see all possible opts: {@link Asset.create}
 */
export async function createAssetFromScratch (opts = {}) {
  console.log('createAssetFromScratch script execution started')

  const ownerKp = Keypair.random()
  const code = Asset.randomCode()

  console.log('Creating the syndicate account')
  await accountHelper.createSyndicate(ownerKp.accountId())
  console.log('Created the syndicate account')
  // If asset code is provided through opts, the random code will be ignored
  console.log('Creating and approving asset')
  await createAndApproveAsset({ code, ...opts }, ownerKp)
  console.log('Asset created and approved')

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
  console.log('createAndApproveAsset script execution started')

  console.log('Trying to define tasks to remove')
  let tasksToRemove = await keyValueHelper.getEntryValue(
    KEY_VALUE_KEYS.assetCreateTasks
  )

  if (!tasksToRemove) {
    console.log('Tasks to remove not set in the k/v storage')
    tasksToRemove = 1
    console.log('Creating k/v entry for tasks to remove, value: ' + tasksToRemove)
    await keyValueHelper.putEntries({
      [KEY_VALUE_KEYS.assetCreateTasks]: tasksToRemove
    })
  }
  console.log('tasks to remove value defined, value: ' + tasksToRemove)

  console.log('Creating the request')
  const requestId = await assetHelper.create(opts, ownerKp)
  console.log('Approving the request')
  const response = await requestHelper.approve(requestId, { tasksToRemove })
  console.log('Request approved, ending createAndApproveAsset script execution')

  return response.data
}

/**
 * Creates and returns the stats quote asset. If stats quote asset already
 * exists, the script will just return it without creating the new one
 */
export async function createStatsQuoteAsset () {
  console.log('createStatsQuoteAsset script execution started')
  console.log('Checking for stats quote asset presence')
  let asset = await assetHelper.loadStatsQuoteAsset()

  if (asset) {
    console.log('Stats quote asset exist: ' + asset.code)
    console.log('ending createStatsQuoteAsset execution')
    return asset
  }

  console.log('Stats quote asset doesn\'t exist')
  const assetCode = Asset.randomCode('USD')
  await createAndApproveAsset({
    code: assetCode,
    policies: ASSET_POLICIES.statsQuoteAsset
  })
  console.log('Created the stats quote asset: ' + assetCode)

  console.log('Loading the stats quote asset')
  asset = await assetHelper.mustLoad(assetCode)
  console.log('Loaded the stats quote asset' + asset.code)

  console.log('ending createStatsQuoteAsset execution')
  return asset
}
