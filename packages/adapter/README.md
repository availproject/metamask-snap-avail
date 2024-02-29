# Metamask <> Avail snap adapter
![](https://github.com/availproject/metamask-snap-avail/workflows/ci/badge.svg)
![](https://img.shields.io/github/license/availproject/metamask-snap-avail)
![](https://img.shields.io/badge/yarn-%3E%3D1.17.0-orange.svg?style=flat-square)
![Discord](https://img.shields.io/discord/608204864593461248?color=blue&label=Discord&logo=discord)

Metamask <> Avail snap adapter is used to inject [avail snap](https://github.com/availproject/metamask-snap-avail) as web3 provider. It lists snap inside `window.injectedWeb3["metamask-avail-snap"]` so it can be enabled using `@availproject/extension-dapp` package.  

For more details on avail snap itself see [snap repo](https://github.com/availproject/metamask-snap-avail).

## Usage

Adapter has only one exposed function for enabling snap as web3 provider.

```typescript
function enableAvailSnap(
  config?: SnapConfig,
  snapOrigin?: string,
  snapInstallationParams?: Record<SnapInstallationParamNames, unknown> = {}
): Promise<MetamaskAvailSnap>
```

By providing `config` as argument it is possible to override default configurations.

Configuration structure is shown below.

```
SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

SnapNetworks = "avail";

UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl?: string;
}
```

