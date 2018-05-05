import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ManageAssetBuilder } from './manage_asset_builder'

describe('ManageAssetBuilder', () => {
  describe('assetCreationRequest', () => {
    it('Success', () => {
      let opts = {
        code: 'USD',
        preissuedAssetSigner: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        maxIssuanceAmount: '1000.1211',
        policies: 12,
        requestID: '0',
        initialPreissuedAmount: '12.14',
        details: {
          name: 'USD Name'
        }
      }
      let op = ManageAssetBuilder.assetCreationRequest(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageAsset')
      expect(obj.requestID).to.be.equal(opts.requestID)
      expect(obj.requestType).to.be.equal('createAssetCreationRequest')
      expect(obj.code).to.be.equal(opts.code)
      expect(obj.details.name).to.be.equal(opts.details.name)
      expect(obj.preissuedAssetSigner).to.be.equal(opts.preissuedAssetSigner)
      expect(obj.maxIssuanceAmount).to.be.equal(opts.maxIssuanceAmount)
      expect(obj.policies).to.be.equal(opts.policies)
      expect(obj.initialPreissuedAmount)
        .to.be.equal(opts.initialPreissuedAmount)
    })
  })

  describe('assetUpdateRequest', () => {
    it('Success', () => {
      let opts = {
        code: 'USD',
        policies: 12,
        requestID: '0'
      }
      let op = ManageAssetBuilder.assetUpdateRequest(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageAsset')
      expect(obj.requestID).to.be.equal(opts.requestID)
      expect(obj.requestType).to.be.equal('createAssetUpdateRequest')
      expect(obj.code).to.be.equal(opts.code)
      expect(obj.policies).to.be.equal(opts.policies)
    })
  })

  describe('cancelAssetRequest', () => {
    it('Success', () => {
      let opts = {
        requestID: '0'
      }
      let op = ManageAssetBuilder.cancelAssetRequest(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageAsset')
      expect(obj.requestID).to.be.equal(opts.requestID)
      expect(obj.requestType).to.be.equal('cancelAssetRequest')
    })
  })

  describe('changePreIssuedAssetSigner', () => {
    it('Success', () => {
      let opts = {
        code: 'USD',
        accountID: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
      }
      let op = ManageAssetBuilder.changeAssetPreIssuer(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageAsset')
      expect(obj.requestID).to.be.equal(opts.requestID)
      expect(obj.requestType).to.be.equal('changePreissuedAssetSigner')
      expect(obj.code).to.be.equal(opts.code)
      expect(obj.accountID).to.be.equal(opts.accountID)
    })
  })
})
