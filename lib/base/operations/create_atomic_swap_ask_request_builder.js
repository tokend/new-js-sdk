"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CreateAtomicSwapAskRequestBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _validators = require("../../utils/validators");

var CreateAtomicSwapAskRequestBuilder =
/*#__PURE__*/
function () {
  function CreateAtomicSwapAskRequestBuilder() {
    (0, _classCallCheck2.default)(this, CreateAtomicSwapAskRequestBuilder);
  }

  (0, _createClass2.default)(CreateAtomicSwapAskRequestBuilder, null, [{
    key: "createAtomicSwapAskRequest",

    /**
       * Creates atomic swap ask creation request
       * @param {object} opts
       *
       * @param {string} opts.balanceID - balance from which specified amount
       * will be used in atomic swap
       * @param {string} opts.amount - amount which will used in swap (will be locked)
       * @param {object} opts.creatorDetails - details about atomic swap ask
       * @param {array} opts.quoteAssets - accepted assets
       * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
       * @param {object} opts.quoteAssets.asset - asset code of the quote asset
       * @param {string} [opts.allTasks] - tasks which will be used instead of tasks from key value
       * @param {string} [opts.source] - The source account for the operation.
       * Defaults to the transaction's source account.
       *
       * @returns {xdr.Operation}
       */
    value: function createAtomicSwapAskRequest(opts) {
      this._validateCreateAtomicSwapAskOp(opts);

      var rawRequest = {};
      rawRequest.amount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.amount);
      rawRequest.baseBalance = _keypair.Keypair.fromBalanceId(opts.balanceID).xdrBalanceId();
      rawRequest.quoteAssets = [];

      for (var i = 0; i < opts.quoteAssets.length; i++) {
        var quoteAsset = opts.quoteAssets[i];

        if (!_base_operation.BaseOperation.isValidAmount(quoteAsset.price)) {
          throw new Error('opts.quoteAssets[' + i + '].price is invalid: ' + quoteAsset.price);
        }

        if (!_base_operation.BaseOperation.isValidAsset(quoteAsset.asset)) {
          throw new Error('opts.quoteAssets[' + i + '].asset is invalid');
        }

        rawRequest.quoteAssets.push(new _xdr_generated.default.AtomicSwapAskQuoteAsset({
          price: _base_operation.BaseOperation._toUnsignedXDRAmount(quoteAsset.price),
          quoteAsset: quoteAsset.asset,
          ext: new _xdr_generated.default.AtomicSwapAskQuoteAssetExt(_xdr_generated.default.LedgerVersion.emptyVersion())
        }));
      }

      rawRequest.creatorDetails = (0, _stringify.default)(opts.creatorDetails);
      rawRequest.ext = new _xdr_generated.default.CreateAtomicSwapAskRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var tasks;

      if (!(0, _isUndefined.default)(opts.allTasks)) {
        tasks = _base_operation.BaseOperation._checkUnsignedIntValue('opts.allTasks', opts.allTasks);
      }

      var opAttributes = {};
      opAttributes.body = new _xdr_generated.default.OperationBody.createAtomicSwapAskRequest(new _xdr_generated.default.CreateAtomicSwapAskRequestOp({
        request: new _xdr_generated.default.CreateAtomicSwapAskRequest(rawRequest),
        allTasks: tasks,
        ext: new _xdr_generated.default.CreateAtomicSwapAskRequestOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "createAtomicSwapAskRequestToObject",
    value: function createAtomicSwapAskRequestToObject(result, attrs) {
      result.balanceID = _base_operation.BaseOperation.balanceIdtoString(attrs.request().baseBalance());
      result.amount = _base_operation.BaseOperation._fromXDRAmount(attrs.request().amount());
      result.creatorDetails = JSON.parse(attrs.request().creatorDetails());

      if (!(0, _isUndefined.default)(attrs.allTasks())) {
        result.allTasks = attrs.allTasks().toString();
      }

      result.quoteAssets = [];
      var rawQuoteAssets = attrs.request().quoteAssets();

      for (var i = 0; i < rawQuoteAssets.length; i++) {
        result.quoteAssets.push({
          price: _base_operation.BaseOperation._fromXDRAmount(rawQuoteAssets[i].price()),
          asset: rawQuoteAssets[i].quoteAsset().toString()
        });
      }
    }
  }, {
    key: "_validateCreateAtomicSwapAskOp",
    value: function _validateCreateAtomicSwapAskOp(opts) {
      (0, _validators.validateBalanceKey)({
        value: opts.balanceID,
        fieldName: 'opts.balanceID'
      });
      (0, _validators.validateAmount)({
        value: opts.amount,
        fieldName: 'opts.amount'
      });
      (0, _validators.validateCreatorDetails)({
        value: opts.creatorDetails,
        fieldName: 'opts.creatorDetails',
        validateWithoutSnakeCased: true
      });
      (0, _validators.validateArray)({
        value: opts.quoteAssets,
        fieldName: 'opts.quoteAssets',
        minLength: 1,
        maxLength: 100
      });
    }
  }]);
  return CreateAtomicSwapAskRequestBuilder;
}();

exports.CreateAtomicSwapAskRequestBuilder = CreateAtomicSwapAskRequestBuilder;