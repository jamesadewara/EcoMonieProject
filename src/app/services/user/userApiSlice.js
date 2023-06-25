import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Replace '/api' with the actual base URL of your API

  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({accessToken}) => ({
        url: '/auth/account/update/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      keepUnusedDataFor: 500000,
    }),
    signup: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/users/',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Register'],
    }),
    updateUser: builder.mutation({
      query: ({ accessToken, username, about, contact_no, location, address, bank_account_no }) => ({
        url: '/auth/account/update/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { username, about, contact_no, location, address, bank_account_no },
      }),
      invalidatesTags: ['Register'],
    }),
  }),
});

export const { useGetUserQuery, useSignupMutation, useUpdateUserMutation } = userApi;
