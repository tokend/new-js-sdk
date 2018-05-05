import { default as xdr } from '../generated/xdr_generated'
import { Keypair } from '../keypair'
import { Operation } from '../operation'
import { hash } from '../hashing'
import { SetOptionsBuilder } from './set_options_builder'

describe('SetOptionsBuilder', () => {
  describe('.setOptions()', () => {
    it('creates a setOptionsOp', () => {
      let opts = {}
      opts.masterWeight = 0
      opts.lowThreshold = 1
      opts.medThreshold = 2
      opts.highThreshold = 3

      opts.signer = {
        pubKey: 'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7',
        weight: 1,
        signerType: 2,
        identity: 3,
        name: 'Test Signer'
      }

      let allowedAccount = Keypair.random().accountId()
      let balanceToUse = Keypair.random().balanceId()
      opts.trustData = {
        action: xdr.ManageTrustAction.trustAdd(),
        allowedAccount,
        balanceToUse
      }

      let documentData = 'Some data in document'
      let documentHash = hash(documentData)

      opts.limitsUpdateRequestData = {
        documentHash: documentHash
      }

      let op = SetOptionsBuilder.setOptions(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)

      expect(obj.type).to.be.equal('setOption')
      expect(obj.masterWeight).to.be.equal(opts.masterWeight)
      expect(obj.lowThreshold).to.be.equal(opts.lowThreshold)
      expect(obj.medThreshold).to.be.equal(opts.medThreshold)
      expect(obj.highThreshold).to.be.equal(opts.highThreshold)

      expect(obj.signer.pubKey).to.be.equal(opts.signer.pubKey)
      expect(obj.signer.weight).to.be.equal(opts.signer.weight)
      expect(obj.signer.signerType).to.be.equal(opts.signer.signerType)
      expect(obj.signer.identity).to.be.equal(opts.signer.identity)
      expect(obj.signer.name).to.be.equal(opts.signer.name)

      expect(obj.trustData.allowedAccount).to.be.equal(allowedAccount)
      expect(obj.trustData.balanceToUse).to.be.equal(balanceToUse)
      expect(obj.trustData.action).to.be.equal(xdr.ManageTrustAction.trustAdd())
      expect(obj.limitsUpdateRequestData.documentHash.toString())
        .to.be.equal(documentHash.toString())
    })

    it('fails to create setOptions operation with an invalid signer address', () => {
      let opts = {
        signer: {
          pubKey: 'GDGU5OAPHNPU5UCL',
          weight: 1
        }
      }
      expectThrow(() => SetOptionsBuilder.setOptions(opts))
    })

    it('fails to create setOptions operation with an invalid masterWeight', () => {
      let opts = {
        masterWeight: 400
      }
      expectThrow(() => SetOptionsBuilder.setOptions(opts))
    })

    it('fails to create setOptions operation with an invalid lowThreshold', () => {
      let opts = {
        lowThreshold: 400
      }
      expectThrow(() => SetOptionsBuilder.setOptions(opts))
    })

    it('fails to create setOptions operation with an invalid medThreshold', () => {
      let opts = {
        medThreshold: 400
      }
      expectThrow(() => SetOptionsBuilder.setOptions(opts))
    })

    it('fails to create setOptions operation with an invalid highThreshold', () => {
      let opts = {
        highThreshold: 400
      }
      expectThrow(() => SetOptionsBuilder.setOptions(opts))
    })
  })
})
