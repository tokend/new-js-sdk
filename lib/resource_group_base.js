"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceGroupBase = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

/**
 * Represents interaction with a resource group withing server.
 *
 * @class
 */
var ResourceGroupBase =
/**
   * Resource group constructor.
   *
   * @param {ServerBase} server A server instance to which this resource group belongs.
   * @param {TokenD} sdk SDK instance.
   */
function ResourceGroupBase(server, sdk) {
  (0, _classCallCheck2.default)(this, ResourceGroupBase);
  this._server = server;
  this._sdk = sdk;
};

exports.ResourceGroupBase = ResourceGroupBase;