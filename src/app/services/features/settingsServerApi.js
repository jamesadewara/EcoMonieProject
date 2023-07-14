import { apiSlice } from "../../api/apiSlice"

export const settingsServerApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSettings: builder.query({
      query: ({accessToken}) => ({
      url: '/ecomonie/settings/',
      headers: {
      Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
                'Content-Type': 'application/json',
      },}),
      // keepUnusedDataFor: 10000,
    }),
  }),
  overrideExisting: true,
})



export const {
  useGetSettingsQuery,
} = settingsServerApi;

