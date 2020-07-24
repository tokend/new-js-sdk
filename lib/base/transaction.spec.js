"use strict";

var _memo = require("./memo");

var _keypair = require("./keypair");

var _transaction_builder = require("./transaction_builder");

var _operation = require("./operation");

var _transaction = require("./transaction");

describe('Transaction', function () {
  it('constructs Transaction object from a TransactionEnvelope', function (done) {
    var source = 'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB';
    var amount = '2000';

    var sourceBalanceId = _keypair.Keypair.random().balanceId();

    var destinationBalanceId = _keypair.Keypair.random().balanceId();

    var timebounds = {
      minTime: '1455287522',
      maxTime: '1455297545'
    };
    var input = new _transaction_builder.TransactionBuilder(source, {
      timebounds: timebounds
    }).addOperation(_operation.Operation.payment({
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
    })).addMemo(_memo.Memo.text('Happy birthday!')).build().toEnvelope().toXDR('base64');
    console.log(input.toString());
    var transaction = new _transaction.Transaction(input);
    var operation = transaction.operations[0];
    expect(transaction.source).to.be.equal(source);
    expect(transaction.memo.text().toString()).to.be.equal('Happy birthday!');
    expect(operation.type).to.be.equal('payment');
    expect(operation.amount).to.be.equal(amount);
    done();
  });
  it('signs correctly', function () {
    var source = 'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB';

    var sourceBalanceId = _keypair.Keypair.random().balanceId();

    var destinationBalanceId = _keypair.Keypair.random().balanceId();

    var amount = '2000';

    var signer = _keypair.Keypair.master();

    var timebounds = {
      minTime: '1455287522',
      maxTime: '1455297545'
    };
    var tx = new _transaction_builder.TransactionBuilder(source, {
      timebounds: timebounds
    }).addOperation(_operation.Operation.payment({
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
    })).build();
    tx.sign(signer);
    var env = tx.toEnvelope();
    var rawSig = env.signatures()[0].signature();
    var verified = signer.verify(tx.hash(), rawSig);
    expect(verified).to.equal(true);
  });
  it('accepts 0 as a valid fixed fee', function (done) {
    var source = 'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB';
    var amount = '2000';

    var sourceBalanceId = _keypair.Keypair.random().balanceId();

    var destinationBalanceId = _keypair.Keypair.random().balanceId();

    var timebounds = {
      minTime: '1455287522',
      maxTime: '1455297545'
    };
    var input = new _transaction_builder.TransactionBuilder(source, {
      fee: 0,
      timebounds: timebounds
    }).addOperation(_operation.Operation.payment({
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
    })).addMemo(_memo.Memo.text('Happy birthday!')).build().toEnvelope().toXDR('base64');
    var transaction = new _transaction.Transaction(input);
    var operation = transaction.operations[0];
    expect(operation.amount).to.be.equal(amount);
    done();
  });
});