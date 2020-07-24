"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ManageAccountRoleBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _base_operation = require("./base_operation");

var _jsXdr = require("js-xdr");

var _validators = require("../../utils/validators");

var ManageAccountRoleBuilder =
/*#__PURE__*/
function () {
  function ManageAccountRoleBuilder() {
    (0, _classCallCheck2.default)(this, ManageAccountRoleBuilder);
  }

  (0, _createClass2.default)(ManageAccountRoleBuilder, null, [{
    key: "create",

    /**
     * Builds operation for role creation
     *
     * @param {object} opts
     * @param {object} [opts.details] - create role details
     * @param {string[]} [opts.ruleIDs] - rules that should be assigned to this account
     * @param {string} [opts.source] - The source account for the operation.
     * @returns {xdr.Operation}
     */
    value: function create(opts) {
      this._validateCreate(opts);

      var attrs = {
        details: (0, _stringify.default)(opts.details),
        ext: new _xdr_generated.default.CreateAccountRoleDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      attrs.ruleIDs = [];

      for (var i = 0; i < opts.ruleIDs.length; i++) {
        attrs.ruleIDs.push(_jsXdr.UnsignedHyper.fromString(opts.ruleIDs[i]));
      }

      var createData = new _xdr_generated.default.CreateAccountRoleData(attrs);
      var opData = new _xdr_generated.default.ManageAccountRoleOpData.create(createData);
      return this._manageAccountRoleOp(opData, opts);
    }
    /**
     * Builds operation to update existing role
     *
     * @param {object} opts
     * @param {string} [opts.roleId] - id of role to be modified
     * @param {object} [opts.details] - create role details
     * @param {string[]} [opts.ruleIDs] - rules that should be assigned to this account
     * @param {string} [opts.source] - The source account for the operation.
     * @returns {xdr.Operation}
     */

  }, {
    key: "update",
    value: function update(opts) {
      this._validateUpdate(opts);

      var attrs = {
        roleId: _jsXdr.UnsignedHyper.fromString(opts.roleId),
        details: (0, _stringify.default)(opts.details),
        ext: new _xdr_generated.default.UpdateAccountRoleDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      attrs.ruleIDs = [];

      for (var i = 0; i < opts.ruleIDs.length; i++) {
        attrs.ruleIDs.push(_jsXdr.UnsignedHyper.fromString(opts.ruleIDs[i]));
      }

      var updateData = new _xdr_generated.default.UpdateAccountRoleData(attrs);
      var opData = new _xdr_generated.default.ManageAccountRoleOpData.update(updateData);
      return this._manageAccountRoleOp(opData, opts);
    }
    /**
     * Builds operation to remove existing role
     *
     * @param {object} opts
     * @param {string} [opts.roleId] - id of role to be removed
     * @param {string} [opts.source] - The source account for the operation.
     * @returns {xdr.Operation}
     */

  }, {
    key: "remove",
    value: function remove(opts) {
      this._validateRemove(opts);

      var updateData = new _xdr_generated.default.RemoveAccountRoleData({
        roleId: _jsXdr.UnsignedHyper.fromString(opts.roleId),
        ext: new _xdr_generated.default.RemoveAccountRoleDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opData = new _xdr_generated.default.ManageAccountRoleOpData.remove(updateData);
      return this._manageAccountRoleOp(opData, opts);
    }
  }, {
    key: "manageAccountRoleToObject",
    value: function manageAccountRoleToObject(result, attrs) {
      switch (attrs.data().switch()) {
        case _xdr_generated.default.ManageAccountRoleAction.create():
          {
            var data = attrs.data().createData();
            result.details = JSON.parse(data.details());
            result.ruleIDs = [];

            for (var i = 0; i < data.ruleIDs().length; i++) {
              result.ruleIDs.push(data.ruleIDs()[i].toString());
            }

            break;
          }

        case _xdr_generated.default.ManageAccountRoleAction.update():
          {
            var _data = attrs.data().updateData();

            result.roleId = _data.roleId().toString();
            result.details = JSON.parse(_data.details());
            result.ruleIDs = [];

            for (var _i = 0; _i < _data.ruleIDs().length; _i++) {
              result.ruleIDs.push(_data.ruleIDs()[_i].toString());
            }

            break;
          }

        case _xdr_generated.default.ManageAccountRoleAction.remove():
          {
            var _data2 = attrs.data().removeData();

            result.roleId = _data2.roleId().toString();
            break;
          }
      }
    } // Helpers

  }, {
    key: "_validateCreate",
    value: function _validateCreate(opts) {
      this._validateRuleIds(opts.ruleIDs);
    }
  }, {
    key: "_validateUpdate",
    value: function _validateUpdate(opts) {
      (0, _validators.validateUint64)({
        value: opts.roleId,
        fieldName: 'opts.roleId'
      });

      this._validateRuleIds(opts.ruleIDs);
    }
  }, {
    key: "_validateRemove",
    value: function _validateRemove(opts) {
      (0, _validators.validateUint64)({
        value: opts.roleId,
        fieldName: 'opts.roleId'
      });
    }
  }, {
    key: "_validateRuleIds",
    value: function _validateRuleIds(ids) {
      (0, _validators.validateArray)({
        value: ids,
        fieldName: 'opts.ruleIDs'
      });

      for (var i = 0; i < ids.length; i++) {
        (0, _validators.validateUint64)({
          value: ids[i],
          fieldName: "opts.ruleIDs[".concat(i, "]")
        });
      }
    }
  }, {
    key: "_manageAccountRoleOp",
    value: function _manageAccountRoleOp(opData, opts) {
      var op = new _xdr_generated.default.ManageAccountRoleOp({
        data: opData,
        ext: new _xdr_generated.default.ManageAccountRoleOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageAccountRole(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }]);
  return ManageAccountRoleBuilder;
}();

exports.ManageAccountRoleBuilder = ManageAccountRoleBuilder;