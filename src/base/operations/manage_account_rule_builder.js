import xdr from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { UnsignedHyper } from 'js-xdr'
import { BaseOperation } from './base_operation'

export class ManageAccountRuleBuilder {
  /**
   * Create new account rule for certain account or global.
   * @param {object} opts
   * @param {object} opts.type - used to specify the type of an entity (for some - with properties) that can be managed through operations
   * @param {string} opts.action  - value from enum that can be applied to resource
   * @param {boolean} opts.forbids - means rule allow or restrict
   * @param {string} opts.details - arbitrary stringified json object that will be attached to rule
   * @returns {xdr.Operation}
   */
  static createAccountRule (opts) {
    let attrs = {}
    switch (opts.type) {
      case 'ASSET':
        attrs.resource = new xdr.AccountRuleResource.asset(
          new xdr.AccountRuleResourceAsset({
            assetCode: opts.assetCode,
            assetType: UnsignedHyper.fromString(opts.assetType),
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'REVIEWABLE_REQUEST':
        attrs.resource = new xdr.AccountRuleResource.reviewableRequest(
          new xdr.AccountRuleResourceReviewableRequest({
            details: opts.details,
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'ANY':
        attrs = opts
        break
      case 'OFFER_ENTRY':
        attrs.resource = new xdr.AccountRuleResource.offerEntry(
          new xdr.AccountRuleResourceOffer({
            baseAssetType: UnsignedHyper.fromString(opts.baseAssetType),
            quoteAssetType: UnsignedHyper.fromString(opts.quoteAssetType),
            baseAssetCode: opts.baseAssetCode,
            quoteAssetCode: opts.quoteAssetCode,
            isBuy: opts.isBuy,
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'SALE':
        attrs.resource = new xdr.AccountRuleResource.sale(
          new xdr.AccountRuleResourceSale({
            saleId: UnsignedHyper.fromString(opts.saleId),
            saleType: UnsignedHyper.fromString(opts.saleType),
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'ATOMIC_SWAP_ASK':
        attrs.resource = new xdr.AccountRuleResource.atomicSwapAsk(
          new xdr.AccountRuleResourceAtomicSwapAsk({
            assetType: UnsignedHyper.fromString(opts.assetType),
            assetCode: opts.assetCode,
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'KEY_VALUE':
        attrs.resource = new xdr.AccountRuleResource.keyValue(
          new xdr.AccountRuleResourceKeyValue({
            keyPrefix: opts.keyPrefix,
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'POLL':
        attrs.resource = new xdr.AccountRuleResource.poll(
          new xdr.AccountRuleResourcePoll({
            pollId: UnsignedHyper.fromString(opts.pollId),
            permissionType: opts.permissionType,
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'VOTE':
        attrs.resource = new xdr.AccountRuleResource.vote(
          new xdr.AccountRuleResourceVote({
            pollId: UnsignedHyper.fromString(opts.pollId),
            permissionType: opts.permissionType,
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'INITIATE_KYC_RECOVERY':
        attrs.resource = new xdr.AccountRuleResource.initiateKycRecovery(
          new xdr.AccountRuleResourceInitiateKycRecovery({
            roleId: UnsignedHyper.fromString(opts.roleId),
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'ACCOUNT_SPECIFIC_RULE':
        attrs = opts
        break
      case 'SWAP':
        attrs.resource = new xdr.AccountRuleResource.swap(
          new xdr.AccountRuleResourceSwap({
            assetCode: opts.assetCode,
            assetType: UnsignedHyper.fromString(opts.assetType),
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'DATA':
        attrs.resource = new xdr.AccountRuleResource.data(
          new xdr.AccountRuleResourceData({
            type: UnsignedHyper.fromString(opts.type),
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      case 'CUSTOM':
        attrs.resource = new xdr.AccountRuleResource.custom(
          new xdr.CustomRuleResource({
            action: opts.action,
            resource: opts.resource,
            ext: new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion())
          }))
        break
      default:
        throw new Error('Unexpected manage account rule type')
    }
    return this._createRule(opts, attrs)
  }

  static _createRule (opts, attrs) {
    if (isUndefined(opts.forbids)) {
      throw new Error('opts.forbids is undefined')
    }
    attrs.forbids = opts.forbids

    let validAction = opts.action &&
    xdr.AccountRuleAction._byValue.has(opts.action)
    if (!validAction) {
      throw new Error('opts.action is invalid')
    }

    attrs.action = xdr.AccountRuleAction._byValue.get(opts.action)

    if (isUndefined(opts.details)) {
      attrs.details = {}
    }
    attrs.details = JSON.stringify(opts.details)
    attrs.ext = new xdr.CreateAccountRuleDataExt(xdr.LedgerVersion.emptyVersion())

    return this._manageRule(opts, new xdr.ManageAccountRuleOpData.create(
      new xdr.CreateAccountRuleData(attrs)))
  }

  static _manageRule (opts, data) {
    let op = new xdr.ManageAccountRuleOp({
      data: data,
      ext: new xdr.ManageAccountRuleOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageAccountRule(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static manageAccountRuleToObject (result, attrs) {
    switch (attrs.data().switch()) {
      case xdr.ManageAccountRuleAction.create():
        let createData = attrs.data().createData()
        result.forbids = createData.forbids()
        result.action = createData.action().value
        result.details = JSON.parse(createData.details())
        result.resource = createData.resource()._switch.value
        switch (createData.resource().switch()) {
          case xdr.LedgerEntryType.asset():
            result.assetCode = createData.resource().asset().assetCode().toString()
            result.assetType = createData.resource().asset().assetType().toString()
            break
          case xdr.LedgerEntryType.reviewableRequest():
            break
          case xdr.LedgerEntryType.any():
            break
          case xdr.LedgerEntryType.offerEntry():
            result.baseAssetCode = createData.resource().offer().baseAssetCode().toString()
            result.baseAssetType = createData.resource().offer().baseAssetType().toString()
            result.quoteAssetCode = createData.resource().offer().quoteAssetCode().toString()
            result.quoteAssetType = createData.resource().offer().quoteAssetType().toString()
            result.isBuy = createData.resource().offer().isBuy()
            break
          case xdr.LedgerEntryType.sale():
            result.saleId = createData.resource().sale().saleId().toString()
            result.saleType = createData.resource().sale().saleType().toString()
            break
          case xdr.LedgerEntryType.atomicSwapAsk():
            result.assetCode = createData.resource().atomicSwapAsk().assetCode().toString()
            result.assetType = createData.resource().atomicSwapAsk().assetType().toString()
            break
          case xdr.LedgerEntryType.keyValue():
            result.keyPrefix = createData.resource().keyValue().keyPrefix().toString()
            break
          case xdr.LedgerEntryType.poll():
            result.pollId = createData.resource().poll().pollId().toString()
            result.permissionType = createData.resource().poll().permissionType()
            break
          case xdr.LedgerEntryType.vote():
            result.pollId = createData.resource().vote().pollId().toString()
            result.permissionType = createData.resource().vote().permissionType()
            break
          case xdr.LedgerEntryType.initiateKycRecovery():
            result.roleId = createData.resource().initiateKycRecovery().roleId().toString()
            break
          case xdr.LedgerEntryType.accountSpecificRule():
            break
          case xdr.LedgerEntryType.swap():
            result.assetCode = createData.resource().swap().assetCode().toString()
            result.assetType = createData.resource().swap().assetType().toString()
            break
          // case xdr.LedgerEntryType.data():
          //   result.type = createData.resource().data().type().toString()
          //   break
          // case xdr.LedgerEntryType.custom():
          //   result.action = createData.resource().custom().action().toString()
          //   result.resource = createData.resource().custom().resource().toString()
          //   break
          default:
            throw new Error('Unexpected resource type in account rule ')
        }
        break
      // case xdr.ManageAccountRuleAction.remove():
      //   break
      // case xdr.ManageAccountRuleAction.update():
      //   break
      default:
        throw new Error('Unexpected manage account rule action')
    }
  }
}
