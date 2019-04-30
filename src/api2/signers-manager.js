import { TransactionBuilder } from '../../base/transaction_builder'
import { ManageSignerBuilder } from '../../base/operations/manage_signer_builder'

const RECOVERY_SIGNER_IDENTITY = 1
const DEFAULT_SIGNER_IDENTITY = 0
const DEFAULT_SIGNER_WEIGHT = 1000

export class SignersManager {
  static makeChangeSignerTransaction ({
    newPublicKey,
    sourceAccount,
    signers,
    signerToReplace,
    signingKeypair,
    signerRoleId
  }) {
    let operations = []
    operations.push(this._createSignerOp(newPublicKey, signerRoleId))

    const nonRecoverySigners = this._getNonRecoverySigners(signers)

    if (nonRecoverySigners.length) {
      const removeSignerOps = signerToReplace
        ? this._removeMasterAndCurrentSignerOps(
          nonRecoverySigners,
          sourceAccount,
          signerToReplace
        )
        : this._removeAllSignersOps(nonRecoverySigners)
      operations.push(...removeSignerOps)
    }

    const tx = new TransactionBuilder(sourceAccount)
    tx.operations = operations
    const txEnv = tx.build()
    txEnv.sign(signingKeypair)

    return txEnv.toEnvelope().toXDR().toString('base64')
  }

  static _createSignerOp (newAccountId, roleId) {
    return ManageSignerBuilder.createSigner({
      publicKey: newAccountId,
      weight: DEFAULT_SIGNER_WEIGHT,
      identity: DEFAULT_SIGNER_IDENTITY,
      roleID: roleId,
      details: {}
    })
  }

  static _getNonRecoverySigners (signers) {
    return signers
      .filter(signer => signer.identity !== RECOVERY_SIGNER_IDENTITY)
  }

  static _removeMasterAndCurrentSignerOps (signers, sourceAccount, publicKey) {
    return signers
      .filter(signer => {
        return signer.id === sourceAccount ||
          signer.id === publicKey
      })
      .map(signer => this._removeSignerOp(signer))
  }

  static _removeAllSignersOps (signers) {
    return signers.map(signer => this._removeSignerOp(signer))
  }

  static _removeSignerOp (signer) {
    return ManageSignerBuilder.deleteSigner({
      publicKey: signer.id
    })
  }
}
