"use strict";

var _keypair = require("./keypair");

var _operation = require("./operation");

var _memo = require("./memo");

var _transaction_builder = require("./transaction_builder");

describe('TransactionBuilder', function () {
  describe('constructs a native payment transaction with one operation', function () {
    var source;
    var amount;
    var transaction;
    var memo;
    var sourceBalanceId;
    var destinationBalanceId;
    beforeEach(function () {
      source = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
      amount = '1000';
      memo = _memo.Memo.id('100');
      sourceBalanceId = _keypair.Keypair.random().balanceId();
      destinationBalanceId = _keypair.Keypair.random().balanceId();
      var sourceBalance = sourceBalanceId;
      var timebounds = {
        minTime: '1455287522',
        maxTime: '1455297545'
      };
      var transactionOptions = {
        sourceBalance: sourceBalance,
        timebounds: timebounds
      };
      transaction = new _transaction_builder.TransactionBuilder(source, transactionOptions).addOperation(_operation.Operation.payment({
        amount: amount,
        subject: 'test',
        sourceBalanceId: sourceBalanceId,
        destinationBalanceId: destinationBalanceId,
        feeData: {
          sourceFee: {
            percent: '0',
            fixed: '10'
          },
          destinationFee: {
            percent: '0',
            fixed: '10'
          },
          sourcePaysForDest: true
        }
      })).addMemo(memo).build();
    });
    it('should have the same source account', function (done) {
      expect(transaction.source).to.be.equal(source);
      done();
    });
    it('should have one payment operation', function (done) {
      expect(transaction.operations.length).to.be.equal(1);
      expect(transaction.operations[0].type).to.be.equal('paymentV2');
      done();
    });
  });
  describe('constructs a native payment transaction with two operations', function () {
    var source;
    var sourceBalanceId;
    var destinationBalanceId1;
    var amount1;
    var destinationBalanceId2;
    var amount2;
    var transaction;
    beforeEach(function () {
      source = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
      amount1 = '1000';
      amount2 = '2000';
      sourceBalanceId = _keypair.Keypair.random().balanceId();
      destinationBalanceId1 = _keypair.Keypair.random().balanceId();
      destinationBalanceId2 = _keypair.Keypair.random().balanceId();
      var timebounds = {
        minTime: '1455287522',
        maxTime: '1455297545'
      };
      var sourceBalance = sourceBalanceId;
      var transactionOptions = {
        sourceBalance: sourceBalance,
        timebounds: timebounds
      };
      transaction = new _transaction_builder.TransactionBuilder(source, transactionOptions).addOperation(_operation.Operation.payment({
        amount: amount1,
        subject: 'test',
        sourceBalanceId: sourceBalanceId,
        destinationBalanceId: destinationBalanceId1,
        feeData: {
          sourceFee: {
            percent: '0',
            fixed: '10'
          },
          destinationFee: {
            percent: '0',
            fixed: '10'
          },
          sourcePaysForDest: true
        }
      })).addOperation(_operation.Operation.payment({
        amount: amount2,
        subject: 'test',
        sourceBalanceId: sourceBalanceId,
        destinationBalanceId: destinationBalanceId2,
        feeData: {
          sourceFee: {
            percent: '0',
            fixed: '10'
          },
          destinationFee: {
            percent: '0',
            fixed: '10'
          },
          sourcePaysForDest: true
        }
      })).build();
    });
    it('should have the same source account', function (done) {
      expect(transaction.source).to.be.equal(source);
      done();
    });
    it('should have two payment operation', function (done) {
      expect(transaction.operations.length).to.be.equal(2);
      expect(transaction.operations[0].type).to.be.equal('paymentV2');
      expect(transaction.operations[1].type).to.be.equal('paymentV2');
      done();
    });
  });
  describe('constructs a native payment transaction with timebounds', function () {
    it('should have have timebounds', function (done) {
      var source = 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ';
      var timebounds = {
        minTime: '1455287522',
        maxTime: '1455297545'
      };

      var sourceBalanceId = _keypair.Keypair.random().balanceId();

      var destinationBalanceId = _keypair.Keypair.random().balanceId();

      var transaction = new _transaction_builder.TransactionBuilder(source, {
        timebounds: timebounds
      }).addOperation(_operation.Operation.payment({
        amount: '1000',
        subject: 'test',
        sourceBalanceId: sourceBalanceId,
        destinationBalanceId: destinationBalanceId,
        feeData: {
          sourceFee: {
            percent: '0',
            fixed: '10'
          },
          destinationFee: {
            percent: '0',
            fixed: '10'
          },
          sourcePaysForDest: true
        }
      })).build();
      expect(transaction.timeBounds.minTime).to.be.equal(timebounds.minTime);
      expect(transaction.timeBounds.maxTime).to.be.equal(timebounds.maxTime);
      done();
    });
  });
});