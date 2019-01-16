import { CreateIssuanceRequestBuilder, Keypair } from '../../src/base'
import { Helper } from './_helper'

export class Issuance extends Helper {
  /**
   * @param {object} opts
   * @param {object} opts.asset
   * @param {object} opts.amount
   * @param {object} opts.balanceId
   * @param {Keypair} assetOwnerKp
   */
  fundAccount (opts, assetOwnerKp = this.masterKp) {
    const operation = CreateIssuanceRequestBuilder.createIssuanceRequest({
      asset: opts.asset,
      amount: opts.amount,
      receiver: opts.balanceId,
      reference: Keypair.random().accountId(),
      externalDetails: {}
    })

    return this.submit(operation, assetOwnerKp)
  }
}
