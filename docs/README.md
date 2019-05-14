# TokenD JavaScript SDK

The TokenD JavaScript SDK facilitates client integration with the TokenD asset tokenizaton platform.

## Table of content

1. [Platform Overview](#platform-overview)

1. [Javascript SDK](#javascript-sdk)
    - [Installation](#installation)
    - [TokenD SDK](#tokend-sdk)
    - [Wallets](#wallets)
    - [Two Factor Auth](#two-factor-auth)
    - [API Server](#api-server)
    - [Horizon Server](#horizon-server)
    - [Transactions](#transactions)

1. [Development Guide](#development-guide)

1. [Troubleshooting](#troubleshooting)

1. [Use cases](#use-cases)

## Platform Overview

There two ways to interact with TokenD platform:

- By calling REST services(API)
- By building, signing and submitting blockchain transactions

Every user has a [keypair](./Keypair.html) that is used to authorize requests and sign the blockchain transactions. The keypair public key is used to identify user within the system.

## JavaScript SDK

### Installation

```bash
npm install -S @tokend/js-sdk
```

#### Webpack

If you use webpack as your build system you'll need to exclude the optional native module `ed25519`

```js
  plugins: [
    new webpack.IgnorePlugin(/ed25519/)
  ]
```

You can also checkout package's [webpack config](https://github.com/tokend/new-js-sdk/blob/master/webpack.config.js).

#### Prebuilt Minified Scripts

The package also ships prebuilt minified scripts for browsers in the `/dist` folder.

```html
<script type="text/javascript" src="https://<sdk-dist-url>"></script>
<script type="text/javascript">
  (async () => {
    const apiCaller = await ApiCaller
      .getInstanceWithPassphrase('https://<tokend-backend-url>')
    // ...
  })()
</script>
```

## API Caller

To get started create an API Caller instance:

```js
import { ApiCaller } from '@tokend/js-sdk'

const apiCaller = await ApiCaller
  .getInstanceWithPassphrase('https://<tokend-backend-url>')
```

## Response Format

All HTTP responses share the converted [JSON API](https://jsonapi.org/) format:

```js
{
  httpStatus: 200,

  // Flattened and camel-cased response data
  data: [
    {
      id: 'BTC',
      issued: '100.000000',
      maxIssuanceAmount: '21000000.000000',
      owner: {
        id: 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB',
        type: 'accounts'
      },
      relationshipNames: ['owner'],
      ...
    },
    {
      id: 'USD',
      issued: '956823.000000',
      maxIssuanceAmount: '223372036853.000000',
      owner: {
        id: 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB',
        type: 'accounts'
      },
      relationshipNames: ['owner'],
      ...
    },
  ],

  // Response headers
  headers: {...},

  // Raw links URL paths
  links: {
    first: '/<path-to-first-page>',
    last: '/<path-to-last-page>',
    next: '/<path-to-next-page>',
    prev: '/<path-to-prev-page>',
    self: '/<path-to-current-page>'
  }

  // Parsed links and relations
  fetchFirst: () => {...},
  fetchLast: () => {...},
  fetchNext: () => {...},
  fetchPrev: () => {...},
  fetchSelf: () => {...}
}
```

The links and relations that are returned with the responses are converted into functions you can call on the returned object.
For example you can use them for simple pagination through collections:

```js
const page = await apiCaller.get('/v3/assets')
console.log('Page', page.data)

const prevPage = await page.fetchPrev()
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

### Wallets manager

To interact with wallets you should create `WalletsManager` instance:

```js
import { WalletsManager } from '@tokend/js-sdk'

const walletsManager = new WalletsManager(apiCaller)
```

### Create a wallet

```js
const { wallet, recoverySeed } = await walletsManager.create(
  'my@email.com',
  'MyPassw0rd'
)

// Get the confirmation token from email
await walletsManager.verifyEmail(token)
```

### Retrieve and use the wallet to sign requests

```js
const wallet = await walletsManager.get('my@email.com', 'MyPassw0rd')
apiCaller.useWallet(wallet)
```

### Change password

```js
const updatedWallet = await walletsManager.changePassword('MyNewPassw0rd')
apiCaller.useWallet(updatedWallet)
```

### Recover the password

```js
const recoveredWallet = await walletsManager.recovery(
  'my@email.com',
  recoverySeed,
  'MyNewPassw0rd'
)
```

## Two Factor Auth

Some actions may require 2FA. Following snipet uses `FactorsManager`
instance to verify factors and retry failed requests:

```js
import { errors, FactorsManager } from '@tokend/js-sdk'

// Create factors manager instance
const factorsManager = new FactorsManager(apiCaller)
 
try {
  // Perform an action that may require 2FA
  await walletsManager.changePassword('MyNewPassw0rd')
} catch (e) {
  if (e instanceof errors.TFARequiredError) {
    // Handle 2FA
    if (e.meta.factorType === 'password') {
      // Show password prompt to user...
      await factorsManager.verifyPasswordFactorAndRetry(e, password)
    } else {
      // Show TOTP prompt to user...
      await factorsManager.verifyTotpFactorAndRetry(e, otp)
    }
  }
}
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

## Transactions

Blockhain transactions must have:

- Source - user's account ID
- One or more [operations](./Operations.html)
- User's signature

### Building and signing

```js
import { base } from '@tokend/js-sdk'

const tx = new base.TransactionBuilder(apiCaller.wallet.accountId)
  .addOperation(base.Operation.payment(paymentParamsObject))
  .addSigner(apiCaller.wallet.keypair)
  .build()
  .toEnvelope()
  .toXDR()
  .toString('base64')
```

### Submitting

```js
const response = await apiCaller.postTxEnvelope(tx)
```

### Handling XDR encoded fields in responses

The transaction endpoints will return some fields in raw `XDR`
form. You can convert this XDR to JSON using the `.fromXDR()` method.

An example of re-writing the txHandler from above to print the XDR fields as JSON:

```js
import { base } from '@tokend/js-sdk'

const envelope = response.data.envelopeXdr
console.log(base.xdr.TransactionEnvelope.fromXDR(envelope, 'base64'))

const result = response.data.resultXdr
console.log(base.xdr.TransactionResult.fromXDR(result, 'base64'))

const resultMeta = response.data.resultMetaXdr
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

SDK uses XDR JS wrappers generated out of raw `.x` files placed in [XDR TokenD repo](https://github.com/tokend/xdr).

To update the JS wrappers:

1. Checkout the [xdr repo](https://github.com/tokend/xdr) to desired commit or branch
1. Install [Docker](https://docs.docker.com/install) if needed
1. Make `generateXDR.sh` executable if needed
    ```
    chmod +x generateXDR.sh
    ```
1. Run the script
    ```bash
    ./generateXDR.sh master # assuming `master` is the desired branch
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


## Use Cases

### Creating your own token

TokenD JS SDK makes creation of tokens as simple as it's possible for your users.
To start doing it on your own, follow next steps:

1. First of all, import the SDK in your project and create an `ApiCaller` 
instance. You will need several modules described here:

```js
import {
  ApiCaller, // the module for sending requests to API server
  base // the module for crafting transactions
} from '@tokend/js-sdk'

const apiCaller = await ApiCaller
  .getInstanceWithPassphrase('https://<tokend-backend-url>')
```

2. Your token may need the logotype. Let's suppose that your app have the file field, where user can upload the image:

```html
<input type="file" id="#token-logo">
```

Simply attach the listener to the field to handle image upload

```js
const field = document.getElementById('token-logo')
field.addEventListener('change', handleImageUpload)
```

3. Now to save the image in TokenD storage you need some magic:

After simply deriving raw file from field event

```js
async function handleImageUpload (event) {
  const file = event.target.files[0]
}
```

<!-- TODO: Update this section after moving file uploading to the SDK -->

tell the API you need the space for new image and get needed params for the file upload:

```js
async function handleImageUpload (event) {
  const file = event.target.files[0]
  const { url, formData } = await api.documents.create('general_public', file.type)
}
```

`formData` object will look like described in API docs [API documentation][1]. You will need it
for two things: uploading the file itself and saving it's storage key in the blockchain.

Now you've got all the necessary data for uploading your token logotype. You can use any http-client
(we'll use `axios` here) to upload it to the storage using `POST` request

```js
import { axios } from 'axios'

async function handleImageUpload (event) {
  const file = event.target.files[0]
  const { url, formData } = await api.documents.create('general_public', file.type)
  await axios.post(url, Object.assign(formData, {
    file: new Blob([file], { type: file.type })
  }))
  return formData.key
}
```

3. Now you can create the token itself. For doing this, create the operation:

```js
const operation = base.ManageAssetBuilder.assetCreationRequest({
  // Request ID, if 0 - creates new, updates otherwise
  requestID: '0',
  // Asset code
  code: 'TKN',
  // Account ID of keypair which will sign request for asset to be 
  // authrorized to be issued
  preissuedAssetSigner: 'GBT3XFWQUHUTKZMI22TVTWRA7UHV2LIO2BIFNRCH3CXWPYVYPTMXMDGC',
  // Max amount can be issued of that asset
  maxIssuanceAmount: '100000',
  // Asset policies
  policies: 0,
  // Amount of pre issued tokens available after creation of the asset
  initialPreissuedAmount: '100000',
  // Count of digits after the comma
  trailingDigitsCount: 6,
  creatorDetails: {
    // Asset name
    name: 'My first token',
    logo: {
      // The key you've derived before
      key: key
    }
  }
})
```

Craft the transaction and sign it:

```js
// Just an example, replace it with the actual one
const seed = 'SA4CAMSMX6CRAC4XPUPUDAC5VYSFQRWEEFDBVBEDIIRWNEHDYAX5OHMC'

const keypair = base.Keypair.fromSecret()
const accountId = keypair.accountId()

const tx = new base.TransactionBuilder(accountId)
  .addOperation(operation)
  .addSigner(keypair)
  .build()
  .toEnvelope()
  .toXDR()
  .toString('base64')

const txResponse = await apiCaller.postTxEnvelope(tx)
```

[1]: http://tokend.gitlab.io/docs/#upload
