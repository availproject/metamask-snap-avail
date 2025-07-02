import type { OnRpcRequestHandler } from '@metamask/snaps-types';
import type { ApiPromise } from 'avail-js-sdk';
import { assert } from 'superstruct';

import { getApi, resetApi } from './avail/api';
import { updateTxInState } from './avail/tx';
import type { MetamaskState } from './interfaces';
import { EmptyMetamaskState } from './interfaces';
import { configure } from './rpc/configure';
import { exportSeed } from './rpc/exportSeed';
import { generateTransactionPayload } from './rpc/generateTransactionPayload';
import { getAddress } from './rpc/getAddress';
import { getPublicKey } from './rpc/getPublicKey';
import { send } from './rpc/send';
import { getBalance } from './rpc/substrate/getBalance';
import { getBlock } from './rpc/substrate/getBlock';
import { getTransactions } from './rpc/substrate/getTransactions';
import { signPayloadJSON, signPayloadRaw } from './rpc/substrate/sign';
import {
  validConfigureSchema,
  validGenerateTransactionPayloadSchema,
  validGetBlockSchema,
  validSendSchema,
  validSignPayloadJSONSchema,
  validSignPayloadRawSchema,
  validTransactionSchema
} from './util/validation';

const apiDependentMethods = [
  'getBlock',
  'getBalance',
  'getChainHead',
  'signPayloadJSON',
  'signPayloadRaw',
  'generateTransactionPayload',
  'send'
];

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const state = await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' }
  });

  if (!state) {
    // initialize state if empty and set default config
    await snap.request({
      method: 'snap_manageState',
      params: { newState: EmptyMetamaskState(), operation: 'update' }
    });
  }
  // fetch api promise
  let api: ApiPromise = null;
  if (apiDependentMethods.includes(request.method)) {
    api = await getApi();
  }

  switch (request.method) {
    case 'signPayloadJSON':
      assert(request.params, validSignPayloadJSONSchema);
      return await signPayloadJSON(api, request.params.payload);
    case 'signPayloadRaw':
      assert(request.params, validSignPayloadRawSchema);
      return await signPayloadRaw(api, request.params.payload);
    case 'getPublicKey':
      return await getPublicKey();
    case 'getAddress':
      return await getAddress();
    case 'exportSeed':
      return await exportSeed();
    case 'getAllTransactions':
      return await getTransactions();
    case 'updateTransaction':
      assert(request.params, validTransactionSchema);
      return await updateTxInState(request.params.transaction);
    case 'getBlock':
      assert(request.params, validGetBlockSchema);
      return await getBlock(request.params.blockTag, api);
    case 'getBalance': {
      return await getBalance(api);
    }
    case 'configure': {
      const state = (await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' }
      })) as MetamaskState;

      const isInitialConfiguration = state.config === null;
      // reset api and remove asset only if already configured
      if (!isInitialConfiguration) {
        await resetApi();
      }
      // set new configuration
      assert(
        request.params,
        validConfigureSchema,
        'Invalid configuration schema - Network name should be provided'
      );
      console.info('Configuring snap with', request.params.configuration);
      return await configure(
        request.params.configuration.networkName,
        request.params.configuration
      );
    }
    case 'generateTransactionPayload':
      assert(request.params, validGenerateTransactionPayloadSchema);
      return await generateTransactionPayload(
        api,
        request.params.module,
        request.params.method,
        request.params.args
      );

    case 'send':
      assert(request.params, validSendSchema);
      return await send(
        api,
        request.params.signature as Uint8Array | `0x${string}`,
        request.params.txPayload,
        request.params.network
      );
    case 'getChainHead':
      return api && (await api.rpc.chain.getFinalizedHead()).hash;

    default:
      throw new Error('Method not found.');
  }
};
