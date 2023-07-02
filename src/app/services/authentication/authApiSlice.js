import { apiSlice } from "../../api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      login: builder.mutation({
          query: credentials => ({
              url: '/auth/jwt/create/',
              method: 'POST',
              body: { ...credentials }
          })
      }),
      logout: builder.mutation({
        query: ({accessToken}) => ({
          url: '/auth/token/destroy/',
          method: 'POST',
          headers: {
          Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
                    'Content-Type': 'application/json',
          }
        })
    }),
  })
})

export const {
  useLoginMutation, useLogoutMutation
} = authApiSlice
