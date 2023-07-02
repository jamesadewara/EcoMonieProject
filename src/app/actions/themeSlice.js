import { createSlice } from '@reduxjs/toolkit';
import { storeThemeValue, getThemeValue } from '../../config';

const initialState = {
  theme: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      storeThemeValue(String(action.payload))
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;


export const selectCurrentTheme = (state) => state.theme.theme;

// import { createSlice } from '@reduxjs/toolkit';
// import { storeThemeValue, getThemeValue } from '../../config';
// import { useSelector } from 'react-redux';


// Update the theme slice to fetch the theme value as a boolean
// export const themeSlice = createSlice({
//   name: 'theme',
//   initialState:{
//     theme: false,
//   },
//   reducers: {
//     setTheme: (state, action) => {
//       state.theme = action.payload;
//       storeThemeValue(String(action.payload)); // Store the theme value as a string
//     },
//     fetchThemeValue: async (state) => {
//       const themeValue = await getThemeValue(); // Fetch the theme value as a boolean
//       state.theme = themeValue;
//     },
//   },
// });

// export const { setTheme, fetchThemeValue } = themeSlice.actions;

// export const selectCurrentTheme = (state) => useSelector(state.theme.theme)||fetchThemeValue();

// export default themeSlice.reducer;
// Usage: selectCurrentTheme(state)
// Returns: The current theme value (boolean) from the state

// Usage example:
// const currentTheme = useSelector(selectCurrentTheme);
