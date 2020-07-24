"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreateManageOfferRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _manage_offer_builder = require("./manage_offer_builder");

var _validators = require("../../utils/validators");

var _lodash = require("lodash");

var CreateManageOfferRequestBuilder =
/*#__PURE__*/
function () {
  function CreateManageOfferRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateManageOfferRequestBuilder);
  }

  (0, _createClass2.default)(CreateManageOfferRequestBuilder, null, [{
    key: "createManageOfferRequest",

    /**
     * Creates manage offer request
     * @param {object} opts
     * @param {string} opts.baseBalance
     * @param {string} opts.quoteBalance
     * @param {boolean} opts.isBuy - if true - buys base asset, false - sells base asset
     * @param {string} opts.amount - Amount of the base asset
     * @param {string} opts.offerID - id of the offer
     * @param {object} opts.creatorDetails - details of the operation provided by creator
     * @param {string} opts.price - Price of the offer
     * @param {string} opts.orderBookID - 0 - for secondary market, otherwise to participate in sale
     * For this operation, back-end creates a "calculated fee", that calculates
     * as amount * percent fee. We can ignore the fixed fee because of it's a
     * back-end business.
     * @param {string} opts.fee – Percent fee of the offer
     * @param {number} [opts.allTasks] - Bitmask of all tasks which must be completed for the request approval
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CreateManageOfferRequestOp}
     */
    value: function createManageOfferRequest(opts) {
      var manageOfferOp = _manage_offer_builder.ManageOfferBuilder.prepareManageOfferOp(opts);

      if ((0, _lodash.isUndefined)(opts.creatorDetails)) {
        opts.creatorDetails = {};
      }

      (0, _validators.validateCreatorDetails)({
        value: opts.creatorDetails,
        fieldName: 'opts.creatorDetails'
      });
      var request = new _xdr_generated.default.ManageOfferRequest({
        op: manageOfferOp,
        ext: new _xdr_generated.default.ManageOfferRequestExt.movementRequestsDetail((0, _stringify.default)(opts.creatorDetails))
      });
      var createManageOfferRequestOp = new _xdr_generated.default.CreateManageOfferRequestOp({
        request: request,
        allTasks: opts.allTasks,
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.createManageOfferRequest(createManageOfferRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
  }, {
    key: "createManageOfferRequestToObject",
    value: function createManageOfferRequestToObject(result, attrs) {
      _manage_offer_builder.ManageOfferBuilder.manageOfferOpToObject(result, attrs.request().op());

      result.allTasks = attrs.allTasks();

      switch (attrs.request().ext().switch()) {
        case _xdr_generated.default.LedgerVersion.emptyVersion():
          {
            break;
          }

        case _xdr_generated.default.LedgerVersion.movementRequestsDetail():
          {
            result.creatorDetails = JSON.parse(attrs.request().ext().creatorDetails());
            break;
          }

        default:
          throw new Error('Unexpected version of create manage offer request');
      }
    }
  }]);
  return CreateManageOfferRequestBuilder;
}();

exports.CreateManageOfferRequestBuilder = CreateManageOfferRequestBuilder;