# Changelog

All notable changes to this project will be documented in this file.


## [Unreleased]


### SNAP 
This snap is the package that any dapp would use to integrate avail-snap as a web3-provider.

### Added

- The snap was previously hardcoded to just handle balances.transfer extrinsic calls, now it takes the extrinsic call data as a param, so we could use the snap package for our bridge and staking ui.
- Added fee calculations for extrinsic calls.   

### Changed

- Fixed network switcher to support turing and goldberg.
- Fixed the returned transactions object stored on snap side.
- Fixed types for transactions + extrinsic calls params.


### ADAPTER
The adapter injects the snap as a web3provider, basically triggers the metamask popups.
  
### Changed

- Fixed network switcher to support turing and goldberg.
- Fixed types for transactions + extrinsic calls params.


### AVAIL WALLET UI
This is a that dapp that uses the snap to do extrinsic calls, such as balance transfers, and shows transactions on the UI.


### Added

- Transaction refetching logic whenever a new transaction is initaited.
- Transaction segregation based on the network switches.
- UI changes.


### Changed

- Fixed balance refetching slow on network change.
- Fixed hooks.



