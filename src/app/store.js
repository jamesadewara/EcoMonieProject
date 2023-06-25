import { configureStore } from '@reduxjs/toolkit';

import { jsonServerApi } from './services/jsonServerApi';

import launchReducer from "./actions/launchSlice";
import { apiSlice } from './api/apiSlice';
import authReducer from './actions/authSlice';

const store = configureStore({
  reducer: {
    launch: launchReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jsonServerApi.middleware)
      .concat(apiSlice.middleware),
  devTools: true,
});

export default store;
