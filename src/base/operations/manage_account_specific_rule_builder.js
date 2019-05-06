import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class ManageAccountSpecificRuleBuilder {
  /**
   * Create new account specific rule for sale participation for certain account or global.
   * @param {object} opts
   * @param {string} opts.saleID - ID of poll to voting in
   * @param {boolean} opts.forbids - means rule allow or restrict
   * @param {string} [opts.accountID] - define to create rule for certain account
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.Operation}
   */
  static createSaleRule (opts) {
    if (isUndefined(opts.saleID)) {
      throw new Error('opts.saleID is undefined')
    }

    let attrs = {}

    attrs.ledgerKey = new xdr.LedgerKey.sale(new xdr.LedgerKeySale({
      saleId: UnsignedHyper.fromString(opts.saleID),
      ext: new xdr.LedgerKeySaleExt(xdr.LedgerVersion.emptyVersion())
    }))

    return this._createRule(opts, attrs)
  }

  static _createRule (opts, attrs) {
    if (isUndefined(opts.forbids)) {
      throw new Error('opts.forbids is undefined')
    }

    attrs.forbids = opts.forbids
    attrs.ext = new xdr.CreateAccountSpecificRuleDataExt(xdr.LedgerVersion.emptyVersion())

    if (!isUndefined(opts.accountID)) {
      if (!Keypair.isValidPublicKey(opts.accountID)) {
        throw new Error('opts.accountID is invalid')
      }

      attrs.accountId = Keypair.fromAccountId(opts.accountID).xdrAccountId()
    }

    return this._manageRule(opts, new xdr.ManageAccountSpecificRuleOpData.create(
      new xdr.CreateAccountSpecificRuleData(attrs)))
  }

  /**
   * Delete existing signer for source account.
   * @param {object} opts
   * @param {string} opts.ruleID - ID of account specific rule
   * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
   * @returns {xdr.Operation}
   */
  static removeRule (opts) {
    if (isUndefined(opts.ruleID)) {
      throw new TypeError('opts.ruleID is undefined')
    }

    let removeData = new xdr.RemoveAccountSpecificRuleData({
      ruleId: UnsignedHyper.fromString(opts.ruleID),
      ext: new xdr.RemoveAccountSpecificRuleDataExt(xdr.LedgerVersion.emptyVersion())
    })

    return this._manageRule(opts, new xdr.ManageAccountSpecificRuleOpData.remove(removeData))
  }

  static _manageRule (opts, data) {
    let op = new xdr.ManageAccountSpecificRuleOp({
      data: data,
      ext: new xdr.ManageAccountSpecificRuleOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageAccountSpecificRule(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static manageAccountSpecificRuleToObject (result, attrs) {
    switch (attrs.data().switch()) {
      case xdr.ManageAccountSpecificRuleAction.create():
        let createData = attrs.data().createData()
        result.forbids = createData.forbids()
        result.ledgerEntryType = createData.ledgerKey()._switch.value
        switch (createData.ledgerKey().switch()) {
          case xdr.LedgerEntryType.sale():
            result.saleID = createData.ledgerKey().sale().saleId().toString()
            break
          default:
            throw new Error('Unexpected ledger entry type in account specific rule' +
              createData.ledgerKey().type().value)
        }

        if (!isUndefined(createData.accountId())){
          result.accountID = BaseOperation.accountIdtoAddress(createData.accountId())
        }
        break
      case xdr.ManageAccountSpecificRuleAction.remove():
        result.ruleID = attrs.data().removeData().ruleId().toString()
        return
      default:
        throw new Error('Unexpected manage account specific rule action')
    }
  }
}
