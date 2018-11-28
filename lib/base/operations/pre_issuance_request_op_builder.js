"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreIssuanceRequestOpBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _pre_issuance_request = require("../pre_issuance_request");

var PreIssuanceRequestOpBuilder =
/*#__PURE__*/
function () {
  function PreIssuanceRequestOpBuilder() {
    (0, _classCallCheck2.default)(this, PreIssuanceRequestOpBuilder);
  }

  (0, _createClass2.default)(PreIssuanceRequestOpBuilder, null, [{
    key: "createPreIssuanceRequestOp",

    /**
       * Creates operation to review reviewable request
       * @param {object} opts
       * @param {xdr.PreIssuanceRequest} opts.request - signed pre issuance request
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.ManageAssetOp}
       */
    value: function createPreIssuanceRequestOp(opts) {
      var attrs = {};
      attrs.request = opts.request;
      attrs.ext = new _xdr_generated.default.CreatePreIssuanceRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var preIssuanceRequestOp = new _xdr_generated.default.CreatePreIssuanceRequestOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.createPreissuanceRequest(preIssuanceRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "preIssuanceRequestOpToObject",
    value: function preIssuanceRequestOpToObject(result, attrs) {
      result.request = _pre_issuance_request.PreIssuanceRequest.dataFromXdr(attrs.request());
    }
  }]);
  return PreIssuanceRequestOpBuilder;
}();

exports.PreIssuanceRequestOpBuilder = PreIssuanceRequestOpBuilder;