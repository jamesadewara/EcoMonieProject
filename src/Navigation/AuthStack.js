import React from "react";

import EntrancePage from "../screens/Account/Entrance";

import LoginPage from "../screens/Account/Authentication/Login";

import EmailVerificationPage from "../screens/Account/Registration/VerifyEmail";

import CodeVerificationPage from "../screens/Account/Registration/VerifyCode";

import CreatePasswordPage from "../screens/Account/Registration/CreatePassword";

import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="entrance" screenOptions={{headerShown: false}}>

            <Stack.Screen name="entrance" component={EntrancePage} options={{ headerShown: false }}/> 

            <Stack.Screen name="login" component={LoginPage} options={{ headerShown: false }}/> 

            <Stack.Screen name="verify_email" component={EmailVerificationPage} options={{ headerShown: false }}/> 

            <Stack.Screen name="verify_code" component={CodeVerificationPage} options={{ headerShown: false }}/> 

            <Stack.Screen name="register" component={CreatePasswordPage} options={{ headerShown: false }}/> 

        </Stack.Navigator>
    )
}

export default AuthStack;