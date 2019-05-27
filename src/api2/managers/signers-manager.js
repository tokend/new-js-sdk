import { TransactionBuilder } from '../../base/transaction_builder'
import { ManageSignerBuilder } from '../../base/operations/manage_signer_builder'

const RECOVERY_SIGNER_ROLE_ID = '1'
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

  /**
   * Creates change signers transaction envelope
   *
   * @param {object} opts
   * @param {string} opts.newPublicKey New master signer ID of account
   * @param {string} opts.sourceAccount Transaction source account ID.
   * @param {string} [opts.signerToReplace] Specified signer ID to change.
   * @param {Keypair} opts.signingKeypair Keypair for signing transaction.
   *
   * @return {Promise.<string>} Base64-encoded transaction envelope
   */
  async createChangeSignerTransaction ({
    newPublicKey,
    sourceAccount,
    signerToReplace,
    signingKeypair
  }) {
    const tx = new TransactionBuilder(sourceAccount)
    tx.operations = await this._makeChangeSignerOperations({
      newPublicKey, sourceAccount, signerToReplace
    })

    const txEnv = tx.build()
    txEnv.sign(signingKeypair)

    return txEnv.toEnvelope().toXDR().toString('base64')
  }

  async _makeChangeSignerOperations ({
    newPublicKey,
    sourceAccount,
    signerToReplace
  }) {
    const nonRecoverySigners = await this._getNonRecoverySigners(sourceAccount)

    let operations = []
    const createSignerOp = await this._makeCreateSignerOp(newPublicKey)
    operations.push(createSignerOp)

    if (nonRecoverySigners.length) {
      const removeSignerOps = signerToReplace
        ? this._makeRemoveMasterAndCurrentSignerOps(
          nonRecoverySigners,
          sourceAccount,
          signerToReplace
        )
        : this._makeRemoveAllSignersOps(nonRecoverySigners)

      operations.push(...removeSignerOps)
    }

    return operations
  }

  async _getNonRecoverySigners (accountId) {
    const signers = await this._getSigners(accountId)
    return signers
      .filter(signer => signer.role.id !== RECOVERY_SIGNER_ROLE_ID)
  }

  async _getSigners (accountId) {
    const endpoint = `/v3/accounts/${accountId}/signers`
    const { data: signers } = await this._apiCaller.get(endpoint)

    return signers
  }

  async _makeCreateSignerOp (newAccountId) {
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

  _makeRemoveMasterAndCurrentSignerOps (signers, masterId, signerId) {
    return signers
      .filter(signer => {
        return signer.id === masterId || signer.id === signerId
      })
      .map(signer => this._makeRemoveSignerOp(signer))
  }

  _makeRemoveAllSignersOps (signers) {
    return signers.map(signer => this._makeRemoveSignerOp(signer))
  }

  _makeRemoveSignerOp (signer) {
    return ManageSignerBuilder.deleteSigner({
      publicKey: signer.id
    })
  }
}
