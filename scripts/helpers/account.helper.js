import { NotFoundError } from '../../../src/errors'
import { Helper } from './helper'
import { base } from '../../../src'

export class AccountsHelper extends Helper {
  /**
   * @param opts
   * @param opts.id
   * @param [opts.type]
   * @param [opts.policies]
   * @param [opts.referrer]
   * @param opts
   */
  async create (opts) {
    const defaults = {
      accountType: base.xdr.AccountType.general().value,
      recoveryKey: base.Keypair.random().accountId(),
      referrer: '',
      policies: 0
    }

    const operation = base.Operation.createAccount({
      destination: opts.id,
      accountPolicies: opts.policies || defaults.policies,
      referrer: opts.referrer || defaults.referrer,
      accountType: opts.type || defaults.type,
      recoveryKey: defaults.recoveryKey,
      source: this.sourceId,
    })

    const response = await this.submit(operation)

    return response.data
  }

  async createBalance (assetCode) {
    const operation = base.Operation.manageBalance({
      asset: assetCode,
      destination: this.source,
      action: base.xdr.ManageBalanceAction.create()
    })

    const response = await this.submit(operation)

    return response.data
  }

  getBalance (balances, asset) {
    const balance = balances.find(b => b.asset === asset)

    if (!balance) {
      throw new Error('Failed to find balance by asset')
    }

    return balance
  }

  getBalanceId (balances, asset) {
    return this.getBalance(balances, asset).balanceId
  }

  async loadBalance (accountId, asset) {
    const { data: account } = await this.sdk.horizon.account.get(accountId)

    return this.getBalance(account.balances, asset)
  }

  async loadBalanceId (accountId, asset) {
    return this.loadBalance(accountId, asset)
  }

  async hasExternalAccountId (accountId, externalSystemType) {
    try {
      const { data: account } = await this.sdk.horizon.account.get(accountId)
      return !!Object
        .values(account.externalSystemAccounts)
        .find(account => account.type.value === externalSystemType)
    } catch (e) {
      if (e instanceof NotFoundError) {
        return false
      }
      throw e
    }
  }

  /**
   * @param signer
   * @param {number} signer.weigth
   * @param {string} signer.pubKey
   * @param {number} signer.signerType
   * @param {string} signer.identity
   * @param {string} signer.name
   * @returns {Promise<void>}
   */
  async addAdmin (signer) {
    const operation = base.SetOptionsBuilder.setOptions({ signer })
    const response = await this.submit(operation)

    return response.data
  }

  async setThresholds (threshold) {
    const operation = base.SetOptionsBuilder.setOptions({
      masterWeight: thresholds.master || undefined,
      highThreshold: thresholds.high || undefined,
      mediumThreshold: thresholds.medium || undefined,
      lowThreshold: thresholds.low || undefined,
    })
  }
}
//
// module.exports = {
//   createNewAccount,
//   createBalanceForAsset,
//   loadBalanceForAsset,
//   loadBalanceIDForAsset,
//   addSuperAdmin,
//   setThresholds,
// }
