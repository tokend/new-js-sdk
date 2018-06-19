# TokenD JavaScript SDK

The TokenD JavaScript SDK facilitates client integration with the TokenD asset tokenizaton platform.

## Table of content

1. [Platform Overview](#platform-overview)

1. [Javascript SDK](#javascript-sdk)
    - [Installation](#installation)
    - [TokenD SDK](#tokend-sdk)
    - [Wallets](#wallets)
    - [API Server](#api-server)
    - [Horizon Server](#horizon-server)
    - [Two Factor Auth](#two-factor-auth)
    - [Transactions](#transactions)

1. [Development Guide](#development-guide)

1. [Troubleshooting](#troubleshooting)

## Platform Overview

There two ways to interact with TokenD platform:

- By calling REST services(API)
- By building, signing and submitting blockchain transactions

Every user has a [keypair](./Keypair.html) that is used to authorize requests and sign the blockchain transactions. The keypair public key is used to identify user within the system.

## JavaScript SDK

### Installation

```bash
npm install -S tokend-sdk
```

#### Webpack

If you use webpack as your build system you'll need to exclude the optional native module `ed25519`

```js
  plugins: [
    new webpack.IgnorePlugin(/ed25519/)
  ]
```

You can also checkout package's [webpack config](https://gitlab.com/tokend/new-js-sdk/blob/master/webpack.config.js).

#### Prebuilt Minified Scripts

The package also ships prebuilt minified scripts for browsers in the `/dist` folder.

```html
<script type="text/javascript" src="https://<sdk-dist-url>"></script>
<script type="text/javascript">
  (async () => {
    let sdk = await Sdk.TokenD.create('https://<tokend-backend-url>')
    // ...
  })()
</script>
```

## TokenD SDK

To get started create a TokenD SDK instance:

```js
import { TokenD } from 'tokend-sdk'

let sdk = await TokenD.create('https://<tokend-backend-url>')
```

You can configure different environment setting such as proxy configuration via [options](./TokenD.create.html).

## Response Format

All HTTP responses share the following format:

```js
{
  httpStatus: 200,

  // Flattened and camel-cased response data
  data: [
    {
      balanceId: 'BCTZM23JQ4RT5L643R2SUPM3VSR3AISVXWX56KNYJVZB2L4TNNDEFXDG',
      accountId: 'GD3EIROYAVQUVDCSZDYVTOQSK7LGWPNXVIIQ7W7D5A7UFEJVLVH22GNY',
      asset: 'ETH'
    },
    {
      balanceId: 'BBRL3IVE7QD4YGEWKVQRF5YVOK37PXNZZGR7ILZOYQ5SMZVRLFGOMISX',
      accountId: 'GCBUB6JILEXAFGE6VIGJMPQUQHFCM5N6JSREA65P23SG2YLEVLIOAJNU',
      asset: 'ETH'
    }
  ],

  // Response headers
  headers: {...},

  // Parsed links and relations
  fetchNext: () => {...},
  fetchPrev: () => {...},
  fetchAccount: () => {...}
}
```

The links and relations that are returned with the responses are converted into functions you can call on the returned object.
For example you can use them for simple pagination through collections:

```js
let page = await sdk.horizon.balances.getPage()
console.log('Page', page.data)

let prevPage = await page.fetchPrev()
console.log('Previous page', prevPage.data)
```

## Errors

### Common errors

- [NetworkError](./NetworkError.html)
- [TimeoutError](./TimeoutError.html)

### Wrappers for error responses

All the error responses subclass [ServerErrorBase](./ServerErrorBase.html) and share the following format:

```js
{
  httpStatus: 403,
  // Human readable title
  title: 'Forbidden',
  // Detailed explanation
  detail: 'Additional factor required.',
  // Additional relevant data
  meta: {
    factorId: 275,
    factorType: 'password',
    ...
  },
  // Raw unparsed error
  originalError: {...},
  // Retry request. Handy for 2FA handling
  retryRequest: () => {...}
}
```

### Interceptors

SDK allows you to use [request and response interceptors](https://github.com/axios/axios#interceptors):

```js
sdk.api.useRequestInterceptors(
  request => {
    // Track user's actions, transform request data, etc
  },
  err => {
    // Log, handle errors, retry requests, etc
  }
)

sdk.api.useResponseInterceptor(
  config => {
    // Parse and transform response data, show notifications, etc
  },
  err => {
    // Track errors, try to retry requests, show 2FA prompts, etc
  }
)
```

## Wallets

Wallets hold user's keypair and account ID that are used to identify user, authorize access to the backend services and sign the blockhain transactions.

### Create a wallet

```js
let { wallet, recoverySeed } = await sdk.api.wallets.create(
  'my@email.com',
  'MyPassw0rd'
)

// Get the confirmation token from email
await sdk.api.wallets.verifyEmail(token)
```

### Retrieve and use the wallet to sign requests

```js
let wallet = await sdk.api.wallets.get('my@email.com', 'MyPassw0rd')
sdk.useWallet(wallet)
```

### Change password

```js
let updateWallet = await sdk.api.wallets.changePassword('MyNewPassw0rd')
sdk.useWallet(updatedWallet)
```

### Recover the password

```js
let recoveredWallet = await sdk.api.wallets.recovery(
  'my@email.com',
  recoverySeed,
  'MyNewPassw0rd'
)
```

## API Server

[API server](#api) is responsible for multiple activities:

- Stores [wallets](#wallets) that hold encrypted keypairs
- Handles 2 factor auth
- Stores private off-chain data, such as KYC data and documents

### Resources

- [Wallets](./Wallets.html)
- [Factors](./Factors.html)
- [Users](./Users.html)
- [Documents](./Documents.html)
- [Kyc entities](./KycEntites.html)
- [Blobs](./Blobs.html)

### Errors

- [ApiError](./ApiError.html) - base class for API errors
- [BadRequestError](./BadRequestError.html)
- [NotAllowedError](./NotAllowedError.html)
- [ForbiddenRequestError](./ForbiddenRequestError.html)
- [TFARequiredError](./TFARequiredError.html)
- [VerificationRequiredError](./VerificationRequiredError.html)
- [NotFoundError](./NotFoundError.html)
- [ConflictError](./ConflictError.html)
- [InternalServerError](./InternalServerError.html)

## Horizon Server

[Horizon server](#horizon) is the interface for interaction with the TokenD blockchain. It allows to submit transactions and query on-chain data.

### Resources

- [Account](./Account.html)
- [Balances](./Balances.html)
- [Signers](./Signers.html)
- [Transactions](./Transactions.html)

### Errors

- [HorizonError](./HorizonError.html) - base class for Horizon errors
- [BadRequestError](./BadRequestError.html)
- [UnauthorizedError](./UnauthorizedError.html)
- [TFARequiredError](./TFARequiredError.html)
- [NotFoundError](./NotFoundError.html)
- [InternalServerError](./InternalServerError.html)

## Two Factor Auth

Some actions may require 2FA. Following snipet allows utilizes [interceptors](#interceptors) to handle and retry failed requests:

```js
import { errors } from 'tokend-sdk'

sdk.api.useResponseInterceptor(
  config => config,
  err => {
    if (err instanceof errors.api.TFARequiredError) {
      // Handle 2FA
      if (err.meta.factorType === 'password') {
        // Show password promt to user...
        return sdk.api.factors.verifyPasswordFactorAndRetry(err, password)
      } else {
        // Shot TOTP prompt to user...
        return sdk.api.factors.verifyTotpFactorAndRetry(err, otp)
      }
    } else {
      return Promise.reject(err)
    }
  }
)
```

## Transactions

Blockhain transactions must have:

- Source - user's account ID
- One or more [operations](./Operations.html)
- User's signature

### Building and signing

```js
import { base } from 'tokend-sdk'

let tx = new base.TransactionBuilder(sdk.wallet.accountId)
  .addOperation(base.Operation.payment(paymentParamsObject))
  .build();

tx.sign(sdk.wallet.keypair);
```

### Submitting

```js
let response = await sdk.horizon.transactions.submit(tx)
```

### Handling XDR encoded fields in responses

The transaction endpoints will return some fields in raw `XDR`
form. You can convert this XDR to JSON using the `.fromXDR()` method.

An example of re-writing the txHandler from above to print the XDR fields as JSON:

```js
import { base } from 'tokend-sdk'

let envelope = response.data.envelopeXdr
console.log(base.xdr.TransactionEnvelope.fromXDR(envelope, 'base64'))

let result = response.data.resultXdr
console.log(base.xdr.TransactionResult.fromXDR(result, 'base64'))

let resultMeta = response.data.resultMetaXdr
console.log(base.xdr.TransactionMeta.fromXDR(resultMeta, 'base64'))
```

## Development Guide

### Transpiling

As for now some handy ES7 features need transpiler in both node.js and browser environments so the [babel transpiler](https://babeljs.io/) is used.

Build for node.js:

```
npm run build
```

Build for browsers:

```
npm run build:browser
```

### Coding Style

SDK follows [JavaScript Standard Style](https://standardjs.com/).

All public classes and functions must have JSDoc annotations.

Run linter to check for style violations:

```
npm run lint
```

### Testing

Node.js tests:

```
npm test
```

Browser tests:

```
npm tests:browser
```

Test coverage:

```
npm run coverage
```

### Building XDR Files

SDK repos includes `xdr` git submodule which contains raw `.x` XDR files.

To update the JS wrappers:

1. Checkout the `xdr` submodule to desired commit
1. Install Ruby v 2.5.0 if needed
1. Install `rake` and `bundler`:
    ```
    gem install rake bundler
    ```
1. Install `xdrgen` dependencies
    ```
    bundle
    ```
1. Build the XDR wrappers:
    ```
    rake xdr:update
    ```

### Generating Docs

HTML docs

```bash
npm run docs
```

Markdown docs

```bash
npm run docs:md
```

## Troubleshooting

### Problem With Installation on Windows

When installing js-sdk on windows, you might see an error that looks similar to the following:

```shell
error MSB8020: The build tools for v120 (Platform Toolset = 'v120 ') cannot be found. To build using the v120 build tools, please install v120 build tools.  Alternatively, you may upgrade to the current Visual Studio tools by selecting the Project menu or right-click the solution, and then selecting "Retarget solution"
```

To resolve this issue, you should upgrade your version of nodejs, node-gyp and then re-attempt to install the offending package using `npm install -g --msvs_version=2015 ed25519`.  Afterwards, retry installing stellar-sdk as normal.