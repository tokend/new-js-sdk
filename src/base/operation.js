import { default as xdr } from './generated/xdr_generated'
import { Keypair } from './keypair'
import { UnsignedHyper } from 'js-xdr'
import { hash } from './hashing'
import { encodeCheck } from './strkey'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './operations/base_operation'
import { ManageAssetBuilder } from './operations/manage_asset_builder'
import { ReviewRequestBuilder } from './operations/review_request_builder'
import { PreIssuanceRequestOpBuilder } from './operations/pre_issuance_request_op_builder'
import { CreateIssuanceRequestBuilder } from './operations/create_issuance_request_builder'
import { SaleRequestBuilder } from './operations/sale_request_builder'
import { ManageOfferBuilder } from './operations/manage_offer_builder'
import { SetOptionsBuilder } from './operations/set_options_builder'
import { CreateAMLRequestBuilder } from './operations/create_aml_request_builder'
import { CreateUpdateKYCRequestBuilder } from './operations/create_update_kyc_request_builder'
import { ManageSaleBuilder } from './operations/manage_sale'
import { PaymentV2Builder } from './operations/payment_v2_builder'
import { CreateAtomicSwapBidCreationRequestBuilder } from './operations/create_atomic_swap_bid_creation_request_builder'
import { CancelAtomicSwapBidBuilder } from './operations/cancel_atomic_swap_bid_builder'
import { CreateAtomicSwapRequestBuilder } from './operations/create_atomic_swap_request_builder'
import { CreateWithdrawRequestBuilder } from './operations/create_withdraw_request_builder'

