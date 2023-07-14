import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, API_TIMEOUT } from '../../config'
import { setCredentials, logOut } from '../actions/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    },
  // Set the desired timeout value in milliseconds
  timeout: API_TIMEOUT
})

    export const baseQueryWithReauth = async (args, api, extraOptions) => {
        try {
        const result = await baseQuery(args, api, extraOptions);
    
        if (result?.error?.originalStatus === 403) {
            console.log('sending refresh token');
            // send refresh token to get new access token
            const refreshResult = await baseQuery('/refresh', api, extraOptions);
            console.log(refreshResult);
            if (refreshResult?.data) {
            const user = api.getState().auth.user;
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            // retry the original query with new access token
            return await baseQuery(args, api, extraOptions);
            } else {
            api.dispatch(logOut());
            }
        }
    
        return result;
        } catch (error) {
        if (error.name === 'AbortError') {
            // Handle timeout error here
            throw new Error('Request timed out');
        } else {
            throw error;
        }
        }
  };
  

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['getUser', 'getBuyer', 'getSeller', 'getProducts'],
    endpoints: builder => ({})
})