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

  let nonRecoverySigners = getNonRecoverySigners(signers)

  if (nonRecoverySigners.length) {
    let removeSignerOps = signerToReplace
      ? removeMasterAndCurrentSignerOps(
        nonRecoverySigners,
        soucreAccount,
        signerToReplace
      )
      : removeAllSignersOps(nonRecoverySigners, soucreAccount)
    operations.push(...removeSignerOps)
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

function getNonRecoverySigners (signers) {
  return signers.filter(signer => signer.identity !== 1)
}

function addSignerOp (newAccountId) {
  return ManageSignerBuilder.createSigner({
    publicKey: newAccountId,
    weight: 1000,
    identity: 0,
    roleID: '1',
    details: {}
  })
}
