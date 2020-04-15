"use strict";

var _memo = require("./memo");

describe('Memo', function () {
  describe('.text()', function () {
    it('returns a value for a correct argument', function () {
      expectNoThrow(function () {
        return _memo.Memo.text('test');
      });

      var memoUtf8 = _memo.Memo.text('三代之時'); // Node 0.10, sigh...


      var equal = true;
      var a = Buffer.from(memoUtf8._value, 'utf8');
      var b = Buffer.from('三代之時', 'utf8');

      if (a.length !== b.length) {
        equal = false;
      } else {
        for (var i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            equal = false;
            break;
          }
        }
      }

      expect(equal).to.be.true;
    });
    it('throws an error when invalid argument was passed', function () {
      expectThrow(function () {
        return _memo.Memo.text();
      });
      expectThrow(function () {
        return _memo.Memo.text({});
      });
      expectThrow(function () {
        return _memo.Memo.text(10);
      });
      expectThrow(function () {
        return _memo.Memo.text(Infinity);
      });
      expectThrow(function () {
        return _memo.Memo.text(NaN);
      });
    });
    it('throws an error when string is longer than 28 bytes', function () {
      expectThrow(function () {
        return _memo.Memo.text('12345678901234567890123456789');
      });
      expectThrow(function () {
        return _memo.Memo.text('三代之時三代之時三代之時');
      });
    });
  });
  describe('.id()', function () {
    it('returns a value for a correct argument', function () {
      expectNoThrow(function () {
        return _memo.Memo.id('1000');
      });
      expectNoThrow(function () {
        return _memo.Memo.id('0');
      });
    });
    it('throws an error when invalid argument was passed', function () {
      expectThrow(function () {
        return _memo.Memo.id();
      });
      expectThrow(function () {
        return _memo.Memo.id({});
      });
      expectThrow(function () {
        return _memo.Memo.id(Infinity);
      });
      expectThrow(function () {
        return _memo.Memo.id(NaN);
      });
      expectThrow(function () {
        return _memo.Memo.id('test');
      });
    });
  });
  describe('.hash() & Memo.returnHash()', function () {
    var methods = [_memo.Memo.hash, _memo.Memo.returnHash];
    it('returns a value for a correct argument', function () {
      var _loop = function _loop(i) {
        var method = methods[i];
        expectNoThrow(function () {
          return method(Buffer.alloc(32));
        });
        expectNoThrow(function () {
          return method('0000000000000000000000000000000000000000000000000000000000000000');
        });
      };

      for (var i in methods) {
        _loop(i);
      }
    });
    it('throws an error when invalid argument was passed', function () {
      var _loop2 = function _loop2(i) {
        var method = methods[i];
        expectThrow(function () {
          return method();
        });
        expectThrow(function () {
          return method({});
        });
        expectThrow(function () {
          return method(Infinity);
        });
        expectThrow(function () {
          return method(NaN);
        });
        expectThrow(function () {
          return method('test');
        });
        expectThrow(function () {
          return method([0, 10, 20]);
        });
        expectThrow(function () {
          return method(Buffer.alloc(33));
        });
        expectThrow(function () {
          return method('00000000000000000000000000000000000000000000000000000000000000');
        });
        expectThrow(function () {
          return method('000000000000000000000000000000000000000000000000000000000000000000');
        });
      };

      for (var i in methods) {
        _loop2(i);
      }
    });
  });
});