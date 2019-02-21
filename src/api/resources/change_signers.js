import { TransactionBuilder } from '../../base/transaction_builder'
import { ManageSignerBuilder } from '../../base/operations/manage_signer_builder'

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
    operations.push(removeSignerOp(soucreAccount))
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
      return signer.id === soucreAccount ||
        signer.id === publicKey
    })
    .map(signer => removeSignerOp(signer))
}

function removeAllSignersOps (signers) {
  return signers.map(signer => removeSignerOp(signer))
}

function removeSignerOp (signer) {
  return ManageSignerBuilder.deleteSigner({
    publicKey: signer.id
  })
}

function addSignerOp (newAccountId) {
  return ManageSignerBuilder.createSigner({
    publicKey: newAccountId,
    weight: 1000,
    identity: 1,
    roleID: '1',
    details: {}
  })
}
