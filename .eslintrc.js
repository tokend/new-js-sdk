module.exports = {
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    node: true,
    es6: true
  },
  plugins: [
    'chai-friendly',
  ],
  rules: {
    'new-cap': [2, {
      'newIsCapExceptionPattern': '^xdr',
      'capIsNewExceptionPattern': '^ed25519'
    }],
    'object-curly-spacing': [2, 'always'],
    'no-var': 2,
    'max-len': [2, {
      'code': 80,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreComments': true
    }],
  },
  overrides: [
    // Config for .test files
    {
      files: '*.spec.js',
      env: { mocha: true },
      rules: {
        'max-nested-callbacks': 0,
        'no-unused-expressions': 0,
        'chai-friendly/no-unused-expressions': 2
      },
      globals: {
        expect: true,
        expectThrow: true,
        expectNoThrow: true,
        catchPromise: true
      }
    }
  ]
};