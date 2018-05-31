# Swarm JS SDK

## Overview

**Swarm JS SDK** is a client-side Javascript library for Swarm tokenization platform.

## Getting Started

1. Add Swarm SDK to your project:

    ```sh
    npm install -S swarm-sdk
    ```

1. Create an SDK instance:

    ```js
    import { Swarm } from 'swarm-sdk'

    let sdk = await Swarm.create('https://backend.swarm.com')
    ```

1. Grab your Swarm wallet:

    ```js
    let wallet = await sdk.api.wallets.get('my@email.com', '<my password>')
    sdk.useWallet(wallet)
    ```

1. Read the [docs](https://swarm.gitlab.io/new-js-sdk/index.html) and tokenize your assets!

## Development

Check out our [Development Guide](https://swarm.gitlab.io/new-js-sdk/index.html#development-guide).

## License

swarm-js-sdk is licensed under an [Apache-2.0 license](./LICENSE).
