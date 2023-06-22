import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const t =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3OTAyNjMyLCJpYXQiOjE2ODcyOTc4MzIsImp0aSI6ImMyNTI4M2NlYmI0YjQ3MmRhNzNiYmFiY2Y3MTU3MDU1IiwidXNlcl9pZCI6MX0.xyr0waBKqyhmyxY4xszV-tnPMWetEyBrhazqCSeJNBU"

export const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://192.168.114.146:9000/api/products/' ,
  }),
  tagTypes: ['Albums'],
 
  
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: (page = 1) => `?_page=${page}&_limit=10`,
      providesTags: ['Albums'],
    }),

    createAlbum: builder.mutation({
        query: ({productName, productPrice, description, accessToken}) => ({
          url: `create/`,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace `accessToken` with the actual user's authentication token
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: { productName, productPrice, description },
        }),
        invalidatesTags: ['Albums'],
      }),

      updateAlbum: builder.mutation({
        query: ({ id, title }) => ({
          url: `update/${id}`,
          method: 'PUT',
          body: { title },
        }),
        invalidatesTags: ['Albums'],
      }),
  
      deleteAlbum: builder.mutation({
        query: (id) => ({
          url: `delete/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Albums'],
      }),

  }),
});

export const { useGetAlbumsQuery,
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
  useDeleteAlbumMutation, } = jsonServerApi;