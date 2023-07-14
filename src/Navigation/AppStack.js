import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../app/services/registration/signupApiSlice';
import { selectCurrentToken } from '../app/actions/authSlice';
import { Dialog, Portal, Button, Text, useTheme } from 'react-native-paper';
import { useGetSettingsQuery } from '../app/services/features/settingsServerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screens here
import MainScreen from '../screens/Application/Main';
import ProductInfoPage from '../screens/Application/main/product/ProductInfo';
import TermsPage from '../screens/Application/main/other/Terms';
import EditProfilePage from '../screens/Application/main/other/EditProfile';
import NotificationPage from '../screens/Application/main/other/Notification';
import SearchPage from '../screens/Application/main/other/SearchPage';
import UploadProductPage from '../screens/Application/main/product/UploadProduct';
import PaymentPage from '../screens/Application/main/product/Payment';
import ChatRoomPage from '../screens/Application/main/approves/ChatRoom';
import QuestionScreen from '../screens/Application/main/profiles/QuestionScreen';
import SellerRegistrationForm from '../screens/Application/main/profiles/business_type/SellerRegistration';
import BuyerRegistrationForm from '../screens/Application/main/profiles/business_type/BuyerRegsitration';
import HurrayPage from '../screens/Application/main/profiles/business_type/Hurray';
import CheckoutPage from '../screens/Application/main/profiles/business_type/CheckoutPage';
import OrderHistoryPage from '../screens/Application/main/other/History';
import AboutUsPage from '../screens/Application/main/other/AboutUs';

import { APP_VERSION } from '../config';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const theme = useTheme();
  const [isBuyer, setIsBuyer] = useState(true);
  const [isSeller, setIsSeller] = useState(true);
  const accessToken = useSelector(selectCurrentToken);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('');

  // Query for getting user info
  const { data: userInfo, isLoading: isUserLoading, isError: isUserError } = useGetUserQuery({
    accessToken,
  });

  // Query for getting settings info
  const { data: settingsInfo, isLoading: isSettingsLoading, isError: isSettingsError } = useGetSettingsQuery({
    accessToken,
  });

  useEffect(() => {
    if (isUserError) {
      // Handle error case
      setIsBuyer(true);
      setIsSeller(true);
    } else if (!isUserLoading && userInfo) {
      // Handle success case
      setIsBuyer(userInfo?.is_buyer);
      setIsSeller(userInfo?.is_seller);
    }
  }, [isUserError, isUserLoading, userInfo]);

  useEffect(() => {
    if (!isSettingsError && !isSettingsLoading && settingsInfo) {
      // Check if the version has changed
      const checkVersion = async () => {
        // Retrieve the current version of the app
        // You can use any method to get the current version
        const version = settingsInfo[0]?.app_version || APP_VERSION;

        // Get the last shown version from storage
        const lastShownVersion = await AsyncStorage.getItem('lastShownVersion');

        // Convert the last shown version back to a number if needed
        const lastShownVersionNumber = parseFloat(lastShownVersion);

        // Compare the current version with the last shown version
        if (version !== lastShownVersionNumber) {
          // Show the update dialog
          setShowUpdateDialog(true);

          // Update the last shown version in storage
          await AsyncStorage.setItem('lastShownVersion', version.toString());
        }
      };

      checkVersion();
    }
  }, [isSettingsLoading, settingsInfo, isSettingsError]);

  const handleUpdate = () => {
    // Implement your logic to redirect the user to the app store for manual update
    // ...

    // Once the update is done, dismiss the update dialog
    setShowUpdateDialog(false);
  };

  const handleLater = () => {
    // Dismiss the update dialog
    setShowUpdateDialog(false);
  };

  return (
    <>
      <Stack.Navigator
        initialRouteName={isBuyer == false && isSeller == false ? 'business_type' : 'main' }
        screenOptions={{ headerShown: false }}
      >
        {/* Define your screens here */}
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="terms" component={TermsPage} />
        <Stack.Screen name="product_info" component={ProductInfoPage} />
        <Stack.Screen name="edit_profile" component={EditProfilePage} />
        <Stack.Screen name="notification" component={NotificationPage} />
        <Stack.Screen name="search" component={SearchPage} />
        <Stack.Screen name="upload" component={UploadProductPage} />
        <Stack.Screen name="payment" component={PaymentPage} />
        <Stack.Screen name="room" component={ChatRoomPage} />
        <Stack.Screen name="business_type" component={QuestionScreen} />
        <Stack.Screen name="register_seller" component={SellerRegistrationForm} />
        <Stack.Screen name="register_buyer" component={BuyerRegistrationForm} />
        <Stack.Screen name="hurray" component={HurrayPage} />
        <Stack.Screen name="checkout" component={CheckoutPage} />
        <Stack.Screen name="history" component={OrderHistoryPage} />
        <Stack.Screen name="about" component={AboutUsPage} />
      </Stack.Navigator>

      {/* Update Dialog */}
      <Portal>
        <Dialog visible={showUpdateDialog} onDismiss={handleLater} style={{ backgroundColor: theme.colors.cardsdialogs, borderRadius: 0 }}>
          <Dialog.Title style={{ color: theme.colors.color }}>New Update Available</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: theme.colors.color }}>A new version of the app is available.</Text>
            <Text style={{ color: theme.colors.color }}>Please update to enjoy the latest features and improvements.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleLater}>Later</Button>
            <Button onPress={handleUpdate}>Update Now</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default AppStack;
