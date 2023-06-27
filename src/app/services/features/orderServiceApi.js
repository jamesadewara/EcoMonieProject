import { apiSlice } from "../../api/apiSlice"

export const orderProductServerApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query({
      query: ({accessToken}) => ({
      url: '/api/order-request/',
      headers: {
      Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
                'Content-Type': 'application/json',
      },}),
      keepUnusedDataFor: 10000,
      }),
      createOrders: builder.mutation({
        query: ({ productName, productPrice, description, accessToken }) => ({
          url: `/create/${id}`,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: { productName, productPrice, description },
        }),
        invalidatesTags: ['Orders'],
      }),
      
      updateOrders: builder.mutation({
        query: ({ id, title }) => ({
          url: `${id}`,
          method: 'PUT',
          body: { title },
        }),
        invalidatesTags: ['Orders'],
      }),
      
      deleteOrders: builder.mutation({
        query: (id) => ({
          url: `${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Orders'],
      }),
  })
})



export const {
  useGetOrdersQuery,
  useCreateOrdersMutation,
  useUpdateOrdersMutation,
  useDeleteOrdersMutation,
} = orderProductServerApi;
