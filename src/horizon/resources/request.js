import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Request.
 *
 * @class
 */
export class Request extends ResourceGroupBase {
  /**
   * @method
   * Gets reviewable request by ID
   *
   * @param {string} id - ID of reviewable request
   * @return {HorizonResponse}
   */
  get (id) {
    return this._server._makeCallBuilder()
      .appendUrlSegment('requests')
      .appendUrlSegment(id)
      .get()
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @param {string} [query.asset] - If present, the result will include only requests for specific asset
   * @return {HorizonResponse}
   */
  getAllForAssets (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('assets')
      .get(query)
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @param {string} [query.asset] - If present, the result will include only requests for specific asset
   * @return {HorizonResponse}
   */
  getAllForPreissuances (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('preissuances')
      .get(query)
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @param {string} [query.asset] - If present, the result will include only requests for specific asset
   * @return {HorizonResponse}
   */
  getAllForIssuances (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('issuances')
      .get(query)
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @param {string} [query.dest_asset_code] If present, the result records will include only requests with specific asset
   * @return {HorizonResponse}
   */
  getAllForWithdrawals (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('withdrawals')
      .get(query)
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @param {string} [query.base_asset] If present, the result records will include only requests with specific base asset
   * @return {HorizonResponse}
   */
  getAllForSales (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('sales')
      .get(query)
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @return {HorizonResponse}
   */
  getAllForLimitsUpdates (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('limits_updates')
      .get(query)
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @param {string} [query.account_to_update_kyc] Should be a valid `account ID`. If present, the result will return only requests for specific account id. It may differ from `requestor`, if the request was raised by master signer
   * @param {string} [query.mask_set] Bit mask that defines what review tasks are still incomplete for the request. If present, the result will return only requests that has such incomplete tasks.
   * @param {string} [query.mask_set_part_eq] If present, the result will return only requests that has such incomplete tasks and no others.
   * @param {string} [query.mask_not_set] Bit mask that defines what review tasks are already complete for the request. If present, the result will return only requests that has such complete tasks.
   * @param {string} [query.account_type_to_set] Should be a valid `xdr.accountType`. If present, the result will return only requests for specific account type
   *
   * @return {HorizonResponse}
   */
  getAllForUpdateKyc (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('update_kyc')
      .get(query)
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @return {HorizonResponse}
   */
  getAllForUpdateSaleDetails (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('update_sale_details')
      .get(query)
  }

  /**
   * Gets all asset creation and asset update reviewable requests
   *
   * @param {object} [query] Request options.
   * @param {number} [query.limit] If present, the result page will contain only this number of records.
   * @param {string} [query.cursor] If present, the result records will start from specific point.
   * @param {string} [query.order] If present, the result records will be sorted as specified ('asc'/'desc'), ascending order by default
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @return {HorizonResponse}
   */
  getAllForUpdateSaleEndTime (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('update_sale_end_time')
      .get(query)
  }

  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('request')
  }

  _makeCallBuilderWithSignature () {
    return this._makeCallBuilder().withSignature()
  }
}
