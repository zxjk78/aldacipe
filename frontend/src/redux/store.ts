import { combineReducers, configureStore } from '@reduxjs/toolkit';

// redux persist
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

// reducers
import loginReducer from './slice/login';
import refrigeratorReducer from './slice/refrigerator';

const persistConfig = {
  key: 'root',
  storage,
  version: 3,
  blacklist: [],
};
const reducer = combineReducers({
  // login
  login: loginReducer,
  refrigerator: refrigeratorReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
