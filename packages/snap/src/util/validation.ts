/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { BlockId, SignerPayloadJSON, TxPayload } from '@availproject/metamask-avail-types';
import type { SignerPayloadRaw } from '@polkadot/types/types';
import type { Describe } from 'superstruct';
import { array, enums, number, object, optional, string, type, union } from 'superstruct';

const SignaturePayloadJSONSchema = type({
  address: string(),
  blockHash: string(),
  blockNumber: string(),
  era: string(),
  genesisHash: string(),
  method: string(),
  nonce: string(),
  specVersion: string(),
  tip: string(),
  transactionVersion: string(),
  signedExtensions: array(string()),
  version: number()
});
// export type HexString = `0x${string}`;

//@ts-ignore
export const validSignPayloadJSONSchema: Describe<{
  payload: SignerPayloadJSON;
}> = object({
  payload: SignaturePayloadJSONSchema
});

export type SignPayloadRawTypes = 'bytes' | 'payload';
export const SignPayloadRawTypesSchema: Describe<SignPayloadRawTypes> = enums(['bytes', 'payload']);

export const validSignPayloadRawSchema: Describe<{
  payload: SignerPayloadRaw;
}> = object({
  payload: object({
    address: string(),
    data: string(),
    type: SignPayloadRawTypesSchema
  })
});

export const validGetBlockSchema: Describe<{ blockTag: BlockId }> = object({
  blockTag: union([string(), number()])
});

export const validConfigureSchema: Describe<{
  configuration: {
    addressPrefix: number;
    networkName: string;
    unit: { image: string; symbol: string };
    wsRpcUrl: string;
  };
}> = object({
  configuration: object({
    addressPrefix: optional(number()),
    networkName: string(),
    unit: optional(object({ image: string(), symbol: string() })),
    wsRpcUrl: optional(string())
  })
});

export const validGenerateTransactionPayloadSchema: Describe<{
  method: string;
  module: string;
  args: unknown[];
}> = object({
  method: string(),
  module: string(),
  args: array()
});

//@ts-ignore
export const validSendSchema: Describe<{
  signature: string;
  txPayload: TxPayload;
}> = object({
  signature: string(),
  txPayload: object({
    payload: SignaturePayloadJSONSchema,
    tx: string()
  })
});

// export interface SignerPayloadJSON {
//   /**
//    * @description The ss-58 encoded address
//    */
//   address: string;
//   /**
//    * @description The checkpoint hash of the block, in hex
//    */
//   blockHash: string;
//   /**
//    * @description The checkpoint block number, in hex
//    */
//   blockNumber: string;
//   /**
//    * @description The era for this transaction, in hex
//    */
//   era: string;
//   /**
//    * @description The genesis hash of the chain, in hex
//    */
//   genesisHash: string;
//   /**
//    * @description The encoded method (with arguments) in hex
//    */
//   method: string;
//   /**
//    * @description The nonce for this transaction, in hex
//    */
//   nonce: string;
//   /**
//    * @description The current spec version for the runtime
//    */
//   specVersion: string;
//   /**
//    * @description The tip for this transaction, in hex
//    */
//   tip: string;
//   /**
//    * @description The current transaction version for the runtime
//    */
//   transactionVersion: string;
//   /**
//    * @description The applicable signed extensions for this runtime
//    */
//   signedExtensions: string[];
//   /**
//    * @description The version of the extrinsic we are dealing with
//    */
//   version: number;
// }
