
import { isEqual } from 'lodash'
import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'
import { SaleRequestBuilder } from './sale_request_builder'

describe('SaleRequestBuilder', () => {
  it('Success', () => {
    let opt = {
      requestID: '12',
      baseAsset: 'XAAU',
      saleType: '1',
      defaultQuoteAsset: 'USD',
      startTime: '4123421',
      endTime: '4123425',
      softCap: '20000.21',
      hardCap: '648251',
      requiredBaseAssetForHardCap: '762354',
      sequenceNumber: 12,
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: 'logo',
        name: 'sale name'
      },
      quoteAssets: [
        {
          price: '12.21',
          asset: 'ETH'
        },
        {
          price: '21.12',
          asset: 'BTC'
        }
      ]
    }
    let op = SaleRequestBuilder.createSaleCreationRequest(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createSaleRequest().name)
    expect(opt.requestID).to.be.equal(obj.requestID)
    expect(opt.baseAsset).to.be.equal(obj.baseAsset)
    expect(opt.saleType).to.be.equal(obj.saleType)
    expect(opt.defaultQuoteAsset).to.be.equal(obj.defaultQuoteAsset)
    expect(opt.startTime).to.be.equal(obj.startTime)
    expect(opt.endTime).to.be.equal(obj.endTime)
    expect(opt.softCap).to.be.equal(obj.softCap)
    expect(opt.hardCap).to.be.equal(obj.hardCap)
    expect(opt.requiredBaseAssetForHardCap).to.be.equal(obj.requiredBaseAssetForHardCap)
    expect(JSON.stringify(opt.quoteAssets)).to.be.equal(JSON.stringify(obj.quoteAssets))
    expect(isEqual(opt.details, obj.details)).to.be.true
  })
  it('Success Crowdfund', () => {
    let opt = {
      requestID: '12',
      baseAsset: 'XAAU',
      defaultQuoteAsset: 'USD',
      startTime: '4123421',
      endTime: '4123425',
      softCap: '20000.21',
      hardCap: '648251',
      requiredBaseAssetForHardCap: '762354',
      sequenceNumber: 13,
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: 'logo',
        name: 'sale name'
      },
      quoteAssets: [
        {
          price: '1',
          asset: 'ETH'
        },
        {
          price: '1',
          asset: 'BTC'
        }
      ],
      saleType: '1',
      saleEnumType: true
    }
    let op = SaleRequestBuilder.createSaleCreationRequest(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createSaleRequest().name)
    expect(opt.requestID).to.be.equal(obj.requestID)
    expect(opt.baseAsset).to.be.equal(obj.baseAsset)
    expect(opt.defaultQuoteAsset).to.be.equal(obj.defaultQuoteAsset)
    expect(opt.startTime).to.be.equal(obj.startTime)
    expect(opt.endTime).to.be.equal(obj.endTime)
    expect(opt.softCap).to.be.equal(obj.softCap)
    expect(opt.hardCap).to.be.equal(obj.hardCap)
    expect(opt.requiredBaseAssetForHardCap).to.be.equal(obj.requiredBaseAssetForHardCap)
    expect(opt.quoteAssets).to.be.jsonEqual(obj.quoteAssets)
    expect(isEqual(opt.details, obj.details)).to.be.true
  })
  it('Success create basic sale', () => {
    let opt = {
      requestID: '12',
      baseAsset: 'XAAU',
      defaultQuoteAsset: 'USD',
      startTime: '4123421',
      endTime: '4123425',
      softCap: '20000.21',
      hardCap: '648251',
      creatorDetails: {
        short_description: 'short description',
        description: 'Token sale description',
        logo: 'logo',
        name: 'sale name'
      },
      quoteAssets: [
        {
          price: '1',
          asset: 'ETH'
        },
        {
          price: '1',
          asset: 'BTC'
        }
      ],
      saleType: '1',
      saleEnumType: false,
      requiredBaseAssetForHardCap: '648251'
    }
    let op = SaleRequestBuilder.createSaleCreationRequest(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.createSaleRequest().name)
    expect(opt.requestID).to.be.equal(obj.requestID)
    expect(opt.baseAsset).to.be.equal(obj.baseAsset)
    expect(opt.defaultQuoteAsset).to.be.equal(obj.defaultQuoteAsset)
    expect(opt.startTime).to.be.equal(obj.startTime)
    expect(opt.endTime).to.be.equal(obj.endTime)
    expect(opt.softCap).to.be.equal(obj.softCap)
    expect(opt.hardCap).to.be.equal(obj.hardCap)
    expect(opt.allTasks).to.be.equal(obj.allTasks)
    expect(opt.requiredBaseAssetForHardCap).to.be.equal(obj.requiredBaseAssetForHardCap)
    expect(JSON.stringify(opt.quoteAssets)).to.be.equal(JSON.stringify(obj.quoteAssets))
    expect(isEqual(opt.details, obj.details)).to.be.true
  })
  it('Success cancel sale creation request', () => {
    let opt = {
      requestID: '120'
    }
    let op = SaleRequestBuilder.cancelSaleCreationRequest(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.cancelSaleRequest().name)
    expect(opt.requestID).to.be.equal(obj.requestID)
  })
})
