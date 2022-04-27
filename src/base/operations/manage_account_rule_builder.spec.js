import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ManageAccountRuleBuilder } from './manage_account_rule_builder'

describe('ManageAccountRuleBuilder', () => {
  it('createWithAssetResource', () => {
    let opt = {
      type: 'ASSET', 
      assetCode: '123',
      assetType: '2',
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageAccountRule().name)
    expect(opt.assetCode).to.be.equal(obj.assetCode)
    expect(opt.assetType).to.be.equal(obj.assetType)
    expect(opt.action).to.be.equal(obj.action)
    expect(opt.forbids).to.be.equal(obj.forbids)
    expect(JSON.stringify(opt.details)).to.be.equal(JSON.stringify(obj.details))
  })

  it('createWithOfferEntryResource', () => {
    let opt = {
      type: 'OFFER_ENTRY', 
      baseAssetCode: '123',
      quoteAssetCode: '123',
      baseAssetType: '2',
      quoteAssetType: '2',
      isBuy: false,
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(opt.baseAssetCode).to.be.equal(obj.baseAssetCode)
    expect(opt.quoteAssetCode).to.be.equal(obj.quoteAssetCode)
    expect(opt.baseAssetType).to.be.equal(obj.baseAssetType)
    expect(opt.quoteAssetType).to.be.equal(obj.quoteAssetType)
    expect(opt.isBuy).to.be.equal(obj.isBuy)
  })

  it('createWithSaleResource', () => {
    let opt = {
      type: 'SALE', 
      saleId: '123',
      saleType: '2',
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(opt.saleId).to.be.equal(obj.saleId)
    expect(opt.saleType).to.be.equal(obj.saleType)
  })

  it('createWithAtomicSwapAskResource', () => {
    let opt = {
      type: 'ATOMIC_SWAP_ASK', 
      assetCode: '123',
      assetType: '2',
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(opt.assetCode).to.be.equal(obj.assetCode)
    expect(opt.assetType).to.be.equal(obj.assetType)
  })

  it('createWithKeyValueResource', () => {
    let opt = {
      type: 'KEY_VALUE', 
      keyPrefix: '123',
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(opt.keyPrefix).to.be.equal(obj.keyPrefix)
  })

  it('createWithPollResource', () => {
    let opt = {
      type: 'POLL', 
      pollId: '4321',
      permissionType: 2,
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(opt.pollId).to.be.equal(obj.pollId)
    expect(opt.permissionType).to.be.equal(obj.permissionType)
  })

  it('createWithVoteResource', () => {
    let opt = {
      type: 'VOTE', 
      pollId: '4321',
      permissionType: 2,
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(opt.pollId).to.be.equal(obj.pollId)
    expect(opt.permissionType).to.be.equal(obj.permissionType)
  })
  
  it('createWithInitiateKycRecoveryResource', () => {
    let opt = {
      type: 'INITIATE_KYC_RECOVERY', 
      roleId: '4123421',
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(opt.roleId).to.be.equal(obj.roleId)
  })

  it('createWithSwapResource', () => {
    let opt = {
      type: 'SWAP', 
      assetCode: '123',
      assetType: '2',
      action: 2,
      forbids: true,
      details: {}
    }
    let op = ManageAccountRuleBuilder.createAccountRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(opt.assetCode).to.be.equal(obj.assetCode)
    expect(opt.assetType).to.be.equal(obj.assetType)
  })

  // it('createWithDataResource', () => {
  //   let opt = {
  //     type: 'DATA',
  //     type: '2',
  //     action: 2,
  //     forbids: true,
  //     details: {}
  //   }
  //   let op = ManageAccountRuleBuilder.createAccountRule(opt)
  //   let xdrOp = op.toXDR('hex')
  //   let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
  //   let obj = Operation.operationToObject(operation)
  //   expect(opt.assetCode).to.be.equal(obj.assetCode)
  //   expect(opt.assetType).to.be.equal(obj.assetType)
  // })

  // it('createWithCustomResource', () => {
  //   let opt = {
  //     type: 'CUSTOM', 
  //     action: "action",
  //     resource: 'resource',
  //     action: 2,
  //     forbids: true,
  //     details: {}
  //   }
  //   let op = ManageAccountRuleBuilder.createAccountRule(opt)
  //   let xdrOp = op.toXDR('hex')
  //   let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
  //   let obj = Operation.operationToObject(operation)
  //   expect(opt.action).to.be.equal(obj.action)
  //   expect(opt.resource).to.be.equal(obj.resource)
  // })
})