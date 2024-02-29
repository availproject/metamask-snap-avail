import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import metamaskSlice from 'slices/metamaskSlice';
import walletReducer from '../slices/walletSlice';
import networkReducer from '../slices/networkSlice';
import modalSlice from '../slices/modalSlice';
import UIReducer from '../slices/UISlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['wallet', 'modals', 'networks']
};

const walletPersistConfig = {
  key: 'wallet',
  storage,
  whitelist: ['forceReconnect']
};

const networkPersistConfig = {
  key: 'networks',
  storage,
  whitelist: ['activeNetwork']
};

const reducers = combineReducers({
  wallet: persistReducer(walletPersistConfig, walletReducer),
  networks: persistReducer(networkPersistConfig, networkReducer),
  modals: modalSlice,
  UI: UIReducer,
  metamask: metamaskSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
