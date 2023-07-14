import { apiSlice } from "../../api/apiSlice"

export const productServerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page = 1, accessToken) => ({
        url: `/eccomerce_api/products/?_page=${page}&_limit=25`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getProducts'], // Add providesTags callback
    }),
    createProduct: builder.mutation({
      query: formData  => ({
        url: '/eccomerce_api/products/create/',
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        //   'Content-Type': 'application/json',
        // },
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['getProducts'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, title }) => ({
        url: `$/eccomerce_api/products/update/{id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['getProducts'],
    }),
    deleteProduct: builder.mutation({
      query: ({ id, accessToken }) => ({
        url: `/eccomerce_api/products/remove/${id}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }),
      invalidatesTags: ['getProducts'],
    }),

    getCategory: builder.query({
      query: ({accessToken}) => ({
      url: `/eccomerce_api/categories/`,
      headers: {
      Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
                'Content-Type': 'application/json',
      },}),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useGetCategoryQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productServerApi;
