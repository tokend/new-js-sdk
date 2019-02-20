# Changelog

## Unreleased

### Added

* Manage account rule and role operations builder

### Changed

* Rename update kyc request to change role request
* Renamed fields with names like `details` to `creatorDetails` according to new XDR structs
    * `createAmlAlert (opts)`:
        * field `opts.reason -> opts.creatorDetails`
    * `createAmlAlertToObject (result, attrs)`:
        * field `result.reason -> result.details`
    * `createASwapBidCreationRequest (opts)`:
        * field `opts.details -> opts.creatorDetails`
    * `createASwapBidCreationRequestToObject (result, attrs)`:
        * field `result.details -> result.creatorDetails`
    * `createASwapRequest (opts)`:
        * introduced required field `opts.creatorDetails`
    * `createASwapRequestToObject (result, attrs)`:
        * introduced field `result.creatorDetails`
    * `createIssuanceRequest (opts)`: // TODO in another branch
        * field `opts.externalDetails -> opts.creatorDetails` 
    * `createIssuanceRequestToObject (result, attrs)`: // TODO in another branch
        * field `result.externalDetails -> result.creatorDetails`
    * `createChangeRoleRequest (opts)`: // TODO in another branch
        * field `opts.kycData -> opts.creatorDetails`
    * `createChangeRoleRequestOpToObject (result, attrs)`
        * field `result.kycData -> result.creatorDetails`
    * `createWithdrawWithAutoConversion (opts)`:
        * field `opts.externalDetails -> opts.creatorDetails` 
    * `createWithdrawalRequestOpToObject (result, attrs)`:
        * field `result.externalDetails -> result.creatorDetails`
    * `assetCreationRequest (opts)`:
        * field `opts.details -> opts.creatorDetails`
    * `assetUpdateRequest (opts)`:
        * field `opts.details -> opts.creatorDetails`
    * `manageAssetToObject (result, attrs)`:
        * field `opts.reason -> opts.creatorDetails`
    * `createUpdateSaleDetailsRequest (opts)`:
        * field `opts.newDetails -> opts.creatorDetails` // TODO in new branch
    * `manageSaleToObject (result, attrs)`: // TODO in new branch
        * field `result.newDetails -> result.creatorDetails`
    * `createPreIssuanceRequestOp (opts)`: // TODO in new branch
        * introduced field `opts.creatorDetails` 
    * `preIssuanceRequestOpToObject (result, attrs)`: // TODO in new branch
        * introduced field `result.creatorDetails`
    * `reviewWithdrawRequest (opts)`:
        * fields `opts.tasksToAdd, opts.TasksToRemove, opts.externalDetails`
          composed into the object `opts.reviewDetails`:
          `opts.tasksToAdd -> opts.reviewDetails.tasksToAdd` and so on
    * `createSaleCreationRequest (opts)`: 
        * field `opts.details -> opts.creatorDetails`
    * `crateSaleCreationRequestToObject (result, attrs)`:
        * field `result.details -> result.creatorDetails`
    * `PreIssuanceRequest.build (opts)`: 
        * introduced required field `result.creatorDetails`

* Renamed request types:
    * `xdr.ReviewableRequestType.preIssuanceCreate -> xdr.ReviewableRequestType.createPreIssuance`
    * `xdr.ReviewableRequestType.issuanceCreate -> xdr.ReviewableRequestType.createIssuance`
    * `xdr.ReviewableRequestType.withdraw -> xdr.ReviewableRequestType.createWithdraw`
    * `xdr.ReviewableRequestType.sale -> xdr.ReviewableRequestType.createSale`
    * `xdr.ReviewableRequestType.limitsUpdate -> xdr.ReviewableRequestType.updateLimit`
    * `xdr.ReviewableRequestType.amlAlert -> xdr.ReviewableRequestType.createAmlAlert`
    * `xdr.ReviewableRequestType.updateKyc -> xdr.ReviewableRequestType.changeRole`
    * `xdr.ReviewableRequestType.updateSaleDetail -> xdr.ReviewableRequestType.updateSaleDetail`
    * `xdr.ReviewableRequestType.assetCreate -> xdr.ReviewableRequestType.createAsset`
    * `xdr.ReviewableRequestType.invoice -> xdr.ReviewableRequestType.createInvoice`
    * `xdr.ReviewableRequestType.contract -> xdr.ReviewableRequestType.manageContract`
    * `xdr.ReviewableRequestType.assetUpdate -> xdr.ReviewableRequestType.updateAsset`
    * `xdr.ReviewableRequestType.createAtomicSwapBid -> xdr.ReviewableRequestType.createAtomicSwapBid`
    * `xdr.ReviewableRequestType.atomicSwap -> xdr.ReviewableRequestType.createAtomicSwap`
     
### Deprecated

* payout
* manage contract and invoices

### Removed

### Fixed

### Security
