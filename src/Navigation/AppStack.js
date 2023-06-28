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
import UploadProductPage from "../screens/Application/main/product/UploadProduct";
import { isfirstTimer } from "../app/actions/launchSlice";
import { useSelector } from "react-redux";


const Stack = createNativeStackNavigator();

const AppStack = () => {
    const newUser = useSelector(isfirstTimer);

  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName={newUser ? "main" : "edit_profile"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="change_password" component={ChangePasswordPage} />
        <Stack.Screen name="terms" component={TermsPage} />
        <Stack.Screen name="product_info" component={ProductInfoPage} />
        <Stack.Screen name="edit_profile" component={EditProfilePage} />
        <Stack.Screen name="notification" component={NotificationPage} />
        <Stack.Screen name="search" component={SearchPage} />
        <Stack.Screen name="upload" component={UploadProductPage} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default AppStack;
