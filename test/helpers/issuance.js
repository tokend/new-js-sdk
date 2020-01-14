import { CreateIssuanceRequestBuilder, Keypair } from '../../src/base'
import { getRequestIdFromResultXdr, Helper } from './_helper'

export class Issuance extends Helper {
  /**
   * @param {object} opts
   * @param {object} opts.asset
   * @param {object} opts.amount
   * @param {object} opts.balanceId
   * @param {Keypair} assetOwnerKp
   */
  async fundAccount (opts, assetOwnerKp = this.masterKp) {
    const operation = CreateIssuanceRequestBuilder.createIssuanceRequest({
      asset: opts.asset,
      amount: opts.amount,
      receiver: opts.balanceId,
      reference: Keypair.random().accountId(),
      creatorDetails: {
        'short_description': 'Some short description'
      }
    })

    const response = await this.submit(operation, assetOwnerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createIssuanceRequestResult')
  }
}
