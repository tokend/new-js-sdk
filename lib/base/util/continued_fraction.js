"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bestR = bestR;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var MAX_INT = (1 << 31 >>> 0) - 1;
/**
 * Calculates and returns the best rational approximation of the given real number.
 * @private
 * @param {string|number|BigNumber} number
 * @throws Error Throws `Error` when the best rational approximation cannot be found.
 * @returns {array} first element is n (numerator), second element is d (denominator)
 */

function bestR(number) {
  number = new _bignumber.default(number);
  var a;
  var f;
  var fractions = [[new _bignumber.default(0), new _bignumber.default(1)], [new _bignumber.default(1), new _bignumber.default(0)]];
  var i = 2;

  while (true) {
    if (number.gt(MAX_INT)) {
      break;
    }

    a = number.floor();
    f = number.sub(a);
    var h = a.mul(fractions[i - 1][0]).add(fractions[i - 2][0]);
    var k = a.mul(fractions[i - 1][1]).add(fractions[i - 2][1]);

    if (h.gt(MAX_INT) || k.gt(MAX_INT)) {
      break;
    }

    fractions.push([h, k]);

    if (f.eq(0)) {
      break;
    }

    number = new _bignumber.default(1).div(f);
    i++;
  }

  var _fractions = (0, _slicedToArray2.default)(fractions[fractions.length - 1], 2),
      n = _fractions[0],
      d = _fractions[1];

  if (n.isZero() || d.isZero()) {
    throw new Error("Couldn't find approximation");
  }

  return [n.toNumber(), d.toNumber()];
}