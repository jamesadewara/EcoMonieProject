import React, { useContext } from "react";


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider as PaperProvider } from 'react-native-paper';


import MainScreen from "../screens/Application/Main";
import ProductInfoPage from "../screens/Application/main/product/ProductInfo";


const Stack = createNativeStackNavigator();

const AppStack = () => {
    //fetch db

    return (
        <PaperProvider>
            <Stack.Navigator initialRouteName="main" screenOptions={{headerShown: false}}>
                <Stack.Screen name="main" component={MainScreen} screenOptions={{headerShown: false}}/>
                <Stack.Screen name="product_info" component={ProductInfoPage} screenOptions={{headerShown: false}}/>
            </Stack.Navigator>
        </PaperProvider>
    )
}

export default AppStack;
