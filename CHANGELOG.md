# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Please check our [developers guide](https://gitlab.com/tokend/developers-guide)
for further information about branching and tagging conventions.

## [Unreleased]
### Added
- Manage account specific rule builder

### Changed
- Use XDR version 3.3.0-x.0

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

[Unreleased]: https://github.com/tokend/new-js-sdk/compare/1.6.0-rc.0...HEAD
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
