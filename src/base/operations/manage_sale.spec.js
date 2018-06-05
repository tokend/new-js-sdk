import { default as xdr } from '../generated/xdr_generated'
import { isEqual } from 'lodash'
import { Operation } from '../operation'
import { ManageSaleBuilder } from './manage_sale'

describe('Manage sale', () => {
  it('Update sale details request op', () => {
    let opts = {
      saleID: '1',
      requestID: '0',
      newDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: {
          url: 'logo_url',
          type: 'logo_type'
        },
        name: 'sale name'
      }
    }

    let op = ManageSaleBuilder.createUpdateSaleDetailsRequest(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.saleID).to.be.equal(opts.saleID)
    expect(obj.requestID).to.be.equal(opts.requestID)
    expect(isEqual(obj.newDetails, opts.newDetails)).to.be.true
  })
  it('Cancel sale', () => {
    let opts = {
      saleID: '1'
    }
    let op = ManageSaleBuilder.cancelSale(opts)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.saleID).to.be.equal(opts.saleID)
  })
})
