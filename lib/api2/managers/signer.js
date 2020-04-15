"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Signer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var Signer =
/**
 * SignersManager constructor.
 * @param {string} opts.id public key of signer
 * @param {number} opts.roleId role id
 * @param {number} opts.weight signer weight
 * @param {number} opts.identity signer identity
 *
 */
function Signer(opts) {
  (0, _classCallCheck2.default)(this, Signer);
  this.type = 'signer';
  this.id = opts.id;
  this.attributes = {
    role_id: opts.roleId,
    weight: opts.weight ? opts.weight : 1000,
    identity: opts.identity ? opts.identity : 1
  };
};

exports.Signer = Signer;