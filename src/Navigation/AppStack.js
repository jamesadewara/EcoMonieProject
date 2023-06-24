import React, { useContext } from "react";


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider as PaperProvider } from 'react-native-paper';


import MainScreen from "../screens/Application/Main";
import ProductInfoPage from "../screens/Application/main/product/ProductInfo";
import TermsPage from "../screens/Application/main/other/Terms";
import ChangePasswordPage from "../screens/Application/main/other/ChangePassword";
import EditProfilePage from "../screens/Application/main/other/EditProfile";
import NotificationPage from "../screens/Application/main/other/Notification";
import SearchPage from "../screens/Application/main/other/SearchPage";


const Stack = createNativeStackNavigator();

const AppStack = () => {
    //fetch db

    return (
        <PaperProvider>
            <Stack.Navigator initialRouteName="main" screenOptions={{headerShown: false}}>
                <Stack.Screen name="main" component={MainScreen} screenOptions={{headerShown: false}}/>
                <Stack.Screen name="change_password" component={ChangePasswordPage} screenOptions={{headerShown: false}}/>
                <Stack.Screen name="terms" component={TermsPage} screenOptions={{headerShown: false}}/>
                <Stack.Screen name="product_info" component={ProductInfoPage} screenOptions={{headerShown: false}}/>
                <Stack.Screen name="edit_profile" component={EditProfilePage} screenOptions={{headerShown: false}}/>
                <Stack.Screen name="notification" component={NotificationPage} screenOptions={{headerShown: false}}/>
                <Stack.Screen name="search" component={SearchPage} screenOptions={{headerShown: false}}/>
            </Stack.Navigator>
        </PaperProvider>
    )
}

export default AppStack;
