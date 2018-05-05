import { Memo } from './memo'

describe('Memo', () => {
  describe('.text()', () => {
    it('returns a value for a correct argument', () => {
      expectNoThrow(() => Memo.text('test'))
      let memoUtf8 = Memo.text('三代之時')

      // Node 0.10, sigh...
      let equal = true
      let a = Buffer.from(memoUtf8._value, 'utf8')
      let b = Buffer.from('三代之時', 'utf8')
      if (a.length !== b.length) {
        equal = false
      } else {
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            equal = false
            break
          }
        }
      }

      expect(equal).to.be.true
    })

    it('throws an error when invalid argument was passed', () => {
      expectThrow(() => Memo.text())
      expectThrow(() => Memo.text({}))
      expectThrow(() => Memo.text(10))
      expectThrow(() => Memo.text(Infinity))
      expectThrow(() => Memo.text(NaN))
    })

    it('throws an error when string is longer than 28 bytes', () => {
      expectThrow(() => Memo.text('12345678901234567890123456789'))
      expectThrow(() => Memo.text('三代之時三代之時三代之時'))
    })
  })

  describe('.id()', () => {
    it('returns a value for a correct argument', () => {
      expectNoThrow(() => Memo.id('1000'))
      expectNoThrow(() => Memo.id('0'))
    })

    it('throws an error when invalid argument was passed', () => {
      expectThrow(() => Memo.id())
      expectThrow(() => Memo.id({}))
      expectThrow(() => Memo.id(Infinity))
      expectThrow(() => Memo.id(NaN))
      expectThrow(() => Memo.id('test'))
    })
  })

  describe('.hash() & Memo.returnHash()', () => {
    let methods = [Memo.hash, Memo.returnHash]

    it('returns a value for a correct argument', () => {
      for (let i in methods) {
        let method = methods[i]
        expectNoThrow(() => method(Buffer.alloc(32)))
        expectNoThrow(() => method('0000000000000000000000000000000000000000000000000000000000000000'))
      }
    })

    it('throws an error when invalid argument was passed', () => {
      for (let i in methods) {
        let method = methods[i]
        expectThrow(() => method())
        expectThrow(() => method({}))
        expectThrow(() => method(Infinity))
        expectThrow(() => method(NaN))
        expectThrow(() => method('test'))
        expectThrow(() => method([0, 10, 20]))
        expectThrow(() => method(Buffer.alloc(33)))
        expectThrow(() => method('00000000000000000000000000000000000000000000000000000000000000'))
        expectThrow(() => method('000000000000000000000000000000000000000000000000000000000000000000'))
      }
    })
  })
})
