import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../config';

export const productServerApi = createApi({
  reducerPath: 'productServerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
        query: ({accessToken}) => ({
          url: '/api/products/',
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
            'Content-Type': 'application/json',
          },
          providesTags: ['Products'],
        }),
      }),

    createProduct: builder.mutation({
      query: ({ productName, productPrice, description, accessToken }) => ({
        url: '',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: { productName, productPrice, description },
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, title }) => ({
        url: `${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productServerApi;
