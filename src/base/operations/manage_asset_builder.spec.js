import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ManageAssetBuilder } from './manage_asset_builder'

describe('ManageAssetBuilder', () => {
  describe('create asset', () => {
    it('Success', () => {
      let opts = {
        code: 'USD',
        maxIssuanceAmount: '1000.1211',
        details: {
          name: 'USD Name'
        },
        securityType: '1',
        state: 0,
        trailingDigitsCount: 6
      }
      let op = ManageAssetBuilder.createAsset(opts)
      console.log(op)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('createAsset')
      expect(obj.code).to.be.equal(opts.code)
      expect(obj.details.name).to.be.equal(opts.details.name)
      expect(obj.maxIssuanceAmount).to.be.equal(opts.maxIssuanceAmount)
      expect(obj.securityType).to.be.equal(opts.securityType)
    })
  })

  describe('update asset', () => {
    it('Success', () => {
      let opts = {
        code: 'USD',
        maxIssuanceAmount: '1000.1211',
        details: {
          name: 'USD Name'
        },
        state: 0
      }
      let op = ManageAssetBuilder.updateAsset(opts)
      console.log(op)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('updateAsset')
      expect(obj.code).to.be.equal(opts.code)
      expect(obj.details.name).to.be.equal(opts.details.name)
      expect(obj.maxIssuanceAmount).to.be.equal(opts.maxIssuanceAmount)
    })
  })
})
