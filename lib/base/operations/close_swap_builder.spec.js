"use strict";

var _close_swap_builder = require("./close_swap_builder");

var _operation = require("../operation");

var _index = require("../index");

describe('CloseSwap op', function () {
  var secret = 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d';
  it('Close swap', function () {
    var op = _close_swap_builder.CloseSwapBuilder.closeSwap({
      secret: 'bc7adbde0e435e79ceaca3cf1b4956267e6aedfefec318e80a52fdad4eb16a9d',
      swapId: '4123421'
    });

    var xdrOp = op.toXDR('hex');

    var operation = _index.xdr.Operation.fromXDR(Buffer.from(xdrOp, 'hex'));

    var obj = _operation.Operation.operationToObject(operation);

    expect(obj.type).to.be.equal('closeSwap');
    expect(obj.secret).to.be.equal(secret);
    expect(obj.swapId).to.be.equal('4123421');
  });
});