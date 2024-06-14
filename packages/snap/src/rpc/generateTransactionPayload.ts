/* eslint-disable no-useless-catch */
// import type { ApiPromise } from '@polkadot/api/';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { TxPayload } from '@availproject/metamask-avail-types';
import type { ApiPromise } from 'avail-js-sdk';
import { getAddress } from './getAddress';

export async function generateTransactionPayload(
  api: ApiPromise,
  to: string,
  amount: string | number
): Promise<TxPayload> {
  console.log('generateTransactionPayload', to, amount);
  try {
    // fetch last signed block and account address
    const [signedBlock, address] = await Promise.all([api.rpc.chain.getBlock(), getAddress()]);

    // create signer options
    const nonce = (await api.derive.balances.account(address)).accountNonce;
    const signerOptions = {
      blockHash: signedBlock.block.header.hash,
      era: api.createType('ExtrinsicEra', {
        current: signedBlock.block.header.number,
        period: 50
      }),
      nonce
    };

    // define transaction method
    // const _amount = formatNumberToBalance(parseFloat(amount.toString()));// eslint-disable-next-line prettier/prettier

    const data: SubmittableExtrinsic<'promise'> = api.tx.balances.transferKeepAlive(
      to,
      String(amount)
    );
    console.log('data', data);
    const signerPayload = api.createType('SignerPayload', {
      genesisHash: api.genesisHash,
      runtimeVersion: api.runtimeVersion,
      version: api.extrinsicVersion,
      ...signerOptions,
      address: to,
      blockNumber: signedBlock.block.header.number,
      method: data.method,
      signedExtensions: [],
      transactionVersion: data.version
    });

    return {
      payload: signerPayload.toPayload(),
      tx: data.toHex()
    };
  } catch (error) {
    throw error;
  }
}
