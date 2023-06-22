import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    updateToken: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateToken } = tokenSlice.actions;
export default tokenSlice.reducer;
