import { base, TokenD } from '../../../src'

const config = Object.freeze({
  MASTER_KP: base.Keypair.fromSecret('SAMJKTZVW5UOHCDK5INYJNORF2HRKYI72M5XSZCBYAHQHR34FFR4Z6G4')
})

function _getDefaultConfig () {
  const sdk = new TokenD('http://localhost:8000', {
    allowHttp: true
  })

  const signerKp = config.MASTER_KP
  const masterId = config.MASTER_KP.accountId()
  const sourceId = config.MASTER_KP.accountId()

  return {
    sdk,
    signerKp,
    masterId,
    sourceId
  }
}

export class Helper {
  /**
   * @param opts
   * @param opts.sdk
   * @param opts.signerKp
   * @param opts.sourceId
   * @param opts.masterId
   */
  constructor (opts = _getDefaultConfig()) {
    this._sdk = opts.sdk
    this._signerKp = opts.signerKp
    this._sourceId = opts.sourceId
    this._masterId = opts.masterId

    this._initSdk = this._sdk
    this._initSignerKp = this._signerKp
    this._initSourceId = this._sourceId
    this._initMasterId = this._masterId
  }

  reset () {
    this._sdk = this._initSdk
    this._signerKp = this._initSignerKp
    this._sourceId = this._initSourceId
    this._masterId = this._initMasterId
  }

  get sdk () { return this._sdk }
  get signerKp () { return this._signerKp }
  get sourceId () { return this._sourceId }
  get masterId () { return this._masterId }

  useSdk (sdk) { this._sdk = sdk }
  useSignerKp (keypair) { this._signerKp = keypair }
  useSourceId (accountId) { this._sourceId = accountId }
  useMasterId (accountId) { this._masterId = accountId }

  submit (...operations) {
    const transaction = new base
      .TransactionBuilder(this._sourceId)
      .addOperations(operations)
      .build()

    transaction.sign(this.signerKp)

    try {
      return this
        .sdk
        .horizon
        .transactions
        .submit(transaction)
    } catch (e) {
      console.error('Failed to submit transaction')
      console.log(e)
    }
  }
}
