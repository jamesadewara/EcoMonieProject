import { apiSlice } from "../../api/apiSlice";

export const signupApiSlice = apiSlice.injectEndpoints({
  
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ accessToken }) => ({
        url: '/auth/users/me/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getUser'],
    }),

    getBuyer: builder.query({
      query: ({ accessToken, id }) => ({
        url: `/auth/buyer/detail/${id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getBuyer'],
    }),

    getSeller: builder.query({
      query: ({ accessToken, id }) => ({
        url: `/auth/seller/detail/${id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getSeller'],
    }),

    signup: builder.mutation({
      query: ({ formData }) => ({
        url: '/auth/users/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['getUser'],
    }),

    registerasbuyer: builder.mutation({
      query: ({ accessToken, user, company_name, address, phone_number, about }) => ({
        url: '/auth/buyer/register/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { user, company_name, address, phone_number, about },
      }),
      invalidatesTags: ['getBuyer'],
    }),

    updatebuyer: builder.mutation({
      query: ({ accessToken, id, user, company_name, address, phone_number, about }) => ({
        url: `/auth/buyer/register/update/${id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { user, company_name, address, phone_number, about },
      }),
      invalidatesTags: ['getBuyer'],
    }),

    registerasseller: builder.mutation({
      query: ({ accessToken, user, paypal_email, paypal_access_token, address, phone_number, about }) => ({
        url: '/auth/seller/register/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { user, paypal_email, paypal_access_token, address, phone_number, about },
      }),
      invalidatesTags: ['getSeller'],
    }),

    updateseller: builder.mutation({
      query: ({ accessToken, id, user, paypal_email, paypal_access_token, address, phone_number, about }) => ({
        url: `/auth/seller/register/update/${id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { user, paypal_email, paypal_access_token, address, phone_number, about },
      }),
      invalidatesTags: ['getSeller'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignupMutation,
  useRegisterasbuyerMutation,
  useRegisterassellerMutation,
  useGetBuyerQuery,
  useGetSellerQuery,
  useGetUserQuery,
  useUpdatebuyerMutation,
  useUpdatesellerMutation,
} = signupApiSlice;
