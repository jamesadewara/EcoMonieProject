import { apiSlice } from "../../api/apiSlice"

export const productServerApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ accessToken }) = {
      url: '/api/products/',
      headers: {
      Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
                'Content-Type': 'application/json',
      },},
      keepUnusedDataFor: 10000,
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
  })
})



export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productServerApi;
