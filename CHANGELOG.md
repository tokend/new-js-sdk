# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Please check our [developers guide](https://gitlab.com/tokend/developers-guide)
for further information about branching and tagging conventions.

## [1.14.0-rc.26] - 2022-05-12
### Added
- Burning invite code when creating a wallet

## [1.14.0-rc.25] - 2022-02-23
### Removed
- ed25519 lib

## [1.14.0-rc.24] - 2021-12-03
### Changed
- The `endpoint` field is now optional for `.call()` to make it possible accept
  a ready-to-use endpoint with `baseUrl` only.

## [1.14.0-rc.23] - 2021-10-21
### Fixed
- Add custom poll type and vote type

## [1.14.0-rc.22] - 2021-09-30
### Fixed
- Method createAMLAlert now adds 'allTasks' field to the operation body

## [1.14.0-rc.21] - 2021-09-24
### Changed
- Method `ApiCaller.prototype.call()` now accepts optional `headers`,
  `withCredentials` and `baseUrl` parameters
### Removed
- Method `ApiCaller.prototype.postOperationsToSpecificEndpoint()`
  Use `ApiCaller.prototype.postOperationsParametrized()` instead

## [1.14.0-rc.20] - 2021-09-22
## [1.14.0-rc.19] - 2021-09-22
### Fixed
- Added endpoint validation

## [1.14.0-rc.18] - 2021-09-21
### Changed
- Methods `ApiCaller.prototype.postOperationsParametrized()` and
  `ApiCaller.prototype.postTxEnvelope()` now accept `jsonApi` param, which
  wraps the body to JSON API style.

## [1.14.0-rc.17] - 2021-09-17
### Added
- Method `ApiCaller.prototype.postOperationsParametrized()`

### Changed
- `ApiCaller.prototype._call()` now throws an error if needSign is set, but no
  wallet found to sign the request.

## [1.14.0-rc.16] - 2021-07-22
### Added
- Function `updateSaleTime` in `src/base/operations/manage_sale_builder.js`

### Fixed
- Unit tests

## [1.14.0-rc.15] - 2021-06-02
#### Added
- Function `signTransaction` in `api-caller.js`

## [1.14.0-rc.14] - 2021-05-24
#### Added
- Two arguments to function `signAndSendTransaction` to have opportunity send the endpoint
#### Fixed
- Tests execution time
- Some test issues

## [1.14.0-rc.13] - 2021-02-08
#### Added
- Ability to add additional keypairs during change password with WalletManager
#### Changed
- Data type 'value' passed to ManageKeyValueBuilder

## [1.14.0-rc.12] - 2021-01-12
### Fixed
- Uploading documents with DocumentManager by Node.js

## [1.14.0-rc.11] - 2021-01-11

## [1.14.0-rc.10] - 2021-01-08
### Changed
- `account_id` header -> `Account-Id`

## [1.14.0-rc.9] - 2020-12-11
### Fixed
- Backward compatibility for signing requests

## [1.14.0-rc.8] - 2020-12-09
### Added
- Ability to submit form data
### Changed
- Auth header for request contains account ID of wallet

## [1.14.0-rc.7] - 2020-10-06
### Added
- Deferred payments

## [1.14.0-rc.6] - 2020-10-06
### Added
- To Wallet:
  - `switchSigningKeypair()`
  - `keypairs` and `nonSigningKeypairs` getters
  - static and instance `clone()`
- To WalletsManager:
  - `changeEmail()`

### Changed
- Exposed `getSigners()` of SignersManager

## [1.14.0-rc.5] - 2020-10-05
### Fixed
- An issue with missing `manageBalance`, `manageAssetPair` and
  `createSaleRequest` operations decoding

## [1.14.0-rc.4] - 2020-10-05
### Added
- Login rejection functionality

### Fixed
- A bug with the omitted key chain seeds if the `seed` property present

### Changed
- Now default signer can be provided on the wallet creation

## [1.14.0-rc.3] - 2020-09-04
## Added
- Create, update, remove data reviewable requests

