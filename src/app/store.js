import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jsonServerApi } from './services/jsonServerApi';
import { loginServerApi } from './services/authentication/loginServerApi';
import { signupServerApi } from './services/authentication/registerServerApi';
import userReducer from './actions/userSlice';
import launchReducer from "./actions/launchSlice";
import { productServerApi } from './services/features/productServerApi';
import { settingsServerApi } from './services/features/settingsServerApi';


const store = configureStore({
  reducer: {
    launch: launchReducer,
    user: userReducer,
    [productServerApi.reducerPath]: productServerApi.reducer,
    [settingsServerApi.reducerPath]: settingsServerApi.reducer,
    [loginServerApi.reducerPath]: loginServerApi.reducer,
    [signupServerApi.reducerPath]: signupServerApi.reducer,
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jsonServerApi.middleware)
      .concat(productServerApi.middleware)
      .concat(settingsServerApi.middleware)
      .concat(loginServerApi.middleware)
      .concat(signupServerApi.middleware),
});

setupListeners(store.dispatch);

export default store;