# TokenD JS SDK

## Overview

**TokenD JS SDK** is a client-side Javascript library for TokenD tokenization platform.

## Changelog

All notable changes to this project will be documented in [this file](./changelog.md). This project adheres to Semantic Versioning.

## Getting Started

1. Add TokenD SDK to your project:

    ```sh
    npm install -S @tokend/js-sdk
    ```

1. Create an SDK instance:

    ```js
    import { TokenD } from '@tokend/js-sdk'

    let sdk = await TokenD.create('https://backend.tokend.com')
    ```

1. Grab your TokenD wallet:

    ```js
    let wallet = await sdk.api.wallets.get('my@email.com', '<my password>')
    sdk.useWallet(wallet)
    ```

1. Read the [docs](https://tokend.github.io/new-js-sdk/) and tokenize your assets!

## Development

Check out our [Development Guide](https://tokend.github.io/new-js-sdk/#development-guide).

## License

tokend-js-sdk is licensed under an [Apache-2.0 license](./LICENSE).
