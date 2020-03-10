 import {CreateIssuanceRequestBuilder, Keypair} from '../../src/base'
import { getRequestIdFromResultXdr, Helper } from './_helper'
 import {accountHelper} from "./index";

export class Issuance extends Helper {
  /**
   * @param {object} opts
   * @param {object} opts.asset
   * @param {object} opts.amount
   * @param {object} opts.balanceId
   * @param {Keypair} assetOwnerKp
   */
  async fundAccount (opts, assetOwnerKp = this.masterKp, boolean) {
    let refString = ''
    if (boolean) {
      const randomArray = ['A', 'B', 'C']
      for (let i = 0; i < 3; ++i) {
        refString = refString.concat(randomArray[Math.floor(Math.random() * randomArray.length)])
      }
    } else {
      const randomArray = ['A', 'B', 'D']
      for (let i = 0; i < 3; ++i) {
        refString = refString.concat(randomArray[Math.floor(Math.random() * randomArray.length)])
      }
    }
    const operation = CreateIssuanceRequestBuilder.createIssuanceRequest({
      asset: opts.asset,
      amount: opts.amount,
      receiver: opts.balanceId,
      reference: refString,
      creatorDetails: {
        'short_description': 'Some short description'
      }
    })

    const response = await this.submit(operation, assetOwnerKp)

    return getRequestIdFromResultXdr(response.resultXdr, 'createIssuanceRequestResult')
  }
}
