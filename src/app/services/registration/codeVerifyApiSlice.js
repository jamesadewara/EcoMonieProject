import { apiSlice } from "../../api/apiSlice";

export const codeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        codeverify: builder.mutation({
            query: ({ email, verification_code }) => ({
                url: '/auth/verify/code/',
                method: 'POST',
                body: { email, verification_code }
            })
        }),
    })
  })
  
  export const {
    useCodeverifyMutation
  } = codeApiSlice
  