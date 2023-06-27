import { apiSlice } from "../../api/apiSlice"

export const productCategoryServerApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategory: builder.query({
      query: ({accessToken}) => ({
      url: '/api/product-category/',
      headers: {
      Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
                'Content-Type': 'application/json',
      },}),
      keepUnusedDataFor: 10000,
      }),
  })
})



export const {
  useGetCategoryQuery,
} = productCategoryServerApi;
