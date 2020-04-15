"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreateManageLimitsRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var CreateManageLimitsRequestBuilder =
/*#__PURE__*/
function () {
  function CreateManageLimitsRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateManageLimitsRequestBuilder);
  }

  (0, _createClass2.default)(CreateManageLimitsRequestBuilder, null, [{
    key: "createManageLimitsRequest",

    /**
     * Creates limits update request
     * @param {object} opts
     * @param {object} opts.creatorDetails - details to review
     * @param {number} opts.allTasks - Bitmask of all tasks which must be completed for the request approval
     * @param {string|number} opts.requestID - if 0 - create request, else - update existing request
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CreateManageLimitsRequestOp}
     */
    value: function createManageLimitsRequest(opts) {
      if ((0, _isUndefined.default)(opts.creatorDetails)) {
        throw new Error('opts.creatorDetails is not defined');
      }

      if ((0, _isUndefined.default)(opts.requestID)) {
        throw new Error('opts.requestID is not defined');
      }

      var limitsUpdateRequest = new _xdr_generated.default.LimitsUpdateRequest({
        creatorDetails: (0, _stringify.default)(opts.creatorDetails),
        ext: new _xdr_generated.default.LimitsUpdateRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var createManageLimitsRequestOp = new _xdr_generated.default.CreateManageLimitsRequestOp({
        manageLimitsRequest: limitsUpdateRequest,
        allTasks: opts.allTasks,
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        ext: new _xdr_generated.default.CreateManageLimitsRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttrs = {};
      opAttrs.body = _xdr_generated.default.OperationBody.createManageLimitsRequest(createManageLimitsRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttrs, opts);

      return new _xdr_generated.default.Operation(opAttrs);
    }
  }, {
    key: "createManageLimitsRequestToObject",
    value: function createManageLimitsRequestToObject(result, attrs) {
      result.creatorDetails = JSON.parse(attrs.manageLimitsRequest().creatorDetails());
      result.requestId = attrs.requestId().toString();
    }
  }]);
  return CreateManageLimitsRequestBuilder;
}();

exports.CreateManageLimitsRequestBuilder = CreateManageLimitsRequestBuilder;