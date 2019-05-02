import {
  validateNotUndefined,
  validateNotNaN,
  validateArray,
  validateString,
  validatePublicKey,
  validateSecretKey,
  validateBalanceKey,
  validateAmount,
  validateSubject,
  validateAssetCode,
  validateFeeType,
  validateCreatorDetails
} from './validators'

import { default as xdr } from '../base/generated/xdr_generated'

describe('validateNotUndefined', () => {
  it('should not throw error for defined values', () => {
    const validValues = [10, 'some', '', {}, [], false, 0, null]

    expect(() => {
      for (const value of validValues) {
        validateNotUndefined({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for undefined values', () => {
    expect(() => validateNotUndefined()).to.throw(TypeError)
    expect(() => validateNotUndefined({ value: undefined }))
      .to.throw(TypeError)

    let notDefinedVar
    expect(() => validateNotUndefined({ value: notDefinedVar }))
      .to.throw(TypeError)
  })
})

describe('validateNotNaN', () => {
  it('should not throw error for not NaN numbers', () => {
    const validValues = [
      10,
      -60.23,
      0,
      '0',
      '26.35',
      '5e3',
      '000005',
      Infinity,
      '',
      [],
      null,
      new Date()
    ]

    expect(() => {
      for (const value of validValues) {
        validateNotNaN({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for NaN values', () => {
    const invalidValues = [
      NaN,
      undefined,
      {},
      'Not a number',
      '10.20.56',
      0 / 0,
      Infinity / Infinity
    ]

    for (const value of invalidValues) {
      expect(() => validateNotNaN({ value })).to.throw(TypeError)
    }
  })
})

describe('validateArray', () => {
  it('should not throw error for valid arrays', () => {
    const validOpts = [
      { value: [] },
      { value: [1, 2, 3] },
      { value: 'Some string'.split('') },
      { value: [], minLength: 0 },
      { value: [1, '2'], minLength: 1 },
      { value: [0, 1, 0], minLength: 3 }
    ]

    expect(() => {
      for (const opts of validOpts) {
        validateArray(opts)
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid arrays', () => {
    const invalidValues = [
      {},
      undefined,
      { length: 1 },
      10,
      'Not an array',
      null,
      true
    ]

    for (const value of invalidValues) {
      expect(() => validateArray({ value })).to.throw(TypeError)
    }
  })

  it('should throw Error for arrays with invalid length', () => {
    const invalidLengthOpts = [
      { value: [], minLength: 1 },
      { value: 'str'.split(''), minLength: 4 }
    ]

    for (const opts of invalidLengthOpts) {
      expect(() => validateArray(opts)).to.throw(Error)
    }
  })
})

describe('validateString', () => {
  it('should not throw error for valid strings', () => {
    const validOpts = [
      { value: '' },
      { value: [1, 2, 3].join('') },
      { value: 'Some string' },
      { value: 'test', minLength: 3 },
      { value: 'some', minLength: 4 },
      { value: 'five', maxLength: 5 },
      { value: 'four', maxLength: 4 },
      { value: 'valid', minLength: 3, maxLength: 5 },
      { value: 'String', minLength: 6, maxLength: 6 }
    ]

    expect(() => {
      for (const opts of validOpts) {
        validateString(opts)
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid strings', () => {
    const invalidValues = [
      {},
      undefined,
      { length: 1 },
      10,
      null,
      [],
      true
    ]

    for (const value of invalidValues) {
      expect(() => validateString({ value })).to.throw(TypeError)
    }
  })

  it('should throw TypeError for strings with invalid length', () => {
    const invalidLengthOpts = [
      { value: '', minLength: 1 },
      { value: 'str', minLength: 4 },
      { value: 'Big one', maxLength: 6 }
    ]

    for (const opts of invalidLengthOpts) {
      expect(() => validateString(opts)).to.throw(TypeError)
    }
  })
})

describe('validatePublicKey', () => {
  it('should not throw error for valid public keys', () => {
    const validKeys = [
      'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB',
      'GBCG42WTVWPO4Q6OZCYI3D6ZSTFSJIXIS6INCIUF23L6VN3ADE4337AP',
      'GDFX463YPLCO2EY7NGFMI7SXWWDQAMASGYZXCG2LATOF3PP5NQIUKBPT',
      'GBXEODUMM3SJ3QSX2VYUWFU3NRP7BQRC2ERWS7E2LZXDJXL2N66ZQ5PT',
      'GAJHORKJKDDEPYCD6URDFODV7CVLJ5AAOJKR6PG2VQOLWFQOF3X7XLOG',
      'GDD3XRXU3G4DXHVRUDH7LJM4CD4PDZTVP4QHOO4Q6DELKXUATR657OZV',
      'GDTYVCTAUQVPKEDZIBWEJGKBQHB4UGGXI2SXXUEW7LXMD4B7MK37CWLJ'
    ]

    expect(() => {
      for (const value of validKeys) {
        validatePublicKey({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid public keys', () => {
    const invalidKeys = [
      'GBPXX0A5N4JYPESHAADMQKBPWZWQDQ64ZV6ZL2S3LAGW4SY7NTCMWIVL',
      'GDXIIZTKTLVYCBHURXL2UPMTYXOVNI7BRAEFQCP6EZCY4JLKY4VKFNLT',
      // Too long
      'GB6OWYST45X57HCJY5XWOHDEBULB6XUROWPIKW77L5DSNANBEQGUPADT2',
      // Secret key
      'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY',
      'gWRYUerEKuz53tstxEuR3NCkiQDcV4wzFHmvLnZmj7PUqxW2wt',
      // Old network key
      'g4VPBPrHZkfE8CsjuG2S4yBQNd455UWmk',
      'test',
      'Some test string that contains exactly fifty six symbols',
      null
    ]

    for (const value of invalidKeys) {
      expect(() => validatePublicKey({ value })).to.throw(TypeError)
    }
  })
})

describe('validateSecretKey', () => {
  it('should not throw error for valid secret keys', () => {
    const validKeys = [
      'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY',
      'SCZTUEKSEH2VYZQC6VLOTOM4ZDLMAGV4LUMH4AASZ4ORF27V2X64F2S2',
      'SCGNLQKTZ4XCDUGVIADRVOD4DEVNYZ5A7PGLIIZQGH7QEHK6DYODTFEH',
      'SDH6R7PMU4WIUEXSM66LFE4JCUHGYRTLTOXVUV5GUEPITQEO3INRLHER',
      'SC2RDTRNSHXJNCWEUVO7VGUSPNRAWFCQDPP6BGN4JFMWDSEZBRAPANYW',
      'SCEMFYOSFZ5MUXDKTLZ2GC5RTOJO6FGTAJCF3CCPZXSLXA2GX6QUYOA7'
    ]

    expect(() => {
      for (const value of validKeys) {
        validateSecretKey({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid secret keys', () => {
    const invalidKeys = [
      // Public key
      'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB',
      // Too long
      'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDYT',
      // Too short
      'SAFGAMN5Z6IHVI3IVEPIILS7ITZDYSCEPLN4FN5Z3IY63DRH4CIYEV',
      // Checksum
      'SAFGAMN5Z6IHVI3IVEPIILS7ITZDYSCEPLN4FN5Z3IY63DRH4CIYEVIT',
      'test',
      null
    ]

    for (const value of invalidKeys) {
      expect(() => validateSecretKey({ value })).to.throw(TypeError)
    }
  })
})

describe('validateBalanceKey', () => {
  it('should not throw error for valid balance keys', () => {
    const validKeys = [
      'BCTZM23JQ4RT5L643R2SUPM3VSR3AISVXWX56KNYJVZB2L4TNNDEFXDG',
      'BBRL3IVE7QD4YGEWKVQRF5YVOK37PXNZZGR7ILZOYQ5SMZVRLFGOMISX',
      'BAEUBIHPHVI6X3PDC7HSIHVN5OUB7UU3AVTOGUOZHCRVUGPORPIIHS44'
    ]

    expect(() => {
      for (const value of validKeys) {
        validateBalanceKey({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid balance keys', () => {
    const invalidKeys = [
      // Public key
      'GBBM6BKZPEHWYO3E3YKREDPQXMS4VK35YLNU7NFBRI26RAN7GI5POFBB',
      // Secret key
      'SAB5556L5AN5KSR5WF7UOEFDCIODEWEO7H2UR4S5R62DFTQOGLKOVZDY',
      // Too long
      'BBRL3IVE7QD4YGEWKVQRF5YVOK37PXNZZGR7ILZOYQ5SMZVRLFGOMISXS',
      // Too short
      'BBRL3IVE7QD4YGEWKVQRF5YVOK37PXNZZGR7ILZOYQ5SMZVRLFGOMI',
      'test',
      null
    ]

    for (const value of invalidKeys) {
      expect(() => validateBalanceKey({ value })).to.throw(TypeError)
    }
  })
})

describe('validateAmount', () => {
  it('should not throw error for valid amounts', () => {
    const validOpts = [
      { value: '100' },
      { value: '52.002536' },
      { value: '0', allowZero: true },
      { value: '50.236523', min: '40' },
      { value: '50.000000', max: '50' },
      { value: '35.000000', min: '35', max: '35' },
      { value: '9223372036854.775807' }
    ]

    expect(() => {
      for (const opts of validOpts) {
        validateAmount(opts)
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid strings', () => {
    const invalidAmounts = [
      {},
      undefined,
      { length: 1 },
      100,
      '9223372036854.775808',
      '230.8496165',
      '230.230.563',
      '0',
      '-1',
      true
    ]

    for (const value of invalidAmounts) {
      expect(() => validateAmount({ value })).to.throw(TypeError)
    }
  })

  it('should throw TypeError for amounts not in provided range', () => {
    const invalidAmountOpts = [
      { value: '9.999999', min: '10.000000' },
      { value: '500.000001', max: '500.000000' },
      { value: '92233720368542342', min: '100', max: '9223372036854' }
    ]

    for (const opts of invalidAmountOpts) {
      expect(() => validateAmount(opts)).to.throw(TypeError)
    }
  })
})

describe('validateSubject', () => {
  it('should not throw error for valid subjects', () => {
    const validSubjects = [
      '',
      [1, 2, 3].join(''),
      'Some subject',
      `Some subject containing 256 symbols, that is the maximum
       length of valid subject string. Lorem ipsum dolor sit amet,
       consectetur adipiscing elit, sed do eiusmod tempor incididunt
       ut labore et dolore magna aliqua. Ut enim ad minim venia`
    ]

    expect(() => {
      for (const value of validSubjects) {
        validateSubject({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid subjects', () => {
    const invalidSubjects = [
      {},
      undefined,
      { length: 1 },
      10,
      null,
      [],
      true,
      `Some subject containing more than 256 symbols, more than allowed.
       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
       eiusmod tempor incididunt ut labore et dolore magna aliqua.
       Ut enim ad minim veniam, quis nostrud exercita`
    ]

    for (const value of invalidSubjects) {
      expect(() => validateSubject({ value })).to.throw(TypeError)
    }
  })
})

describe('validateAssetCode', () => {
  it('should not throw error for valid asset codes', () => {
    const validAssetCodes = [
      'A',
      'BTC',
      'eth',
      'Some_code',
      `SIXTEEN_SMB_CODE`
    ]

    expect(() => {
      for (const value of validAssetCodes) {
        validateAssetCode({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid asset codes', () => {
    const invalidSubjects = [
      {},
      undefined,
      '',
      'Some code',
      'WITH SPACES',
      'TOO_LONG_ASSET_CODE'
    ]

    for (const value of invalidSubjects) {
      expect(() => validateAssetCode({ value })).to.throw(TypeError)
    }
  })
})

describe('validateFeeType', () => {
  it('should not throw error for valid fee types', () => {
    const validFeeTypes = [
      xdr.FeeType.paymentFee(),
      xdr.FeeType.offerFee(),
      xdr.FeeType.investFee()
    ]

    expect(() => {
      for (const value of validFeeTypes) {
        validateFeeType({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid fee types', () => {
    const invalidFeeTypes = [
      undefined,
      '',
      'Some type',
      '2',
      0,
      1
    ]

    for (const value of invalidFeeTypes) {
      expect(() => validateFeeType({ value })).to.throw(TypeError)
    }
  })
})

describe('validateCreatorDetails', () => {
  it('should not throw error for non-empty objects with snake_cased keys', () => {
    const validCreatorDetails = [
      { foo: 'bar' },
      { fizz: { buzz: 'Some value' } },
      { foo_bar: { foo: 'foo', bar: 'bar' } }
    ]

    expect(() => {
      for (const value of validCreatorDetails) {
        validateCreatorDetails({ value })
      }
    }).to.not.throw()
  })

  it('should throw TypeError for invalid creator details', () => {
    const invalidCreatorDetails = [
      {},
      '',
      undefined,
      null,
      { Foo: 'bar' },
      { fi_zz: { buZz: 'value' } },
      { 'kebab-case': 'value' }
    ]

    for (const value of invalidCreatorDetails) {
      expect(() => validateCreatorDetails({ value })).to.throw(TypeError)
    }
  })
})
