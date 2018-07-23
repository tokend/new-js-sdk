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
   * @param {object} [query] Request options.
   * @param {Number} [query.limit] Page limit.
   * @param {string} [query.cursor] Page cursor.
   * @param {string} [query.order] Sorting order.
   * @param {string} [query.requestor] Account who requested. Must be a valid public key
   * @param {string} [query.reviewer] Account who should review Must be a valid public key.
   * @param {string} [query.state] State of reviewable request. Pending: 1, Canceled: 2, Approved: 3, Rejected: 4, PermanentlyRejected: 5
   * @return {HorizonResponse}
   */
  getAllForAssets (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('assets')
      .get(query)
  }

  getAllForPreissuances (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('preissuances')
      .get(query)
  }

  getAllForIssuances (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('issuances')
      .get(query)
  }

  getAllForWithdrawals (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('withdrawals')
      .get(query)
  }

  getAllForSales (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('sales')
      .get(query)
  }

  getAllForLimitsUpdates (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('limits_updates')
      .get(query)
  }

  getAllForUpdateKyc (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('update_kyc')
      .get(query)
  }

  getAllForUpdateSaleDetails (query) {
    return this._makeCallBuilderWithSignature()
      .appendUrlSegment('update_sale_details')
      .get(query)
  }

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
