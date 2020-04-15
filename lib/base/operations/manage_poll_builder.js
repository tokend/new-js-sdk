"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ManagePollBuilder = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _jsXdr = require("js-xdr");

var _base_operation = require("./base_operation");

var ManagePollBuilder =
/*#__PURE__*/
function () {
  function ManagePollBuilder() {
    (0, _classCallCheck2.default)(this, ManagePollBuilder);
  }

  (0, _createClass2.default)(ManagePollBuilder, null, [{
    key: "closePoll",

    /**
     * Close existing poll with a result.
     * @param {object} opts
     * @param {string} opts.pollID - ID of poll to voting in
     * @param {number} opts.result - 0 or 1, see PollResult
     * @param {object} opts.details - details
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.ManagePollOp}
     */
    value: function closePoll(opts) {
      if (isNaN(opts.result)) {
        throw new Error('opts.result is NaN ' + opts.result);
      }

      if (!_xdr_generated.default.PollResult._byValue.has(opts.result)) {
        throw new Error('opts.result is invalid ' + opts.result);
      }

      var attrs = {
        result: _xdr_generated.default.PollResult._byValue.get(opts.result),
        details: (0, _stringify.default)(opts.details),
        ext: new _xdr_generated.default.ClosePollDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      return this._managePoll(opts, new _xdr_generated.default.ManagePollOpData.close(new _xdr_generated.default.ClosePollData(attrs)));
    }
    /**
     * Cancels existing poll.
     * @param {object} opts
     * @param {string} opts.pollID - ID of poll to voting in
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.ManagePollOp}
     */

  }, {
    key: "cancelPoll",
    value: function cancelPoll(opts) {
      return this._managePoll(opts, new _xdr_generated.default.ManagePollOpData.cancel(new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())));
    }
    /**
     * Updates poll end time.
     * @param {object} opts
     * @param {string} opts.pollID - ID of poll to voting in
     * @param {string} opts.newEndTime - end time to set
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.ManagePollOp}
     */

  }, {
    key: "updatePollEndTime",
    value: function updatePollEndTime(opts) {
      if ((0, _isUndefined.default)(opts.newEndTime)) {
        throw new Error('opts.newEndTime is undefined');
      }

      var endTime = _jsXdr.UnsignedHyper.fromString(opts.newEndTime);

      var attrs = {
        newEndTime: endTime,
        ext: new _xdr_generated.default.UpdatePollEndTimeDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      };
      return this._managePoll(opts, new _xdr_generated.default.ManagePollOpData.updateEndTime(new _xdr_generated.default.UpdatePollEndTimeData(attrs)));
    }
  }, {
    key: "_managePoll",
    value: function _managePoll(opts, data) {
      if ((0, _isUndefined.default)(opts.pollID)) {
        throw new Error('opts.pollID is undefined');
      }

      var op = new _xdr_generated.default.ManagePollOp({
        pollId: _jsXdr.UnsignedHyper.fromString(opts.pollID),
        data: data,
        ext: new _xdr_generated.default.ManagePollOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.managePoll(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "managePollToObject",
    value: function managePollToObject(result, attrs) {
      result.pollID = attrs.pollId().toString();

      switch (attrs.data().switch()) {
        case _xdr_generated.default.ManagePollAction.close():
          var closeData = attrs.data().closePollData();
          result.result = closeData.result().value;
          result.details = JSON.parse(closeData.details());
          break;

        case _xdr_generated.default.ManagePollAction.cancel():
          break;

        case _xdr_generated.default.ManagePollAction.updateEndTime():
          var updateEndTimeData = attrs.data().updateTimeData();
          result.newEndTime = updateEndTimeData.newEndTime().toString();
          break;

        default:
          throw new Error('Unexpected manage poll action');
      }
    }
  }]);
  return ManagePollBuilder;
}();

exports.ManagePollBuilder = ManagePollBuilder;