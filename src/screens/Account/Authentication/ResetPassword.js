import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Title, Subheading } from 'react-native-paper';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please enter both new password and confirm password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }

    // Check internet connectivity
    // You can use NetInfo from @react-native-community/netinfo for this

    // Perform password reset API call here
    // Replace the below alert with your actual API call
    Alert.alert('Success', 'Password reset successful.');
    navigation.navigate('PasswordResetSuccess');
  };

  return (
    <View>
      <Title>Reset Password</Title>
      <Subheading>Enter your new password below.</Subheading>
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPasswordPage;
