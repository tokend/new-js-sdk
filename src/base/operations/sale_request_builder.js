import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import { Keypair } from '../keypair'

export class SaleRequestBuilder {
  /**
     * Creates operation to create sale request
     * @param {object} opts
     * @param {string} opts.requestID - ID of the request. 0 - to create new;
     * @param {string} opts.baseAsset - asset for which sale will be performed
     * @param {string} opts.saleType - Sale type
     * @param {string} opts.defaultQuoteAsset - asset in which hardcap/soft cap will be calculated
     * @param {string} opts.startTime - start time of the sale
     * @param {string} opts.endTime - close time of the sale
     * @param {string} opts.softCap - minimum amount of quote asset to be received at which sale will be considered a successful
     * @param {string} opts.hardCap - max amount of quote asset to be received
     * @param {string} opts.requiredBaseAssetForHardCap - max amount to be sold in base asset
     * @param {object} opts.creatorDetails - sale specific details
     * @param {object} opts.creatorDetails.name - name of the sale
     * @param {object} opts.creatorDetails.short_description - short description of the sale
     * @param {object} opts.creatorDetails.desciption - sale specific details
     * @param {object} opts.creatorDetails.logo - details of the logo
     * @param {array} opts.quoteAssets - accepted assets
     * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
     * @param {object} opts.quoteAssets.asset - asset code of the quote asset
     * @param {number} opts.saleEnumType - Sale type
     * @param {object[]} [opts.saleRules] - rules for sale participation
     * @param {string} [opts.saleRules[].accountID] - ID of account for which rule will be applied
     * @param {boolean} opts.saleRules[].forbids - Means rule is restrictive or not
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CreateSaleCreationRequestOp}
     */
  static createSaleCreationRequest (opts) {
    let request = this.validateSaleCreationRequest(opts)

    let createSaleCreationRequestOp = new xdr.CreateSaleCreationRequestOp({
      requestId: UnsignedHyper.fromString(opts.requestID),
      request: request,
      ext: new xdr.CreateSaleCreationRequestOpExt(xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createSaleRequest(createSaleCreationRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
   * Creates operation to cancel sale request
   * @param {object} opts
   * @param {string} opts.requestID - ID of the request
   * @param {string} [opts.source] - The source account for the operation.
   * Defaults to the transaction's source account.
   * @returns {xdr.CancelSaleCreationRequestOp}
   */
  static cancelSaleCreationRequest (opts) {
    let cancelSaleCreationRequestOp = new xdr.CancelSaleCreationRequestOp({
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelSaleCreationRequestOpExt(
        xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.cancelSaleRequest(
      cancelSaleCreationRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static validateSaleCreationRequest (opts) {
    let attrs = {}
    if (!BaseOperation.isValidAsset(opts.baseAsset)) {
      throw new Error('opts.baseAsset is invalid')
    }
    attrs.baseAsset = opts.baseAsset

    if (isUndefined(opts.saleType)) {
      throw new Error('opts.saleType is undefined')
    }
    attrs.saleType = UnsignedHyper.fromString(opts.saleType)

    if (!BaseOperation.isValidAsset(opts.defaultQuoteAsset)) {
      throw new Error('opts.defaultQuoteAsset is invalid')
    }
    attrs.defaultQuoteAsset = opts.defaultQuoteAsset

    if (isUndefined(opts.startTime)) {
      throw new Error('opts.startTime is invalid')
    }
    attrs.startTime = UnsignedHyper.fromString(opts.startTime)

    if (isUndefined(opts.endTime)) {
      throw new Error('opts.endTime is invalid')
    }
    attrs.endTime = UnsignedHyper.fromString(opts.endTime)

    if (!BaseOperation.isValidAmount(opts.softCap, true)) {
      throw new Error('opts.softCap is invalid')
    }
    attrs.softCap = BaseOperation._toUnsignedXDRAmount(opts.softCap)

    if (!BaseOperation.isValidAmount(opts.hardCap, true)) {
      throw new Error('opts.hardCap is invalid')
    }
    attrs.hardCap = BaseOperation._toUnsignedXDRAmount(opts.hardCap)

    SaleRequestBuilder.validateDetail(opts.creatorDetails)
    attrs.creatorDetails = JSON.stringify(opts.creatorDetails)
    attrs.ext = new xdr.SaleCreationRequestExt(xdr.LedgerVersion.emptyVersion())

    if (isUndefined(opts.saleEnumType) || !opts.saleEnumType) {
      attrs.saleEnumType = xdr.SaleType.basicSale().value
    } else if (opts.saleEnumType === true) {
      attrs.saleEnumType = xdr.SaleType.crowdFunding().value
    } else {
      attrs.saleEnumType = opts.saleEnumType
    }

    let saleTypeExt
    switch (attrs.saleEnumType) {
      case xdr.SaleType.basicSale().value: {
        let basicSale = new xdr.BasicSale({
          ext: new xdr.BasicSaleExt(xdr.LedgerVersion.emptyVersion())
        })
        saleTypeExt = xdr.SaleTypeExt.basicSale(basicSale)
        break
      }
      case xdr.SaleType.crowdFunding().value: {
        let crowdFundingSale = new xdr.CrowdFundingSale({
          ext: new xdr.CrowdFundingSaleExt(xdr.LedgerVersion.emptyVersion())
        })
        saleTypeExt = xdr.SaleTypeExt.crowdFunding(crowdFundingSale)
        break
      }
      case xdr.SaleType.fixedPrice().value: {
        let fixedPriceSale = new xdr.FixedPriceSale({
          ext: new xdr.FixedPriceSaleExt(xdr.LedgerVersion.emptyVersion())
        })
        saleTypeExt = xdr.SaleTypeExt.fixedPrice(fixedPriceSale)
        break
      }
    }

    if (!BaseOperation.isValidAmount(opts.requiredBaseAssetForHardCap, true)) {
      throw new Error('opts.requiredBaseAssetForHardCap is invalid')
    }
    attrs.requiredBaseAssetForHardCap =
      BaseOperation._toUnsignedXDRAmount(opts.requiredBaseAssetForHardCap)

    if (isUndefined(opts.sequenceNumber) || opts.sequenceNumber < 0) {
      opts.sequenceNumber = 0
    }
    attrs.sequenceNumber = opts.sequenceNumber

    attrs.saleTypeExt = saleTypeExt

    attrs.ext = new xdr.SaleCreationRequestExt(xdr.LedgerVersion.emptyVersion())

    if (isUndefined(opts.requestID)) {
      opts.requestID = '0'
    }

    if (isUndefined(opts.quoteAssets) || opts.quoteAssets.length === 0) {
      throw new Error('opts.quoteAssets is invalid')
    }
    attrs.quoteAssets = []

    for (let i = 0; i < opts.quoteAssets.length; i++) {
      let quoteAsset = opts.quoteAssets[i]
      let minAmount
      let maxAmount
      if (attrs.saleType === xdr.SaleType.crowdFunding().value) {
        minAmount = 1
        maxAmount = 1
      }

      let validAmount = BaseOperation.isValidAmount(
        quoteAsset.price,
        false,
        minAmount,
        maxAmount
      )

      if (!validAmount) {
        throw new Error(
          `opts.quoteAssets[i].price is invalid: ${quoteAsset.price}`
        )
      }
      if (isUndefined(quoteAsset.asset)) {
        throw new Error('opts.quoteAssets[i].asset is invalid')
      }

      attrs.quoteAssets.push(new xdr.SaleCreationRequestQuoteAsset({
        price: BaseOperation._toUnsignedXDRAmount(quoteAsset.price),
        quoteAsset: quoteAsset.asset,
        ext: new xdr.SaleCreationRequestQuoteAssetExt(
          xdr.LedgerVersion.emptyVersion()
        )
      }))
    }

    if (!isUndefined(opts.saleRules)) {
      this._addSaleRule(attrs, opts)
    }

    return new xdr.SaleCreationRequest(attrs)
  }

  static _addSaleRule (attrs, opts) {
    let saleRules = []
    let saleRulesSet = new Set()
    for (const rule of opts.saleRules) {
      if (saleRulesSet.has(rule.accountID)) {
        throw new Error('opts.saleRules has duplicated rules')
      }
      saleRulesSet.add(rule.accountID)

      let accountID
      if (!isUndefined(rule.accountID)) {
        accountID = Keypair.fromAccountId(rule.accountID).xdrPublicKey()
      }

      saleRules.push(new xdr.CreateAccountSaleRuleData({
        accountId: accountID,
        forbids: rule.forbids,
        ext: new xdr.CreateAccountSaleRuleDataExt(xdr.LedgerVersion.emptyVersion())
      }))
    }

    attrs.ext = new xdr.SaleCreationRequestExt.addSaleWhitelist(saleRules)
  }

  static validateDetail (creatorDetails) {
    if (isUndefined(creatorDetails)) {
      throw new Error('details is invalid')
    }

    if (isUndefined(creatorDetails.short_description)) {
      throw new Error('details.short_description is invalid')
    }

    if (isUndefined(creatorDetails.description)) {
      throw new Error('details.description is invalid')
    }

    if (isUndefined(creatorDetails.logo)) {
      throw new Error('details.logo is invalid')
    }

    if (isUndefined(creatorDetails.name)) {
      throw new Error('details.name is invalid')
    }
  }

  static crateSaleCreationRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    let request = attrs.request()
    result.baseAsset = request.baseAsset().toString()
    result.defaultQuoteAsset = request.defaultQuoteAsset().toString()
    result.startTime = request.startTime().toString()
    result.endTime = request.endTime().toString()
    result.softCap = BaseOperation._fromXDRAmount(request.softCap())
    result.hardCap = BaseOperation._fromXDRAmount(request.hardCap())
    result.requiredBaseAssetForHardCap = BaseOperation._fromXDRAmount(
      request.requiredBaseAssetForHardCap()
    )
    result.creatorDetails = JSON.parse(request.creatorDetails())
    result.saleType = request.saleType().toString()
    result.saleEnumType = request.saleTypeExt().switch().value
    result.quoteAssets = []
    for (let i = 0; i < request.quoteAssets().length; i++) {
      result.quoteAssets.push({
        price: BaseOperation._fromXDRAmount(request.quoteAssets()[i].price()),
        asset: request.quoteAssets()[i].quoteAsset().toString()
      })
    }

    switch (request.ext().switch()) {
      case xdr.LedgerVersion.emptyVersion():
        break
      case xdr.LedgerVersion.addSaleWhitelist():
        result.saleRules = []
        let rules = request.ext().saleRules()
        for (const rule of rules) {
          let accountID

          if (!isUndefined(rule.accountId())) {
            accountID = BaseOperation.accountIdtoAddress(rule.accountId())
          }

          result.saleRules.push({
            accountID: accountID,
            forbids: rule.forbids()
          })
        }
        break
      default:
        throw new Error('Unexpected create sale request ext type')
    }
  }

  static cancelSaleCreationRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
  }

  /**
     * Creates operation to check sale state
     * @param {object} opts
     * @param {string} opts.saleID - id of the sale to check
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CheckSaleStateOp}
     */
  static checkSaleState (opts) {
    if (isUndefined(opts.saleID)) {
      throw new Error('Invalid opts.saleID')
    }

    let checkSaleStateOp = new xdr.CheckSaleStateOp({
      saleId: UnsignedHyper.fromString(opts.saleID),
      ext: new xdr.CheckSaleStateOpExt(xdr.LedgerVersion.emptyVersion())
    })
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.checkSaleState(checkSaleStateOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static checkSaleStateToObject (result, attrs) {
    result.saleID = attrs.saleId().toString()
  }
}
