import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashPage from "../screens/Welcome/launch/Splash";
import IntroPage from "../screens/Welcome/intro/Introduction";

const Stack = createNativeStackNavigator();

const LaunchStack = () => {
  return (
    <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
      {/* Splash Page */}
      <Stack.Screen name="splash" component={SplashPage} />

      {/* Intro Page */}
      <Stack.Screen name="intro" component={IntroPage} />
    </Stack.Navigator>
  );
}

export default LaunchStack;
