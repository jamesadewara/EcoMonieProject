import { apiSlice } from "../../api/apiSlice";

export const signupApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: ({ email, password }) => ({
              url: '/auth/users/',
              method: 'POST',
              body: { email, password },
            }),
          }),
    })
  })
  
  export const {
    useSignupMutation
  } = signupApiSlice
  