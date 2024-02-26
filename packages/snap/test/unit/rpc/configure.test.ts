import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { availConfiguration } from '../../../src/configuration/predefined';
import { configure } from '../../../src/rpc/configure';
import { EmptyMetamaskState } from '../../../src/interfaces';
import { SnapConfig } from '@avail/metamask-polkadot-types';
import { getWalletMock } from '../wallet.mock';

chai.use(sinonChai);

describe('Test rpc handler function: configure', function () {
  const walletStub = getWalletMock();

  afterEach(function () {
    walletStub.reset();
  });

  it('should set predefined avail configuration', async function () {
    walletStub.request.returns(EmptyMetamaskState());
    // tested method
    const result = await configure('avail', {});

    // assertions
    expect(result).to.be.deep.eq(availConfiguration);
  });

  it('should set custom configuration', async function () {
    walletStub.request.returns(EmptyMetamaskState());
    // stubs
    const customConfiguration: SnapConfig = {
      addressPrefix: 1,
      networkName: 'westend',
      unit: { customViewUrl: 'custom-view-url', decimals: 1, image: 'image', symbol: 'TST' },
      wsRpcUrl: 'ws-rpc-url'
    };
    // tested method
    const result = await configure('test-network', customConfiguration);
    // assertions
    expect(result).to.be.deep.eq(customConfiguration);
  });

  it('should set predefined kusama configuration with additional property override', async function () {
    walletStub.request.returns(EmptyMetamaskState());
    // tested method
    const customConfiguration = availConfiguration;
    customConfiguration.unit.symbol = 'AVAIL';
    const result = await configure('avail', {
      unit: { symbol: 'AVAIL' }
    } as SnapConfig);
    // assertions
    expect(result).to.be.deep.eq(customConfiguration);
  });
});
