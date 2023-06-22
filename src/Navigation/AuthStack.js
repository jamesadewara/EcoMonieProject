import React from "react";

import EntrancePage from "../screens/Registration/Entrance";

import LoginPage from "../screens/Registration/Login";

import RegisterPage from "../screens/Registration/Register";

import AutoLoginPage from "../screens/Registration/autoLogin";

import EditProfilePage from "../screens/Registration/EditProfile";

import AutoUpdateUserPage from "../screens/Registration/autoUpdateUser";

import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="entrance" screenOptions={{headerShown: false}}>

            <Stack.Screen name="entrance" component={EntrancePage} options={{ headerShown: false }}/> 

            <Stack.Screen name="login" component={LoginPage} options={{ headerShown: false }}/> 

            <Stack.Screen name="register" component={RegisterPage} options={{ headerShown: false }}/> 

            <Stack.Screen name="autologin" component={AutoLoginPage} options={{ headerShown: false }}/> 

            <Stack.Screen name="editprofile" component={EditProfilePage} options={{ headerShown: false }}/> 

            <Stack.Screen name="autoupdate" component={AutoUpdateUserPage} options={{ headerShown: false }}/> 

            

        </Stack.Navigator>
    )
}

export default AuthStack;