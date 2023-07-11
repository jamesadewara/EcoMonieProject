import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

export const profileServerApi = createApi({
  reducerPath: 'profileServerApi',
  baseQuery: baseQuery,

  tagTypes: ['getProfile'], // Add 'getProfile' tag type
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (page=1,accessToken) => ({
        url: `/chat_api/userprofiles/?_page=${page}&_limit=10`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getProfile'], // Add providesTags callback
    }),
    createProfile: builder.mutation({
      query: ({ user, name, image, price, category, description, ordered, accessToken }) => ({
        url: '/chat_api/products/create/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { user, name, image, price, category, description, ordered },
      }),
      invalidatesTags: ['getProfile'],
    }),
    createProfileImg: builder.mutation({
      query: ({ img, accessToken }) => ({
        url: '/chat_api/products/create/image/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: img,
      }),
      invalidatesTags: ['getProfile'],
    }),
    updateProfile: builder.mutation({
      query: ({ id, title }) => ({
        url: `${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['getProfile'],
    }),
    deleteProfile: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `/chat_api/products/delete/${id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }),
      invalidatesTags: ['getProfile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useCreateProfileImgMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileServerApi;
