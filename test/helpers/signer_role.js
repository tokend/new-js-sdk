import { Helper } from './_helper'
import { base } from '../../src'

export class SignerRole extends Helper {
  /**
   * @param opts
   * @param opts.id
   * @param opts.ruleIDs
   */
  updateRole (opts) {
    const operation = base.ManageSignerRoleBuilder.update({
      details: {},
      roleId: opts.id,
      ruleIDs: opts.ruleIDs,
    })

    return this.submit(operation)
  }
}
