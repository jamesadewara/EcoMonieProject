import { createSlice } from "@reduxjs/toolkit";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const fetchToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     return token;
//   } catch (error) {
//     console.log('Error fetching token:', error);
//     return null;
//   }
// };

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const user = action.payload.data.email;
      const accessToken = action.payload.data.access;
      state.user = user;
      state.token = accessToken;
    //   AsyncStorage.setItem('token', accessToken);
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    //   AsyncStorage.removeItem('token');
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchToken.fulfilled, (state, action) => {
//         state.token = action.payload;
//       });
//   },
});

export const { setCredentials, logOut } = authSlice.actions;

// export const fetchTokenAsync = () => async (dispatch) => {
//   const token = await fetchToken();
//   dispatch(fetchToken.fulfilled(token));
// };

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token //|| fetchToken();
