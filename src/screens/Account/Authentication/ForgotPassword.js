import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton, useTheme, Appbar } from 'react-native-paper';
import { Styles } from '../../../css/design';
import CustomAlert from '../../../Components/CustomAlert';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import ImageDialog from '../../../Components/MessageDialog';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const [alertMessage, setAlertMessage] = useState('');

  const navigation = useNavigation();

  // Access the current theme from react-native-paper
  const theme = useTheme();

  // Email validation logic
  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleResetPassword = () => {
    setFormSubmitted(true);

    navigation.navigate('reset_password_link_sent');
  };

  return (
    <SafeAreaProvider>
      <StatusBar
          barStyle={theme.colors.status} // Use light text color for status bar
          backgroundColor="transparent" // Set status bar background color to transparent
          translucent // Make the status bar translucent
        />
      <CustomAlert visible={isLoading} message={alertMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Forgot Password" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <ScrollView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ marginVertical: 30 }}>
          <KeyboardAvoidingView style={[Styles.w3, Styles.m2]}>
            <View style={[Styles.mb2]}>
              {/* Email input */}
              <TextInput
                label="Email"
                    mode="outlined"
                    outlineColor={theme.colors.green500}
                    selectionColor={theme.colors.green700}
                    textColor={theme.colors.color}
                    placeholder="Email*"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                right={<TextInput.Icon icon="email" />}
              />
              {/* Email validation error */}
              {formSubmitted && email.trim() === '' && (
                <HelperText type="error" visible={email.trim() === ''} style={{ marginLeft: 10, marginTop: 2 }}>
                  Email is required
                </HelperText>
              )}
              {formSubmitted && !validateEmail(email) && (
                <HelperText type="error" visible={!validateEmail(email)} style={{ marginLeft: 10, marginTop: 2 }}>
                  Please enter a valid email address
                </HelperText>
              )}
            </View>

            {/* Login button */}
            <Button mode="contained" color="green" onPress={handleResetPassword}>
              Reset Password
            </Button>
               
          </KeyboardAvoidingView>
        </View>
      </ScrollView>

      <ImageDialog status={dialogStatus} title={dialogTitle} message={dialogMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} visible={showImageDialog} onDismiss={() => setShowImageDialog(false)} />

    </SafeAreaProvider>
  );
};

export default ForgotPassword;
