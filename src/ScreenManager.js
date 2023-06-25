import React, { useEffect, useState } from "react";

import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { Snackbar } from "react-native-paper";

import NetInfo from "@react-native-community/netinfo";

import LaunchStack from "./Navigation/LaunchStack";

import AuthStack from "./Navigation/AuthStack";

import AppStack from "./Navigation/AppStack";
import { isLaunched } from "./config";
import { useSelector } from "react-redux"

import * as Font from 'expo-font';

import { selectCurrentToken, selectCurrentUser } from "./app/actions/authSlice";

const ScreenManager = () => {
    const launch = useSelector((state) => state.launch.intro);
    const [isConnected, setIsConnected] = useState(true);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const token = useSelector(selectCurrentToken) && useSelector(selectCurrentUser) //&& userinfo as well
    console.log('user info', useSelector(selectCurrentToken), 'token info')
  
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
  
      return () => {
        loadFonts();
        verifyFonts();
        unsubscribe();
      };
    }, []);
  
    return (
    <View style={{ flex: 1 }}>
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
    </View>
    );
  };
  
  export default ScreenManager;
  