"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _validators = require("./validators");

var _xdr_generated = _interopRequireDefault(require("../base/generated/xdr_generated"));

describe('validateNotUndefined', function () {
  it('should not throw error for defined values', function () {
    var validValues = [10, 'some', '', {}, [], false, 0, null];
    expect(function () {
      for (var _i = 0, _validValues = validValues; _i < _validValues.length; _i++) {
        var value = _validValues[_i];
        (0, _validators.validateNotUndefined)({
          value: value
        });
      }
    }).to.not.throw();
  });
  it('should throw TypeError for undefined values', function () {
    expect(function () {
      return (0, _validators.validateNotUndefined)();
    }).to.throw(TypeError);
    expect(function () {
      return (0, _validators.validateNotUndefined)({
        value: undefined
      });
    }).to.throw(TypeError);
    var notDefinedVar;
    expect(function () {
      return (0, _validators.validateNotUndefined)({
        value: notDefinedVar
      });
    }).to.throw(TypeError);
  });
});
describe('validateArray', function () {
  it('should not throw error for valid arrays', function () {
    var validOpts = [{
      value: []
    }, {
      value: [1, 2, 3]
    }, {
      value: 'Some string'.split('')
    }, {
      value: [],
      minLength: 0
    }, {
      value: [1, '2'],
      minLength: 1
    }, {
      value: [0, 1, 0],
      minLength: 3
    }];
    expect(function () {
      for (var _i2 = 0, _validOpts = validOpts; _i2 < _validOpts.length; _i2++) {
        var opts = _validOpts[_i2];
        (0, _validators.validateArray)(opts);
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid arrays', function () {
    var invalidValues = [{}, undefined, {
      length: 1
    }, 10, 'Not an array', null, true];

    var _loop = function _loop() {
      var value = _invalidValues[_i3];
      expect(function () {
        return (0, _validators.validateArray)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i3 = 0, _invalidValues = invalidValues; _i3 < _invalidValues.length; _i3++) {
      _loop();
    }
  });
  it('should throw Error for arrays with invalid length', function () {
    var invalidLengthOpts = [{
      value: [],
      minLength: 1
    }, {
      value: 'str'.split(''),
      minLength: 4
    }];

    var _loop2 = function _loop2() {
      var opts = _invalidLengthOpts[_i4];
      expect(function () {
        return (0, _validators.validateArray)(opts);
      }).to.throw(Error);
    };

    for (var _i4 = 0, _invalidLengthOpts = invalidLengthOpts; _i4 < _invalidLengthOpts.length; _i4++) {
      _loop2();
    }
  });
});
describe('validateString', function () {
  it('should not throw error for valid strings', function () {
    var validOpts = [{
      value: ''
    }, {
      value: [1, 2, 3].join('')
    }, {
      value: 'Some string'
    }, {
      value: 'test',
      minLength: 3
    }, {
      value: 'some',
      minLength: 4
    }, {
      value: 'five',
      maxLength: 5
    }, {
      value: 'four',
      maxLength: 4
    }, {
      value: 'valid',
      minLength: 3,
      maxLength: 5
    }, {
      value: 'String',
      minLength: 6,
      maxLength: 6
    }];
    expect(function () {
      for (var _i5 = 0, _validOpts2 = validOpts; _i5 < _validOpts2.length; _i5++) {
        var opts = _validOpts2[_i5];
        (0, _validators.validateString)(opts);
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid strings', function () {
    var invalidValues = [{}, undefined, {
      length: 1
    }, 10, null, [], true];

    var _loop3 = function _loop3() {
      var value = _invalidValues2[_i6];
      expect(function () {
        return (0, _validators.validateString)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i6 = 0, _invalidValues2 = invalidValues; _i6 < _invalidValues2.length; _i6++) {
      _loop3();
    }
  });
  it('should throw TypeError for strings with invalid length', function () {
    var invalidLengthOpts = [{
      value: '',
      minLength: 1
    }, {
      value: 'str',
      minLength: 4
    }, {
      value: 'Big one',
      maxLength: 6
    }];

    var _loop4 = function _loop4() {
      var opts = _invalidLengthOpts2[_i7];
      expect(function () {
        return (0, _validators.validateString)(opts);
      }).to.throw(TypeError);
    };

    for (var _i7 = 0, _invalidLengthOpts2 = invalidLengthOpts; _i7 < _invalidLengthOpts2.length; _i7++) {
      _loop4();
    }
  });
});
describe('validatePublicKey', function () {
  it('should not throw error for valid public keys', function () {
    var validKeys = ['GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB', 'GBCG42WTVWPO4Q6OZCYI3D6ZSTFSJIXIS6INCIUF23L6VN3ADE4337AP', 'GDFX463YPLCO2EY7NGFMI7SXWWDQAMASGYZXCG2LATOF3PP5NQIUKBPT', 'GBXEODUMM3SJ3QSX2VYUWFU3NRP7BQRC2ERWS7E2LZXDJXL2N66ZQ5PT', 'GAJHORKJKDDEPYCD6URDFODV7CVLJ5AAOJKR6PG2VQOLWFQOF3X7XLOG', 'GDD3XRXU3G4DXHVRUDH7LJM4CD4PDZTVP4QHOO4Q6DELKXUATR657OZV', 'GDTYVCTAUQVPKEDZIBWEJGKBQHB4UGGXI2SXXUEW7LXMD4B7MK37CWLJ'];
    expect(function () {
      for (var _i8 = 0, _validKeys = validKeys; _i8 < _validKeys.length; _i8++) {
        var value = _validKeys[_i8];
        (0, _validators.validatePublicKey)({
          value: value
        });
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid public keys', function () {
    var invalidKeys = ['GBPXX0A5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL', 'GDXIIZTKTLVYCBHURXL2UPMTYXOVNI7BRAEFQCP6EZCY4JLKY4VKFNLT', // Too long
    'GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2', // Secret key
    'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY', 'gWRYUerEKuz53tstxEuR3NCkiQDcV4wzFHmvLnZmj7PUqxW2wt', // Old network key
    'g4VPBPrHZkfE8CsjuG2S4yBQNd455UWmk', 'test', 'Some test string that contains exactly fifty six symbols', null];

    var _loop5 = function _loop5() {
      var value = _invalidKeys[_i9];
      expect(function () {
        return (0, _validators.validatePublicKey)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i9 = 0, _invalidKeys = invalidKeys; _i9 < _invalidKeys.length; _i9++) {
      _loop5();
    }
  });
});
describe('validateSecretKey', function () {
  it('should not throw error for valid secret keys', function () {
    var validKeys = ['SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY', 'SCZTUEKSEH2VYZQC6VLOTOM4ZDLMAGV4LUMH4AASZ4ORF27V2X64F2S2', 'SCGNLQKTZ4XCDUGVIADRVOD4DEVNYZ5A7PGLIIZQGH7QEHK6DYODTFEH', 'SDH6R7PMU4WIUEXSM66LFE4JCUHGYRTLTOXVUV5GUEPITQEO3INRLHER', 'SC2RDTRNSHXJNCWEUVO7VGUSPNRAWFCQDPP6BGN4JFMWDSEZBRAPANYW', 'SCEMFYOSFZ5MUXDKTLZ2GC5RTOJO6FGTAJCF3CCPZXSLXA2GX6QUYOA7'];
    expect(function () {
      for (var _i10 = 0, _validKeys2 = validKeys; _i10 < _validKeys2.length; _i10++) {
        var value = _validKeys2[_i10];
        (0, _validators.validateSecretKey)({
          value: value
        });
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid secret keys', function () {
    var invalidKeys = [// Public key
    'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB', // Too long
    'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDYT', // Too short
    'SAFGAMN5Z6IHVI3IVEPIILS7ITZDYSCEPLN4FN5Z3IY63DRH4CIYEV', // Checksum
    'SAFGAMN5Z6IHVI3IVEPIILS7ITZDYSCEPLN4FN5Z3IY63DRH4CIYEVIT', 'test', null];

    var _loop6 = function _loop6() {
      var value = _invalidKeys2[_i11];
      expect(function () {
        return (0, _validators.validateSecretKey)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i11 = 0, _invalidKeys2 = invalidKeys; _i11 < _invalidKeys2.length; _i11++) {
      _loop6();
    }
  });
});
describe('validateBalanceKey', function () {
  it('should not throw error for valid balance keys', function () {
    var validKeys = ['BCTZM23JQ4RT5L643R2SUPM3VSR3AISVXWX56KNYJVZB2L4TNNDEFXDG', 'BBRL3IVE7QD4YGEWKVQRF5YVOK37PXNZZGR7ILZOYQ5SMZVRLFGOMISX', 'BAEUBIHPHVI6X3PDC7HSIHVN5OUB7UU3AVTOGUOZHCRVUGPORPIIHS44'];
    expect(function () {
      for (var _i12 = 0, _validKeys3 = validKeys; _i12 < _validKeys3.length; _i12++) {
        var value = _validKeys3[_i12];
        (0, _validators.validateBalanceKey)({
          value: value
        });
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid balance keys', function () {
    var invalidKeys = [// Public key
    'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB', // Secret key
    'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY', // Too long
    'BBRL3IVE7QD4YGEWKVQRF5YVOK37PXNZZGR7ILZOYQ5SMZVRLFGOMISXS', // Too short
    'BBRL3IVE7QD4YGEWKVQRF5YVOK37PXNZZGR7ILZOYQ5SMZVRLFGOMI', 'test', null];

    var _loop7 = function _loop7() {
      var value = _invalidKeys3[_i13];
      expect(function () {
        return (0, _validators.validateBalanceKey)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i13 = 0, _invalidKeys3 = invalidKeys; _i13 < _invalidKeys3.length; _i13++) {
      _loop7();
    }
  });
});
describe('validateAmount', function () {
  it('should not throw error for valid amounts', function () {
    var validOpts = [{
      value: '100'
    }, {
      value: '52.002536'
    }, {
      value: '0',
      allowZero: true
    }, {
      value: '50.236523',
      min: '40'
    }, {
      value: '50.000000',
      max: '50'
    }, {
      value: '35.000000',
      min: '35',
      max: '35'
    }, {
      value: '9223372036854.77580',
      maxDecimalPlaces: 5
    }];
    expect(function () {
      for (var _i14 = 0, _validOpts3 = validOpts; _i14 < _validOpts3.length; _i14++) {
        var opts = _validOpts3[_i14];
        (0, _validators.validateAmount)(opts);
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid strings', function () {
    var invalidAmounts = [{}, undefined, {
      length: 1
    }, 100, '9223372036854.775808', '230.8496165', '230.230.563', '0', '-1', true];

    var _loop8 = function _loop8() {
      var value = _invalidAmounts[_i15];
      expect(function () {
        return (0, _validators.validateAmount)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i15 = 0, _invalidAmounts = invalidAmounts; _i15 < _invalidAmounts.length; _i15++) {
      _loop8();
    }
  });
  it('should throw TypeError for amounts not passed the params validations', function () {
    var invalidAmountOpts = [{
      value: '9.999999',
      min: '10.000000'
    }, {
      value: '500.000001',
      max: '500.000000'
    }, {
      value: '92233720368542342',
      min: '100',
      max: '9223372036854'
    }, {
      value: '0',
      allowZero: false
    }, {
      value: '9223372036854.775803',
      maxDecimalPlaces: 5
    }];

    var _loop9 = function _loop9() {
      var opts = _invalidAmountOpts[_i16];
      expect(function () {
        return (0, _validators.validateAmount)(opts);
      }).to.throw(TypeError);
    };

    for (var _i16 = 0, _invalidAmountOpts = invalidAmountOpts; _i16 < _invalidAmountOpts.length; _i16++) {
      _loop9();
    }
  });
});
describe('validateDouble', function () {
  it('should not throw error for valid double strings', function () {
    var validOpts = [{
      value: '123'
    }, {
      value: '52.135153'
    }, {
      value: '0'
    }, {
      value: '50.236523',
      min: '40'
    }, {
      value: '50.000000',
      max: '50'
    }, {
      value: '35.000000',
      min: '35',
      max: '35'
    }, {
      value: '9223372036854.77580',
      maxDecimalPlaces: 5
    }];
    expect(function () {
      for (var _i17 = 0, _validOpts4 = validOpts; _i17 < _validOpts4.length; _i17++) {
        var opts = _validOpts4[_i17];
        (0, _validators.validateDouble)(opts);
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid double strings', function () {
    var invalidAmounts = [{}, undefined, {
      length: 1
    }, 100, '9223372036854.775808', '230.8496165', '230.230.563', '-1', true];

    var _loop10 = function _loop10() {
      var value = _invalidAmounts2[_i18];
      expect(function () {
        return (0, _validators.validateDouble)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i18 = 0, _invalidAmounts2 = invalidAmounts; _i18 < _invalidAmounts2.length; _i18++) {
      _loop10();
    }
  });
  it('should throw TypeError for amounts not passed the params validations', function () {
    var invalidAmountOpts = [{
      value: '9.999999',
      min: '10.000000'
    }, {
      value: '500.000001',
      max: '500.000000'
    }, {
      value: '92233720368542342',
      min: '100',
      max: '9223372036854'
    }, {
      value: '9223372036854.775803',
      maxDecimalPlaces: 5
    }];

    var _loop11 = function _loop11() {
      var opts = _invalidAmountOpts2[_i19];
      expect(function () {
        return (0, _validators.validateDouble)(opts);
      }).to.throw(TypeError);
    };

    for (var _i19 = 0, _invalidAmountOpts2 = invalidAmountOpts; _i19 < _invalidAmountOpts2.length; _i19++) {
      _loop11();
    }
  });
});
describe('validateUint64', function () {
  it('should not throw error for valid uint64 strings', function () {
    var validOpts = [{
      value: '100'
    }, {
      value: '52'
    }, {
      value: '0'
    }, {
      value: '50',
      min: '40'
    }, {
      value: '50',
      max: '50'
    }, {
      value: '35',
      min: '35',
      max: '35'
    }];
    expect(function () {
      for (var _i20 = 0, _validOpts5 = validOpts; _i20 < _validOpts5.length; _i20++) {
        var opts = _validOpts5[_i20];
        (0, _validators.validateUint64)(opts);
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid uint64 strings', function () {
    var invalidAmounts = [{}, undefined, {
      length: 1
    }, 100, '9223372036854.775808', '230.865', '230.230.563', '-1', true];

    var _loop12 = function _loop12() {
      var value = _invalidAmounts3[_i21];
      expect(function () {
        return (0, _validators.validateUint64)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i21 = 0, _invalidAmounts3 = invalidAmounts; _i21 < _invalidAmounts3.length; _i21++) {
      _loop12();
    }
  });
  it('should throw TypeError for amounts not passed the params validations', function () {
    var invalidAmountOpts = [{
      value: '9',
      min: '10'
    }, {
      value: '501',
      max: '500'
    }, {
      value: '92233720368542342',
      min: '100',
      max: '9223372036854'
    }];

    var _loop13 = function _loop13() {
      var opts = _invalidAmountOpts3[_i22];
      expect(function () {
        return (0, _validators.validateUint64)(opts);
      }).to.throw(TypeError);
    };

    for (var _i22 = 0, _invalidAmountOpts3 = invalidAmountOpts; _i22 < _invalidAmountOpts3.length; _i22++) {
      _loop13();
    }
  });
});
describe('validateAssetCode', function () {
  it('should not throw error for valid asset codes', function () {
    var validAssetCodes = ['A', 'BTC', 'eth', 'SomeCode', "SIXTEENCHARSCODE"];
    expect(function () {
      for (var _i23 = 0, _validAssetCodes = validAssetCodes; _i23 < _validAssetCodes.length; _i23++) {
        var value = _validAssetCodes[_i23];
        (0, _validators.validateAssetCode)({
          value: value
        });
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid asset codes', function () {
    var invalidSubjects = [{}, undefined, null, '', 'WITH SPACES', 'not_@lphanum', 'kebab-case', 'TOOLOONGASSETCODE'];

    var _loop14 = function _loop14() {
      var value = _invalidSubjects[_i24];
      expect(function () {
        return (0, _validators.validateAssetCode)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i24 = 0, _invalidSubjects = invalidSubjects; _i24 < _invalidSubjects.length; _i24++) {
      _loop14();
    }
  });
});
describe('validateXdrEnumType', function () {
  it('should not throw error for valid types', function () {
    expect(function () {
      (0, _validators.validateXdrEnumType)({
        value: _xdr_generated.default.FeeType.paymentFee(),
        type: _xdr_generated.default.FeeType
      });
      (0, _validators.validateXdrEnumType)({
        value: _xdr_generated.default.PollType.singleChoice(),
        type: _xdr_generated.default.PollType
      });
      (0, _validators.validateXdrEnumType)({
        value: _xdr_generated.default.SaleType.basicSale(),
        type: _xdr_generated.default.SaleType
      });
    }).to.not.throw();
  });
  it('should throw TypeError for invalid XDR types', function () {
    expect(function () {
      return (0, _validators.validateXdrEnumType)({
        value: null,
        type: _xdr_generated.default.PollType
      });
    }).to.throw(TypeError);
    expect(function () {
      return (0, _validators.validateXdrEnumType)({
        value: 'SaleType',
        type: _xdr_generated.default.SaleType
      });
    }).to.throw(TypeError);
    expect(function () {
      return (0, _validators.validateXdrEnumType)({
        value: _xdr_generated.default.SaleType.basicSale(),
        type: _xdr_generated.default.PollType
      });
    }).to.throw(TypeError);
    expect(function () {
      return (0, _validators.validateXdrEnumType)({
        value: undefined,
        type: _xdr_generated.default.FeeType
      });
    }).to.throw(TypeError);
    expect(function () {
      return (0, _validators.validateXdrEnumType)({
        value: _xdr_generated.default.FeeType.paymentFee(),
        type: _xdr_generated.default.SaleType
      });
    }).to.throw(TypeError);
  });
});
describe('validateCreatorDetails', function () {
  it('should not throw error for objects with snake_cased keys', function () {
    var validCreatorDetails = [{}, {
      foo: 'bar'
    }, {
      fizz: {
        buzz: 'Some value'
      }
    }, {
      foo_bar: {
        foo: 'foo',
        bar: 'bar'
      }
    }];
    expect(function () {
      for (var _i25 = 0, _validCreatorDetails = validCreatorDetails; _i25 < _validCreatorDetails.length; _i25++) {
        var value = _validCreatorDetails[_i25];
        (0, _validators.validateCreatorDetails)({
          value: value
        });
      }
    }).to.not.throw();
  });
  it('should not throw error for objects withouth snake_cased keys', function () {
    var validCreatorDetails = [{}, {
      BTC: '3Np23VinPrh9tDFuDKpf1p9uBCD977Q2av'
    }, {
      addresses: {
        BTC: 'BTC_ADDRESS'
      }
    }, {
      addresses: {
        BTC: 'address1',
        USD: 'address2'
      }
    }, {
      addresses: {
        ASSEt: 'ASSEt-address'
      }
    }];
    expect(function () {
      for (var _i26 = 0, _validCreatorDetails2 = validCreatorDetails; _i26 < _validCreatorDetails2.length; _i26++) {
        var value = _validCreatorDetails2[_i26];
        (0, _validators.validateCreatorDetails)({
          value: value,
          validateWithoutSnakeCased: true
        });
      }
    }).to.not.throw();
  });
  it('should throw TypeError for invalid creator details', function () {
    var invalidCreatorDetails = ['', undefined, null, {
      Foo: {
        'true': 'bar'
      }
    }, {
      fi_zz: {
        buZz: 'value'
      }
    }, {
      'kebab-case': 'value'
    }, {
      mixed_Style: {
        'some_Camel-kebab': 1
      }
    }, {
      'абв': {}
    }, {
      'wrong_$ymbol': 1
    }];

    var _loop15 = function _loop15() {
      var value = _invalidCreatorDetail[_i27];
      expect(function () {
        return (0, _validators.validateCreatorDetails)({
          value: value
        });
      }).to.throw(TypeError);
    };

    for (var _i27 = 0, _invalidCreatorDetail = invalidCreatorDetails; _i27 < _invalidCreatorDetail.length; _i27++) {
      _loop15();
    }
  });
});