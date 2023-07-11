import { apiSlice } from "../../api/apiSlice";

export const codeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        codeverify: builder.mutation({
            query: ({ email, code }) => ({
                url: '/auth/verify/code/',
                method: 'POST',
                body: { email, code }
            })
        }),
    })
  })
  
  export const {
    useCodeverifyMutation
  } = codeApiSlice
  