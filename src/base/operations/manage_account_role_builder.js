import { default as xdr } from '../generated/xdr_generated'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'

export class ManageAccountRoleBuilder {
  /**
   * Builds operation for role creation
   *
   * @param {object} opts
   * @param {object} [opts.details] - create role details
   * @param {array} [opts.ruleIDs] - rules that should be assigned to this account
   * @returns {xdr.Operation}
   */
  static create (opts) {
    let attrs = {
      details: JSON.stringify(opts.details),
      ext: new xdr.CreateAccountRoleDataExt(xdr.LedgerVersion.emptyVersion())
    }
    attrs.ruleIDs = []
    for (let i = 0; i < opts.ruleIDs.length; i++) {
      attrs.ruleIDs.push(UnsignedHyper.fromString(opts.ruleIDs[i]))
    }

    let createData = new xdr.CreateAccountRoleData(attrs)
    let opData = new xdr.ManageAccountRoleOpData.create(createData)

    return this.manageAccountRoleOp(opData, opts)
  }

  /**
   * Builds operation to update existing role
   *
   * @param {object} opts
   * @param {string} [opts.roleId] - id of role to be modified
   * @param {object} [opts.details] - create role details
   * @param {array} [opts.ruleIDs] - rules that should be assigned to this account
   * @returns {xdr.Operation}
   */
  static update (opts) {
    let attrs = {
      roleId: UnsignedHyper.fromString(opts.roleId),
      details: JSON.stringify(opts.details),
      ext: new xdr.UpdateAccountRoleDataExt(xdr.LedgerVersion.emptyVersion())
    }
    attrs.ruleIDs = []
    for (let i = 0; i < opts.ruleIDs.length; i++) {
      attrs.ruleIDs.push(UnsignedHyper.fromString(opts.ruleIDs[i]))
    }

    let updateData = new xdr.UpdateAccountRoleData(attrs)
    let opData = new xdr.ManageAccountRoleOpData.update(updateData)

    return this.manageAccountRoleOp(opData, opts)
  }

  /**
   * Builds operation to remove existing role
   *
   * @param {object} opts
   * @param {string} [opts.roleId] - id of role to be removed
   * @returns {xdr.Operation}
   */
  static remove (opts) {
    let updateData = new xdr.RemoveAccountRoleData({
      roleId: UnsignedHyper.fromString(opts.roleId),
      ext: new xdr.RemoveAccountRoleDataExt(xdr.LedgerVersion.emptyVersion())
    })
    let opData = new xdr.ManageAccountRoleOpData.remove(updateData)

    return this.manageAccountRoleOp(opData, opts)
  }

  static manageAccountRoleOp (opData, opts) {
    let op = new xdr.ManageAccountRoleOp({
      data: opData,
      ext: new xdr.ManageAccountRoleOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageAccountRole(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static manageAccountRoleToObject (result, attrs) {
    switch (attrs.data().switch()) {
      case xdr.ManageAccountRoleAction.create(): {
        let data = attrs.data().createData()
        result.details = JSON.parse(data.details())
        result.ruleIDs = []
        for (let i = 0; i < data.ruleIDs().length; i++) {
          result.ruleIDs.push(data.ruleIDs()[i].toString())
        }
        break
      }
      case xdr.ManageAccountRoleAction.update(): {
        let data = attrs.data().updateData()
        result.roleId = data.roleId().toString()
        result.details = JSON.parse(data.details())
        result.ruleIDs = []
        for (let i = 0; i < data.ruleIDs().length; i++) {
          result.ruleIDs.push(data.ruleIDs()[i].toString())
        }
        break
      }
      case xdr.ManageAccountRoleAction.remove(): {
        let data = attrs.data().removeData()
        result.roleId = data.roleId().toString()
        break
      }
    }
  }
}
