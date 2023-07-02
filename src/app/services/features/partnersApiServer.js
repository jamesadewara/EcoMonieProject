import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

export const partnersServerApi = createApi({
  reducerPath: 'partnersServerApi',
  baseQuery: baseQuery,

  tagTypes: ['getPartners'], // Add 'getPartners' tag type
  endpoints: (builder) => ({
    getPartners: builder.query({
      query: (page = 1,id, accessToken) => ({
        url: `auth/partners/1/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getPartners'], // Add providesTags callback
    }),

  }),
});

export const {
  useGetPartnersQuery,
} = partnersServerApi;
