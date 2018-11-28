"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _xdr_generated = _interopRequireDefault(require("./generated/xdr_generated"));

var _hashing = require("./hashing");

var _keypair = require("./keypair");

var _operation = require("./operation");

describe('Operation', function () {
  describe('.createAccount()', function () {
    it('creates a createAccountOp general', function () {
      var destination = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
      var recoveryKey = 'GDZXNSOUESYZMHRC3TZRN4VXSIOT47MDDUVD6U7CWXHTDLXVVGU64LVV';

      var accountType = _xdr_generated.default.AccountType.general().value;

      var op = _operation.Operation.createAccount({
        destination: destination,
        recoveryKey: recoveryKey,
        accountType: accountType
      });

      var opXdr = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('createAccount');
      expect(obj.destination).to.be.equal(destination);
      expect(obj.recoveryKey).to.be.equal(recoveryKey);
      expect(obj.accountType).to.be.equal(accountType);
    });
    it('fails to create createAccount operation with an invalid destination address', function () {
      var opts = {
        destination: 'GCEZW',
        accountType: _xdr_generated.default.AccountType.general().value,
        source: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
      };
      expectThrow(function () {
        return _operation.Operation.createAccount(opts);
      });
    });
    it('fails to create createAccount operation with an invalid recovery address', function () {
      var opts = {
        destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        recoveryKey: 'GCEZ',
        accountType: _xdr_generated.default.AccountType.general().value
      };
      expectThrow(function () {
        return _operation.Operation.createAccount(opts);
      });
    });
    it('fails to create createAccount operation with an invalid source address', function () {
      var opts = {
        destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        recoveryKey: 'GDZXNSOUESYZMHRC3TZRN4VXSIOT47MDDUVD6U7CWXHTDLXVVGU64LVV',
        accountType: _xdr_generated.default.AccountType.general().value,
        source: 'GCEZ'
      };
      expectThrow(function () {
        return _operation.Operation.createAccount(opts);
      });
    });
    it('fails to create createAccount operation with an invalid account type', function () {
      var opts = {
        destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        recoveryKey: 'GDZXNSOUESYZMHRC3TZRN4VXSIOT47MDDUVD6U7CWXHTDLXVVGU64LVV',
        source: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
      };
      expectThrow(function () {
        return _operation.Operation.createAccount(opts);
      });
    });
    it('fails to create createAccount with negative policies', function () {
      var opts = {
        destination: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        source: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        recoveryKey: 'GDZXNSOUESYZMHRC3TZRN4VXSIOT47MDDUVD6U7CWXHTDLXVVGU64LVV',
        accountType: _xdr_generated.default.AccountType.general().value,
        accountPolicies: -1
      };
      expectThrow(function () {
        return _operation.Operation.createAccount(opts);
      });
    });
  });
  describe('.payment()', function () {
    var sourceBalanceId = _keypair.Keypair.random().balanceId();

    var destinationBalanceId = _keypair.Keypair.random().balanceId();

    it('creates a paymentOp', function () {
      var destination = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
      var amount = '1000';

      var op = _operation.Operation.payment({
        destination: destination,
        amount: amount,
        subject: 'subj',
        sourceBalanceId: sourceBalanceId,
        destinationBalanceId: destinationBalanceId,
        reference: 'ref',
        invoiceReference: {
          invoiceId: '777',
          accept: false
        },
        feeData: {
          sourceFee: {
            paymentFee: '120',
            fixedFee: '110'
          },
          destinationFee: {
            paymentFee: '20',
            fixedFee: '10'
          },
          sourcePaysForDest: true
        }
      });

      var opXdr = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('payment');
      expect(operation.body().value().amount().toString()).to.be.equal('1000000000');
      expect(obj.amount).to.be.equal(amount);
      expect(obj.subject).to.be.equal('subj');
      expect(obj.reference).to.be.equal('ref');
      expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId);
      expect(obj.destinationBalanceId).to.be.equal(destinationBalanceId);
      expect(obj.invoiceReference.invoiceId).to.be.equal('777');
      expect(obj.invoiceReference.accept).to.be.equal(false);
      expect(obj.feeData.sourcePaysForDest).to.be.equal(true);
      expect(obj.feeData.sourceFee.fixedFee).to.be.equal('110');
      expect(obj.feeData.sourceFee.paymentFee).to.be.equal('120');
      expect(obj.feeData.destinationFee.fixedFee).to.be.equal('10');
      expect(obj.feeData.destinationFee.paymentFee).to.be.equal('20');
      expect(_operation.Operation.isPayment(op)).to.be.equal(true);
    });
    it('fails to create payment operation without feeData', function () {
      var opts = {
        amount: '20',
        fixedFee: '0',
        subject: 'subj',
        sourceBalanceId: sourceBalanceId,
        destinationBalanceId: destinationBalanceId
      };
      expectThrow(function () {
        return _operation.Operation.payment(opts);
      });
    });
    it('fails to create payment operation with an invalid amount', function () {
      var opts = {
        amount: 20,
        fixedFee: '0',
        paymentFee: '0',
        subject: 'subj',
        sourceBalanceId: sourceBalanceId,
        destinationBalanceId: destinationBalanceId,
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
      };
      expectThrow(function () {
        return _operation.Operation.payment(opts);
      });
    });
    it('fails to create payment operation with an invalid subject', function () {
      var opts = {
        amount: '20',
        fixedFee: '0',
        paymentFee: '0',
        subject: 12123,
        sourceBalanceId: sourceBalanceId,
        destinationBalanceId: destinationBalanceId,
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
      };
      expectThrow(function () {
        return _operation.Operation.payment(opts);
      });
    });
    it('fails to create payment operation with an invalid sourceBalanceId', function () {
      var opts = {
        amount: '20',
        fixedFee: '0',
        paymentFee: '0',
        subject: '12123',
        sourceBalanceId: 123,
        destinationBalanceId: destinationBalanceId,
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
      };
      expectThrow(function () {
        return _operation.Operation.payment(opts);
      });
    });
    it('fails to create payment operation with an invalid destinationBalanceId', function () {
      var opts = {
        amount: '20',
        fixedFee: '0',
        paymentFee: '0',
        subject: '12123',
        sourceBalanceId: sourceBalanceId,
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
      };
      expectThrow(function () {
        return _operation.Operation.payment(opts);
      });
    });
  });
  describe('.directDebit()', function () {
    var sourceBalanceId = _keypair.Keypair.random().balanceId();

    var destinationBalanceId = _keypair.Keypair.random().balanceId();

    var from = _keypair.Keypair.random().accountId();

    it('creates a directDebitOp', function () {
      var destination = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
      var amount = '1000';

      var op = _operation.Operation.directDebit({
        paymentOp: {
          destination: destination,
          amount: amount,
          subject: 'subj',
          sourceBalanceId: sourceBalanceId,
          destinationBalanceId: destinationBalanceId,
          reference: 'ref',
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
        },
        from: from
      });

      var opXdr = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('directDebit');
      expect(obj.amount).to.be.equal(amount);
      expect(obj.subject).to.be.equal('subj');
      expect(obj.reference).to.be.equal('ref');
      expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId);
      expect(obj.destinationBalanceId).to.be.equal(destinationBalanceId);
      expect(obj.from).to.be.equal(from);
      expect(obj.feeData.sourcePaysForDest).to.be.equal(true);
      expect(_operation.Operation.isPayment(op)).to.be.equal(false);
    });
    it('fails to create directDebit operation without feeData', function () {
      var opts = {
        paymentOp: {
          amount: '20',
          subject: 'subj',
          sourceBalanceId: sourceBalanceId,
          destinationBalanceId: destinationBalanceId
        },
        from: from
      };
      expectThrow(function () {
        return _operation.Operation.directDebit(opts);
      });
    });
    it('fails to create directDebit operation with invalid from', function () {
      var opts = {
        paymentOp: {
          amount: '20',
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
          },
          subject: 'subj',
          sourceBalanceId: sourceBalanceId,
          destinationBalanceId: destinationBalanceId
        },
        from: 123
      };
      expectThrow(function () {
        return _operation.Operation.directDebit(opts);
      });
    });
  });
  describe('.manageAccount()', function () {
    it('creates a manageAccountOp block', function () {
      var account = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
      var blockReasonsToAdd = 1;
      var blockReasonsToRemove = 2;

      var accountType = _xdr_generated.default.AccountType.operational().value;

      var op = _operation.Operation.manageAccount({
        account: account,
        blockReasonsToAdd: blockReasonsToAdd,
        blockReasonsToRemove: blockReasonsToRemove,
        accountType: accountType
      });

      var opXdr = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageAccount');
      expect(obj.accountType).to.be.equal(accountType);
      expect(obj.account).to.be.equal(account);
      expect(obj.blockReasonsToAdd).to.be.equal(blockReasonsToAdd);
      expect(obj.blockReasonsToRemove).to.be.equal(blockReasonsToRemove);
    });
    it('creates a manageAccountOp without block', function () {
      var account = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';

      var accountType = _xdr_generated.default.AccountType.operational().value;

      var op = _operation.Operation.manageAccount({
        account: account,
        accountType: accountType
      });

      var opXdr = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageAccount');
      expect(obj.account).to.be.equal(account);
      expect(obj.blockReasonsToAdd).to.be.equal(0);
      expect(obj.blockReasonsToRemove).to.be.equal(0);
    });
    it('fails to create manageAccountOp operation with an invalid account', function () {
      var opts = {
        account: 'GCEZW',
        accountType: _xdr_generated.default.AccountType.operational().value
      };
      expectThrow(function () {
        return _operation.Operation.manageAccount(opts);
      });
    });
    it('fails to create manageAccount operation with an invalid source address', function () {
      var opts = {
        account: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        source: 'GCEZ',
        accountType: _xdr_generated.default.AccountType.operational().value
      };
      expectThrow(function () {
        return _operation.Operation.manageAccount(opts);
      });
    });
    it('fails to create manageAccount operation with an undefined accountType', function () {
      var opts = {
        account: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
        block: true
      };
      expectThrow(function () {
        return _operation.Operation.manageAccount(opts);
      });
    });
  });
  describe('.setFees', function () {
    it('valid setFees', function () {
      var feeType = _xdr_generated.default.FeeType.paymentFee();

      var opts = {
        fee: {
          feeType: feeType,
          percentFee: '10',
          fixedFee: '1',
          asset: 'ETC',
          accountId: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
          subtype: '3',
          upperBound: '123'
        }
      };

      var op = _operation.Operation.setFees(opts);

      var opXdr = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('setFee');
      expect(obj.fee.percentFee).to.be.equal('10');
      expect(obj.fee.fixedFee).to.be.equal('1');
      expect(obj.fee.feeType).to.be.equal(feeType);
      expect(obj.fee.upperBound).to.be.equal('123');
      expect(obj.fee.lowerBound).to.be.equal('0');
      expect(obj.fee.subtype).to.be.equal('3');
      expect(obj.fee.accountId).to.be.equal('GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ');
      expect(obj.fee.hash.toString()).to.be.equal((0, _hashing.hash)('type:0asset:ETCsubtype:3accountID:GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ').toString());
      expect(obj.fee.asset).to.be.equal('ETC');
    });
    it('fails to create setFees operation with an invalid FeeType', function () {
      var opts = {
        fee: {
          feeType: 1,
          percentFee: '1',
          fixedFee: '2',
          asset: 'ETC'
        }
      };
      expectThrow(function () {
        return _operation.Operation.setFees(opts);
      });
    });
    it('fails to create setFees operation with an invalid asset', function () {
      var opts = {
        fee: {
          feeType: _xdr_generated.default.FeeType.paymentFee(),
          percentFee: '1',
          fixedFee: '2',
          asset: ''
        }
      };
      expectThrow(function () {
        return _operation.Operation.setFees(opts);
      });
    });
    it('fails to create setFees operation with an invalid percentFee', function () {
      var feeType = _xdr_generated.default.FeeType.paymentFee();

      var opts = {
        fee: {
          feeType: feeType,
          fixedFee: '0',
          percentFee: 'abs',
          asset: 'ETC'
        }
      };
      expectThrow(function () {
        return _operation.Operation.setFees(opts);
      });
    });
    it('fails to create setFees operation with an invalid fixedFee', function () {
      var feeType = _xdr_generated.default.FeeType.paymentFee();

      var opts = {
        fee: {
          feeType: feeType,
          fixedFee: '',
          percentFee: '11',
          asset: 'ETC'
        }
      };
      expectThrow(function () {
        return _operation.Operation.setFees(opts);
      });
    });
  });
  describe('.manageBalance', function () {
    var account = _keypair.Keypair.random();

    var asset = 'ETH';
    it('valid manageBalance', function () {
      var opts = {
        destination: account.accountId(),
        action: _xdr_generated.default.ManageBalanceAction.create(),
        asset: asset
      };

      var op = _operation.Operation.manageBalance(opts);

      var opXdr = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageBalance');
      expect(obj.destination).to.be.equal(account.accountId());
      expect(obj.action).to.be.equal(_xdr_generated.default.ManageBalanceAction.create());
    });
    it('fails to create manageBalance operation with an invalid account', function () {
      var opts = {
        destination: account,
        action: _xdr_generated.default.ManageBalanceAction.create(),
        asset: asset
      };
      expectThrow(function () {
        return _operation.Operation.manageBalance(opts);
      });
    });
    it('fails to create manageBalance operation with an invalid action', function () {
      var opts = {
        destination: account.accountId(),
        action: 1,
        asset: asset
      };
      expectThrow(function () {
        return _operation.Operation.manageBalance(opts);
      });
    });
    it('fails to create manageBalance operation with an invalid asset', function () {
      var opts = {
        destination: account.accountId(),
        action: _xdr_generated.default.ManageBalanceAction.create(),
        asset: 123
      };
      expectThrow(function () {
        return _operation.Operation.manageBalance(opts);
      });
    });
  });
  describe('.manageAssetPair', function () {
    var base = 'ETH';
    var quote = 'USD';
    var policies = 1;
    var physicalPriceCorrection = '12.2';
    var maxPriceStep = '200.1';
    var physicalPrice = '12.12';
    it('valid manageAssetPair', function () {
      var opts = {
        action: _xdr_generated.default.ManageAssetPairAction.create(),
        quote: quote,
        base: base,
        physicalPriceCorrection: physicalPriceCorrection,
        maxPriceStep: maxPriceStep,
        policies: policies,
        physicalPrice: physicalPrice
      };

      var op = _operation.Operation.manageAssetPair(opts);

      var opXdr = op.toXDR('hex');

      var operation = _xdr_generated.default.Operation.fromXDR(Buffer.from(opXdr, 'hex'));

      var obj = _operation.Operation.operationToObject(operation);

      expect(obj.type).to.be.equal('manageAssetPair');
      expect(obj.base).to.be.equal(base);
      expect(obj.quote).to.be.equal(quote);
      expect(obj.action).to.be.equal(_xdr_generated.default.ManageAssetPairAction.create());
      expect(operation.body().value().physicalPriceCorrection().toString()).to.be.equal('12200000');
      expect(operation.body().value().maxPriceStep().toString()).to.be.equal('200100000');
      expect(operation.body().value().physicalPrice().toString()).to.be.equal('12120000');
      expect(obj.physicalPriceCorrection).to.be.equal(physicalPriceCorrection);
      expect(obj.maxPriceStep).to.be.equal(maxPriceStep);
    });
  });
  describe('._checkUnsignedIntValue()', function () {
    it('returns true for valid values', function () {
      var values = [{
        value: 0,
        expected: 0
      }, {
        value: 10,
        expected: 10
      }, {
        value: '0',
        expected: 0
      }, {
        value: '10',
        expected: 10
      }, {
        value: undefined,
        expected: undefined
      }];

      for (var i in values) {
        var _values$i = values[i],
            value = _values$i.value,
            expected = _values$i.expected;
        expect(_operation.Operation._checkUnsignedIntValue(value, value)).to.be.equal(expected);
      }
    });
    it('throws error for invalid values', function () {
      var values = [{}, [], '', // empty string
      'test', // string not representing a number
      '0.5', '-10', '-10.5', 'Infinity', Infinity, 'Nan', NaN];

      var _loop = function _loop(i) {
        var value = values[i];
        expectThrow(function () {
          return _operation.Operation._checkUnsignedIntValue(value, value);
        });
      };

      for (var i in values) {
        _loop(i);
      }
    });
    it('return correct values when isValidFunction is set', function () {
      expect(_operation.Operation._checkUnsignedIntValue('test', undefined, function (value) {
        return value < 10;
      })).to.equal(undefined);
      expect(_operation.Operation._checkUnsignedIntValue('test', 8, function (value) {
        return value < 10;
      })).to.equal(8);
      expect(_operation.Operation._checkUnsignedIntValue('test', '8', function (value) {
        return value < 10;
      })).to.equal(8);
      expectThrow(function () {
        _operation.Operation._checkUnsignedIntValue('test', 12, function (value) {
          return value < 10;
        });
      });
      expectThrow(function () {
        _operation.Operation._checkUnsignedIntValue('test', '12', function (value) {
          return value < 10;
        });
      });
    });
  });
  describe('.isValidAmount()', function () {
    it('returns true for valid amounts', function () {
      var amounts = ['10', '0.10', '0.1234', '922337203685.4775' // MAX
      ];

      for (var i in amounts) {
        expect(_operation.Operation.isValidAmount(amounts[i])).to.be.equal(true);
      }
    });
    it('returns false for invalid amounts', function () {
      var amounts = [100, // integer
      100.50, // float
      '', // empty string
      'test', // string not representing a number
      '0', '-10', '-10.5', '0.12345678', '922337203685.4775808', // Overflow
      'Infinity', Infinity, 'Nan', NaN];

      for (var i in amounts) {
        expect(_operation.Operation.isValidAmount(amounts[i])).to.be.equal(false);
      }
    });
    it('allows 0 only if allowZero argument is set to true', function () {
      expect(_operation.Operation.isValidAmount('0')).to.be.equal(false);
      expect(_operation.Operation.isValidAmount('0', true)).to.be.equal(true);
    });
  });
});