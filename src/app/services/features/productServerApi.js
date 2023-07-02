import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';
import { baseQueryWithReauth } from '../../api/apiSlice';

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

export const productServerApi = createApi({
  reducerPath: 'productServerApi',
  baseQuery: baseQuery,

  tagTypes: ['getProducts'], // Add 'getProducts' tag type
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page = 1, accessToken) => ({
        url: `/api/products/?_page=${page}&_limit=10`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getProducts'], // Add providesTags callback
    }),
    createProduct: builder.mutation({
      query: ({ user, name, image, price, category, description, ordered, accessToken }) => ({
        url: '/api/products/create/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { user, name, image, price, category, description, ordered },
      }),
      invalidatesTags: ['getProducts'],
    }),
    createProductImg: builder.mutation({
      query: ({ img, accessToken }) => ({
        url: '/api/products/create/image/',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: img,
      }),
      invalidatesTags: ['getProducts'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, title }) => ({
        url: `${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['getProducts'],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `/api/products/delete/${id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }),
      invalidatesTags: ['getProducts'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useCreateProductImgMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productServerApi;
