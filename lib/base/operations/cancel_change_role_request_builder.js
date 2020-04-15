"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CancelChangeRoleRequestBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var _validators = require("../../utils/validators");

var CancelChangeRoleRequestBuilder =
/*#__PURE__*/
function () {
  function CancelChangeRoleRequestBuilder() {
    (0, _classCallCheck2.default)(this, CancelChangeRoleRequestBuilder);
  }

  (0, _createClass2.default)(CancelChangeRoleRequestBuilder, null, [{
    key: "cancelChangeRoleRequest",

    /**
     * Creates operation to cancel change role request
     *
     * @param {object} opts
     * @param {string} opts.requestID - ID of the request
     * @param {string} [opts.source] - The source account for the operation.
     * Defaults to the transaction's source account.
     * @returns {xdr.CancelChangeRoleRequestOp}
     */
    value: function cancelChangeRoleRequest(opts) {
      this._validateChangeRoleRequest(opts);

      var cancelChangeRoleRequestOp = new _xdr_generated.default.CancelChangeRoleRequestOp({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        ext: new _xdr_generated.default.CancelChangeRoleRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.cancelChangeRoleRequest(cancelChangeRoleRequestOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "cancelChangeRoleRequestToObject",
    value: function cancelChangeRoleRequestToObject(result, attrs) {
      result.requestID = attrs.requestId().toString();
    } // Helpers

    /**
     * Validates cancel change role params,
     * trows error in case of invalid params
     *
     * @param {object} opts
     * @param {string} opts.requestID - ID of the request
     * @param {string} [opts.source] - The source account for the operation.
     */

  }, {
    key: "_validateChangeRoleRequest",
    value: function _validateChangeRoleRequest(opts) {
      (0, _validators.validateUint64)({
        value: opts.requestID,
        fieldName: 'opts.requestID'
      });
    }
  }]);
  return CancelChangeRoleRequestBuilder;
}();

exports.CancelChangeRoleRequestBuilder = CancelChangeRoleRequestBuilder;