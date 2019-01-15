import { ManageKeyValueBuilder } from './manage_key_value_builder'
import { default as xdr } from '../generated/xdr_generated'
import { Operation } from '../operation'

describe('Manage Key Value', () => {
  describe('Put key int value', () => {
    it('Success', () => {
      let key = '1216'
      let value = '123'
      let action = xdr.ManageKvAction.put().value
      let opts = {
        key: key,
        value: value
      }

      let op = ManageKeyValueBuilder.putKeyValue(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageKeyValue')
      expect(obj.action).to.be.equal(action)
      expect(obj.key).to.be.equal(key)
      expect(obj.value).to.be.equal(value)
    })
  })

  describe('Put key string value', () => {
    it('Success', () => {
      let key = '1216'
      let value = 'Hello'
      let action = xdr.ManageKvAction.put().value
      let opts = {
        key: key,
        value: value
      }

      let op = ManageKeyValueBuilder.putKeyValue(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageKeyValue')
      expect(obj.action).to.be.equal(action)
      expect(obj.key).to.be.equal(key)
      expect(obj.value).to.be.equal(value)
    })
  })

  describe('Delete key value', () => {
    it('Success', () => {
      let key = '1216'
      let action = xdr.ManageKvAction.remove().value
      let opts = {
        key: key
      }

      let op = ManageKeyValueBuilder.deleteKeyValue(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageKeyValue')
      expect(obj.action).to.be.equal(action)
      expect(obj.key).to.be.equal(key)
    })
  })

  describe('Put key uint64 value', () => {
    it('Success', () => {
      let key = '1216'
      let value = '123'
      let action = xdr.ManageKvAction.put().value
      let opts = {
        key: key,
        value: value,
        entryType: xdr.KeyValueEntryType.uint64().value
      }

      let op = ManageKeyValueBuilder.putKeyValue(opts)
      let xdrOp = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageKeyValue')
      expect(obj.action).to.be.equal(action)
      expect(obj.key).to.be.equal(key)
      expect(obj.value).to.be.equal(value)
    })
  })
})
