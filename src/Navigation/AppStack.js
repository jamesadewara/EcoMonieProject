import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens here
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
import QuestionScreen from "../screens/Application/main/profiles/QuestionScreen";
import SellerRegistrationForm from "../screens/Application/main/profiles/business_type/SellerRegistration";
import BuyerRegistrationForm from "../screens/Application/main/profiles/business_type/BuyerRegsitration";
import HurrayPage from "../screens/Application/main/profiles/business_type/Hurray";


import { useSelector } from "react-redux";
import { useGetUserQuery } from "../app/services/registration/signupApiSlice";
import { selectCurrentToken } from "../app/actions/authSlice";
import CheckoutPage from "../screens/Application/main/profiles/business_type/CheckoutPage";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const accessToken = useSelector(selectCurrentToken);

  // Query for getting user info
  const { data: userInfo, isLoading, isError, refetch } = useGetUserQuery({
    accessToken,
  });

  useEffect(() => {
    if (isError) {
      // Handle error case
      setIsBuyer(false);
      setIsSeller(false);
    } else if (!isLoading && userInfo) {
      // Handle success case
      setIsBuyer(userInfo.is_buyer);
      setIsSeller(userInfo.is_seller);
    }
  }, [isError, isLoading, userInfo]);

  return (
    <Stack.Navigator
      initialRouteName={!isBuyer || !isSeller ? "main" : "business_type"}
      screenOptions={{ headerShown: false }}
    >
      {/* Define your screens here */}
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

      {/* Question Screen */}
      <Stack.Screen name="business_type" component={QuestionScreen} />

      {/* Seller Registration Form */}
      <Stack.Screen name="register_seller" component={SellerRegistrationForm} />

      {/* Buyer Registration Form */}
      <Stack.Screen name="register_buyer" component={BuyerRegistrationForm} />

      <Stack.Screen name="hurray" component={HurrayPage} />

      <Stack.Screen name="checkout" component={CheckoutPage} />

    </Stack.Navigator>
  );
};

export default AppStack;
