import { apiSlice } from "../../api/apiSlice";

export const emailVerifyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        verifyemail: builder.mutation({
            query: ({ email }) => ({
                url: '/auth/verify/email/',
                method: 'POST',
                body: { email }
            })
        }),
    })
  })
  
  export const {
    useVerifyemailMutation
  } = emailVerifyApiSlice
  