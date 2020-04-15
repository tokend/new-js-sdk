"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.makeChangeSignerTransaction = makeChangeSignerTransaction;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _transaction_builder = require("../../base/transaction_builder");

var _manage_signer_builder = require("../../base/operations/manage_signer_builder");

var RECOVERY_SIGNER_IDENTITY = 1;
var DEFAULT_SIGNER_IDENTITY = 0;
var DEFAULT_SIGNER_WEIGHT = 1000;

function makeChangeSignerTransaction(_ref) {
  var newPublicKey = _ref.newPublicKey,
      soucreAccount = _ref.soucreAccount,
      signers = _ref.signers,
      signerToReplace = _ref.signerToReplace,
      signingKeypair = _ref.signingKeypair,
      signerRoleId = _ref.signerRoleId;
  var operations = [];
  operations.push(addSignerOp(newPublicKey, signerRoleId));
  var nonRecoverySigners = getNonRecoverySigners(signers);

  if (nonRecoverySigners.length) {
    var removeSignerOps = signerToReplace ? removeMasterAndCurrentSignerOps(nonRecoverySigners, soucreAccount, signerToReplace) : removeAllSignersOps(nonRecoverySigners, soucreAccount);
    operations.push.apply(operations, (0, _toConsumableArray2.default)(removeSignerOps));
  }

  var tx = new _transaction_builder.TransactionBuilder(soucreAccount);
  tx.operations = operations;
  var txEnv = tx.build();
  txEnv.sign(signingKeypair);
  return txEnv.toEnvelope().toXDR().toString('base64');
}

function removeMasterAndCurrentSignerOps(signers, soucreAccount, publicKey) {
  return signers.filter(function (signer) {
    return signer.id === soucreAccount || signer.id === publicKey;
  }).map(function (signer) {
    return removeSignerOp(signer);
  });
}

function removeAllSignersOps(signers) {
  return signers.map(function (signer) {
    return removeSignerOp(signer);
  });
}

function removeSignerOp(signer) {
  return _manage_signer_builder.ManageSignerBuilder.deleteSigner({
    publicKey: signer.id
  });
}

function getNonRecoverySigners(signers) {
  return signers.filter(function (signer) {
    return signer.identity !== RECOVERY_SIGNER_IDENTITY;
  });
}

function addSignerOp(newAccountId, roleId) {
  return _manage_signer_builder.ManageSignerBuilder.createSigner({
    publicKey: newAccountId,
    weight: DEFAULT_SIGNER_WEIGHT,
    identity: DEFAULT_SIGNER_IDENTITY,
    roleID: roleId,
    details: {}
  });
}