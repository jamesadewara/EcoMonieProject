import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

// Save the token to Expo SecureStore
const saveTokenToSecureStore = async (token) => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Retrieve the token from Expo SecureStore
export const retrieveTokenFromSecureStore = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      return token;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Delete the token from Expo SecureStore
const deleteTokenFromSecureStore = async () => {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { access } = action.payload.data;
      state.token = access; // Convert the token to a string
      saveTokenToSecureStore(access); // Save the token to Expo SecureStore
    },
    logOut: (state) => {
      state.token = null;
      deleteTokenFromSecureStore(); // Delete the token from Expo SecureStore
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setCredentials, logOut, setToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
