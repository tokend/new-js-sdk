# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Please check our [developers guide](https://gitlab.com/tokend/developers-guide)
for further information about branching and tagging conventions.

## [Unreleased]

### Changed

- xdr revision

### Fixed
- accountRole field enveloping in setFees operation
- do not throw error if cannot parse errors in BadRequestError

## [1.0.0-x.15] - 2019-02-21
### Added
- `JsonapiResponse` exporting

### Changed
- `Wallets._getSigners` method according to the new API
- Rename PaymentV2 builder to Payment builder

### Fixed
- `makeChangeSignerTransaction` function according to the signer roles

## [1.0.0-x.14] - 2019-02-21
### Added
- KeyServerCaller

### Fixed
- Wallet.fromEncrypted in cases when you provide seed only

## [1.0.0-x.13] - 2019-02-21
### Added
- Limits & bind external system ID unit tests

### Fixed
- Create manage limits request builder

### Changed
- Use opts.creatorDetails in issuance request builder instead external details
- Renamed fields with names like `details` to `creatorDetails` according to new XDR structs
  - `createIssuanceRequest (opts)`:
    - field `opts.externalDetails -> opts.creatorDetails`
  - `createIssuanceRequestToObject (result, attrs)`:
    - field `result.externalDetails -> result.creatorDetails`
  - `createChangeRoleRequest (opts)`:
    - field `opts.kycData -> opts.creatorDetails`
  - `createChangeRoleRequestOpToObject (result, attrs)`
    - field `result.kycData -> result.creatorDetails`
  - `createUpdateSaleDetailsRequest (opts)`:
    - field `opts.newDetails -> opts.creatorDetails`
  - `manageSaleToObject (result, attrs)`:
    - field `result.newDetails -> result.creatorDetails`
  - `createPreIssuanceRequestOp (opts)`:
    - introduced field `opts.creatorDetails`
  - `preIssuanceRequestOpToObject (result, attrs)`:
    - introduced field `result.creatorDetails`


## [1.0.0-x.12] - 2019-02-20
### Added
- Manage singer and create account builders

### Changed
- Change asset pre issuer operation
- Squashed ledger version;
- Rename update kyc request to change role request
- Renamed fields with names like `details` to `creatorDetails` according to new XDR structs
  - `createAmlAlert (opts)`:
    - field `opts.reason -> opts.creatorDetails`
  - `createAmlAlertToObject (result, attrs)`:
    - field `result.reason -> result.details`
  - `createASwapBidCreationRequest (opts)`:
    - field `opts.details -> opts.creatorDetails`
  - `createASwapBidCreationRequestToObject (result, attrs)`:
    - field `result.details -> result.creatorDetails`
  - `createASwapRequest (opts)`:
    - introduced required field `opts.creatorDetails`
  - `createASwapRequestToObject (result, attrs)`:
    - introduced field `result.creatorDetails`
  - `createWithdrawWithAutoConversion (opts)`:
    - field `opts.externalDetails -> opts.creatorDetails`
  - `createWithdrawalRequestOpToObject (result, attrs)`:
    - field `result.externalDetails -> result.creatorDetails`
  - `assetCreationRequest (opts)`:
    - field `opts.details -> opts.creatorDetails`
  - `assetUpdateRequest (opts)`:
    - field `opts.details -> opts.creatorDetails`
  - `manageAssetToObject (result, attrs)`:
    - field `opts.reason -> opts.creatorDetails`
  - `reviewWithdrawRequest (opts)`:
    - fields `opts.tasksToAdd, opts.TasksToRemove, opts.externalDetails`
        composed into the object `opts.reviewDetails`:
        `opts.tasksToAdd -> opts.reviewDetails.tasksToAdd` and so on
  - `createSaleCreationRequest (opts)`:
    - field `opts.details -> opts.creatorDetails`
  - `crateSaleCreationRequestToObject (result, attrs)`:
    - field `result.details -> result.creatorDetails`
  - `PreIssuanceRequest.build (opts)`:
    - introduced required field `result.creatorDetails`

  - Renamed request types:
    - `xdr.ReviewableRequestType.preIssuanceCreate -> xdr.ReviewableRequestType.createPreIssuance`
    - `xdr.ReviewableRequestType.issuanceCreate -> xdr.ReviewableRequestType.createIssuance`
    - `xdr.ReviewableRequestType.withdraw -> xdr.ReviewableRequestType.createWithdraw`
    - `xdr.ReviewableRequestType.sale -> xdr.ReviewableRequestType.createSale`
    - `xdr.ReviewableRequestType.limitsUpdate -> xdr.ReviewableRequestType.updateLimit`
    - `xdr.ReviewableRequestType.amlAlert -> xdr.ReviewableRequestType.createAmlAlert`
    - `xdr.ReviewableRequestType.updateKyc -> xdr.ReviewableRequestType.changeRole`
    - `xdr.ReviewableRequestType.updateSaleDetail -> xdr.ReviewableRequestType.updateSaleDetail`
    - `xdr.ReviewableRequestType.assetCreate -> xdr.ReviewableRequestType.createAsset`
    - `xdr.ReviewableRequestType.invoice -> xdr.ReviewableRequestType.createInvoice`
    - `xdr.ReviewableRequestType.contract -> xdr.ReviewableRequestType.manageContract`
    - `xdr.ReviewableRequestType.assetUpdate -> xdr.ReviewableRequestType.updateAsset`
    - `xdr.ReviewableRequestType.createAtomicSwapBid -> xdr.ReviewableRequestType.createAtomicSwapBid`
    - `xdr.ReviewableRequestType.atomicSwap -> xdr.ReviewableRequestType.createAtomicSwap`

### Deprecated
- payout
- manage contract and invoices
- atomic swap

### Removed
- Payment and Direct Debit Operations
- SetOptions and ManageAccount operations


## [1.0.0-x.11] - 2019-02-20
### Fixed
- Fix issue of non-stringed external details of review request builder

## [1.0.0-x.10] - 2019-02-20
### Fixed
- Passing account ID to `Wallet.fromEncrypted` method
- Using object for `Wallet.fromEncrypted` method params

## [1.0.0-x.9] - 2019-02-20
### Fixed
- Deriving of account in Wallet.fromSeed()

## [1.0.0-x.8] - 2019-02-19
### Changed
- Squashed ledger version;

### Removed
- Payment and Direct Debit Operations

### Fix
- License

## [0.3.33] 2019-02-16
### Changed
- Freezed dependencies

## [0.3.32] 2019-02-16
### Added
- Add horizon.public.getEmailByAccountId() method

## [0.3.31] 2019-02-14

### Added
- Ability to getting info about private user docs

### Fixed
- Change password method

[Unreleased]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.15...HEAD
[1.0.0-x.15]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.14...1.0.0-x.15
[1.0.0-x.14]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.13...1.0.0-x.14
[1.0.0-x.13]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.12...1.0.0-x.13
[1.0.0-x.12]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.11...1.0.0-x.12
[1.0.0-x.11]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.10...1.0.0-x.11
[1.0.0-x.10]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.9...1.0.0-x.10
[1.0.0-x.9]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.8...1.0.0-x.9
[1.0.0-x.8]: https://github.com/tokend/new-js-sdk/compare/0.3.33...1.0.0-x.8
[0.3.33]: https://github.com/tokend/new-js-sdk/compare/0.3.32...0.3.33
[0.3.32]: https://github.com/tokend/new-js-sdk/compare/0.3.31...0.3.32
[0.3.31]: https://github.com/tokend/new-js-sdk/compare/0.3.30...0.3.31
