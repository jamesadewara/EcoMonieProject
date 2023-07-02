import { apiSlice } from "../../api/apiSlice";

export const emailVerifyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        verifyemail: builder.mutation({
            query: ({ email }) => ({
                url: '/auth/users/activation/',
                method: 'POST',
                body: { email }
            })
        }),
    })
  })
  
  export const {
    useVerifyemailMutation
  } = emailVerifyApiSlice
  