## [1.14.0-rc.2] - 2020-08-07
### Fixed
- A bug with removed enums.cost

## [1.14.0-rc.1] - 2020-07-29
### Added
- Create, update, remove data builders
- gitignore lib, dist

## [1.14.0-rc.0] - 2020-07-16
### Added
- `Document` and `upload-documents`
- `VerificationManager` helper
- Ability to save a few keys to key storage

## [1.13.1] - 2020-07-16

## [1.13.1-rc.0] - 2020-06-02
### Changed
- Subject size from 256 to 1000

## [1.13.0] - 2020-04-13

## [1.13.0-rc.0] - 2020-04-02
### Added
- Builder for `ManageSignerRoleOp`

## [1.12.2] - 2020-03-02

### Added

* Creator details to payment and offer reviewable requests

## [1.12.1] - 2019-12-23
### Fixed
- A bug when user with status 'unregistered' get other account id at registration

## [1.12.0] - 2019-12-16
### Added
- Redemption reviewable request

## [1.11.4] - 2020-04-13
### Added
- Global export 'Signer' class

## [1.11.3] - 2019-12-04
### Added
- `signAndSendTransaction` method in to api-caller

### Changed
- Regerate xdr, based on github.com/tokend/xdr/pull/91

## [1.11.2] - 2019-11-18
### Fixed
- A bug with getting requestUrl in `sign-request`

## [1.11.1] - 2019-10-25
### Fixed
- A bug with seed recovery flow

## [1.11.0] - 2019-10-24

## [1.11.0-rc.0] - 2019-10-24
### Added
- Create wallet with signers
- Integration test for create and recovery wallet

## [1.10.3] - 2019-10-12

## [1.10.3-rc.1] - 2019-10-03
### Added
- `getBuildedTransaction` method in to api-caller
- `needSetSourceAccount` attribute in to payment method(Payment builder)

## [1.10.3-rc.0] - 2019-10-01
### Added
- Export `RemoveAssetOpBuilder`

## [1.10.2] - 2019-09-26
### Fixed
- tests for atomic swaps
- tests for swaps

## [1.10.2-rc.1] - 2019-09-19
### Added
- Builder for `OpenSwapOp`
- Unit tests for `OpenSwapOp`
- Builder for `CloseSwapOp`
- Unit tests for `CloseSwapOp`
- Integration tests for `Swap`

### Fixed
- Integration tests

## [1.10.2-rc.0] - 2019-09-16
### Added
- Builder for `RemoveAssetOp`
- Unit tests for `RemoveAssetOp`
- Integration tests for `RemoveAssetOp`

## [1.10.1] - 2019-09-09

## [1.10.1-rc.0] - 2019-09-03
### Fixed
- Empty body in get request

## [1.10.0] - 2019-08-23

## [1.10.0-rc.0] - 2019-08-16
### Added
- `postOperationsToSpecificEndpoint` in to api-caller

## [1.9.0] - 2019-08-12

## [1.9.0-rc.2] - 2019-07-26
#### Added
- v3 endpoint to transactions

## [1.9.0-rc.1] - 2019-07-16
#### Security
- Resolved an issue with outdated lodash version

## [1.9.0-rc.0] - 2019-07-11
### Added
- `kycRecovery` to `WalletsManager`
- `encryptSecretSeed`,`decryptSecretSeed` and `deriveSessionKey` methods to
  crypto.js
- `sessionId` and `sessionKey` arguments for constructor of `Wallet` class

## [1.9.0-x.0] - 2019-07-01
### Added
- `validateWithoutSnakeCased` flag for validators `validateCreatorDetails` method

## [1.8.0] - 2019-06-22

## [1.8.0-rc.1] - 2019-06-17
### Added
- `isEmptyBodyAllowed` flag for api-caller `_call` method

## [1.8.0-rc.0] - 2019-06-06
### Added
- Integration test for atomic swap
- Builders for `InitiateKYCRecovery`, `CreateKYCRecoveryRequest`,
  `RemoveAssetPairOp`
