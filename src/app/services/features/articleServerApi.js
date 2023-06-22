import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';


export const articleServerApi = createApi({
  reducerPath: 'articleServerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL

  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({accessToken}) => ({
        url: '/api/article/',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
          'Content-Type': 'application/json',
        },
        providesTags: ['Articles'],
      }),
    }),
  }),
});

export const { useGetArticlesQuery } = articleServerApi;
