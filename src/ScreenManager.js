import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import { useSelector } from "react-redux";
import * as Font from 'expo-font';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import { isLaunched } from "./config";
import { selectCurrentToken } from "./app/actions/authSlice";
import { selectCurrentTheme } from "./app/actions/themeSlice";

import LaunchStack from "./Navigation/LaunchStack";
import AuthStack from "./Navigation/AuthStack";
import AppStack from "./Navigation/AppStack";

const ScreenManager = () => {
  const launch = useSelector((state) => state.launch.intro);
  const [isConnected, setIsConnected] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const token = useSelector(selectCurrentToken);
  const isDarkMode = useSelector(selectCurrentTheme);
  console.log(isDarkMode)

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        MaterialCommunityIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
      });
    };

    const verifyFonts = async () => {
      const availableFonts = await Font.loadAsync({});
      console.log(availableFonts);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setSnackbarVisible(true);
      }
    });

    loadFonts();
    verifyFonts();

    return () => {
      unsubscribe();
    };
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'green',
      background: isDarkMode ? '#121212' : '#eeeeee',
      appbar: isDarkMode ? '#1f1f1f' : '#F5F5F5',
      cardsdiaogs: isDarkMode ? '#212121' : '#FAFAFA',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      disabled: '#777777',
    },
    ...isDarkMode ? DarkTheme : {},
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        {!launch ? <LaunchStack /> : token ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <Snackbar
        visible={!isConnected && snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        Network error. Please check your internet connection.
      </Snackbar>
    </PaperProvider>
  );
};

export default ScreenManager;