- Unit tests for for `InitiateKYCRecovery`, `CreateKYCRecoveryRequest`,
  `RemoveAssetPairOp`
- Integration tests for `CreateKYCRecoveryRequest`, `CreateKYCRecoveryRequest`
- `ApiCaller#withBaseURL` method

### Changed
- Now using xdr version 3.4.0-x.0
- Updated package.json dependencies to the latest, except of `bignumber`

### Fixed
- operation builders related to atomic swap

## [1.7.0] - 2019-06-03

## [1.7.0-rc.2] - 2019-05-30
### Fixed
- Transaction error parsing if no messages are provided
- Bug with deprecated `requestDetails` field of
  `ReviewRequestBuilder#reviewWithdrawRequest`. Now this field be set
  automatically under the hood

## [1.7.0-rc.1] - 2019-05-21
### Changed
- Now an empty object on creator details validator is allowed

## [1.7.0-rc.0] - 2019-05-21
### Added
- Validators for specified types:
  - Undefined
  - Array
  - String
  - Public key
  - Secret key
  - Balance key
  - Int64 amount
  - Asset code
  - XDR enum type
  - Creator details
- Check for spaces in `BaseOperation.isValidString`
- `DocumentsManager` class to encapsulate creating document's config &
  uploading a file to the storage

### Changed
- api-caller method `deleteWithSignature` params
- api-caller method `delete` params

### Updated
- Now using new validators in `CreateIssuanceRequestBuilder`

### Fixed
- `BaseOperation.isValidAsset` method, now it accepts only alphanumeric
  symbols

## [1.7.0-x.2] - 2019-05-15
### Added
- Method `useBaseURL` to api-caller
- Method `useNetworkDetails` to api-caller
- Method `withWallet` to api-caller
- Method `useApi` to factors-manager
- Method `useApi` to wallet-manager

## [1.7.0-x.1] - 2019-05-07
### Added
- New managers classes for encapsulating actions with wallets,
  factors, and change signers operations:
  - `WalletsManager`
  - `FactorsManager`
  - `SignersManager`

### Changed
- Now using default axios instance in `ServerErrorBase` constructor
  if there are no passed one

## [1.7.0-x.0] - 2019-05-07
### Added
- Manage account specific rule builder
- Release sanity check script

### Changed
- Use XDR version 3.3.0-x.0

## [1.6.0] - 2019-05-07

## [1.6.0-rc.0] - 2019-05-02
### Added
- Builders for `CancelPollOp`, `UpdatePollEndTime`
- Unit tests for for `CancelPollOp`, `UpdatePollEndTime`
- Integration tests for `CancelPollOp`, `UpdatePollEndTime`

### Changed
- Use XDR version 3.2.0

## [1.6.0-x.0] - 2019-04-26
### Added
- `DELETE` method for ApiCaller

### Fixed
- Parsing transaction errors without operation details
- Wallet verification request payload

## [1.5.0] - 2019-04-19

## [1.5.0-rc.1] - 2019-04-19
### Added
- `getRaw` method & `networkDetails` getter to API caller

## [1.5.0-rc.0] - 2019-04-19
### Added
- `BLOB_TYPES` constant

## [1.4.4] - 2019-04-15
### Fixed
- Param `referrerId` in create wallet POST request

## [1.4.3] - 2019-04-08
### Added
- Added `errorResults` getter for `TransactionError` to simplify deriving operation error codes and messages

## [1.4.2] - 2019-04-05
### Fixed
- Add missing `referrerId` arg to `wallets.create()`

## [1.4.1] - 2019-04-04
### Fixed
- Repository link in package.json

## [1.4.0] - 2019-04-03
### Fixed
- Use XDR version 3.1.1 (add pollID in result of create `CREATE_POLL` request)

## [1.4.0-rc.0] - 2019-03-30
### Added
- Voting:
  - ManageCreatePollRequestBuilder
  - ManagePollBuilder
  - ManageVoteBuilder
  - Integration tests for voting

