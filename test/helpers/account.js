import { Helper } from './_helper'
import { base } from '../../src'

export class Account extends Helper {
  /**
   * @param opts
   * @param opts.id
   * @param opts.accountType
   * @param [opts.policies]
   * @param [opts.referrer]
   * @param [opts.recoveryKey]
   */
  create (opts) {
    const operation = base.Operation.createAccount({
      destination: opts.id,
      accountPolicies: opts.policies || 0,
      referrer: opts.referrer || '',
      accountType: opts.accountType || base.xdr.AccountType.notVerified().value,
      recoveryKey: opts.recoveryKey || base.Keypair.random().accountId(),
    })

    return this.submit(operation)
  }

  createGeneral (id) {
    return this.create({ id, accountType: base.xdr.AccountType.general().value })
  }

  createSyndicate (id) {
    return this.create({ id, accountType: base.xdr.AccountType.syndicate().value })
  }
}
