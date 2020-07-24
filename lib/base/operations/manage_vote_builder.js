"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ManageVoteBuilder = void 0;

var _isNan = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/is-nan"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _xdr_generated = _interopRequireDefault(require("../generated/xdr_generated"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _jsXdr = require("js-xdr");

var _base_operation = require("./base_operation");

var ManageVoteBuilder =
/*#__PURE__*/
function () {
  function ManageVoteBuilder() {
    (0, _classCallCheck2.default)(this, ManageVoteBuilder);
  }

  (0, _createClass2.default)(ManageVoteBuilder, null, [{
    key: "createSingleChoiceVote",

    /**
     * Create new signer for source account.
     * @param {object} opts
     * @param {string} opts.pollID - ID of poll to voting in
     * @param {number} opts.choice - choice
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.ManageVoteOp}
     */
    value: function createSingleChoiceVote(opts) {
      if ((0, _isNan.default)(opts.choice)) {
        throw new Error('opts.choice is NaN');
      }

      var attrs = {};
      attrs.data = new _xdr_generated.default.VoteData.singleChoice(new _xdr_generated.default.SingleChoiceVote({
        choice: opts.choice,
        ext: new _xdr_generated.default.EmptyExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      }));
      return this._createVote(opts, attrs);
    }
  }, {
    key: "_createVote",
    value: function _createVote(opts, attrs) {
      if ((0, _isUndefined.default)(opts.pollID)) {
        throw new Error('opts.pollID is undefined');
      }

      attrs.pollId = _jsXdr.UnsignedHyper.fromString(opts.pollID);
      attrs.ext = new _xdr_generated.default.CreateVoteDataExt(_xdr_generated.default.LedgerVersion.emptyVersion());
      return this._manageVote(opts, new _xdr_generated.default.ManageVoteOpData.create(new _xdr_generated.default.CreateVoteData(attrs)));
    }
    /**
     * Delete existing signer for source account.
     * @param {object} opts
     * @param {string} opts.pollID - ID of poll
     * @param {string} [opts.source] - The source account. Defaults to the transaction's source account.
     * @returns {xdr.ManageSignerOp}
     */

  }, {
    key: "removeVote",
    value: function removeVote(opts) {
      if ((0, _isUndefined.default)(opts.pollID)) {
        throw new TypeError('opts.pollID is undefined');
      }

      var removeData = new _xdr_generated.default.RemoveVoteData({
        pollId: _jsXdr.UnsignedHyper.fromString(opts.pollID),
        ext: new _xdr_generated.default.RemoveVoteDataExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      return this._manageVote(opts, new _xdr_generated.default.ManageVoteOpData.remove(removeData));
    }
  }, {
    key: "_manageVote",
    value: function _manageVote(opts, data) {
      var op = new _xdr_generated.default.ManageVoteOp({
        data: data,
        ext: new _xdr_generated.default.ManageVoteOpExt(_xdr_generated.default.LedgerVersion.emptyVersion())
      });
      var opAttributes = {};
      opAttributes.body = _xdr_generated.default.OperationBody.manageVote(op);

      _base_operation.BaseOperation.setSourceAccount(opAttributes, opts);

      return new _xdr_generated.default.Operation(opAttributes);
    }
  }, {
    key: "manageVoteToObject",
    value: function manageVoteToObject(result, attrs) {
      switch (attrs.data().switch()) {
        case _xdr_generated.default.ManageVoteAction.create():
          var createData = attrs.data().createData();
          result.pollID = createData.pollId().toString();
          result.pollType = createData.data()._switch.value;

          switch (createData.data().switch()) {
            case _xdr_generated.default.PollType.singleChoice():
              result.choice = createData.data().single().choice().toString();
              break;

            default:
              throw new Error('Unexpected poll type ' + createData.data().type().value);
          }

          break;

        case _xdr_generated.default.ManageVoteAction.remove():
          result.pollID = attrs.data().removeData().pollId().toString();
          return;

        default:
          throw new Error('Unexpected manage vote action');
      }
    }
  }]);
  return ManageVoteBuilder;
}();

exports.ManageVoteBuilder = ManageVoteBuilder;