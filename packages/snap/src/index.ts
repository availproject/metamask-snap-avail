import type { OnRpcRequestHandler } from '@metamask/snaps-types';
import { assert } from 'superstruct';
import type { ApiPromise } from 'avail-js-sdk';
import type { MetamaskState } from './interfaces';
import { EmptyMetamaskState } from './interfaces';
import { getPublicKey } from './rpc/getPublicKey';
import { exportSeed } from './rpc/exportSeed';
import { getBalance } from './rpc/substrate/getBalance';
import { getAddress } from './rpc/getAddress';
import { getTransactions } from './rpc/substrate/getTransactions';
import { getBlock } from './rpc/substrate/getBlock';
import { getApi, resetApi } from './avail/api';
import { configure } from './rpc/configure';
import { signPayloadJSON, signPayloadRaw } from './rpc/substrate/sign';
import { generateTransactionPayload } from './rpc/generateTransactionPayload';
import { send } from './rpc/send';
import {
  validConfigureSchema,
  validGenerateTransactionPayloadSchema,
  validGetBlockSchema,
  validSendSchema,
  validSignPayloadJSONSchema,
  validSignPayloadRawSchema,
  validTransactionSchema
} from './util/validation';
import { updateTxInState } from './avail/tx';

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
  console.log('=== SNAP REQUEST HANDLER START ===');
  console.log('Received request:', request);

  try {
    // Log snap state
    const state = await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' }
    });

    console.log('Current snap state:', state);

    if (!state) {
      console.log('Initializing empty state...');
      await snap.request({
        method: 'snap_manageState',
        params: { newState: EmptyMetamaskState(), operation: 'update' }
      });
    }

    // Log available permissions
    try {
      const permissions = await snap.request({
        method: 'wallet_getPermissions'
      });
      console.log('Available permissions:', permissions);
    } catch (error) {
      console.error('Failed to get permissions:', error);
    }

    // fetch api promise
    let api: ApiPromise = null;
    if (apiDependentMethods.includes(request.method)) {
      console.log('Method requires API, fetching...');
      api = await getApi();
    }

    console.log('Processing request method:', request.method);

    let result;
    switch (request.method) {
      case 'exportSeed':
        console.log('=== EXPORT SEED HANDLER START ===');
        console.log('Handling exportSeed request');
        try {
          result = await exportSeed();
          console.log('Export seed result:', {
            success: !!result,
            length: result?.length
          });
          console.log('=== EXPORT SEED HANDLER END ===');
          return result;
        } catch (error) {
          console.error('Error in exportSeed handler:', error);
          if (error instanceof Error) {
            if (error.message.includes('User rejected')) {
              return null;
            }
            throw error;
          }
          throw new Error('Failed to export seed');
        }
      case 'signPayloadJSON':
        assert(request.params, validSignPayloadJSONSchema);
        result = await signPayloadJSON(api, request.params.payload);
        return result;
      case 'signPayloadRaw':
        assert(request.params, validSignPayloadRawSchema);
        result = await signPayloadRaw(api, request.params.payload);
        return result;
      case 'getPublicKey':
        result = await getPublicKey();
        return result;
      case 'getAddress':
        result = await getAddress();
        return result;
      case 'getAllTransactions':
        result = await getTransactions();
        return result;
      case 'updateTransaction':
        assert(request.params, validTransactionSchema);
        result = await updateTxInState(request.params.transaction);
        return result;
      case 'getBlock':
        assert(request.params, validGetBlockSchema);
        result = await getBlock(request.params.blockTag, api);
        return result;
      case 'getBalance':
        result = await getBalance(api);
        return result;
      case 'configure': {
        const state = (await snap.request({
          method: 'snap_manageState',
          params: { operation: 'get' }
        })) as MetamaskState;

        const isInitialConfiguration = state.config === null;
        if (!isInitialConfiguration) {
          await resetApi();
        }
        assert(
          request.params,
          validConfigureSchema,
          'Invalid configuration schema - Network name should be provided'
        );
        console.info('Configuring snap with', request.params.configuration);
        result = await configure(
          request.params.configuration.networkName,
          request.params.configuration
        );
        return result;
      }
      case 'generateTransactionPayload':
        assert(request.params, validGenerateTransactionPayloadSchema);
        result = await generateTransactionPayload(
          api,
          request.params.module,
          request.params.method,
          request.params.args
        );
        return result;
      case 'send':
        assert(request.params, validSendSchema);
        result = await send(
          api,
          request.params.signature as Uint8Array | `0x${string}`,
          request.params.txPayload,
          request.params.network
        );
        return result;
      case 'getChainHead':
        result = api && (await api.rpc.chain.getFinalizedHead()).hash;
        return result;
      default:
        throw new Error('Method not found.');
    }
  } catch (error) {
    console.error('Error processing request:', error);
    throw error;
  } finally {
    console.log('=== SNAP REQUEST HANDLER END ===');
  }
};
