import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';

export const loginServerApi = createApi({
  reducerPath: 'loginServerApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Login'],
 
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/api/auth/jwt/create/',
        method: 'POST',
        body: { email, password },
      }),
      // Invalidate the token tag to ensure the data is refetched after login
      invalidatesTags: ['Login'],
    }),
    // Handle the response after a successful login
    onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      try {
        const response = await queryFulfilled(arg);
        const token = response.access;

        // Dispatch an action to store the token in the Redux store
        dispatch(setToken(token));

        // Handle other actions or logic here if needed

        return response;
      } catch (error) {
        // Handle errors if needed
        throw error;
      }
    },
    getUser: builder.query({
      query: () => '/user',
    }),
  }),
});

export const { useLoginMutation } = loginServerApi;
