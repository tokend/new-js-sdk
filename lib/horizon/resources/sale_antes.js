"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.SaleAntes = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * SaleAntes.
 *
 * @class
 */
var SaleAntes =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(SaleAntes, _ResourceGroupBase);

  function SaleAntes() {
    (0, _classCallCheck2.default)(this, SaleAntes);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SaleAntes).apply(this, arguments));
  }

  (0, _createClass2.default)(SaleAntes, [{
    key: "getPage",

    /**
     * Returns sale antes already charged in the system
     *
     * @param {object} [query]
     * @param {number} [query.sale_id] If present, the result will return only return antes charged from specific sale
     * @param {number} [query.participant_balance_id] If present, the result will return only antes charged from specific balance
     * @returns {HorizonResponse}
     */
    value: function getPage(query) {
      return this._makeCallBuilderWithSignature().get(query);
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('sale_antes');
    }
  }, {
    key: "_makeCallBuilderWithSignature",
    value: function _makeCallBuilderWithSignature() {
      return this._makeCallBuilder().withSignature();
    }
  }]);
  return SaleAntes;
}(_resource_group_base.ResourceGroupBase);

exports.SaleAntes = SaleAntes;