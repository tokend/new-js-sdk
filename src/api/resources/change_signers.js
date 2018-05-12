import { TransactionBuilder } from '../../base/transaction_builder'
import { SetOptionsBuilder } from '../../base/operations/set_options_builder'
import xdr from '../../base/generated/xdr_generated'

export function makeChangeSignerTransaction ({
  newPublicKey,
  soucreAccount,
  signers,
  signerToReplace,
  signingKeypair
}) {
  let operations = []

  operations.push(addSignerOp(newPublicKey))
  if (signers) {
    let removeSignerOps = signerToReplace
      ? removeMasterAndCurrentSignerOps(signers, soucreAccount, signerToReplace)
      : removeAllSignersOps(signers, soucreAccount)
    operations.push(...removeSignerOps)
  } else {
    operations.push(removeMasterOp())
  }

  const tx = new TransactionBuilder(soucreAccount)
  tx.operations = operations
  const txEnv = tx.build()
  txEnv.sign(signingKeypair)

  return txEnv.toEnvelope().toXDR().toString('base64')
}

function removeMasterAndCurrentSignerOps (signers, soucreAccount, publicKey) {
  return signers
    .filter(signer => {
      return signer.publicKey !== soucreAccount &&
        signer.publicKey !== publicKey
    })
    .map(signer => {
      return isMaster(signer, soucreAccount)
        ? removeMasterOp()
        : removeOneSignerOp(signer)
    })
}

function removeAllSignersOps (signers, soucreAccount) {
  return signers
    .map(signer => {
      return isMaster(signer, soucreAccount)
        ? removeMasterOp()
        : removeOneSignerOp(signer)
    })
}

function removeMasterOp () {
  return SetOptionsBuilder.setOptions({
    masterWeight: 0
  })
}

function isMaster (signer, masterAccountId) {
  return signer.publicKey === masterAccountId
}

function removeOneSignerOp (signer) {
  return SetOptionsBuilder.setOptions({
    signer: {
      pubKey: signer.publicKey,
      weight: 0,
      identity: signer.signerIdentity,
      signerType: 1
    }
  })
}

function addSignerOp (newAccountId) {
  return SetOptionsBuilder.setOptions({
    signer: {
      pubKey: newAccountId,
      weight: 255,
      identity: 0,
      signerType: signerTypeAll()
    }
  })
}

function signerTypeAll () {
  return xdr.SignerType.values()
    .map(value => value.value)
    .reduce((total, value) => value | total)
}
