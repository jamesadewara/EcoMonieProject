import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  intro: false,
  register: false,
};

export const launchSlice = createSlice({
  name: 'launch',
  initialState,
  reducers: {
    authValid: (state, action) => {
      // If the user has been authenticated, show no more intro
      state.intro = action.payload;
    },
    userRegistered: (state, action) => {
      state.register = true;
    },
    clearState: (state) => {
      return {
        intro: false,
        register: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { authValid, userRegistered, clearState } = launchSlice.actions;

export const isfirstTimer = (state) => state.launch.register;

export default launchSlice.reducer;

