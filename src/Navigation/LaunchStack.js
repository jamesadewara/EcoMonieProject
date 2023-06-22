import React, { useContext } from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashPage from "../screens/Welcome/launch/Splash";

import IntroPage from "../screens/Welcome/intro/Introduction";



const Stack = createNativeStackNavigator();

const LaunchStack = () => {
    return (
        <Stack.Navigator initialRouteName="splash" screenOptions={{headerShown: false}}>
        
            <Stack.Screen name="splash" component={SplashPage} options={{ headerShown: false }}/> 

            <Stack.Screen name="intro" component={IntroPage} options={{ headerShown: false }}/>
            

        </Stack.Navigator>
    )
}

export default LaunchStack;