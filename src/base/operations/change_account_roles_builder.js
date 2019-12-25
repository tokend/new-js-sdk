import xdr from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'
import { validateArray } from '../../utils/validators'

export class ChangeAccountRolesBuilder {
  /**
   * Creates operation to create KYC request
   * @param {object} opts
   * @param {string} opts.destinationAccount
   * @param {array} opts.accountRolesToSet
   * @param {object} opts.details
   * @param {string} opts.details - request details set by creator
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.ChangeAccountRolesOp}
   */
  static changeRoles (opts) {
    let attrs = {}

    if (!Keypair.isValidPublicKey(opts.destinationAccount)) {
      throw new Error('opts.accountToUpdateKYC is invalid')
    }

    attrs.destinationAccount = Keypair
      .fromAccountId(opts.destinationAccount)
      .xdrAccountId()

    validateArray({
      value: opts.accountRolesToSet,
      fieldName: 'opts.accountRolesToSEt',
      minLength: 1
    })
    let roles = []
    for (let roleID of opts.accountRolesToSet) {
      roles.push(UnsignedHyper.fromString(roleID))
    }

    attrs.rolesToSet = roles
    attrs.details = JSON.stringify(opts.details)

    attrs.ext = new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())

    let changeRolesOp = new xdr.ChangeAccountRolesOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.changeAccountRole(changeRolesOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static changeAccountRolesOpToObject (result, attrs) {
    let roles = []
    for (let roleID of attrs.rolesToSet()) {
      roles.push(roleID.toString())
    }
    result.destinationAccount = BaseOperation.accountIdtoAddress(attrs.destinationAccount())
    result.rolesToSet = roles
    result.details = JSON.parse(attrs.details())
  }
}
