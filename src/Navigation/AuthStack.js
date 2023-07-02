import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EntrancePage from "../screens/Account/Entrance";
import LoginPage from "../screens/Account/Authentication/Login";
import CreatePasswordPage from "../screens/Account/Registration/CreatePassword";
import EmailVerificationPage from "../screens/Account/Registration/VerifyEmail";
import CodeVerificationPage from "../screens/Account/Registration/VerifyCode";
import RegistrationForm from "../screens/Account/Registration/RegistrationForm";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="entrance" screenOptions={{ headerShown: false }}>
      {/* Entrance Page */}
      <Stack.Screen name="entrance" component={EntrancePage} />

      {/* Login Page */}
      <Stack.Screen name="login" component={LoginPage} />

      {/* Create Password Page */}
      <Stack.Screen name="create_password" component={CreatePasswordPage} />

      {/* Registration Form Page */}
      <Stack.Screen name="register" component={RegistrationForm} />

      {/* Email Verification Page */}
      <Stack.Screen name="verify_email" component={EmailVerificationPage} />

      {/* Code Verification Page */}
      <Stack.Screen name="verify_code" component={CodeVerificationPage} />
    </Stack.Navigator>
  );
}

export default AuthStack;
