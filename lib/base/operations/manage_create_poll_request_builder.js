"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ManageCreatePollRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _isNan = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/is-nan"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var ManageCreatePollRequestBuilder =
/*#__PURE__*/
function () {
  function ManageCreatePollRequestBuilder() {
    (0, _classCallCheck2.default)(this, ManageCreatePollRequestBuilder);
  }

  (0, _createClass2.default)(ManageCreatePollRequestBuilder, null, [{
    key: "createPollRequest",

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
    value: function createPollRequest(opts) {
      if (!_keypair.Keypair.isValidPublicKey(opts.resultProviderID)) {
        throw new Error('opts.resultProviderID is invalid');
      }

      var attrs = {
        voteConfirmationRequired: opts.voteConfirmationRequired
      };
      attrs.resultProviderId = _keypair.Keypair.fromAccountId(opts.resultProviderID).xdrAccountId();

      if ((0, _isNan.default)(opts.permissionType)) {
        throw new Error('opts.permissionType is NaN');
      }

      attrs.permissionType = opts.permissionType;

      if ((0, _isNan.default)(opts.numberOfChoices)) {
        throw new Error('opts.numberOfChoices is NaN');
      }

      attrs.numberOfChoices = opts.numberOfChoices;

      if ((0, _isNan.default)(opts.pollType)) {
        throw new Error('opts.pollType is NaN');
      }

      switch (opts.pollType) {
        case _xdr_generated.default.PollType.singleChoice().value:
          attrs.data = new _xdr_generated.default.PollData.singleChoice(new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion()));
          break;

        default:
          throw new Error('current opts.pollType is not supported ' + opts.pollType);
      }

      if ((0, _isUndefined.default)(opts.startTime)) {
        throw new Error('opts.startTime is invalid');
      }

      attrs.startTime = _jsXdr.UnsignedHyper.fromString(opts.startTime);

      if ((0, _isUndefined.default)(opts.endTime)) {
        throw new Error('opts.endTime is invalid');
      }

      attrs.endTime = _jsXdr.UnsignedHyper.fromString(opts.endTime);
      attrs.creatorDetails = (0, _stringify.default)(opts.creatorDetails);
      attrs.ext = new _xdr_generated.default.CreatePollRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());

      var data = _xdr_generated.default.ManageCreatePollRequestOpData.create();

      data.set('create', new _xdr_generated.default.CreatePollRequestData({
        request: new _xdr_generated.default.CreatePollRequest(attrs),
        allTasks: opts.allTasks,
        ext: new _xdr_generated.default.CreatePollRequestDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));
      return ManageCreatePollRequestBuilder._manageCreatePollRequest(opts, data);
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

  }, {
    key: "cancelPollRequest",
    value: function cancelPollRequest(opts) {
      if ((0, _isUndefined.default)(opts.requestID)) {
        throw new Error('opts.requestID is undefined');
      }

      var data = _xdr_generated.default.ManageCreatePollRequestOpData.cancel();

      data.set('cancel', new _xdr_generated.default.CancelPollRequestData({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        ext: new _xdr_generated.default.CancelPollRequestDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));
      return ManageCreatePollRequestBuilder._manageCreatePollRequest(opts, data);
    }
  }, {
    key: "_manageCreatePollRequest",
    value: function _manageCreatePollRequest(opts, data) {
      var op = new _xdr_generated.default.ManageCreatePollRequestOp({
        data: data,
        ext: new _xdr_generated.default.ManageCreatePollRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {
        source: undefined
      };
      opAttributes.body = _xdr_generated.default.OperationBody.manageCreatePollRequest(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "manageCreatePollRequestToObject",
    value: function manageCreatePollRequestToObject(result, attrs) {
      switch (attrs.data().switch()) {
        case _xdr_generated.default.ManageCreatePollRequestAction.create():
          {
            var request = attrs.data().createData().request();
            result.permissionType = request.permissionType();
            result.resultProviderID = _base_operation.BaseOperation.accountIdtoAddress(request.resultProviderId());
            result.voteConfirmationRequired = request.voteConfirmationRequired();
            result.pollType = request.data()._switch.value;

            switch (request.data().switch()) {
              case _xdr_generated.default.PollType.singleChoice():
                break;

              default:
                throw new Error('Unexpected poll type ' + request.data().type().value);
            }

            result.numberOfChoices = request.numberOfChoices();
            result.creatorDetails = JSON.parse(request.creatorDetails());
            result.startTime = request.startTime().toString();
            result.endTime = request.endTime().toString();
            result.allTasks = attrs.data().createData().allTasks();
            break;
          }

        case _xdr_generated.default.ManageCreatePollRequestAction.cancel():
          {
            result.requestID = attrs.data().cancelData().requestId().toString();
            break;
          }
      }
    }
  }]);
  return ManageCreatePollRequestBuilder;
}();

exports.ManageCreatePollRequestBuilder = ManageCreatePollRequestBuilder;