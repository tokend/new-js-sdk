"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageAssetBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _base_operation = require("./base_operation");

var _keypair = require("../keypair");

var _jsXdr = require("js-xdr");

var ManageAssetBuilder =
/*#__PURE__*/
function () {
  function ManageAssetBuilder() {
    (0, _classCallCheck2.default)(this, ManageAssetBuilder);
  }

  (0, _createClass2.default)(ManageAssetBuilder, null, [{
    key: "assetCreationRequest",

    /**
       * Creates operation to create asset creation request
       * @param {object} opts
       *
       * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
       * @param {string} opts.code - Asset code
       * @param {string} opts.preissuedAssetSigner - AccountID of keypair which will sign request for asset to be authrorized to be issued
       * @param {string} opts.maxIssuanceAmount - Max amount can be issued of that asset
       * @param {number} opts.policies - Asset policies
       * @param {string} opts.initialPreissuedAmount - Amount of pre issued tokens available after creation of the asset
       *
       * @param {object} opts.details - Additional details about asset
       * @param {string} opts.details.name - Name of the asset
       * @param {array}  opts.details.documents - Documents attached to asset
       * @param {string} opts.details.logo - Asset picture
       * @param {string} opts.details.logo.key - Key to compose asset picture url
       * @param {string} opts.details.logo.type - Content type of asset logo
       * @param {string} opts.details.terms - Asset terms
       * @param {string} opts.details.terms.type - Content type of terms document
       * @param {string} opts.details.terms.name - Name of terms document
       *
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       *
       * @returns {xdr.ManageAssetOp}
       */
    value: function assetCreationRequest(opts) {
      var attrs = ManageAssetBuilder._createUpdateAttrs(opts);

      if (!_keypair.Keypair.isValidPublicKey(opts.preissuedAssetSigner)) {
        throw new Error('opts.preissuedAssetSigner is invalid');
      }

      attrs.preissuedAssetSigner = _keypair.Keypair.fromAccountId(opts.preissuedAssetSigner).xdrAccountId();

      if (!_base_operation.BaseOperation.isValidAmount(opts.maxIssuanceAmount, true)) {
        throw new Error('opts.maxIssuanceAmount is invalid');
      }

      attrs.maxIssuanceAmount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.maxIssuanceAmount);

      if ((0, _isUndefined.default)(opts.initialPreissuedAmount)) {
        opts.initialPreissuedAmount = '0';
      }

      if (!_base_operation.BaseOperation.isValidAmount(opts.initialPreissuedAmount, true)) {
        throw new Error('opts.initialPreissuedAmount is invalid');
      }

      attrs.initialPreissuedAmount = _base_operation.BaseOperation._toUnsignedXDRAmount(opts.initialPreissuedAmount);
      attrs.ext = new _xdr_generated.default.AssetCreationRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var assetCreationRequest = new _xdr_generated.default.AssetCreationRequest(attrs);
      return ManageAssetBuilder._createManageAssetOp(opts, new _xdr_generated.default.ManageAssetOpRequest.createAssetCreationRequest(assetCreationRequest));
    }
    /**
       * Creates operation to create asset update request
       * @param {object} opts
       *
       * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
       * @param {string} opts.code - Asset code
       * @param {number} opts.policies - asset policies
       *
       * @param {object} opts.details - Additional details about asset
       * @param {string} opts.details.name - Name of the asset
       * @param {string} opts.details.logo - Asset picture
       * @param {string} opts.details.logo.key - Key to compose asset picture url
       * @param {string} opts.details.logo.type - Content type of asset logo
       * @param {string} opts.details.terms - Asset terms
       * @param {string} opts.details.terms.type - Content type of terms document
       * @param {string} opts.details.terms.name - Name of terms document
       *
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       *
       * @returns {xdr.ManageAssetOp}
       */

  }, {
    key: "assetUpdateRequest",
    value: function assetUpdateRequest(opts) {
      var attrs = ManageAssetBuilder._createUpdateAttrs(opts);

      attrs.ext = new _xdr_generated.default.AssetUpdateRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      var assetUpdateRequest = new _xdr_generated.default.AssetUpdateRequest(attrs);
      return ManageAssetBuilder._createManageAssetOp(opts, new _xdr_generated.default.ManageAssetOpRequest.createAssetUpdateRequest(assetUpdateRequest));
    }
    /**
       * Creates operation to cancel asset creation/update request
       * @param {object} opts
       * @param {string} opts.requestID - request ID
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.ManageAssetOp}
       */

  }, {
    key: "cancelAssetRequest",
    value: function cancelAssetRequest(opts) {
      var attrs = {
        ext: new _xdr_generated.default.CancelAssetRequestExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      var cancelAssetRequest = new _xdr_generated.default.CancelAssetRequest(attrs);
      return ManageAssetBuilder._createManageAssetOp(opts, new _xdr_generated.default.ManageAssetOpRequest.cancelAssetRequest(cancelAssetRequest));
    }
    /**
       * Creates operation to cancel asset creation/update request
       * @param {object} opts
       * @param {string} opts.accountID - accountID to whome rights will be passed
       * @param {string} opts.code - asset code for which to rights will be passed
       * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
       * @returns {xdr.ManageAssetOp}
       */

  }, {
    key: "changeAssetPreIssuer",
    value: function changeAssetPreIssuer(opts) {
      if (!_keypair.Keypair.isValidPublicKey(opts.accountID)) {
        throw new Error('opts.accountID is invalid');
      }

      if ((0, _isUndefined.default)(opts.code)) {
        throw new Error('opts.code is invalid - must be string');
      }

      opts.requestID = '0';
      var attrs = {
        ext: new _xdr_generated.default.AssetChangePreissuedSignerExt(_xdr_generated.default.LedgerVersion.emptyVersion()),
        accountId: _keypair.Keypair.fromAccountId(opts.accountID).xdrAccountId(),
        code: opts.code
      };
      var changePreissuedSigner = new _xdr_generated.default.AssetChangePreissuedSigner(attrs);
      return ManageAssetBuilder._createManageAssetOp(opts, new _xdr_generated.default.ManageAssetOpRequest.changePreissuedAssetSigner(changePreissuedSigner));
    }
  }, {
    key: "_getValidDetails",
    value: function _getValidDetails(opts) {
      var details = opts.details;

      if ((0, _isUndefined.default)(details)) {
        details = {};
      }

      if ((0, _isUndefined.default)(details.name)) {
        details.name = '';
      }

      if ((0, _isUndefined.default)(details.terms)) {
        details.terms = {};
      }

      if ((0, _isUndefined.default)(details.terms.key)) {
        details.terms.key = '';
      }

      if ((0, _isUndefined.default)(details.terms.type)) {
        details.terms.type = '';
      }

      if ((0, _isUndefined.default)(details.terms.name)) {
        details.terms.name = '';
      }

      if ((0, _isUndefined.default)(details.logo)) {
        details.logo = {};
      }

      if ((0, _isUndefined.default)(details.logo.key)) {
        details.logo.key = '';
      }

      if ((0, _isUndefined.default)(details.logo.type)) {
        details.logo.type = '';
      }

      return {
        name: details.name,
        logo: details.logo,
        terms: details.terms
      };
    }
  }, {
    key: "_createUpdateAttrs",
    value: function _createUpdateAttrs(opts) {
      if (!_base_operation.BaseOperation.isValidAsset(opts.code)) {
        throw new Error('opts.code is invalid');
      }

      if ((0, _isUndefined.default)(opts.policies) || opts.policies < 0) {
        throw new Error('opts.policies must be nonnegative number');
      }

      var details = ManageAssetBuilder._getValidDetails(opts);

      var attrs = {
        code: opts.code,
        policies: opts.policies,
        details: (0, _stringify.default)(details)
      };
      return attrs;
    }
  }, {
    key: "_createManageAssetOp",
    value: function _createManageAssetOp(opts, request) {
      if ((0, _isUndefined.default)(opts.requestID)) {
        throw new Error('opts.requestID is invalid');
      }

      var assetUpdateOp = new _xdr_generated.default.ManageAssetOp({
        requestId: _jsXdr.UnsignedHyper.fromString(opts.requestID),
        request: request,
        ext: new _xdr_generated.default.ManageAssetOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageAsset(assetUpdateOp);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "manageAssetToObject",
    value: function manageAssetToObject(result, attrs) {
      result.requestID = attrs.requestId().toString();
      result.requestType = attrs.request().switch().name;

      switch (attrs.request().switch()) {
        case _xdr_generated.default.ManageAssetAction.createAssetCreationRequest():
          {
            var request = attrs.request().createAsset();
            result.code = request.code().toString();
            result.preissuedAssetSigner = _base_operation.BaseOperation.accountIdtoAddress(request.preissuedAssetSigner());
            result.policies = request.policies();
            result.maxIssuanceAmount = _base_operation.BaseOperation._fromXDRAmount(request.maxIssuanceAmount());
            result.initialPreissuedAmount = _base_operation.BaseOperation._fromXDRAmount(request.initialPreissuedAmount());
            result.details = JSON.parse(request.details());
            break;
          }

        case _xdr_generated.default.ManageAssetAction.createAssetUpdateRequest():
          {
            var _request = attrs.request().updateAsset();

            result.code = _request.code().toString();
            result.policies = _request.policies();
            result.details = JSON.parse(_request.details());
            break;
          }

        case _xdr_generated.default.ManageAssetAction.cancelAssetRequest():
          {
            // nothing to do here
            break;
          }

        case _xdr_generated.default.ManageAssetAction.changePreissuedAssetSigner():
          {
            var _request2 = attrs.request().changePreissuedSigner();

            result.code = _request2.code().toString();
            result.accountID = _base_operation.BaseOperation.accountIdtoAddress(_request2.accountId());
            break;
          }
      }
    }
  }]);
  return ManageAssetBuilder;
}();

exports.ManageAssetBuilder = ManageAssetBuilder;