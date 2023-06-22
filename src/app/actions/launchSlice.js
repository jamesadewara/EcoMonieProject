import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  intro: false
}

export const launchSlice = createSlice({
  name: 'launch',
  initialState,
  reducers: {
    authValid: (state, action) => {
      //if the user has been authenticated show no more intro 
      state.intro = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { authValid } = launchSlice.actions

export default launchSlice.reducer