import { ASSET_POLICIES } from '../../src/const'
import { logger } from '../logger'
import { sdk, accountHelper } from '../helpers'
import { fundAccount } from './create_account'
import { Asset } from '../helpers/asset'
/*import {
  createApprovedAmlAlertRequest,
  createPendingAmlAlertRequest,
  createRejecteAmlAlertRequest
} from './create_aml_alert_request'*/
import { createAndApproveAsset } from './create_asset'
import { getRandomArbitrary } from './populate_order_book'

import {
  createIssuanceRequestAndApprove,
  createIssuanceRequestAndReject,
  createIssuanceRequestWithAutoApproval,
  createNotReviewedIssuanceRequest,
} from './create_issuance_request'

import {
  createPendingWithdrawalRequest,
  createApprovedWithdrawalRequest,
  createRejectedWithdrawalRequest
} from './create_withdrawal_request'

export async function populateHistoryForAccount (accountId, signerKp) {
  const log = logger.new('populateHistoryForAccount')

  const BTC = Asset.randomCode('BTC')
  const ETH = Asset.randomCode('ETH')
  const USD = Asset.randomCode('USD')
  const DASH = Asset.randomCode('DASH')

  const balances = {
    [BTC]: '10.000000',
    [USD]: '50000.000000',
    [ETH]: '400.000000',
    [DASH]: '210.000000'
  }

  for (const assetCode of Object.keys(balances)) {
    await createAndApproveAsset({
      code: assetCode,
      policies: ASSET_POLICIES.withdrawable | ASSET_POLICIES.transferable
    })
  }

  await accountHelper.create({
    roleID: '1',
    id: accountId
  })

  await fundAccount(accountId, balances)
  log.info(`Funded ${accountId}`)

  const { data: account } = await sdk.horizon.account.get(accountId)
  log.debug('account loaded with balances:')
  log.debug(account.balances)

  for (const [assetCode, available] of Object.entries(balances)) {
    // await populateWithdrawals(account, assetCode, available, signerKp)
    // await populateIssuances(account, assetCode, available)
    await populateAmlAlerts(account, assetCode, available)
  }

  log.info(`Populated ${accountId} history`)
}

async function populateAmlAlerts (account, assetCode, available) {
  const log = logger.new('populateAmlAlerts')
  const getNewAmount = () =>
    getRandomArbitrary(available * 0.01, available * 0.05)

  let amount = getNewAmount()
  await createPendingAmlAlertRequest(account, assetCode, amount)
  log.info(`Created pending aml alert request on ${amount} ${assetCode}`)

  amount = getNewAmount()
  await createApprovedAmlAlertRequest(account, assetCode, amount)
  log.info(`Created pending aml alert request on ${amount} ${assetCode}`)

  amount = getNewAmount()
  await createRejecteAmlAlertRequest(account, assetCode, amount)
  log.info(`Created pending aml alert request on ${amount} ${assetCode}`)
}

async function populateOffers (account, assetCode, available) {
  // TODO
}

async function populateTransfers (account, assetCode, available) {
  // TODO
}

async function populateIssuances (account, assetCode, available) {
  const log = logger.new('populateIssuances')

  const getNewAmount = () =>
    getRandomArbitrary(available * 0.01, available * 0.05)

  let amount = getNewAmount()
  await createNotReviewedIssuanceRequest(account, assetCode, amount)
  log.info(`Created not reviewed issuance request on ${amount} ${assetCode}`)

  amount = getNewAmount()
  await createIssuanceRequestAndReject(account, assetCode, amount)
  log.info(`Created rejected issuance request on ${amount} ${assetCode}`)

  amount = getNewAmount()
  await createIssuanceRequestAndApprove(account, assetCode, amount)
  log.info(`Created approved issuance request on ${amount} ${assetCode}`)

  amount = getNewAmount()
  await createIssuanceRequestWithAutoApproval(account, assetCode, amount)
  log.info(`Created auto approved issuance request on ${amount} ${assetCode}`)
}

async function populateWithdrawals (account, assetCode, available, signerKp) {
  const log = logger.new('populateWithdrawals')

  const getNewAmount = () =>
    getRandomArbitrary(available * 0.01, available * 0.05)

  let amount = getNewAmount()
  log.info(`Going to createe pending withdraw request on ${amount} ${assetCode}`)
  await createPendingWithdrawalRequest(account, assetCode, amount, signerKp)
  log.info(`Created pending withdraw request on ${amount} ${assetCode}`)

  amount = getNewAmount()
  await createApprovedWithdrawalRequest(account, assetCode, amount, signerKp)
  log.info(`Created approved withdraw request on ${amount} ${assetCode}`)

  amount = getNewAmount()
  await createRejectedWithdrawalRequest(account, assetCode, amount, signerKp)
  log.info(`Created rejected withdraw request on ${amount} ${assetCode}`)
}
