import { TransactionBuilder } from '../../base/transaction_builder'
import { ManageSignerBuilder } from '../../base/operations/manage_signer_builder'

const RECOVERY_SIGNER_IDENTITY = 1
const DEFAULT_SIGNER_IDENTITY = 0
const DEFAULT_SIGNER_WEIGHT = 1000

export function makeChangeSignerTransaction ({
  newPublicKey,
  soucreAccount,
  signers,
  signerToReplace,
  signingKeypair,
  signerRoleId
}) {
  let operations = []
  operations.push(addSignerOp(newPublicKey, signerRoleId))

  let nonRecoverySigners = getNonRecoverySigners(signers)

  if (nonRecoverySigners.length) {
    const removeSignerOps = signerToReplace
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
  return signers.filter(signer => signer.identity !== RECOVERY_SIGNER_IDENTITY)
}

function addSignerOp (newAccountId, roleId) {
  return ManageSignerBuilder.createSigner({
    publicKey: newAccountId,
    weight: DEFAULT_SIGNER_WEIGHT,
    identity: DEFAULT_SIGNER_IDENTITY,
    roleID: roleId,
    details: {}
  })
}
