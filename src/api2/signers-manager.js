import { TransactionBuilder } from '../base/transaction_builder'
import { ManageSignerBuilder } from '../base/operations/manage_signer_builder'

import { NotFoundError } from '../errors'

const RECOVERY_SIGNER_IDENTITY = 1
const DEFAULT_SIGNER_IDENTITY = 0
const DEFAULT_SIGNER_WEIGHT = 1000
const DEFAULT_SIGNER_ROLE_KEY = 'signer_role:default'

/**
 * Signers manager.
 */

export class SignersManager {
  /**
   * SignersManager constructor.
   *
   * @param {ApiCaller} apiCaller ApiCaller instance to process the requests.
   */
  constructor (apiCaller) {
    this._apiCaller = apiCaller
  }

  async createChangeSignerTransaction ({
    newPublicKey,
    sourceAccount,
    signerToReplace,
    signingKeypair
  }) {
    const tx = new TransactionBuilder(sourceAccount)
    tx.operations = await this._getChangeSignerOperations({
      newPublicKey, sourceAccount, signerToReplace
    })

    const txEnv = tx.build()
    txEnv.sign(signingKeypair)

    return txEnv.toEnvelope().toXDR().toString('base64')
  }

  async _getChangeSignerOperations ({
    newPublicKey,
    sourceAccount,
    signerToReplace
  }) {
    const nonRecoverySigners = await this._getNonRecoverySigners(sourceAccount)

    let operations = []
    const createSignerOp = await this._getCreateSignerOp(newPublicKey)
    operations.push(createSignerOp)

    if (nonRecoverySigners.length) {
      const removeSignerOps = signerToReplace
        ? this._getRemoveMasterAndCurrentSignerOps(
          nonRecoverySigners,
          sourceAccount,
          signerToReplace
        )
        : this._getRemoveAllSignersOps(nonRecoverySigners)

      operations.push(...removeSignerOps)
    }

    return operations
  }

  async _getNonRecoverySigners (accountId) {
    const signers = await this._getSigners(accountId)
    return signers
      .filter(signer => signer.identity !== RECOVERY_SIGNER_IDENTITY)
  }

  async _getSigners (accountId) {
    try {
      const endpoint = `/v3/accounts/${accountId}/signers`
      const { data: signers } = await this._apiCaller.get(endpoint)

      return signers
    } catch (err) {
      if (err instanceof NotFoundError) {
        return []
      }
    }
  }

  async _getCreateSignerOp (newAccountId) {
    const signerRoleId = await this._getDefaultSignerRole()

    return ManageSignerBuilder.createSigner({
      publicKey: newAccountId,
      weight: DEFAULT_SIGNER_WEIGHT,
      identity: DEFAULT_SIGNER_IDENTITY,
      roleID: signerRoleId,
      details: {}
    })
  }

  async _getDefaultSignerRole () {
    const endpoint = `/v3/key_values/${DEFAULT_SIGNER_ROLE_KEY}`
    const { data } = await this._apiCaller.get(endpoint)

    return String(data.value.u32)
  }

  static _getRemoveMasterAndCurrentSignerOps (signers, masterId, signerId) {
    return signers
      .filter(signer => {
        return signer.id === masterId || signer.id === signerId
      })
      .map(signer => this._removeSignerOp(signer))
  }

  static _getRemoveAllSignersOps (signers) {
    return signers.map(signer => this._getRemoveSignerOp(signer))
  }

  static _getRemoveSignerOp (signer) {
    return ManageSignerBuilder.deleteSigner({
      publicKey: signer.id
    })
  }
}
