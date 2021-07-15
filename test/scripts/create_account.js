import { Keypair } from '../../src/base'
import { ACCOUNT_TYPES, KEY_VALUE_KEYS } from '../../src/const'
import { logger } from '../logger'

import {
  accountHelper, assetHelper,
  balanceHelper,
  issuanceHelper,
  keyValueHelper,
  sdk
} from '../helpers'

import { ensureAndGetBalanceId } from './create_sale_offer'

/**
 * Creates an account, creates balances for given assets and populates them with
 * given amounts
 *
 * @param {string} roleID
 * @param {object} balances - the key/value object, where code is assetCode and
 * value is amount, for example:
 *  {
 *    BTC: '0.123000',
 *    ETH: '0.212330',
 *    USD: '500.1220010'
 *  }
 */
export async function createFundedAccount (roleID, balances) {
  const log = logger.new('createFundedAccount')

  const accountKp = Keypair.random()
  const accountId = accountKp.accountId()
  await accountHelper.create({
    roleID,
    id: accountId
  })
  log.info(`Account created, id: ${accountId}`)

  await fundAccount(accountId, balances)
  return {
    accountKp,
    accountId
  }
}

export async function fundMasterAccount (asset, amount, assetOwner = this.masterKp) {
  await fundAccount(this.masterKp.accountId(), {
    [asset]: amount
  }, assetOwner)
}

export async function fundAccount (accountId, balances, assetOwnerKp = this.masterKp) {
  const log = logger.new('fundAccount')

  const { data: prevAccount } = await sdk.horizon.account.get(accountId)

  await Promise.all(
    Object
      .keys(balances)
      .map(assetCode => ensureAndGetBalanceId(prevAccount, assetCode)
      )
  )
  log.info(`Balances for ${accountId} created`)

  const { data: account } = await sdk.horizon.account.get(accountId)

  // TODO: create separate entries for every asset
  await keyValueHelper.putEntries({
    [KEY_VALUE_KEYS.issuanceTasks + ':*']: 0
  })
  log.info('Updated key/value storage with issuance tasks')

  await Promise.all(
    Object
      .entries(balances)
      // Take the balance id's from account response:
      .map(([asset, amount]) => {
        const balance = account
          .balances
          .find(balance => asset === balance.asset)

        return issuanceHelper.fundAccount({
          balanceId: balance.balanceId,
          amount,
          asset
        }, assetOwnerKp)
      })
  )
  log.info(`Account ${accountId} funded`)
}

export function createFundedGeneral (balances) {
  return createFundedAccount('1', balances)
}