### Changed
- Use XDR version 3.1.0

## [1.3.1-x.2] - 2019-03-21
### Added
- New "bravo" blob type

## [1.3.1-x.1] - 2019-03-14
### Added
- Error codes for set fee op and op related to limits https://github.com/tokend/xdr/pull/43/files

### Changed
- Use XDR version 3.0.1-x.0

### Fixed
- Use deserialize cache stub when creating a `Jsona` instance
- Integration tests

## [1.3.0] - 2019-03-01

[Unreleased]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.25...HEAD
[1.14.0-rc.25]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.24...1.14.0-rc.25
[1.14.0-rc.24]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.23...1.14.0-rc.24
[1.14.0-rc.23]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.22...1.14.0-rc.23
[1.14.0-rc.22]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.21...1.14.0-rc.22
[1.14.0-rc.21]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.20...1.14.0-rc.21
[1.14.0-rc.20]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.19...1.14.0-rc.20
[1.14.0-rc.19]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.18...1.14.0-rc.19
[1.14.0-rc.18]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.17...1.14.0-rc.18
[1.14.0-rc.17]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.16...1.14.0-rc.17
[1.14.0-rc.16]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.15...1.14.0-rc.16
[1.14.0-rc.15]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.14...1.14.0-rc.15
[1.14.0-rc.14]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.13...1.14.0-rc.14
[1.14.0-rc.13]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.12...1.14.0-rc.13
[1.14.0-rc.12]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.11...1.14.0-rc.12
[1.14.0-rc.11]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.10...1.14.0-rc.11
[1.14.0-rc.10]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.9...1.14.0-rc.10
[1.14.0-rc.9]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.8...1.14.0-rc.9
[1.14.0-rc.8]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.7...1.14.0-rc.8
[1.14.0-rc.7]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.6...1.14.0-rc.7
[1.14.0-rc.6]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.5...1.14.0-rc.6
[1.14.0-rc.5]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.4...1.14.0-rc.5
[1.14.0-rc.4]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.3...1.14.0-rc.4
[1.14.0-rc.3]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.2...1.14.0-rc.3
[1.14.0-rc.2]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.1...1.14.0-rc.2
[1.14.0-rc.1]: https://github.com/tokend/new-js-sdk/compare/1.14.0-rc.0...1.14.0-rc.1
[1.14.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.13.1...1.14.0-rc.0
[1.13.1]: https://github.com/tokend/new-js-sdk/compare/1.13.1-rc.0...1.13.1
[1.13.1-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.13.0...1.13.1-rc.0
[1.13.0]: https://github.com/tokend/new-js-sdk/compare/1.13.0-rc.0...1.13.0
[1.13.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.12.2...1.13.0-rc.0
[1.12.2]: https://github.com/tokend/new-js-sdk/compare/1.12.1...1.12.2
[1.12.1]: https://github.com/tokend/new-js-sdk/compare/1.12.0...1.12.1
[1.12.0]: https://github.com/tokend/new-js-sdk/compare/1.11.4...1.12.0
[1.11.4]: https://github.com/tokend/new-js-sdk/compare/1.11.3...1.11.4
[1.11.3]: https://github.com/tokend/new-js-sdk/compare/1.11.2...1.11.3
[1.11.2]: https://github.com/tokend/new-js-sdk/compare/1.11.1...1.11.2
[1.11.1]: https://github.com/tokend/new-js-sdk/compare/1.11.0...1.11.1
[1.11.0]: https://github.com/tokend/new-js-sdk/compare/1.11.0-rc.0...1.11.0
[1.11.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.10.3...1.11.0-rc.0
[1.10.3]: https://github.com/tokend/new-js-sdk/compare/1.10.3-rc.1...1.10.3
[1.10.3-rc.1]: https://github.com/tokend/new-js-sdk/compare/1.10.3-rc.0...1.10.3-rc.1
[1.10.3-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.10.2...1.10.3-rc.0
[1.10.2]: https://github.com/tokend/new-js-sdk/compare/1.10.2-rc.1...1.10.2
[1.10.2-rc.1]: https://github.com/tokend/new-js-sdk/compare/1.10.2-rc.0...1.10.2-rc.1
[1.10.2-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.10.1...1.10.2-rc.0
[1.10.1]: https://github.com/tokend/new-js-sdk/compare/1.10.1-rc.0...1.10.1
[1.10.1-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.10.0...1.10.1-rc.0
[1.10.0]: https://github.com/tokend/new-js-sdk/compare/1.10.0-rc.0...1.10.0
[1.10.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.9.0...1.10.0-rc.0
[1.9.0]: https://github.com/tokend/new-js-sdk/compare/1.9.0-rc.2...1.9.0
[1.9.0-rc.2]: https://github.com/tokend/new-js-sdk/compare/1.9.0-rc.1...1.9.0-rc.2
[1.9.0-rc.1]: https://github.com/tokend/new-js-sdk/compare/1.9.0-rc.0...1.9.0-rc.1
[1.9.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.9.0-x.0...1.9.0-rc.0
[1.9.0-x.0]: https://github.com/tokend/new-js-sdk/compare/1.8.0...1.9.0-x.0
[1.8.0]: https://github.com/tokend/new-js-sdk/compare/1.8.0-rc.1...1.8.0
[1.8.0-rc.1]: https://github.com/tokend/new-js-sdk/compare/1.8.0-rc.0...1.8.0-rc.1
[1.8.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.7.0...1.8.0-rc.0
[1.7.0]: https://github.com/tokend/new-js-sdk/compare/1.7.0-rc.2...1.7.0
[1.7.0-rc.2]: https://github.com/tokend/new-js-sdk/compare/1.7.0-rc.1...1.7.0-rc.2
[1.7.0-rc.1]: https://github.com/tokend/new-js-sdk/compare/1.7.0-rc.0...1.7.0-rc.1
[1.7.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.7.0-x.2...1.7.0-rc.0
[1.7.0-x.2]: https://github.com/tokend/new-js-sdk/compare/1.7.0-x.1...1.7.0-x.2
[1.7.0-x.1]: https://github.com/tokend/new-js-sdk/compare/1.7.0-x.0...1.7.0-x.1
[1.7.0-x.0]: https://github.com/tokend/new-js-sdk/compare/1.6.0...1.7.0-x.0
[1.6.0]: https://github.com/tokend/new-js-sdk/compare/1.6.0-rc.0...1.6.0
[1.6.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.6.0-x.0...1.6.0-rc.0
[1.6.0-x.0]: https://github.com/tokend/new-js-sdk/compare/1.5.0...1.6.0-x.0
[1.5.0]: https://github.com/tokend/new-js-sdk/compare/1.5.0-rc.1...1.5.0
[1.5.0-rc.1]: https://github.com/tokend/new-js-sdk/compare/1.5.0-rc.0...1.5.0-rc.1
[1.5.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.4.4...1.5.0-rc.0
[1.4.4]: https://github.com/tokend/new-js-sdk/compare/1.4.3...1.4.4
[1.4.3]: https://github.com/tokend/new-js-sdk/compare/1.4.2...1.4.3
[1.4.2]: https://github.com/tokend/new-js-sdk/compare/1.4.1...1.4.2
[1.4.1]: https://github.com/tokend/new-js-sdk/compare/1.4.0...1.4.1
[1.4.0]: https://github.com/tokend/new-js-sdk/compare/1.4.0-rc.0...1.4.0
[1.4.0-rc.0]: https://github.com/tokend/new-js-sdk/compare/1.3.1-x.2...1.4.0-rc.0
[1.3.1-x.2]: https://github.com/tokend/new-js-sdk/compare/1.3.1-x.1...1.3.1-x.2
[1.3.1-x.1]: https://github.com/tokend/new-js-sdk/compare/1.3.0...1.3.1-x.1
[1.3.0]: https://github.com/tokend/new-js-sdk/releases/tag/1.3.0
