import { configureStore } from '@reduxjs/toolkit';

import { jsonServerApi } from './services/jsonServerApi';

import launchReducer from "./actions/launchSlice";
import { apiSlice } from './api/apiSlice';
import authReducer from './actions/authSlice';
import { productServerApi } from './services/features/productServerApi';
import { partnersServerApi } from './services/features/partnersApiServer';
import themeReducer from './actions/themeSlice';



const store = configureStore({
  reducer: {
    launch: launchReducer,
    theme: themeReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [productServerApi.reducerPath]: productServerApi.reducer, 
    [partnersServerApi.reducerPath]: partnersServerApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productServerApi.middleware)
      .concat(partnersServerApi.middleware)
      .concat(apiSlice.middleware),
  devTools: true,
});

export default store;
