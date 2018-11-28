"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeChangeSignerTransaction = makeChangeSignerTransaction;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _transaction_builder = require("../../base/transaction_builder");

var _set_options_builder = require("../../base/operations/set_options_builder");

var _xdr_generated = _interopRequireDefault(require("../../base/generated/xdr_generated"));

function makeChangeSignerTransaction(_ref) {
  var newPublicKey = _ref.newPublicKey,
      soucreAccount = _ref.soucreAccount,
      signers = _ref.signers,
      signerToReplace = _ref.signerToReplace,
      signingKeypair = _ref.signingKeypair;
  var operations = [];
  operations.push(addSignerOp(newPublicKey));

  if (signers) {
    var removeSignerOps = signerToReplace ? removeMasterAndCurrentSignerOps(signers, soucreAccount, signerToReplace) : removeAllSignersOps(signers, soucreAccount);
    operations.push.apply(operations, (0, _toConsumableArray2.default)(removeSignerOps));
  } else {
    operations.push(removeMasterOp());
  }

  var tx = new _transaction_builder.TransactionBuilder(soucreAccount);
  tx.operations = operations;
  var txEnv = tx.build();
  txEnv.sign(signingKeypair);
  return txEnv.toEnvelope().toXDR().toString('base64');
}

function removeMasterAndCurrentSignerOps(signers, soucreAccount, publicKey) {
  return signers.filter(function (signer) {
    return signer.publicKey !== soucreAccount && signer.publicKey !== publicKey;
  }).map(function (signer) {
    return isMaster(signer, soucreAccount) ? removeMasterOp() : removeOneSignerOp(signer);
  });
}

function removeAllSignersOps(signers, soucreAccount) {
  return signers.map(function (signer) {
    return isMaster(signer, soucreAccount) ? removeMasterOp() : removeOneSignerOp(signer);
  });
}

function removeMasterOp() {
  return _set_options_builder.SetOptionsBuilder.setOptions({
    masterWeight: 0
  });
}

function isMaster(signer, masterAccountId) {
  return signer.publicKey === masterAccountId;
}

function removeOneSignerOp(signer) {
  return _set_options_builder.SetOptionsBuilder.setOptions({
    signer: {
      pubKey: signer.publicKey,
      weight: 0,
      identity: signer.signerIdentity,
      signerType: 1
    }
  });
}

function addSignerOp(newAccountId) {
  return _set_options_builder.SetOptionsBuilder.setOptions({
    signer: {
      pubKey: newAccountId,
      weight: 255,
      identity: 0,
      signerType: signerTypeAll()
    }
  });
}

function signerTypeAll() {
  return _xdr_generated.default.SignerType.values().map(function (value) {
    return value.value;
  }).reduce(function (total, value) {
    return value | total;
  });
}