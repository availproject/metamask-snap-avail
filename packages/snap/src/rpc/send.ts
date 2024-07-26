import type { Extrinsic, Transaction, TxPayload } from '@avail-project/metamask-avail-types';
import type { ApiPromise } from 'avail-js-sdk';
import type { AnyJson } from '@polkadot/types/types';
import { saveTxToState } from '../avail/tx';
import { getAddress } from './getAddress';

export async function send(
  api: ApiPromise,
  signature: Uint8Array | `0x${string}`,
  txPayload: TxPayload,
  network: number
): Promise<Transaction> {
  try {
    const sender = await getAddress();

    const extrinsic = api.createType('Extrinsic', txPayload.tx);
    extrinsic.addSignature(sender, signature, txPayload.payload);
    console.log('extrinsic', extrinsic.toHuman());

    const extrinsicData: AnyJson = api.tx(txPayload.tx).toHuman();
    const typedExtrinsic = extrinsicData as Extrinsic;

    const paymentInfo = await api.tx(txPayload.tx).paymentInfo(sender);

    const txHash = await api.rpc.author.submitExtrinsic(extrinsic);

    // await api.rpc.chain.subscribeFinalizedHeads(async (lastHeader) => {
    //   const blockHash = lastHeader.hash.toHex();
    //   const block = await api.rpc.chain.getBlock(blockHash);
    //   const extrinsics = block.block.extrinsics;
    //   for (let index = 0; index < extrinsics.length; index++) {
    //     const ext = extrinsics[index];
    //     if (ext.hash.toHex() === txHash.toHex()) {
    //       const blockhash = txHash.toHex();
    //     }
    //   }
    // });

    const tx = {
      block: 'not defined yet',
      extrinsicdata: typedExtrinsic,
      fee: String(paymentInfo.partialFee.toJSON()),
      hash: txHash.toHex(),
      sender: sender,
      network: network
    } as Transaction;

    // const tx = {} as Transaction;

    await saveTxToState(tx);
    return tx;
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    throw error;
  }
}
