import xdr from './generated/xdr_generated'
import { hash } from './hashing'
import { Keypair } from './keypair'
import { Operation } from './operation'

describe('Operation', () => {
  describe('.payment()', () => {
    let sourceBalanceId = Keypair.random().balanceId()
    let destinationBalanceId = Keypair.random().balanceId()
    it('creates a paymentOp', () => {
      let destination = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
      let amount = '1000'
      let op = Operation.payment({
        destination,
        amount,
        subject: 'subj',
        sourceBalanceId,
        destinationBalanceId,
        reference: 'ref',
        feeData: {
          sourceFee: {
            percent: '120',
            fixed: '110'
          },
          destinationFee: {
            percent: '20',
            fixed: '10'
          },
          sourcePaysForDest: true
        }
      })
      let opXdr = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('payment')
      expect(operation.body().value().amount().toString())
        .to.be.equal('1000000000')
      expect(obj.amount).to.be.equal(amount)
      expect(obj.subject).to.be.equal('subj')
      expect(obj.reference).to.be.equal('ref')
      expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId)
      expect(obj.destination).to.be.equal(destinationBalanceId)
      expect(obj.feeData.sourcePaysForDest).to.be.equal(true)
      expect(obj.feeData.sourceFee.fixed).to.be.equal('110')
      expect(obj.feeData.sourceFee.percent).to.be.equal('120')
      expect(obj.feeData.destinationFee.fixed).to.be.equal('10')
      expect(obj.feeData.destinationFee.percent).to.be.equal('20')
      expect(Operation.isPayment(op)).to.be.equal(true)
    })

    it('fails to create payment operation without feeData', () => {
      let opts = {
        amount: '20',
        fixedFee: '0',
        subject: 'subj',
        sourceBalanceId,
        destinationBalanceId
      }
      expectThrow(() => Operation.payment(opts))
    })

    it('fails to create payment operation with an invalid amount', () => {
      let opts = {
        amount: 20,
        fixedFee: '0',
        paymentFee: '0',
        subject: 'subj',
        sourceBalanceId,
        destinationBalanceId,
        feeData: {
          sourceFee: {
            paymentFee: '0',
            fixedFee: '10'
          },
          destinationFee: {
            paymentFee: '0',
            fixedFee: '10'
          },
          sourcePaysForDest: true
        }
      }
      expectThrow(() => Operation.payment(opts))
    })
    it('fails to create payment operation with an invalid subject', () => {
      let opts = {
        amount: '20',
        fixedFee: '0',
        paymentFee: '0',
        subject: 12123,
        sourceBalanceId,
        destinationBalanceId,
        feeData: {
          sourceFee: {
            paymentFee: '0',
            fixedFee: '10'
          },
          destinationFee: {
            paymentFee: '0',
            fixedFee: '10'
          },
          sourcePaysForDest: true
        }
      }
      expectThrow(() => Operation.payment(opts))
    })

    it('fails to create payment operation with an invalid sourceBalanceId', () => {
      let opts = {
        amount: '20',
        fixedFee: '0',
        paymentFee: '0',
        subject: '12123',
        sourceBalanceId: 123,
        destinationBalanceId,
        feeData: {
          sourceFee: {
            paymentFee: '0',
            fixedFee: '10'
          },
          destinationFee: {
            paymentFee: '0',
            fixedFee: '10'
          },
          sourcePaysForDest: true
        }
      }
      expectThrow(() => Operation.payment(opts))
    })

    it('fails to create payment operation with an invalid destinationBalanceId', () => {
      let opts = {
        amount: '20',
        fixedFee: '0',
        paymentFee: '0',
        subject: '12123',
        sourceBalanceId,
        destinationBalanceId: 123,
        feeData: {
          sourceFee: {
            paymentFee: '0',
            fixedFee: '10'
          },
          destinationFee: {
            paymentFee: '0',
            fixedFee: '10'
          },
          sourcePaysForDest: true
        }
      }
      expectThrow(() => Operation.payment(opts))
    })
  })
  describe('.setFees', () => {
    it('valid setFees', () => {
      let feeType = xdr.FeeType.paymentFee()
      let opts = {
        fee: {
          feeType: feeType,
          percentFee: '10',
          fixedFee: '1',
          asset: 'ETC',
          accountId: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
          subtype: '3',
          upperBound: '123'
        }
      }
      let op = Operation.setFees(opts)
      let opXdr = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('setFee')
      expect(obj.fee.percentFee).to.be.equal('10')
      expect(obj.fee.fixedFee).to.be.equal('1')
      expect(obj.fee.feeType).to.be.equal(feeType)
      expect(obj.fee.upperBound).to.be.equal('123')
      expect(obj.fee.lowerBound).to.be.equal('0')
      expect(obj.fee.subtype).to.be.equal('3')
      expect(obj.fee.accountId).to.be.equal('GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ')
      expect(obj.fee.hash.toString()).to.be.equal(hash('type:0asset:ETCsubtype:3accountID:GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ').toString())
      expect(obj.fee.asset).to.be.equal('ETC')
    })

    it('fails to create setFees operation with an invalid FeeType', () => {
      let opts = {
        fee: {
          feeType: 1,
          percentFee: '1',
          fixedFee: '2',
          asset: 'ETC'
        }
      }
      expectThrow(() => Operation.setFees(opts))
    })

    it('fails to create setFees operation with an invalid asset', () => {
      let opts = {
        fee: {
          feeType: xdr.FeeType.paymentFee(),
          percentFee: '1',
          fixedFee: '2',
          asset: ''
        }
      }
      expectThrow(() => Operation.setFees(opts))
    })

    it('fails to create setFees operation with an invalid percentFee', () => {
      let feeType = xdr.FeeType.paymentFee()
      let opts = {
        fee: {
          feeType: feeType,
          fixedFee: '0',
          percentFee: 'abs',
          asset: 'ETC'
        }
      }
      expectThrow(() => Operation.setFees(opts))
    })

    it('fails to create setFees operation with an invalid fixedFee', () => {
      let feeType = xdr.FeeType.paymentFee()
      let opts = {
        fee: {
          feeType: feeType,
          fixedFee: '',
          percentFee: '11',
          asset: 'ETC'
        }
      }
      expectThrow(() => Operation.setFees(opts))
    })
  })

  describe('.manageBalance', () => {
    let account = Keypair.random()
    let asset = 'ETH'
    it('valid manageBalance', () => {
      let opts = {
        destination: account.accountId(),
        action: xdr.ManageBalanceAction.create(),
        asset
      }
      let op = Operation.manageBalance(opts)
      let opXdr = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageBalance')
      expect(obj.destination).to.be.equal(account.accountId())
      expect(obj.action).to.be.equal(xdr.ManageBalanceAction.create())
    })

    it('fails to create manageBalance operation with an invalid account', () => {
      let opts = {
        destination: account,
        action: xdr.ManageBalanceAction.create(),
        asset
      }
      expectThrow(() => Operation.manageBalance(opts))
    })

    it('fails to create manageBalance operation with an invalid action', () => {
      let opts = {
        destination: account.accountId(),
        action: 1,
        asset
      }
      expectThrow(() => Operation.manageBalance(opts))
    })

    it('fails to create manageBalance operation with an invalid asset', () => {
      let opts = {
        destination: account.accountId(),
        action: xdr.ManageBalanceAction.create(),
        asset: 123
      }
      expectThrow(() => Operation.manageBalance(opts))
    })
  })

  describe('.manageAssetPair', () => {
    let base = 'ETH'
    let quote = 'USD'
    let policies = 1
    let physicalPriceCorrection = '12.2'
    let maxPriceStep = '200.1'
    let physicalPrice = '12.12'
    it('valid manageAssetPair', () => {
      let opts = {
        action: xdr.ManageAssetPairAction.create(),
        quote,
        base,
        physicalPriceCorrection,
        maxPriceStep,
        policies,
        physicalPrice
      }
      let op = Operation.manageAssetPair(opts)
      let opXdr = op.toXDR('hex')
      let operation = xdr.Operation.fromXDR(Buffer.from(opXdr, 'hex'))
      let obj = Operation.operationToObject(operation)
      expect(obj.type).to.be.equal('manageAssetPair')
      expect(obj.base).to.be.equal(base)
      expect(obj.quote).to.be.equal(quote)
      expect(obj.action).to.be.equal(xdr.ManageAssetPairAction.create())
      expect(operation.body().value().physicalPriceCorrection().toString()).to.be.equal('12200000')
      expect(operation.body().value().maxPriceStep().toString()).to.be.equal('200100000')
      expect(operation.body().value().physicalPrice().toString()).to.be.equal('12120000')
      expect(obj.physicalPriceCorrection).to.be.equal(physicalPriceCorrection)
      expect(obj.maxPriceStep).to.be.equal(maxPriceStep)
    })
  })

  describe('._checkUnsignedIntValue()', () => {
    it('returns true for valid values', () => {
      let values = [
        { value: 0, expected: 0 },
        { value: 10, expected: 10 },
        { value: '0', expected: 0 },
        { value: '10', expected: 10 },
        { value: undefined, expected: undefined }
      ]

      for (let i in values) {
        let { value, expected } = values[i]
        expect(Operation._checkUnsignedIntValue(value, value))
          .to.be.equal(expected)
      }
    })

    it('throws error for invalid values', () => {
      let values = [
        {},
        [],
        '', // empty string
        'test', // string not representing a number
        '0.5',
        '-10',
        '-10.5',
        'Infinity',
        Infinity,
        'Nan',
        NaN
      ]

      for (let i in values) {
        let value = values[i]
        expectThrow(() => Operation._checkUnsignedIntValue(value, value))
      }
    })

    it('return correct values when isValidFunction is set', () => {
      expect(
        Operation._checkUnsignedIntValue('test', undefined, value => value < 10)
      ).to.equal(undefined)

      expect(
        Operation._checkUnsignedIntValue('test', 8, value => value < 10)
      ).to.equal(8)
      expect(
        Operation._checkUnsignedIntValue('test', '8', value => value < 10)
      ).to.equal(8)

      expectThrow(() => {
        Operation._checkUnsignedIntValue('test', 12, value => value < 10)
      })
      expectThrow(() => {
        Operation._checkUnsignedIntValue('test', '12', value => value < 10)
      })
    })
  })

  describe('.isValidAmount()', () => {
    it('returns true for valid amounts', () => {
      let amounts = [
        '10',
        '0.10',
        '0.1234',
        '922337203685.4775' // MAX
      ]

      for (let i in amounts) {
        expect(Operation.isValidAmount(amounts[i])).to.be.equal(true)
      }
    })

    it('returns false for invalid amounts', () => {
      let amounts = [
        100, // integer
        100.50, // float
        '', // empty string
        'test', // string not representing a number
        '0',
        '-10',
        '-10.5',
        '0.12345678',
        '922337203685.4775808', // Overflow
        'Infinity',
        Infinity,
        'Nan',
        NaN
      ]

      for (let i in amounts) {
        expect(Operation.isValidAmount(amounts[i])).to.be.equal(false)
      }
    })

    it('allows 0 only if allowZero argument is set to true', () => {
      expect(Operation.isValidAmount('0')).to.be.equal(false)
      expect(Operation.isValidAmount('0', true)).to.be.equal(true)
    })
  })
})
