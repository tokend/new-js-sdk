# JS SDK

#### Table of content:

1. [Overview](#overview)
1. [Quick start](#quick-start)
1. [Install](#install)
1. [Documentation](./docs/README.md)
1. [Development](#development)

## Overview
**JS SDK** is a client-side Javascript library for TokenD. It is used for building apps either on Node.js or in the browser.

It provides:
- a networking layer API for Horizon endpoints.
- facilities for building and signing transactions, for communicating with the Horizon instance, and for submitting transactions or querying network history.


> **Warning!** Node version of this package is using [`ed25519`](https://www.npmjs.com/package/ed25519) package, a native implementation of [Ed25519](https://ed25519.cr.yp.to/) in Node.js, as an [optional dependency](https://docs.npmjs.com/files/package.json#optionaldependencies). This means that if for any reason installation of this package fails, `js-base` (and `js-sdk`) will fallback to the much slower implementation contained in [`tweetnacl`](https://www.npmjs.com/package/tweetnacl).
>
> If you are using `js-sdk` in a browser you can ignore this. However, for production backend deployments you should definitely be using `ed25519`. If `ed25519` is successfully installed and working `SDK.FastSigning` variable will be equal `true`. Otherwise it will be `false`.

## Install

#### Help! I'm having trouble installing the SDK on Windows

Unfortunately, the Stellar platform development team mostly works on OS X and Linux, and so sometimes bugs creep through that are specific to windows.  When installing js-sdk on windows, you might see an error that looks similar to the following:

```shell
error MSB8020: The build tools for v120 (Platform Toolset = 'v120 ') cannot be found. To build using the v120 build tools, please install v120 build tools.  Alternatively, you may upgrade to the current Visual Studio tools by selecting the Project menu or right-click the solution, and then selecting "Retarget solution"
```

To resolve this issue, you should upgrade your version of nodejs, node-gyp and then re-attempt to install the offending package using `npm install -g --msvs_version=2015 ed25519`.  Afterwards, retry installing stellar-sdk as normal.

In the event the above does not work, please join us on our community slack to get help resolving your issue.


## Development

1. `gem install rake bundler`
2. `bundle`
3. `rake xdr:update`

## License
js-sdk is licensed under an Apache-2.0 license.
