import xdr from '../generated/xdr_generated'
import { Operation } from '../operation'
import { ManageAccountSpecificRuleBuilder } from './manage_account_specific_rule_builder'

describe('ManageAccountSpecificRuleBuilder', () => {
  it('Create sale rule without accountID', () => {
    let opt = {
      forbids: true,
      saleID: '4123421'
    }
    let op = ManageAccountSpecificRuleBuilder.createSaleRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageAccountSpecificRule().name)
    expect(opt.saleID).to.be.equal(obj.saleID)
    expect(opt.forbids).to.be.equal(obj.forbids)
    expect(obj.ledgerEntryType).to.be.equal(xdr.LedgerEntryType.sale().value)
  })
  it('Create sale rule with accountID', () => {
    let opt = {
      forbids: false,
      saleID: '4123421',
      accountID: 'GDZXNSOUESYZMHRC3TZRN4VXSIOT47MDDUVD6U7CWXHTDLXVVGU64LVV'
    }
    let op = ManageAccountSpecificRuleBuilder.createSaleRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageAccountSpecificRule().name)
    expect(opt.saleID).to.be.equal(obj.saleID)
    expect(opt.forbids).to.be.equal(obj.forbids)
    expect(obj.ledgerEntryType).to.be.equal(xdr.LedgerEntryType.sale().value)
    expect(obj.accountID).to.be.equal(opt.accountID)
  })
  it('Remove', () => {
    let opt = {
      ruleID: '12'
    }
    let op = ManageAccountSpecificRuleBuilder.removeRule(opt)
    let xdrOp = op.toXDR('hex')
    let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
    let obj = Operation.operationToObject(operation)
    expect(obj.type).to.be.equal(xdr.OperationType.manageAccountSpecificRule().name)
    expect(opt.ruleID).to.be.equal(obj.ruleID)
  })
})
