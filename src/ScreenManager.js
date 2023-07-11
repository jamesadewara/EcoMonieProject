import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Snackbar, DefaultTheme, DarkTheme, Provider as PaperProvider } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import { useSelector, useDispatch } from "react-redux";
import { retrieveTokenFromSecureStore, setToken, selectCurrentToken } from "./app/actions/authSlice";
import { selectCurrentTheme } from "./app/actions/themeSlice";
import * as Font from 'expo-font';

// Import Navigation stacks
import LaunchStack from "./Navigation/LaunchStack";
import AuthStack from "./Navigation/AuthStack";
import AppStack from "./Navigation/AppStack";

const ScreenManager = () => {
  // Using Redux selectors to access state values
  const launch = useSelector((state) => state.launch.intro);
  const accessToken = useSelector(selectCurrentToken);
  const isDarkMode = useSelector(selectCurrentTheme);

  // State variables
  const [isConnected, setIsConnected] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    retrieveTokenFromSecureStore()
      .then((token) => {
        if (token){
          console.log(token)
          dispatch(setToken(token));
        }
 
      })
      .catch((error) => {
        console.error("Error retrieving token:", error);
        // Handle the error appropriately (e.g., show an error message)
      });
  }, [dispatch]);

  useEffect(() => {
    // Function to load required fonts
    const loadFonts = async () => {
      await Font.loadAsync({
        MaterialCommunityIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
      });
    };

    // Event listener for network connectivity changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setSnackbarVisible(true);
      }
    });

    // Loading fonts
    loadFonts();

    // Cleanup function for the effect
    return () => {
      unsubscribe();
    };
  }, []);

  // Custom theme based on selected theme mode
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'green',
      background: isDarkMode ? '#121212' : '#eeeeee',
      appbar: isDarkMode ? '#1f1f1f' : '#F5F5F5',
      cardsdialogs: isDarkMode ? '#1a1a1a' : '#FAFAFA',
      flatbuttondown: isDarkMode ? '#999999' : '#cccccc',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      mode: isDarkMode ? 'dark' : 'light',
      status: isDarkMode ? 'light-content' : 'dark-content',
      disabled: {
        primary: isDarkMode ? '#5a5a5a' : '#777777',
        // Add more disabled colors as needed
      },
    },
    ...isDarkMode ? DarkTheme : {},
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={theme.colors.status} backgroundColor="transparent" translucent />
      <NavigationContainer>
        {/* Rendering different stacks based on conditions */}
        {!launch ? <LaunchStack /> : accessToken ? <AppStack /> : <AuthStack />}
      </NavigationContainer>

      {/* Snackbar to display when there is no internet connection */}
      <Snackbar visible={!isConnected} onDismiss={() => setSnackbarVisible(false)}>
        No internet connection
      </Snackbar>
    </PaperProvider>
  );
};

export default ScreenManager;
