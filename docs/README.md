# TokenD JavaScript SDK

The TokenD JavaScript SDK facilitates client integration with TokenD
platform.

## Table of content

1. [Platform Overview](#platform-overview)

1. [Javascript SDK](#javascript-sdk)
    - [Installation](#installation)
    - [Versions and repository](#versions-and-repository)
    - [TokenD SDK](#javascript-sdk)
    - [Wallets](#wallets)
    - [Two Factor Auth](#two-factor-auth)
    - [Identity Service Server](#identity-service-server)
    - [Horizon Server](#horizon-server)
    - [Transactions](#transactions)

1. [Development Guide](#development-guide)

1. [Troubleshooting](#troubleshooting)

1. [Use cases](#use-cases)

## Platform Overview

TokenD platform mostly consists of Core, Horizon, Identity Service and auxiliary
modules. Docs on them and other important system-related information can be
found on [docs.tokend.io](https://docs.tokend.io).

There are two ways to interact with TokenD platform:
- By calling JsonApi services
- By building, signing and submitting blockchain transactions

To authorize requests and sign blockchain transactions the SDK needs
[keypair](https://docs.tokend.io/#tag/Key-Concepts). Keypair’s public key is
used to identify user within the system and generally called "Account ID" within
TokenD documentation. How to get and operate over a keypair can be found in
[Wallets](#wallets) section.

## JavaScript SDK

### Installation

```bash
yarn install -S @tokend/js-sdk
```

#### Webpack

If you use webpack as your build system you will need to exclude the optional
native module `ed25519`

```js
  plugins: [
    new webpack.IgnorePlugin(/ed25519/)
  ]
```

You can also checkout package's [webpack-config](https://github.com/tokend/new-js-sdk/blob/master/webpack.config.js).

#### Prebuilt minified scripts

The package also ships prebuilt minified scripts for browsers in the `/dist`
folder.

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

### Versions and repository

The repository is located on [GitHub](https://github.com/new-js-sdk).

Full version list can be found in
[releases](https://github.com/tokend/new-js-sdk/releases) section of the repo

The latest changelog can be found in root directory of the repo, look for
[CHANGELOG.md](https://github.com/tokend/new-js-sdk/blob/master/CHANGELOG.md)
file.

## API Caller

`ApiCaller` is the main entity to make calls to the servers. It encapsulates
signings, error parsers, response parsers and functionality to fetch base
environment config.

To get started create an `ApiCaller` instance:

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

The links and relations that are returned with the responses are converted into
functions you can call on the returned object.
For example you can use them for simple pagination through collections:

```js
const page = await apiCaller.get('/v3/assets')
console.log('Page', page.data)

const prevPage = await page.fetchPrev()
console.log('Previous page', prevPage.data)
```

## Errors

### Wrappers for error responses

All the error responses subclass `ServerErrorBase` and share the following
format:

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

## Managers

The SDK includes some managers to make developers’ lives a bit easier. They
encapsulate some complicated entity-specific logic, here is the list of
managers:

- `WalletsManager` - to manipulate over wallets
- `SignersManager` - to manipulate over account signers
- `FactorsManager` - to manipulate over authentication factors

Managers use `ApiCaller` instance to perform their requests but they do not
update its instance. So if you change anything state using a manager, i.e.
changed wallet password, do not forget to manually pass it to you `ApiCaller`
instance.

## Wallets

Wallets hold user's keypair that is used to identify user, authorize access to
the backend services and sign the blockchain transactions.

### Wallets manager

Creating a `WalletsManager` instance:

```js
import { WalletsManager } from '@tokend/js-sdk'

const walletsManager = new WalletsManager(apiCaller)
```

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
  'MyPassW0rd'
)

// Get the confirmation token from email
await walletsManager.verifyEmail(token)
```

### Retrieve and use the wallet to sign requests

```js
const wallet = await walletsManager.get('my@email.com', 'MyPassW0rd')
apiCaller.useWallet(wallet)
```

### Change password

```js
const updatedWallet = await walletsManager.changePassword('MyNewPassW0rd')
apiCaller.useWallet(updatedWallet)
```

### Recover the password

```js
const recoveredWallet = await walletsManager.recovery(
  'my@email.com',
  recoverySeed,
  'MyNewPassW0rd'
)
```

## Two Factor Auth

Some actions may require 2FA. Following snippet uses `FactorsManager`
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

## Identity Service server

[Identity Service](https://docs.tokend.io/identity) is responsible for multiple
activities:
- Stores [wallets](#wallets) that hold encrypted keypairs
- Handles 2 factor auth
- Stores private off-chain data, such as KYC data and documents

### References

- [Sign Up Flow](http://docs.tokend.io/identity/#tag/Sign-Up-Flow)
- [Sign In Flow](http://docs.tokend.io/identity/#tag/Sign-In-Flow)
- [Email Verification Flow](http://docs.tokend.io/identity/#tag/Email-Verification-Flow)
- [Recovery Flow](http://docs.tokend.io/identity/#tag/Recovery-Flow)
- [References](http://docs.tokend.io/identity/#tag/Wallet)

## Horizon Server

[Horizon server](http://docs.tokend.io/horizon/) is the interface for
interaction with the TokenD blockchain. It allows to submit transactions and
query on-chain data.

### References

- [Essentials](http://docs.tokend.io/horizon/#tag/Accounts)
- [Asset Movements](http://docs.tokend.io/horizon/#tag/AMLAlert)
- [Access Control](http://docs.tokend.io/horizon/#operation/getSignersForAccount)
- [KYC & AML](http://docs.tokend.io/horizon/#tag/Account-Roles)
- [Decentralized Exchange](http://docs.tokend.io/horizon/#tag/Asset-Pairs)
- [Advanced](http://docs.tokend.io/horizon/#tag/PreIssuance)
- [Other](http://docs.tokend.io/horizon/#tag/Polls)

## Transactions

Blockchain transactions must have:

- Source - user's account ID
- One or more [operations](https://docs.tokend.io/#tag/Key-Concepts/paths/~1txs/get)
- User's signature

### Building and signing

<!-- TODO: XDR are used, Base is for building operations -->

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

As for now some handy ES7 features need transpiler in both node.js and browser
environments so the [babel transpiler](https://babeljs.io/) is used.

Build for node.js:

```
yarn build
```

Build for browsers:

```
yarn build:browser
```

### Coding Style

SDK follows [JavaScript Standard Style](https://standardjs.com/).

All public classes and functions must have JSDoc annotations.

Run linter to check for style violations:

```
yarn lint
```

### Testing

Node.js tests:

```
yarn test
```

Browser tests:

```
yarn tests:browser
```

Test coverage:

```
yarn coverage
```

### Building XDR Files

SDK uses XDR JS wrappers generated out of raw `.x` files placed in
[XDR TokenD repo](https://github.com/tokend/xdr).

To update the JS wrappers:

1. Checkout the [xdr repo](https://github.com/tokend/xdr) to desired commit or
  branch
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
yarn docs
```

Markdown docs

```bash
yarn docs:md
```

## Troubleshooting

### Problem With Installation on Windows

When installing js-sdk on windows, you might see an error that looks similar to the following:

```shell
error MSB8020: The build tools for v120 (Platform Toolset = 'v120 ') cannot be found. To build using the v120 build tools, please install v120 build tools.  Alternatively, you may upgrade to the current Visual Studio tools by selecting the Project menu or right-click the solution, and then selecting "Retarget solution"
```

To resolve this issue, you should upgrade your version of nodejs, node-gyp and then re-attempt to install the offending package using `yarn global add --msvs_version=2015 ed25519`.  Afterwards, retry installing stellar-sdk as normal.

## Use Cases

### Creating your own asset

TokenD JS SDK makes creation of assets as simple as it's possible for your users.
To start doing it on your own, follow next steps:

1. First of all, import the SDK in your project and create an `ApiCaller`
instance. You will need several modules described here:

```js
import {
  ApiCaller, // the module for sending requests to API server
  DocumentsManager, // the module for uploading documents
  base, // the module for crafting transactions
  Wallet // the wrapper for managing user's key pair
} from '@tokend/js-sdk'

const apiCaller = await ApiCaller
  .getInstanceWithPassphrase('https://<tokend-backend-url>')
const documentsManager = new DocumentsManager({
  apiCaller,
  storageURL: 'https://<tokend-storage-url>',
})
```

2. Use your wallet by API caller to sign request:
```js
// Just an example, replace it with the actual ones
const seed = 'SA4CAMSMX6CRAC4XPUPUDAC5VYSFQRWEEFDBVBEDIIRWNEHDYAX5OHMC'
const email = 'example@mail.com'

const keypair = base.Keypair.fromSecret()
const accountId = keypair.accountId()

apiCaller.useWallet(new Wallet(email, keypair, accountId))
```

3. Your asset may need the logotype. Let's suppose that your app have the file field, where user can upload the image:

```html
<input type="file" id="#token-logo">
```

Simply attach the listener to the field to handle image upload

```js
const field = document.getElementById('token-logo')
field.addEventListener('change', handleImageUpload)
```

4. Now to save the image in TokenD storage you need some magic:

After simply deriving raw file from field event

```js
async function handleImageUpload (event) {
  const file = event.target.files[0]
}
```

use `DocumentsManager` instance created before to upload a file:

```js
async function handleImageUpload (event) {
  const file = event.target.files[0]
  const documentKey = await documentsManager.uploadDocument({
    // document policy, may be public or private
    type: 'general_public',
    // MIME-type of the file to upload
    mimeType: file.type,
    // The file itself
    file,
  })

  return documentKey
}
```
5. Now you can create the asset itself. For doing this, create the operation:

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
  // Amount of pre issued assets available after creation of the asset
  initialPreissuedAmount: '100000',
  // Count of digits after the comma
  trailingDigitsCount: 6,
  creatorDetails: {
    // Asset name
    name: 'My first asset',
    logo: {
      // The document key you've derived before
      key: documentKey
    }
  }
})
```

5. Post operation using `ApiCaller` instance:

```js
const txResponse = await apiCaller.postOperations(operation)
```
