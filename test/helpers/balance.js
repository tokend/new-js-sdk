import xdr from '../../src/base/generated/xdr_generated'
import { Helper } from './_helper'
import { Operation } from '../../src/base'
import { Running } from './_running'

export class Balance extends Helper {
  create (destinationAccountId, assetCode) {
    const operation = Operation.manageBalance({
      action: xdr.ManageBalanceAction.createUnique(),
      destination: destinationAccountId,
      asset: assetCode
    })

    return this.submit(operation)
  }

  /**
   * Finds balance by asset code. If 2 or more balances is present, will return
   * the most funded
   * @param balances
   * @param assetCode
   */
  getMostFundedBalance (balances, assetCode) {
    return balances
      .filter(b => b.asset === assetCode)
      .sort((a, b) => b.balance - a.balance)[0]
  }

  async mustLoad (ownerAccountId, asset) {
    return Running.untilGotReturnValue(async _ => {
      const { data: account } = await this.sdk.horizon.account.get(ownerAccountId)
      return this.getMostFundedBalance(account.balances, asset)
    })
  }
}
