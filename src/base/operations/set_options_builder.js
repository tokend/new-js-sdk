import { default as xdr } from '../generated/xdr_generated'
import isUndefined from 'lodash/isUndefined'
import { BaseOperation } from './base_operation'
import { Keypair } from '../keypair'

export class SetOptionsBuilder {
  /**
     * Returns an XDR SetOptionsOp. A "set options" operations set or clear account flags,
     * set the account's inflation destination, and/or add new signers to the account.
     * The flags used in `opts.clearFlags` and `opts.setFlags` can be the following:
     *   - `{@link AuthRequiredFlag}`
     *   - `{@link AuthRevocableFlag}`
     *   - `{@link AuthImmutableFlag}`
     *
     * It's possible to set/clear multiple flags at once using logical or.
     * @param {object} opts
     * @param {number|string} [opts.masterWeight] - The master key weight.
     * @param {number|string} [opts.lowThreshold] - The sum weight for the low threshold.
     * @param {number|string} [opts.medThreshold] - The sum weight for the medium threshold.
     * @param {number|string} [opts.highThreshold] - The sum weight for the high threshold.
     * @param {object} [opts.signer] - Add or remove a signer from the account. The signer is
     *                                 deleted if the weight is 0.
     * @param {string} [opts.signer.pubKey] - The public key of the new signer (old `address` field name is deprecated).
     * @param {number|string} [opts.signer.weight] - The weight of the new signer (0 to delete or 1-255)
     * @param {number|string} [opts.signer.signerType] - The type of the new signer
     * @param {number|string} [opts.signer.identity] - The identity of the new signer
     * * @param {string} [opts.signer.name] - Name of the signer
     * @param {object} [opts.limitsUpdateRequestData] - required data for LimitsUpdateRequest creation
     * * @param {string} [opts.limitsUpdateRequestData.documentHash] - hash of the document to review
     * @param {string} [opts.source] - The source account (defaults to transaction source).
     * @returns {xdr.SetOptionsOp}
     * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
     */
  static setOptions (opts) {
    let attributes = {
      ext: new xdr.SetOptionsOpExt(xdr.LedgerVersion.emptyVersion())
    }

    let weightCheckFunction = (value, name) => {
      if (value >= 0 && value <= 255) {
        return true
      } else {
        throw new Error(`${name} value must be between 0 and 255`)
      }
    }
    attributes.masterWeight = BaseOperation._checkUnsignedIntValue(
      'masterWeight',
      opts.masterWeight,
      weightCheckFunction
    )
    attributes.lowThreshold = BaseOperation._checkUnsignedIntValue(
      'lowThreshold',
      opts.lowThreshold,
      weightCheckFunction
    )
    attributes.medThreshold = BaseOperation._checkUnsignedIntValue(
      'medThreshold',
      opts.medThreshold,
      weightCheckFunction
    )
    attributes.highThreshold = BaseOperation._checkUnsignedIntValue(
      'highThreshold',
      opts.highThreshold,
      weightCheckFunction
    )

    if (opts.signer) {
      if (opts.signer.address) {
        console.warn('signer.address is deprecated. Use signer.pubKey instead.')
        opts.signer.pubKey = opts.signer.address
      }

      if (!Keypair.isValidPublicKey(opts.signer.pubKey)) {
        throw new Error('signer.pubKey is invalid')
      }

      opts.signer.weight = BaseOperation._checkUnsignedIntValue(
        'signer.weight',
        opts.signer.weight, weightCheckFunction)
      opts.signer.signerType = BaseOperation._checkUnsignedIntValue(
        'signer.signerType',
        opts.signer.signerType
      )
      if (isUndefined(opts.signer.signerType)) {
        throw new Error('signer.signerType is invalid')
      }

      opts.signer.identity = BaseOperation._checkUnsignedIntValue(
        'signer.identity',
        opts.signer.identity
      )
      if (isUndefined(opts.signer.identity)) {
        throw new Error('signer.identity is invalid')
      }

      let signerName = ''
      if (!isUndefined(opts.signer.name) && opts.signer.name.length > 0) {
        if (opts.signer.name.length > 256) {
          throw new Error('Signer name must be less that 256 chars')
        }
        signerName = opts.signer.name
      }

      let signerExt = new xdr.SignerExt(xdr.LedgerVersion.emptyVersion())
      attributes.signer = new xdr.Signer({
        pubKey: Keypair.fromAccountId(opts.signer.pubKey).xdrAccountId(),
        weight: opts.signer.weight,
        signerType: opts.signer.signerType,
        identity: opts.signer.identity,
        name: signerName,
        ext: signerExt
      })
    }

    if (opts.trustData) {
      if (isUndefined(opts.trustData.action)) {
        throw new Error('trustData.action is not defined')
      }
      if (!Keypair.isValidPublicKey(opts.trustData.allowedAccount)) {
        throw new Error('trustData.allowedAccount is invalid')
      }
      if (!Keypair.isValidBalanceKey(opts.trustData.balanceToUse)) {
        throw new Error('trustData.balanceToUse is invalid')
      }
      let trust = new xdr.TrustEntry({
        allowedAccount: Keypair
          .fromAccountId(opts.trustData.allowedAccount)
          .xdrAccountId(),
        balanceToUse: Keypair
          .fromBalanceId(opts.trustData.balanceToUse)
          .xdrBalanceId(),
        ext: new xdr.TrustEntryExt(xdr.LedgerVersion.emptyVersion())
      })

      attributes.trustData = new xdr.TrustData({
        trust,
        action: opts.trustData.action,
        ext: new xdr.TrustDataExt(xdr.LedgerVersion.emptyVersion())
      })
    }

    if (opts.limitsUpdateRequestData) {
      if (isUndefined(opts.limitsUpdateRequestData.documentHash)) {
        throw new Error('limitsUpdateRequestData.documentHash is not defined')
      }

      attributes.limitsUpdateRequestData = new xdr.LimitsUpdateRequestData({
        documentHash: opts.limitsUpdateRequestData.documentHash,
        ext: new xdr.LimitsUpdateRequestDataExt(
          xdr.LedgerVersion.emptyVersion()
        )
      })
    }

    let setOptionsOp = new xdr.SetOptionsOp(attributes)

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.setOption(setOptionsOp)
    BaseOperation.setSourceAccount(opAttributes, opts)
    return new xdr.Operation(opAttributes)
  }

  static setOptionsToObject (result, attrs) {
    result.masterWeight = attrs.masterWeight()
    result.lowThreshold = attrs.lowThreshold()
    result.medThreshold = attrs.medThreshold()
    result.highThreshold = attrs.highThreshold()

    if (attrs.signer()) {
      let signer = {}
      signer.pubKey = BaseOperation.accountIdtoAddress(attrs.signer().pubKey())
      signer.weight = attrs.signer().weight()
      signer.signerType = attrs.signer().signerType()
      signer.identity = attrs.signer().identity()
      signer.name = attrs.signer().name()

      result.signer = signer
    }
    if (attrs.trustData()) {
      let trustData = {}
      trustData.allowedAccount = BaseOperation
        .accountIdtoAddress(attrs.trustData().trust().allowedAccount())
      trustData.balanceToUse = BaseOperation
        .balanceIdtoString(attrs.trustData().trust().balanceToUse())
      trustData.action = attrs.trustData().action()
      result.trustData = trustData
    }
    if (attrs.limitsUpdateRequestData()) {
      let limitsUpdateRequestData = {}
      limitsUpdateRequestData.documentHash = attrs
        .limitsUpdateRequestData()
        .documentHash()
      result.limitsUpdateRequestData = limitsUpdateRequestData
    }
  }
}
