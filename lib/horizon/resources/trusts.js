"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Trusts = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _resource_group_base = require("../../resource_group_base");

/**
 * Trusts.
 *
 * @class
 */
var Trusts =
/*#__PURE__*/
function (_ResourceGroupBase) {
  (0, _inherits2.default)(Trusts, _ResourceGroupBase);

  function Trusts() {
    (0, _classCallCheck2.default)(this, Trusts);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Trusts).apply(this, arguments));
  }

  (0, _createClass2.default)(Trusts, [{
    key: "getAll",
    value: function getAll(balanceId) {
      return this._makeCallBuilder().appendUrlSegment(balanceId).get();
    }
  }, {
    key: "_makeCallBuilder",
    value: function _makeCallBuilder() {
      return this._server._makeCallBuilder().appendUrlSegment('trusts');
    }
  }]);
  return Trusts;
}(_resource_group_base.ResourceGroupBase);

exports.Trusts = Trusts;