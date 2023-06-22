import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userInfo: null,
  },
  reducers: {
    setToken: (state, action) => {
      console.log('actionar', action)
        state.token = action.payload;
      },

    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    
    clearUser: (state) => {
      state.userInfo = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;


export const selectCurrentUser = (state) => state.user.userInfo
export const selectCurrentToken = (state) => state.user.token
