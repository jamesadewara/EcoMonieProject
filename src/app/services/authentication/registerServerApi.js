import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';

export const signupServerApi = createApi({
  reducerPath: 'signupServerApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Register'],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/users/',
        method: 'POST',
        body: { email, password },
      }),
      // Invalidate the token tag to ensure the data is refetched after login
      invalidatesTags: ['Register'],
    }),

    updateUser: builder.mutation({
      query: ({ accessToken, username, about, contact_no, location, address, bank_account_no}) => ({
        url: '/auth/account/update/',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { username, about,  contact_no, location, address, bank_account_no },
      }),
      invalidatesTags: ['Register'],
    }),

    getUser: builder.mutation({
      query: ({ accessToken }) => ({
        url: '/auth/account/info/',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }),
      providesTags: ['Register'],
    }),


  }),
});

export const { useSignupMutation, useUpdateUserMutation, useGetUserMutation } = signupServerApi;
