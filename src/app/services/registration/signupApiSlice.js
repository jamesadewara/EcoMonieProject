import { apiSlice } from "../../api/apiSlice";

export const signupApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: ({ accessToken }) => ({
        url: '/auth/users/me/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
 
    }),

    getBuyer: builder.query({
      query: ({ accessToken, id }) => ({
        url: `/auth/buyer/detail/${id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
 
    }),

    signup: builder.mutation({
      query: credentials => ({
        url: '/auth/users/',
        method: 'POST',
        body: { ...credentials }
      }),
    }),
    registerasbuyer: builder.mutation({
      query: ({ accessToken, formData }) => ({
        url: '/auth/buyer/register/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: formData, // Pass the FormData object directly
      }),
    }),
    
    
  }),
  overrideExisting: true,
});

export const {
  useSignupMutation,
  useRegisterasbuyerMutation,
  useGetBuyerQuery,
  useGetUserQuery
} = signupApiSlice;
