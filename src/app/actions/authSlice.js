import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, userInfo: {} },
    reducers: {
        setCredentials: (state, action) => {
            const user = action.payload.email;
            const accessToken = action.payload.access;
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.userInfo = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token