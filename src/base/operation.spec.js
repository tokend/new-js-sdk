import { Operation } from './operation'

describe('Operation', () => {
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
