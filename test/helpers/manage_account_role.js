import { getSuccessResultFromXDR, Helper } from './_helper'
import { ManageAccountRoleBuilder } from '../../src/base/operations/manage_account_role_builder'

export class ManageAccountRole extends Helper {
  async create (opts = {}, ownerKp = this.masterKp) {
    const DEFAULTS = {
      details: {},
      ruleIDs: []
    }

    const operation = ManageAccountRoleBuilder.create({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'manageAccountRoleResult')
      .roleId().toString()
  }

  async update (opts = {}, ownerKp = this.masterKp) {
    const DEFAULTS = {
      details: {},
      ruleIDs: []
    }

    const operation = ManageAccountRoleBuilder.update({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'manageAccountRoleResult')
      .roleId().toString()
  }
}
