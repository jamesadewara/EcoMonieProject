import { apiSlice } from "../../api/apiSlice"

// Redux Slice
export const emailVerificationApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    verifyemail: builder.mutation({
      query: email => ({
        url: '/auth/send/verification/email/',
        method: 'POST',
        body: email,
      }),
    }),
  }),
  overrideExisting: true,
});


export const {
  useVerifyemailMutation,
} = emailVerificationApi
