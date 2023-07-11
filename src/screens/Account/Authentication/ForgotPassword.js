import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Title, Subheading } from 'react-native-paper';

const ForgotPassword = ({ navigation }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');

  const handleResetPassword = () => {
    if (!emailOrUsername) {
      Alert.alert('Error', 'Please enter your email or username.');
      return;
    }

    // Check internet connectivity
    // You can use NetInfo from @react-native-community/netinfo for this

    // Perform password reset API call here
    // Replace the below alert with your actual API call
    Alert.alert('Success', 'Password reset link sent successfully.');
    //navigation.navigate('ResetPasswordLinkSent');
  };

  return (
    <View>
      <Title>Forgot Password</Title>
      <Subheading>Enter your email or username to reset your password.</Subheading>
      <TextInput
        placeholder="Email or Username"
        value={emailOrUsername}
        onChangeText={text => setEmailOrUsername(text)}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ForgotPassword;
