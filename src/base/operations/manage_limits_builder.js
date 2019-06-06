import xdr from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'

export class ManageLimitsBuilder {
  /**
     * Create limits for account or account type
     * @param {object} opts
     * @param {string} opts.accountID - account to create limits for
     * @param {string} opts.accountRole - account role to create limits for
     * @param {string} opts.statsOpType - operation type of stats
     * @param {string} opts.assetCode - asset code of limits
     * @param {boolean} opts.isConvertNeeded - if true - can use another assets for stats
     * @param {string} opts.dailyOut - limit per day
     * @param {string} opts.weeklyOut - limit per week
     * @param {string} opts.monthlyOut - limit per month
     * @param {string} opts.annualOut - limit per year
     * @param {string} [opts.source] - The source account for the limits creation. Defaults to the transaction's source account.
     * @returns {xdr.ManageLimitsOp}
     */
  static createLimits (opts) {
    if (!isUndefined(opts.accountID) && !isUndefined(opts.accountType)) {
      throw new Error('opts.accountID and opts.accountType cannot be set for same limits')
    }

    let rawLimitsCreateDetails = {}

    if (!isUndefined(opts.accountID)) {
      if (!Keypair.isValidPublicKey(opts.accountID)) {
        throw new Error('opts.accountID is invalid')
      }
      rawLimitsCreateDetails.accountId = Keypair.fromAccountId(opts.accountID).xdrAccountId()
    }

    if (!isUndefined(opts.accountRole)) {
      rawLimitsCreateDetails.accountRole = UnsignedHyper.fromString(opts.accountRole)
    }

    if (isUndefined(opts.statsOpType)) {
      throw new Error('opts.statsOpType cannot be empty')
    }
    rawLimitsCreateDetails.statsOpType = BaseOperation._statsOpTypeFromNumber(opts.statsOpType)

    if (isUndefined(opts.assetCode) || !BaseOperation.isValidAsset(opts.assetCode)) {
      throw new Error('opts.assetCode is invalid')
    }
    rawLimitsCreateDetails.assetCode = opts.assetCode

    if (isUndefined(opts.isConvertNeeded)) {
      throw new Error('opts.isConvertNeeded cannot be empty')
    }
    rawLimitsCreateDetails.isConvertNeeded = opts.isConvertNeeded

    rawLimitsCreateDetails.dailyOut = BaseOperation._toUnsignedXDRAmount(opts.dailyOut)
    rawLimitsCreateDetails.weeklyOut = BaseOperation._toUnsignedXDRAmount(opts.weeklyOut)
    rawLimitsCreateDetails.monthlyOut = BaseOperation._toUnsignedXDRAmount(opts.monthlyOut)
    rawLimitsCreateDetails.annualOut = BaseOperation._toUnsignedXDRAmount(opts.annualOut)

    rawLimitsCreateDetails.ext =
      new xdr.LimitsCreateDetailsExt(xdr.LedgerVersion.emptyVersion())

    let limitsCreateDetails = new xdr.LimitsCreateDetails(rawLimitsCreateDetails)

    let manageLimitsOp = new xdr.ManageLimitsOp({
      details: new xdr.ManageLimitsOpDetails.create(limitsCreateDetails),
      ext: new xdr.ManageLimitsOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.manageLimit(manageLimitsOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  /**
     * Delete limits by given id
     * @param {object} opts
     * @param {number|string} opts.id - limits to remove id
     */
  static removeLimits (opts) {
    if (isUndefined(opts.id)) {
      throw new Error('opts.id cannot be empty')
    }

    let manageLimitsOp = new xdr.ManageLimitsOp({
      details: new xdr.ManageLimitsOpDetails.remove(UnsignedHyper.fromString(opts.id)),
      ext: new xdr.ManageLimitsOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttrs = {}
    opAttrs.body = xdr.OperationBody.manageLimit(manageLimitsOp)
    BaseOperation.setSourceAccount(opAttrs, opts)
    return new xdr.Operation(opAttrs)
  }

  static manageLimitsOpToObject (result, attrs) {
    switch (attrs.details().switch()) {
      case xdr.ManageLimitsAction.create(): {
        let details = attrs.details().limitsCreateDetails()
        if (details.accountId()) {
          result.account = BaseOperation.accountIdtoAddress(details.accountId())
        }
        if (details.accountRole()) {
          result.accountRole = details.accountRole().toString()
        }

        result.statsOpType = BaseOperation._numberFromXDR(details.statsOpType().value)
        result.assetCode = details.assetCode().toString()
        result.isConvertNeeded = details.isConvertNeeded()
        result.dailyOut = BaseOperation._fromXDRAmount(details.dailyOut())
        result.weeklyOut = BaseOperation._fromXDRAmount(details.weeklyOut())
        result.monthlyOut = BaseOperation._fromXDRAmount(details.monthlyOut())
        result.annualOut = BaseOperation._fromXDRAmount(details.annualOut())

        break
      }
      case xdr.ManageLimitsAction.remove(): {
        result.id = attrs.details().id().toString()
        break
      }
    }
  }
}
