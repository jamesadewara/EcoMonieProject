import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = { theme: "light" };

// Retrieve the theme value from AsyncStorage
AsyncStorage.getItem("theme")
  .then((themeValue) => {
    if (themeValue) {
      initialState.theme = themeValue;
    }
  })
  .catch((error) => {
    console.error("Error retrieving theme:", error);
    // Handle the error appropriately (e.g., show an error message)
  });

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    clearTheme: (state) => {
      state.theme = "light";
      AsyncStorage.removeItem("theme")
        .catch((error) => {
          console.error("Error clearing theme:", error);
          // Handle the error appropriately (e.g., show an error message)
        });
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      AsyncStorage.setItem("theme", action.payload)
        .catch((error) => {
          console.error("Error setting theme:", error);
          // Handle the error appropriately (e.g., show an error message)
        });
    },
  },
});

export const { setTheme, clearTheme } = themeSlice.actions;

export default themeSlice.reducer;

export const selectCurrentTheme = (state) => state.theme.theme;
