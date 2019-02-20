# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Please check our [developers guide](https://gitlab.com/tokend/developers-guide)
for further information about branching and tagging conventions.

## Unreleased

### Added

* Manage singer and create account builders

### Changed

* Squashed ledger version;
* Rename update kyc request to change role request

### Deprecated

* payout
* manage contract and invoices

### Removed

* Payment and Direct Debit Operations
* SetOptions and ManageAccount operations

## [1.0.0-x.8] - 2019-02-9
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

[Unreleased]: https://github.com/tokend/new-js-sdk/compare/1.0.0-x.8...HEAD
[1.0.0-x.8]: https://github.com/tokend/new-js-sdk/compare/0.3.33...1.0.0-x.8
[0.3.33]: https://github.com/tokend/new-js-sdk/compare/0.3.32...0.3.33
[0.3.32]: https://github.com/tokend/new-js-sdk/compare/0.3.31...0.3.32
[0.3.31]: https://github.com/tokend/new-js-sdk/compare/0.3.30...0.3.31
