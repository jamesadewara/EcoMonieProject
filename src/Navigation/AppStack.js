import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from "../screens/Application/Main";
import ProductInfoPage from "../screens/Application/main/product/ProductInfo";
import TermsPage from "../screens/Application/main/other/Terms";
import ChangePasswordPage from "../screens/Application/main/other/ChangePassword";
import EditProfilePage from "../screens/Application/main/other/EditProfile";
import NotificationPage from "../screens/Application/main/other/Notification";
import SearchPage from "../screens/Application/main/other/SearchPage";
import UploadProductPage from "../screens/Application/main/product/UploadProduct";
import PaymentPage from "../screens/Application/main/product/Payment";
import ChatRoomPage from "../screens/Application/main/approves/ChatRoom";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
      {/* Main Screen */}
      <Stack.Screen name="main" component={MainScreen} />

      {/* Change Password Page */}
      <Stack.Screen name="change_password" component={ChangePasswordPage} />

      {/* Terms Page */}
      <Stack.Screen name="terms" component={TermsPage} />

      {/* Product Info Page */}
      <Stack.Screen name="product_info" component={ProductInfoPage} />

      {/* Edit Profile Page */}
      <Stack.Screen name="edit_profile" component={EditProfilePage} />

      {/* Notification Page */}
      <Stack.Screen name="notification" component={NotificationPage} />

      {/* Search Page */}
      <Stack.Screen name="search" component={SearchPage} />

      {/* Upload Product Page */}
      <Stack.Screen name="upload" component={UploadProductPage} />

      {/* Payment Page */}
      <Stack.Screen name="payment" component={PaymentPage} />

      {/* Chat Room Page */}
      <Stack.Screen name="room" component={ChatRoomPage} />
    </Stack.Navigator>
  );
};

export default AppStack;
