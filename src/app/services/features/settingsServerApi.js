import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';


export const settingsServerApi = createApi({
  reducerPath: 'settingsServerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL

  }),
  tagTypes: ['Settings'],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: ({accessToken}) => ({
        url: '/api/settings/',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
          'Content-Type': 'application/json',
        },
        providesTags: ['Settings'],
      }),
    }),
  }),
});

export const { useGetSettingsQuery } = settingsServerApi;
