"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Request.
 *
 * @class
 */
var Request =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Request, _ResourceGroupBase);

  function Request() {
    (0, _classCallCheck2.default)(this, Request);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Request).apply(this, arguments));
  }

  (0, _createClass2.default)(Request, [{
    key: "get",

    /**
     * @method
     * Gets reviewable request by ID
     *
     * @param {string} id - ID of reviewable request
     * @return {HorizonResponse}
     */
    value: function get(id) {
      return this._server._makeCallBuilder().withSignature().appendUrlSegment('requests').appendUrlSegment(id).get();
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

  }, {
    key: "getAllForAssets",
    value: function getAllForAssets(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('assets').get(query);
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

  }, {
    key: "getAllForPreissuances",
    value: function getAllForPreissuances(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('preissuances').get(query);
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

  }, {
    key: "getAllForIssuances",
    value: function getAllForIssuances(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('issuances').get(query);
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

  }, {
    key: "getAllForWithdrawals",
    value: function getAllForWithdrawals(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('withdrawals').get(query);
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

  }, {
    key: "getAllForSales",
    value: function getAllForSales(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('sales').get(query);
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

  }, {
    key: "getAllForLimitsUpdates",
    value: function getAllForLimitsUpdates(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('limits_updates').get(query);
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

  }, {
    key: "getAllForUpdateKyc",
    value: function getAllForUpdateKyc(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('update_kyc').get(query);
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

  }, {
    key: "getAllForUpdateSaleDetails",
    value: function getAllForUpdateSaleDetails(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('update_sale_details').get(query);
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

  }, {
    key: "getAllForUpdateSaleEndTime",
    value: function getAllForUpdateSaleEndTime(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('update_sale_end_time').get(query);
    }
    /**
     * Gets all atomic swap bids requests
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

  }, {
    key: "getAllForAtomicSwapBids",
    value: function getAllForAtomicSwapBids(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('atomic_swap_bids').get(query);
    }
    /**
     * Gets all atomic swap
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

  }, {
    key: "getAllForAtomicSwap",
    value: function getAllForAtomicSwap(query) {
      return this._makeCallBuilderWithSignature().appendUrlSegment('atomic_swaps').get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('request');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return Request;
}(_resource_group_base.ResourceGroupBase);

exports.Request = Request;