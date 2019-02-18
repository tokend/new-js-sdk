import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { UnsignedHyper } from 'js-xdr'
import { Hasher } from '../util/hasher'
import { PaymentV2Builder } from './payment_v2_builder'
import { Keypair } from '../keypair'

export class ReviewRequestBuilder {
  /**
   * Creates operation to review reviewable request
   * @param {object} opts
   * @param {string} opts.requestID - request ID
   * @param {string} opts.requestHash - Hash of the request to be reviewed
   * @param {number} opts.requestType - Type of the request to be reviewed (xdr.ReviewableRequestType)
   * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
   * @param {string} opts.reason - Reject reason
   * @param {object} opts.reviewDetails - Review details for reviewable request (xdr.ReviewDetails)
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @param {number|string} opts.tasksToAdd - new tasks for reviewable request to be accomplished before fulfill
   * @param {number|string} opts.tasksToRemove - tasks, which were done by the reviewer and should be removed
   * @param {string} opts.externalDetails - the reviewer's commentary
   * @returns {xdr.ReviewRequestOp}
   */
  static reviewRequest (opts) {
    let attrs = ReviewRequestBuilder._prepareAttrs(opts)

    let validRequestType = !isUndefined(opts.requestType) &&
      xdr.ReviewableRequestType._byValue.has(opts.requestType)
    if (!validRequestType) {
      throw new Error('opts.requestType is invalid')
    }

    let requestType = xdr.ReviewableRequestType._byValue.get(opts.requestType)

    attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails(requestType)

    attrs.ext = new xdr.ReviewRequestOpExt(xdr.LedgerVersion.emptyVersion())

    return ReviewRequestBuilder._createOp(opts, attrs)
  }

