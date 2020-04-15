"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.BindExternalSystemAccountIdBuilder = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _jsXdr = require("js-xdr");

var _base_operation = require("./base_operation");

var BindExternalSystemAccountIdBuilder =
/*#__PURE__*/
function () {
  function BindExternalSystemAccountIdBuilder() {
    (0, _classCallCheck2.default)(this, BindExternalSystemAccountIdBuilder);
  }

  (0, _createClass2.default)(BindExternalSystemAccountIdBuilder, null, [{
    key: "createBindExternalSystemAccountIdOp",

    /**
       * Creates operation for binding external system account id
       * @param {object} opts
       *
       * @param {string|number} opts.externalSystemType - type of external system
       *
       * @param {string} [opts.source] - The source account for binding. Defaults to the transaction's source account.
       *
       * @returns {xdr.BindExternalSystemAccountIdOp}
       */
    value: function createBindExternalSystemAccountIdOp(opts) {
      var attrs = {};
      attrs.externalSystemType = typeof opts.externalSystemType === 'number' ? opts.externalSystemType : _jsXdr.UnsignedHyper.fromString(opts.externalSystemType);
      attrs.ext = new _xdr_generated.default.BindExternalSystemAccountIdOpExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var bindExternalSystemAccountIdOp = new _xdr_generated.default.BindExternalSystemAccountIdOp(attrs);
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.bindExternalSystemAccountId(bindExternalSystemAccountIdOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "bindExternalSystemAccountIdToObject",
    value: function bindExternalSystemAccountIdToObject(result, attrs) {
      result.externalSystemType = attrs.externalSystemType();
    }
  }]);
  return BindExternalSystemAccountIdBuilder;
}();

exports.BindExternalSystemAccountIdBuilder = BindExternalSystemAccountIdBuilder;