import { Helper } from './_helper'
import { base } from '../../src'

export class Account extends Helper {
  /**
   * @param opts
   * @param opts.id
   * @param opts.accountType
   * @param [opts.accountPolicies]
   * @param [opts.referrer]
   * @param [opts.recoveryKey]
   */
  create (opts) {
    const DEFAULTS = {
      referrer: '',
      accountPolicies: 0,
      recoveryKey: base.Keypair.random().accountId()
    }

    const operation = base.Operation.createAccount({
      destination: opts.id,
      ...opts,
      ...DEFAULTS
    })

    return this.submit(operation)
  }

  createGeneral (id) {
    return this.create({ id, accountType: base.xdr.AccountType.general().value })
  }

  createSyndicate (id) {
    return this.create({ id, accountType: base.xdr.AccountType.syndicate().value })
  }

  createNotVerified (id) {
    return this.create({ id, accountType: base.xdr.AccountType.notVerified().value })
  }
}
