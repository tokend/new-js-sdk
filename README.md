# TokenD JS SDK

## Overview

**TokenD JS SDK** is a client-side Javascript library for TokenD.

## Getting Started

1. Add TokenD SDK to your project:

```sh
npm install -S tokend-sdk
```

2. Create an SDK instance:

```js
import { TokenD } from 'tokend-sdk'

let sdk = await TokenD.create('https://backend.tokend.com')
```

3. Grab your TokenD wallet:

```js
let wallet = await sdk.api.wallets.get('my@email.com', '<my password>')
sdk.useWallet(wallet)
```

4. Read the [docs](./docs.readme.md) and tokenize your assets!

## Development

Check out our [Development Guide](./docs/development.md).

## License

tokend-js-sdk is licensed under an [Apache-2.0 license](./LICENSE).
