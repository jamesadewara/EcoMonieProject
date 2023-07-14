import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Snackbar, DefaultTheme, DarkTheme, Provider as PaperProvider } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import { useSelector, useDispatch } from "react-redux";
import { retrieveTokenFromSecureStore, setToken, selectCurrentToken } from "./app/actions/authSlice";
import { setTheme, selectCurrentTheme } from "./app/actions/themeSlice";
import * as Font from 'expo-font';

// Import Navigation stacks
import LaunchStack from "./Navigation/LaunchStack";
import AuthStack from "./Navigation/AuthStack";
import AppStack from "./Navigation/AppStack";

const ScreenManager = () => {
  // Using Redux selectors to access state values
  const launch = useSelector((state) => state.launch.intro);
  const accessToken = useSelector(selectCurrentToken);
  const currentTheme = useSelector(selectCurrentTheme);

  // State variables
  const [isConnected, setIsConnected] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const dispatch = useDispatch();
 

  useEffect(() => {
    retrieveTokenFromSecureStore()
      .then((token) => {
        if (token) {
         
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
      lightprimary: '#81c784',
      darkprimary: '#198754',
      shadeprimary1: '#087f4d',
      shadeprimary2: '#b0d9a2',
      background: '',
      appbar: '',
      cardsdialogs: '',
      flatbuttondown: '',
      color: '',
      fade: "#aaa",
      mode: '',
      status: '',
      disabled: {
        primary: '',
        // Add more disabled colors as needed
      },
    },
  };

  switch (currentTheme) {
    case 'gold':
      theme.colors.background = '#ffd700';
      theme.colors.appbar = '#f0c400';
      theme.colors.cardsdialogs = '#ffe300';
      theme.colors.flatbuttondown = '#d4b106';
      theme.colors.color = '#1a1a1a';
      theme.colors.mode = 'light';
      theme.colors.status = 'dark-content';
      theme.colors.disabled.primary = '#777777';
      break;
    case 'dark':
      theme.colors.background = '#121212';
      theme.colors.appbar = '#1f1f1f';
      theme.colors.cardsdialogs = '#1A1A1A';
      theme.colors.flatbuttondown = '#999999';
      theme.colors.color = '#ffffff';
      theme.colors.mode = 'dark';
      theme.colors.status = 'light-content';
      theme.colors.disabled.primary = '#5a5a5a';
      break;
    case 'light':
    default:
      theme.colors.background = '#eeeeee';
      theme.colors.appbar = '#F5F5F5';
      theme.colors.cardsdialogs = '#FAFAFA';
      theme.colors.flatbuttondown = '#cccccc';
      theme.colors.color = '#1a1a1a';
      theme.colors.mode = 'light';
      theme.colors.status = 'dark-content';
      theme.colors.disabled.primary = '#777777';
      break;
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={theme.colors.status} backgroundColor="transparent" translucent />
      <NavigationContainer>
        {/* Rendering different stacks based on conditions */}
        {!launch ? <LaunchStack /> : accessToken ? <AppStack /> : <AuthStack />}
      </NavigationContainer>

      {/* Snackbar to display when there is no internet connection */}
      <Snackbar visible={!isConnected} onDismiss={() => setSnackbarVisible(false)}>
      No internet connection. Please check your network settings.
      </Snackbar>
    </PaperProvider>
  );
};

export default ScreenManager;
