import type { BlockId, BlockInfo } from '@avail-project/metamask-avail-types';
// import type { ApiPromise } from '@polkadot/api';
// import type { BlockId, BlockInfo } from "@avail-project/metamask-avail-types";
import type { BlockHash } from '@polkadot/types/interfaces';
import type { ApiPromise } from 'avail-js-sdk';

async function _getBlock(blockHash: BlockHash | string, api: ApiPromise): Promise<BlockInfo> {
  const signedBlock = await api.rpc.chain.getBlock(blockHash.toString());
  return {
    hash: signedBlock.block.hash.toHex(),
    number: signedBlock.block.header.number.toString()
  };
}

async function _getLatestBlock(api: ApiPromise): Promise<BlockInfo> {
  const signedBlock = await api.rpc.chain.getBlock();
  return {
    hash: signedBlock.block.hash.toHex(),
    number: signedBlock.block.header.number.toString()
  };
}

async function _getBlockById(blockId: number, api: ApiPromise): Promise<BlockInfo | null> {
  const blockHash = await api.rpc.chain.getBlockHash(blockId);
  if (!blockHash.isEmpty) {
    return await _getBlock(blockHash, api);
  }
  return null;
}

/**
 * Returns block based on blockTag passed as param.
 *
 * Supported tags are:
 *    block id    (as string or number)
 *    block hash  (as hex string starting with "0x")
 *    "latest"    (returning latest block)
 *
 * @param blockTag
 * @param api
 */
export async function getBlock(blockTag: BlockId, api: ApiPromise): Promise<BlockInfo | null> {
  switch (typeof blockTag) {
    case 'number':
      // get block by id sent as number
      return await _getBlockById(blockTag, api);
    case 'string':
      if (blockTag === 'latest') {
        // get latest block
        return await _getLatestBlock(api);
      }
      if (blockTag.startsWith('0x')) {
        // get block by hash
        return await _getBlock(blockTag, api);
      }
      // get block by id sent as string
      if (parseInt(blockTag)) {
        return await _getBlockById(parseInt(blockTag), api);
      }
  }
  return null;
}