  static _createOp (opts, attrs) {
    let reviewRequestOp = new xdr.ReviewRequestOp(attrs)
    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.reviewRequest(reviewRequestOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static _prepareAttrs (opts) {
    let attrs = {}
    if (isUndefined(opts.requestID) || opts.requestID === '0') {
      throw new Error('opts.requestID is invalid')
    }

    attrs.requestId = UnsignedHyper.fromString(opts.requestID)
    attrs.requestHash = Hasher.hash(opts.requestHash)

    let validAction = opts.action &&
      xdr.ReviewRequestOpAction._byValue.has(opts.action)
    if (!validAction) {
      throw new Error('opts.action is invalid')
    }

    attrs.action = xdr.ReviewRequestOpAction._byValue.get(opts.action)

    if (!BaseOperation.isValidString(opts.reason, 0, 256)) {
      throw new Error('opts.reason is invalid')
    }

    attrs.reason = opts.reason

    if (isUndefined(opts.reviewDetails)) {
      opts.reviewDetails = {}
    }

    if (isUndefined(opts.reviewDetails.tasksToAdd)) {
      opts.reviewDetails.tasksToAdd = 0
    }

    if (isUndefined(opts.reviewDetails.tasksToRemove)) {
      opts.reviewDetails.tasksToRemove = 0
    }

    if (isUndefined(opts.reviewDetails.externalDetails)) {
      opts.reviewDetails.externalDetails = ''
    }

    attrs.reviewDetails = new xdr.ReviewDetails({
      tasksToAdd: opts.reviewDetails.tasksToAdd,
      tasksToRemove: opts.reviewDetails.tasksToRemove,
      externalDetails: opts.reviewDetails.externalDetails,
      ext: new xdr.ReviewDetailsExt(xdr.LedgerVersion.emptyVersion())
    })

    return attrs
  }

  /**
   * Creates operation to review withdraw request
   * @param {object} opts
   * @param {string} opts.requestID - request ID
   * @param {string} opts.requestHash - Hash of the request to be reviewed
   * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
   * @param {string} opts.reason - Reject reason
   * @param {string} opts.externalDetails - External System details
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @param {number|string} opts.tasksToAdd - new tasks for reviewable request to be accomplished before fulfill
   * @param {number|string} opts.tasksToRemove - tasks, which were done by the reviewer and should be removed
   * @returns {xdr.ReviewRequestOp}
   */
  static reviewWithdrawRequest (opts) {
    if (isUndefined(opts.reviewDetails.externalDetails)) {
      throw new Error('opts.reviewDetails.externalDetails is invalid')
    }

    let attrs = ReviewRequestBuilder._prepareAttrs(opts)

    let d = xdr.ReviewRequestOpRequestDetails.withdraw()
    d.set('withdraw', new xdr.WithdrawalDetails({
      externalDetails: opts.externalDetails,
      ext: new xdr.WithdrawalDetailsExt(xdr.LedgerVersion.emptyVersion())
    }))
    attrs.requestDetails = d

    attrs.reviewDetails = new xdr.ReviewDetails({
      tasksToAdd: opts.reviewDetails.tasksToAdd,
      tasksToRemove: opts.reviewDetails.tasksToRemove,
      externalDetails: JSON.stringify(opts.reviewDetails.externalDetails),
      ext: new xdr.ReviewDetailsExt(xdr.LedgerVersion.emptyVersion())
    })

    attrs.ext = new xdr.ReviewRequestOpExt(xdr.LedgerVersion.emptyVersion())

    return ReviewRequestBuilder._createOp(opts, attrs)
  }

  /**
   * Creates operation to review aml alert request
   * @param {object} opts
   * @param {string} opts.requestID - request ID
   * @param {string} opts.requestHash - Hash of the request to be reviewed
   * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
   * @param {string} opts.reason - Reject reason
   * @param {string} opts.comment - Comment to review
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.ReviewRequestOp}
   */
  static reviewAmlAlertRequest (opts) {
    if (isUndefined(opts.comment)) {
      throw new Error('opts.comment is invalid')
    }

    let attrs = ReviewRequestBuilder._prepareAttrs(opts)

    attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.amlAlert(
      new xdr.AmlAlertDetails({
        ext: new xdr.AmlAlertDetailsExt(xdr.LedgerVersion.emptyVersion()),
        comment: opts.comment
      })
    )
    attrs.ext = new xdr.ReviewRequestOpExt(xdr.LedgerVersion.emptyVersion())

    return ReviewRequestBuilder._createOp(opts, attrs)
  }

  static reviewLimitsUpdateRequest (opts) {
    if (isUndefined(opts.newLimits)) {
      throw new Error('opts.newLimits is invalid')
    }

    let attrs = ReviewRequestBuilder._prepareAttrs(opts)

    let rawLimitsV2Entry = {}

    if (isUndefined(opts.newLimits.id)) {
      throw new Error('opts.newLimits.id is not defined')
    }
    rawLimitsV2Entry.id = UnsignedHyper.fromString(opts.newLimits.id)

    if (!isUndefined(opts.newLimits.accountID) &&
        !isUndefined(opts.newLimits.accountType)) {
      throw new Error(
        'opts.newLimits.accountID and opts.newLimits.accountType cannot be set for same limits'
      )
    }

    if (!isUndefined(opts.newLimits.accountID)) {
      if (!Keypair.isValidPublicKey(opts.newLimits.accountID)) {
        throw new Error('opts.newLimits.accountID is invalid')
      }
      rawLimitsV2Entry.accountId = Keypair.fromAccountId(
        opts.newLimits.accountID
      ).xdrAccountId()
    }

    if (!isUndefined(opts.newLimits.accountType)) {
      rawLimitsV2Entry.accountType = BaseOperation
        ._accountTypeFromNumber(opts.newLimits.accountType)
    }

    if (isUndefined(opts.newLimits.statsOpType)) {
      throw new Error('opts.newLimits.statsOpType is not defined')
    }
    rawLimitsV2Entry.statsOpType = BaseOperation
      ._statsOpTypeFromNumber(opts.newLimits.statsOpType)

    if (isUndefined(opts.newLimits.assetCode) ||
      !BaseOperation.isValidAsset(opts.newLimits.assetCode)) {
      throw new Error('opts.newLimits.assetCode is invalid')
    }
    rawLimitsV2Entry.assetCode = opts.newLimits.assetCode

    if (isUndefined(opts.newLimits.isConvertNeeded)) {
      throw new Error('opts.newLimits.isConvertNeeded is not defined')
    }
    rawLimitsV2Entry.isConvertNeeded = opts.newLimits.isConvertNeeded

    rawLimitsV2Entry.dailyOut = BaseOperation._toUnsignedXDRAmount(
      opts.newLimits.dailyOut
    )
    rawLimitsV2Entry.weeklyOut = BaseOperation._toUnsignedXDRAmount(
      opts.newLimits.weeklyOut
    )
    rawLimitsV2Entry.monthlyOut = BaseOperation._toUnsignedXDRAmount(
      opts.newLimits.monthlyOut
    )
    rawLimitsV2Entry.annualOut = BaseOperation._toUnsignedXDRAmount(
      opts.newLimits.annualOut
    )
    rawLimitsV2Entry.ext = new xdr.LimitsV2EntryExt(
      xdr.LedgerVersion.emptyVersion()
    )

    attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails
      .limitsUpdate(
        new xdr.LimitsUpdateDetails({
          newLimitsV2: new xdr.LimitsV2Entry(rawLimitsV2Entry),
          ext: new xdr.LimitsUpdateDetailsExt(xdr.LedgerVersion.emptyVersion())
        })
      )

    return ReviewRequestBuilder._createOp(opts, attrs)
  }

  static reviewUpdateKYCRequest (opts) {
    let attrs = ReviewRequestBuilder._prepareAttrs(opts)

    attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.updateKyc(
      new xdr.UpdateKycDetails({
        externalDetails: JSON.stringify(opts.requestDetails),
        ext: new xdr.UpdateKycDetailsExt(xdr.LedgerVersion.emptyVersion())
      })
    )

    attrs.ext = new xdr.ReviewRequestOpExt(xdr.LedgerVersion.emptyVersion())

    return ReviewRequestBuilder._createOp(opts, attrs)
  }

  /**
   * Creates operation to review invoice request
   * @param {object} opts
   * @param {string} opts.requestID - request ID
   * @param {string} opts.requestHash - Hash of the request to be reviewed
   * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
   * @param {string} opts.reason - Reject reason
   * @param {object} opts.billPayDetails - invoice payment details (xdr.PaymentOpV2)
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   * @returns {xdr.ReviewRequestOp}
   */
  static reviewInvoiceRequest (opts) {
    let attrs = ReviewRequestBuilder._prepareAttrs(opts)
    let billPayDetails = PaymentV2Builder.prepareAttrs(opts.billPayDetails)
    attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.invoice(
      new xdr.BillPayDetails({
        paymentDetails: new xdr.PaymentOpV2(billPayDetails),
        ext: new xdr.BillPayDetailsExt(xdr.LedgerVersion.emptyVersion())
      })
    )
    return ReviewRequestBuilder._createOp(opts, attrs)
  }

  /**
   * Creates operation to review contract request
   * @param {object} opts
   * @param {string} opts.requestID - request ID
   * @param {string} opts.requestHash - Hash of the request to be reviewed
   * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
   * @param {string} opts.reason - Reject reason
   * @param {object} opts.details - customer details about contract
   * @param {string} [opts.source] - The source account for the review request. Defaults to the transaction's source account.
   * @returns {xdr.ReviewRequestOp}
   */
  static reviewContractRequest (opts) {
    let attrs = ReviewRequestBuilder._prepareAttrs(opts)
    attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.contract(
      new xdr.ContractDetails({
        details: JSON.stringify(opts.details),
        ext: new xdr.ContractDetailsExt(xdr.LedgerVersion.emptyVersion())
      })
    )
    return ReviewRequestBuilder._createOp(opts, attrs)
  }

  static reviewRequestToObject (result, attrs) {
    result.requestID = attrs.requestId().toString()
    result.requestHash = attrs.requestHash().toString('hex')
    result.requestType = attrs.requestDetails().switch().value
    switch (attrs.requestDetails().switch()) {
      case xdr.ReviewableRequestType.withdraw(): {
        result.withdrawal = {
          externalDetails: attrs.requestDetails().withdrawal().externalDetails().toString()
        }
        break
      }
      case xdr.ReviewableRequestType.limitsUpdate(): {
        let newLimitsV2 = attrs.requestDetails().limitsUpdate().newLimitsV2()

        result.limitsUpdate = {
          newLimits: {
            id: newLimitsV2.id().toString(),
            statsOpType: newLimitsV2.statsOpType().value,
            assetCode: newLimitsV2.assetCode().toString(),
            isConvertNeeded: newLimitsV2.isConvertNeeded(),
            dailyOut: BaseOperation._fromXDRAmount(newLimitsV2.dailyOut()),
            weeklyOut: BaseOperation._fromXDRAmount(newLimitsV2.weeklyOut()),
            monthlyOut: BaseOperation._fromXDRAmount(newLimitsV2.monthlyOut()),
            annualOut: BaseOperation._fromXDRAmount(newLimitsV2.annualOut())
          }
        }

        if (newLimitsV2.accountId()) {
          result.limitsUpdate.newLimits.accountID = BaseOperation
            .accountIdtoAddress(newLimitsV2.accountId())
        }

        if (newLimitsV2.accountType()) {
          result.limitsUpdate.newLimits.accountType = newLimitsV2
            .accountType().value
        }

        break
      }
      case xdr.ReviewableRequestType.updateKyc(): {
        result.updateKyc = {
          externalDetails: attrs.requestDetails().updateKyc().externalDetails().toString()
        }
        break
      }
      case xdr.ReviewableRequestType.amlAlert(): {
        result.amlAlert = {
          comment: attrs.requestDetails().amlAlertDetails().comment().toString()
        }
        break
      }
    }
    // let rd = attrs.reviewDetails()
    // let parsed = JSON.stringify(JSON.parse(rd))
    result.reviewDetails = {
      tasksToAdd: attrs.reviewDetails().tasksToAdd(),
      tasksToRemove: attrs.reviewDetails().tasksToRemove(),
      externalDetails: attrs.reviewDetails().externalDetails().toString('utf8')
    }
    result.action = attrs.action().value
    result.reason = attrs.reason().toString()
  }
}
