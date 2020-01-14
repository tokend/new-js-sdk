import xdr from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'
import { UnsignedHyper } from 'js-xdr'

export class ManageCreatePollRequestBuilder {
  /**
   * Creates operation to create create poll request
   * @param {object} opts
   *
   * @param {number} opts.permissionType - is used to restrict using of poll through rules (uint64)
   * @param {boolean} opts.voteConfirmationRequired - True means that signature of `resultProvider` is required to participate in poll voting
   * @param {string} opts.resultProviderID
   * AccountID of a keypair to be used as a result provider. Result providers are:
   * 1. Perform close poll operation
   * 2. Sign created vote operations (see `voteConfirmationRequired` param)
   *
   * @param {number} opts.numberOfChoices - Number of possible choices (uint64)
   * @param {number} opts.pollType - functional type of poll
   * @param {string} opts.startTime - Unix timestamp of voting start date
   * @param {string} opts.endTime - Unix timestamp of voting end date
   * @param {object} opts.creatorDetails - Additional details about poll
   * @param {number} [opts.allTasks] - tasks for the request
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   *
   * @returns {xdr.ManageCreatePollRequestOp}
   */
  static createPollRequest (opts) {
    if (!Keypair.isValidPublicKey(opts.resultProviderID)) {
      throw new Error('opts.resultProviderID is invalid')
    }

    let attrs = { voteConfirmationRequired: opts.voteConfirmationRequired }
    attrs.resultProviderId = Keypair.fromAccountId(opts.resultProviderID).xdrAccountId()

    if (Number.isNaN(opts.permissionType)) {
      throw new Error('opts.permissionType is NaN')
    }

    attrs.permissionType = opts.permissionType

    if (Number.isNaN(opts.numberOfChoices)) {
      throw new Error('opts.numberOfChoices is NaN')
    }

    attrs.numberOfChoices = opts.numberOfChoices

    if (Number.isNaN(opts.pollType)) {
      throw new Error('opts.pollType is NaN')
    }

    switch (opts.pollType) {
      case xdr.PollType.singleChoice().value:
        attrs.data = new xdr.PollData.singleChoice(
          new xdr.EmptyExt(xdr.LedgerVersion.emptyVersion()))
        break
      default:
        throw new Error('current opts.pollType is not supported ' + opts.pollType)
    }

    if (isUndefined(opts.startTime)) {
      throw new Error('opts.startTime is invalid')
    }
    attrs.startTime = UnsignedHyper.fromString(opts.startTime)

    if (isUndefined(opts.endTime)) {
      throw new Error('opts.endTime is invalid')
    }
    attrs.endTime = UnsignedHyper.fromString(opts.endTime)

    attrs.creatorDetails = JSON.stringify(opts.creatorDetails)

    attrs.ext = new xdr.CreatePollRequestExt(
      xdr.LedgerVersion.emptyVersion()
    )

    let data = xdr.ManageCreatePollRequestOpData.create()
    data.set('create', new xdr.CreatePollRequestData({
      request: new xdr.CreatePollRequest(attrs),
      allTasks: opts.allTasks,
      ext: new xdr.CreatePollRequestDataExt(xdr.LedgerVersion.emptyVersion())
    }))

    return ManageCreatePollRequestBuilder._manageCreatePollRequest(opts, data)
  }

  /**
   * Creates operation to create asset update request
   * @param {object} opts
   *
   * @param {string} opts.requestID - ID, if 0 - creates new, updates otherwise
   * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
   *
   * @returns {xdr.ManageCreatePollRequestOp}
   */
  static cancelPollRequest (opts) {
    if (isUndefined(opts.requestID)) {
      throw new Error('opts.requestID is undefined')
    }

    let data = xdr.ManageCreatePollRequestOpData.cancel()
    data.set('cancel', new xdr.CancelPollRequestData({
      requestId: UnsignedHyper.fromString(opts.requestID),
      ext: new xdr.CancelPollRequestDataExt(xdr.LedgerVersion.emptyVersion())
    }))

    return ManageCreatePollRequestBuilder._manageCreatePollRequest(opts, data)
  }

  static _manageCreatePollRequest (opts, data) {
    let op = new xdr.ManageCreatePollRequestOp({
      data: data,
      ext: new xdr.ManageCreatePollRequestOpExt(xdr.LedgerVersion.emptyVersion())
    })

    let opAttributes = { source: undefined }
    opAttributes.body = xdr.OperationBody.manageCreatePollRequest(op)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static manageCreatePollRequestToObject (result, attrs) {
    switch (attrs.data().switch()) {
      case xdr.ManageCreatePollRequestAction.create():
      {
        let request = attrs.data().createData().request()
        result.permissionType = request.permissionType()
        result.resultProviderID = BaseOperation.accountIdtoAddress(request.resultProviderId())
        result.voteConfirmationRequired = request.voteConfirmationRequired()
        result.pollType = request.data()._switch.value
        switch (request.data().switch()) {
          case xdr.PollType.singleChoice():
            break
          default:
            throw new Error('Unexpected poll type ' + request.data().type().value)
        }
        result.numberOfChoices = request.numberOfChoices()
        result.creatorDetails = JSON.parse(request.creatorDetails())
        result.startTime = request.startTime().toString()
        result.endTime = request.endTime().toString()
        result.allTasks = attrs.data().createData().allTasks()
        break
      }
      case xdr.ManageCreatePollRequestAction.cancel():
      {
        result.requestID = attrs.data().cancelData().requestId().toString()
        break
      }
    }
  }
}
