import React from 'react';
import { View } from 'react-native';
import { Title, Subheading } from 'react-native-paper';

const PasswordResetSuccessfulPage = ({ navigation }) => {
  const handleLogin = () => {
    // Logic to navigate to the login screen
  };

  return (
    <View>
      <Title>Password Reset Success</Title>
      <Subheading>Your password has been successfully reset.</Subheading>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default PasswordResetSuccessfulPage;
