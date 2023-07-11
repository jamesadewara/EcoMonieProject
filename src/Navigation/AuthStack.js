import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EntrancePage from "../screens/Account/Entrance";
import LoginPage from "../screens/Account/Authentication/Login";
import EmailVerificationPage from "../screens/Account/Registration/VerifyEmail";
import CodeVerificationPage from "../screens/Account/Registration/VerifyCode";
import CreateAccountPage from "../screens/Account/Registration/CreateAccount";
import ForgotPasswordPage from "../screens/Account/Authentication/ForgotPassword";
import ResetPasswordLinkSentPage from "../screens/Account/Authentication/ResetPasswordLinkSent";
import ResetPasswordPage from "../screens/Account/Authentication/ResetPassword";
import PasswordResetSuccessfulPage from "../screens/Account/Authentication/PasswordResetSuccessful";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="create_account" screenOptions={{ headerShown: false }}>
      {/* Entrance Page */}
      <Stack.Screen name="entrance" component={EntrancePage} />

      {/* Login Page */}
      <Stack.Screen name="login" component={LoginPage} />

      {/* Create Account Page */}
      <Stack.Screen name="create_account" component={CreateAccountPage} />

      {/* Email Verification Page */}
      <Stack.Screen name="verify_email" component={EmailVerificationPage} />

      {/* Code Verification Page */}
      <Stack.Screen name="verify_code" component={CodeVerificationPage} />

      {/* Forgot Password Page */}
      <Stack.Screen name="forgot_password" component={ForgotPasswordPage} />

      {/* Reset Password Link Sent Page */}
      <Stack.Screen name="reset_password_link_sent" component={ResetPasswordLinkSentPage} />

      {/* Reset Password Page */}
      <Stack.Screen name="reset_password" component={ResetPasswordPage} />

      {/* Password Reset Successful Page */}
      <Stack.Screen name="password_reset_success" component={PasswordResetSuccessfulPage} />

    </Stack.Navigator>
  );
}

export default AuthStack;