export class Operation extends BaseOperation {
  /**
     * Create and fund a non existent account.
     * @param {object} opts
     * @param {string} opts.destination - Destination account ID to create an account for.
     * @param {string} opts.recoveryKey - AccountID of recovery signer.
     * @param {string} opts.accountType - Type of the account to be created.
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * * @param {string} opts.accountPolicies - The policies of the account.
     * @returns {xdr.CreateAccountOp}
     */
  static createAccount (opts) {
    if (!Keypair.isValidPublicKey(opts.destination)) {
      throw new Error('destination is invalid')
    }
    if (!Keypair.isValidPublicKey(opts.recoveryKey)) {
      throw new Error('recoveryKey is invalid')
    }
    let attributes = {}
    attributes.destination = Keypair
      .fromAccountId(opts.destination)
      .xdrAccountId()
    attributes.recoveryKey = Keypair
      .fromAccountId(opts.recoveryKey)
      .xdrAccountId()
    attributes.accountType = Operation._accountTypeFromNumber(opts.accountType)

    if (!isUndefined(opts.accountPolicies)) {
      if (opts.accountPolicies < 0) {
        throw new TypeError('accountPolicies should be positive or zero')
      }
      attributes.policies = opts.accountPolicies
    } else {
      attributes.policies = 0 // default no_permissions
    }

    if (opts.referrer) {
      if (!Keypair.isValidPublicKey(opts.referrer)) {
        throw new TypeError('referrer is invalid')
      }
      attributes.referrer = Keypair.fromAccountId(opts.referrer).xdrAccountId()
    }

    attributes.ext = new xdr.CreateAccountOpExt(
      xdr.LedgerVersion.emptyVersion()
    )

    attributes.externalSystemIDs = []

    let createAccount = new xdr.CreateAccountOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.createAccount(createAccount)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Create a payment operation.
     * @param {object} opts
     * @param {string} opts.sourceBalanceId - The balance id of source.
     * @param {string} opts.destinationBalanceId - The destination balance ID.
     * @param {boolean} opts.feeFromSource - if true - fee charged from source account, if false - from destination
     * @param {string} opts.amount - The amount to send.
     * @param {string} opts.paymentFee - The payment fee.
     * @param {string} opts.fixedFee - The fixed fee.
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.PaymentOp}
     */
  static payment (opts) {
    let attributes = {}
    if (!Operation.isValidAmount(opts.amount)) {
      throw new TypeError('amount argument must be of type String and represent a positive number')
    }
    if (!Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
      throw new TypeError('sourceBalanceId is invalid')
    }
    if (!Keypair.isValidBalanceKey(opts.destinationBalanceId)) {
      throw new TypeError('destinationBalanceId is invalid')
    }
    if (!Operation.isValidSubject(opts.subject)) {
      throw new Error('subject argument must be of type String 0-256 long')
    }

    if (!isUndefined(opts.feeData)) {
      let sourceFee = new xdr.Fee({
        percent: BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.percent),
        fixed: BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.fixed),
        ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
      })
      let destinationFee = new xdr.Fee({
        percent: BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.percent),
        fixed: BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.fixed),
        ext: new xdr.FeeExt(xdr.LedgerVersion.emptyVersion())
      })
      attributes.feeData = new xdr.PaymentFeeDataV2({
        sourceFee,
        destinationFee,
        sourcePaysForDest: opts.feeData.sourcePaysForDest,
        ext: new xdr.PaymentFeeDataV2Ext(xdr.LedgerVersion.emptyVersion())
      })
    } else {
      throw new Error('feeData argument must be defined')
    }

    if (isUndefined(opts.reference)) {
      opts.reference = ''
    }

    attributes.amount = BaseOperation._toUnsignedXDRAmount(opts.amount)
    attributes.sourceBalanceId = Keypair
      .fromBalanceId(opts.sourceBalanceId)
      .xdrBalanceId()

    let d = xdr.PaymentOpV2Destination.balance()
    d.set('balance', Keypair
      .fromBalanceId(opts.destinationBalanceId)
      .xdrBalanceId())
    attributes.destination = d

    attributes.subject = opts.subject
    attributes.reference = opts.reference
    attributes.ext = new xdr.PaymentOpV2Ext(xdr.LedgerVersion.emptyVersion())
    let payment = new xdr.PaymentOpV2(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.paymentV2(payment)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Create a recovery op.
     * @param {object} opts
     * @param {string} opts.account - The target account to recover
     * @param {string} opts.oldSigner - Signer to recover.
     * @param {string} opts.newSigner - Signer to recover to.
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.RecoverOp}
     */
  static recover (opts) {
    if (!Keypair.isValidPublicKey(opts.account)) {
      throw new TypeError('account is invalid')
    }
    if (!Keypair.isValidPublicKey(opts.oldSigner)) {
      throw new TypeError('oldSigner is invalid')
    }
    if (!Keypair.isValidPublicKey(opts.newSigner)) {
      throw new TypeError('newSigner is invalid')
    }

    let attributes = {
      ext: new xdr.RecoverOpExt(xdr.LedgerVersion.emptyVersion())
    }
    attributes.account = Keypair.fromAccountId(opts.account).xdrAccountId()
    attributes.oldSigner = Keypair.fromAccountId(opts.oldSigner).xdrAccountId()
    attributes.newSigner = Keypair.fromAccountId(opts.newSigner).xdrAccountId()
    attributes.action = opts.action

    let recover = new xdr.RecoverOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.recover(recover)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Set Fees to the ledger
     * @param {object} opts
     * @param {string} opts.destination - Destination account ID to create an account for.
     * @param {Object} [opts.fee] - Amount in XLM the account should be funded for.
     * @param {string} opts.fee.feeType - feeType
     * @param {string} opts.fee.feeAmount - fee amount
     * @param {bool} [opts.isDelete] - isDelete - true for remove fee
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.SetFeesOp}
     */
  static setFees (opts) {
    let attributes = {
      ext: new xdr.SetFeesOpExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!isUndefined(opts.fee)) {
      if (!Operation.isValidAmount(opts.fee.fixedFee, true)) {
        throw new TypeError(
          'fixedFee argument must be of type String and represent a non-negative number'
        )
      }
      if (!Operation.isValidAmount(opts.fee.percentFee, true, 100)) {
        throw new TypeError(
          'percentFee argument must be of type String and represent a non-negative number less than 100'
        )
      }
      if (isUndefined(opts.fee.feeType)) {
        throw new TypeError('feeType must be defined')
      }
      if (!(opts.fee.feeType instanceof xdr.FeeType)) {
        throw new TypeError('feeType must be xdr.FeeType')
      }
      if (!Operation.isValidAsset(opts.fee.asset)) {
        throw new TypeError('Asset is invalid')
      }
      if (isUndefined(opts.fee.period)) {
        opts.fee.period = '0' // <<clear
      }
      if (isUndefined(opts.fee.subtype)) {
        opts.fee.subtype = '0'
      }
      if (isUndefined(opts.fee.lowerBound)) {
        opts.fee.lowerBound = '0'
      }
      if (isUndefined(opts.fee.upperBound)) {
        opts.fee.upperBound = BaseOperation.MAX_INT64_AMOUNT
      }

      let feeData = {
        fixedFee: Operation._toXDRAmount(opts.fee.fixedFee),
        percentFee: Operation._toXDRAmount(opts.fee.percentFee),
        feeType: opts.fee.feeType,
        asset: opts.fee.asset,
        subtype: UnsignedHyper.fromString(opts.fee.subtype),
        lowerBound: Operation._toXDRAmount(opts.fee.lowerBound),
        upperBound: Operation._toXDRAmount(opts.fee.upperBound),
        ext: new xdr.FeeEntryExt(xdr.LedgerVersion.emptyVersion())
      }
      let data = `type:${opts.fee.feeType.value}asset:${opts.fee.asset}subtype:${opts.fee.subtype.toString()}`
      if (opts.fee.accountId) {
        if (!Keypair.isValidPublicKey(opts.fee.accountId)) {
          throw new TypeError('accountId is invalid')
        } else {
          feeData.accountId = Keypair
            .fromAccountId(opts.fee.accountId)
            .xdrAccountId()
          data += `accountID:${opts.fee.accountId}`
        }
      }
      if (opts.fee.accountType) {
        feeData.accountType = Operation._accountTypeFromNumber(
          opts.fee.accountType
        )
        data += `accountType:${opts.fee.accountType}`
      }
      feeData.hash = hash(data)
      let entry = new xdr.FeeEntry(feeData)
      attributes.fee = entry
    }

    if (isUndefined(opts.isDelete)) {
      attributes.isDelete = false
    } else {
      attributes.isDelete = opts.isDelete
    }

    let setfees = new xdr.SetFeesOp(attributes)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.setFee(setfees)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Returns an XDR ManageAccountOp. A "manage account" operations block|ublocks account.
     * @param {object} opts
     * @param {string} opts.account - Account to be managed.
     * @param {boolean} [opts.block] - True to block account.
     * @returns {xdr.ManageAccountOp}
     */
  static manageAccount (opts) {
    let attributes = {
      ext: new xdr.ManageAccountOpExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!Keypair.isValidPublicKey(opts.account)) {
      throw new Error('account is invalid')
    }

    attributes.account = Keypair.fromAccountId(opts.account).xdrAccountId()
    if (isUndefined(opts.blockReasonsToAdd)) {
      opts.blockReasonsToAdd = 0
    }
    if (isUndefined(opts.blockReasonsToRemove)) {
      opts.blockReasonsToRemove = 0
    }

    if (isUndefined(opts.accountType)) {
      throw new Error('accountType should be defined')
    }

    attributes.accountType = Operation._accountTypeFromNumber(opts.accountType)
    attributes.blockReasonsToAdd = opts.blockReasonsToAdd
    attributes.blockReasonsToRemove = opts.blockReasonsToRemove

    let manageAccountOp = new xdr.ManageAccountOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageAccount(manageAccountOp)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Returns an XDR ManageBalanceOp. A "manage account" operations creates|deletes balance for account.
     * @param {object} opts
     * @param {string} opts.destination - Account to create account for.
     * @param {xdr.ManageBalanceAction} – Delete or create
     * @returns {xdr.ManageBalanceOp}
     */
  static manageBalance (opts) {
    let attributes = {
      ext: new xdr.ManageBalanceOpExt(xdr.LedgerVersion.emptyVersion())
    }

    if (!Keypair.isValidPublicKey(opts.destination)) {
      throw new Error('account is invalid')
    }
    if (!(opts.action instanceof xdr.ManageBalanceAction)) {
      throw new TypeError('action argument should be value of xdr.ManageBalanceAction enum')
    }
    if (!Operation.isValidAsset(opts.asset)) {
      throw new TypeError('asset is invalid')
    }

    attributes.destination = Keypair
      .fromAccountId(opts.destination)
      .xdrAccountId()
    attributes.action = opts.action
    attributes.asset = opts.asset

    let manageBalanceOp = new xdr.ManageBalanceOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageBalance(manageBalanceOp)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Returns an XDR ManageAssetPairOp. A "manage asset pair" operations creates|updates asset pair.
     * @param {object} opts
     * @param {string} opts.base - base asset
     * @param {string} opts.quote - quote asset
     * @param {number|string} opts.policies - asset pair policies
     * @param {number|string} opts.physicalPriceCorrection - correction of physical price in percents. If physical price is set and restriction by physical price set, mininal price for offer for this pair will be physicalPrice * physicalPriceCorrection
     * @param {number|string} opts.maxPriceStep - max price step in percent. User is allowed to set offer with price < (1 - maxPriceStep)*currentPrice and > (1 + maxPriceStep)*currentPrice
     * @param {number|string} opts.physicalPrice - physical price
     * @param {xdr.ManageAssetPairAction} – Create or update
     * @returns {xdr.ManageBalanceOp}
     */
  static manageAssetPair (opts) {
    let attributes = {
      ext: new xdr.ManageAssetPairOpExt(xdr.LedgerVersion.emptyVersion())
    }
    if (!Operation.isValidAsset(opts.base)) {
      throw new TypeError('base is invalid')
    }

    if (!Operation.isValidAsset(opts.quote)) {
      throw new TypeError('quote is invalid')
    }

    if (!(opts.action instanceof xdr.ManageAssetPairAction)) {
      throw new TypeError(
        'action argument should be value of xdr.ManageAssetPairAction enum'
      )
    }

    if (isUndefined(opts.policies)) {
      throw new TypeError('policies are not defined')
    }

    if (!Operation.isValidAmount(opts.physicalPriceCorrection, true)) {
      throw new TypeError(
        'physicalPriceCorrection argument must be of type String and represent a positive number or zero'
      )
    }

    if (!Operation.isValidAmount(opts.maxPriceStep, true)) {
      throw new TypeError(
        'maxPriceStep argument must be of type String and represent a positive number or zero'
      )
    }

    if (!Operation.isValidAmount(opts.physicalPrice, true)) {
      throw new TypeError(
        'physicalPrice argument must be of type String and represent a positive number or zero'
      )
    }

    attributes.base = opts.base
    attributes.quote = opts.quote
    attributes.policies = opts.policies
    attributes.action = opts.action
    attributes.physicalPriceCorrection = Operation
      ._toXDRAmount(opts.physicalPriceCorrection)
    // won't be updated
    attributes.physicalPrice = Operation._toXDRAmount(opts.physicalPrice)
    attributes.maxPriceStep = Operation._toXDRAmount(opts.maxPriceStep)

    let manageAssetPairOp = new xdr.ManageAssetPairOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.manageAssetPair(manageAssetPairOp)
    Operation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  /**
     * Converts the XDR Operation object to the opts object used to create the XDR
     * operation.
     * @param {xdr.Operation} operation - An XDR Operation.
     * @return {Operation}
     */
  static operationToObject (operation) {
    function accountIdtoAddress (accountId) {
      return encodeCheck('accountId', accountId.ed25519())
    }

    let result = {}
    if (operation.sourceAccount()) {
      result.source = accountIdtoAddress(operation.sourceAccount())
    }

    let attrs = operation.body().value()
    result.type = operation.body().switch().name
    switch (operation.body().switch()) {
      case xdr.OperationType.createAccount():
        result.destination = accountIdtoAddress(attrs.destination())
        result.recoveryKey = accountIdtoAddress(attrs.recoveryKey())
        result.accountType = attrs.accountType().value
        result.policies = attrs.policies()

        if (attrs.referrer()) {
          result.referrer = accountIdtoAddress(attrs.referrer())
        }
        break
      case xdr.OperationType.setOption():
        SetOptionsBuilder.setOptionsToObject(result, attrs)
        break
      case xdr.OperationType.setFee():
        if (!isUndefined(attrs.fee())) {
          result.fee = {}
          result.fee.fixedFee = Operation
            ._fromXDRAmount(attrs.fee().fixedFee())
          result.fee.percentFee = Operation
            ._fromXDRAmount(attrs.fee().percentFee())
          result.fee.feeType = attrs.fee().feeType()
          result.fee.asset = attrs.fee().asset().toString()
          result.fee.subtype = attrs.fee().subtype().toString()
          result.fee.lowerBound = Operation
            ._fromXDRAmount(attrs.fee().lowerBound())
          result.fee.upperBound = Operation
            ._fromXDRAmount(attrs.fee().upperBound())
          if (attrs.fee().accountId()) {
            result.fee.accountId = accountIdtoAddress(attrs.fee().accountId())
          }
          if (attrs.fee().accountType()) {
            result.fee.accountType = attrs.fee().accountType()
          }
          result.fee.hash = attrs.fee().hash()
        }
        break
      case xdr.OperationType.manageAccount():
        result.account = accountIdtoAddress(attrs.account())
        result.blockReasonsToAdd = attrs.blockReasonsToAdd()
        result.blockReasonsToRemove = attrs.blockReasonsToRemove()
        result.accountType = attrs.accountType().value
        break
      case xdr.OperationType.manageBalance():
        result.action = attrs.action()
        result.destination = accountIdtoAddress(attrs.destination())
        result.asset = attrs.asset()
        break
      case xdr.OperationType.manageAsset():
        ManageAssetBuilder.manageAssetToObject(result, attrs)
        break
      case xdr.OperationType.createPreissuanceRequest():
        PreIssuanceRequestOpBuilder.preIssuanceRequestOpToObject(result, attrs)
        break
      case xdr.OperationType.manageOffer():
        ManageOfferBuilder.manageOfferOpToObject(result, attrs)
        break
      case xdr.OperationType.manageAssetPair():
        result.action = attrs.action()
        result.base = attrs.base().toString()
        result.quote = attrs.quote().toString()
        result.policies = attrs.policies()
        result.physicalPriceCorrection = Operation
          ._fromXDRAmount(attrs.physicalPriceCorrection())
        result.maxPriceStep = Operation._fromXDRAmount(attrs.maxPriceStep())
        break
      case xdr.OperationType.reviewRequest():
        ReviewRequestBuilder.reviewRequestToObject(result, attrs)
        break
      case xdr.OperationType.createIssuanceRequest():
        CreateIssuanceRequestBuilder.createIssuanceRequestOpToObject(
          result,
          attrs
        )
        break
      case xdr.OperationType.createWithdrawalRequest():
        CreateWithdrawRequestBuilder.createWithdrawalRequestOpToObject(
          result,
          attrs
        )
        break
      case xdr.OperationType.createSaleRequest():
        SaleRequestBuilder.crateSaleCreationRequestToObject(result, attrs)
        break
      case xdr.OperationType.checkSaleState():
        SaleRequestBuilder.checkSaleStateToObject(result, attrs)
        break
      case xdr.OperationType.createAmlAlert():
        CreateAMLRequestBuilder.createAmlAlertToObject(result, attrs)
        break
      case xdr.OperationType.createKycRequest():
        CreateUpdateKYCRequestBuilder.createUpdateKYCRequestOpToObject(
          result,
          attrs
        )
        break
      case xdr.OperationType.manageSale():
        ManageSaleBuilder.manageSaleToObject(result, attrs)
        break
      case xdr.OperationType.paymentV2():
        PaymentV2Builder.paymentV2ToObject(result, attrs)
        break
      case xdr.OperationType.createAswapBidRequest():
        CreateAtomicSwapBidCreationRequestBuilder
          .createASwapBidCreationRequestToObject(result, attrs)
        break
      case xdr.OperationType.cancelAswapBid():
        CancelAtomicSwapBidBuilder.cancelASwapBidToObject(result, attrs)
        break
      case xdr.OperationType.createAswapRequest():
        CreateAtomicSwapRequestBuilder.createASwapRequestToObject(result, attrs)
        break
      /* case xdr.OperationType.createReference():
        CreateReferenceBuilder.createReferenceToObject(result, attrs)
        break */
      default:
        throw new Error('Unknown operation')
    }
    return result
  }
}
