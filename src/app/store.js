import { configureStore } from '@reduxjs/toolkit';

import launchReducer from "./actions/launchSlice";
import { apiSlice } from './api/apiSlice';
import authReducer from './actions/authSlice';
import { partnersServerApi } from './services/features/partnersApiServer';
import themeReducer from './actions/themeSlice';



const store = configureStore({
  reducer: {
    launch: launchReducer,
    theme: themeReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [partnersServerApi.reducerPath]: partnersServerApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(partnersServerApi.middleware)
      .concat(apiSlice.middleware),
  devTools: true,
});

export default store;
