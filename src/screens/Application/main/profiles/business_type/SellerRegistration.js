import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Text, Platform } from 'react-native';
import { Button, TextInput, HelperText, Appbar, useTheme, Checkbox } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { useGetUserQuery, useRegisterassellerMutation, useUpdatesellerMutation } from '../../../../../app/services/registration/signupApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../../../app/actions/authSlice';
import { useGetSettingsQuery } from '../../../../../app/services/features/settingsServerApi';
import CustomAlert from '../../../../../Components/CustomAlert';
import ImageDialog from '../../../../../Components/MessageDialog';

const SellerRegistrationForm = ({ route }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [about, setAbout] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');
  const [registerasseller] = useRegisterassellerMutation();
  const [updateseller] = useUpdatesellerMutation();
  const accessToken = useSelector(selectCurrentToken);

  const { data: userInfo, isLoadingUser, isError, refetch } = useGetUserQuery({ accessToken });
  const { data: settings, isLoadingSettings, isErrorSettings, refetch: refetchSetiings } = useGetSettingsQuery({ accessToken });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setIsConnected(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSellerRegistration = async () => {
    try {
      setIsLoading(true);
      setAlertMessage('Creating your profile');

      if (route.params?.update) {
        await updateseller({
          accessToken,
          id: userInfo?.id,
          user: userInfo?.id,
          paypal_email: paypalEmail,
          paypal_access_token: 'your token',
          address,
          phone_number: phoneNumber,
          about,
        });
        navigation.goBack();
      } else {
        await registerasseller({
          accessToken,
          user: userInfo?.id,
          paypal_email: paypalEmail,
          paypal_access_token: 'your token',
          address,
          phone_number: phoneNumber,
          about,
        });
        navigation.replace('hurray');
      }
    } catch (error) {
      setAlertMessage('Rolling back changes');
      console.log('Buyer registration failed:', error);
      setDialogTitle('Profile Update Failed');
      setDialogMessage(error.message);
      setDialogStatus('error');
      setShowImageDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = () => {
    if (!route.params?.update) {
      setFormSubmitted(true);

      if (!paypalEmail || !address || !phoneNumber || !acceptTerms) {
        return;
      }
    }

    handleSellerRegistration();
  };

  return (
    <SafeAreaProvider>
      <CustomAlert visible={isLoading} message={alertMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction iconColor={theme.colors.color} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Seller's Profile" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <ScrollView style={{ backgroundColor: theme.colors.background }}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.formContainer}>
              <TextInput
                label="Paypal Email"
                value={paypalEmail}
                placeholder="Your Paypal Email"
                onChangeText={text => setPaypalEmail(text)}
                outlineColor={theme.colors.primary}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="email-address"
                mode="outlined"
                left={<TextInput.Icon icon="email" />}
              />
              {formSubmitted && paypalEmail.trim() === '' && (
                <HelperText type="error" visible={paypalEmail.trim() === ''} style={{ marginLeft: 10, marginTop: -2 }}>
                  Please enter your Paypal Email address
                </HelperText>
              )}
              {formSubmitted && !validateEmail(paypalEmail) && (
                <HelperText type="error" visible={!validateEmail(paypalEmail)} style={{ marginLeft: 10, marginTop: -8 }}>
                  Please enter a valid Paypal Email address
                </HelperText>
              )}
            </View>
            <View style={styles.formContainer}>
              <TextInput
                label="Address"
                value={address}
                placeholder="Address"
                onChangeText={text => setAddress(text)}
                outlineColor={theme.colors.primary}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="default"
                mode="outlined"
                left={<TextInput.Icon icon="map-marker" />}
              />
              {formSubmitted && address.trim() === '' && (
                <HelperText type="error" visible={address.trim() === ''} style={{ marginLeft: 10, marginTop: -2 }}>
                  Please enter your address
                </HelperText>
              )}
            </View>
            <View style={styles.formContainer}>
              <TextInput
                label="Phone Number"
                value={phoneNumber}
                placeholder="Phone Number"
                onChangeText={text => setPhoneNumber(text)}
                outlineColor={theme.colors.primary}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="phone-pad"
                mode="outlined"
                left={<TextInput.Icon icon="phone" />}
              />
              {formSubmitted && phoneNumber.trim() === '' && (
                <HelperText type="error" visible={phoneNumber.trim() === ''} style={{ marginLeft: 10, marginTop: -2 }}>
                  Please enter your phoneNumber
                </HelperText>
              )}
            </View>
            <View style={styles.formContainer}>
              <TextInput
                label="Write about yourself"
                value={about}
                onChangeText={text => setAbout(text)}
                outlineColor={theme.colors.primary}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="default"
                multiline
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="comment-text" />}
              />
              {!route.params?.update && (
                <View>
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={acceptTerms ? 'checked' : 'unchecked'}
                      onPress={() => setAcceptTerms(!acceptTerms)}
                      color={theme.colors.primary}
                    />
                    <Text style={[styles.checkboxLabel, { color: theme.colors.color }]}>
                      Accept our terms and conditions
                    </Text>
                  </View>
                  <Button
                    mode="text"
                    onPress={() => {
                      navigation.navigate('terms', { page: "Terms & Conditions", link: settings?.terms_and_service });
                    }}
                  >
                    View Terms and Conditions
                  </Button>
                </View>
              )}
              <Button
                mode="contained"
                onPress={() => handleSubmit()}
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                loading={isLoading}
                disabled={!isConnected || isLoading || (!route.params?.update && !acceptTerms)}
              >
                {route.params?.update ? 'Update' : 'Submit'}
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <ImageDialog
        status={dialogStatus}
        title={dialogTitle}
        message={dialogMessage}
        backgroundColor={theme.colors.cardsdialogs}
        color={theme.colors.color}
        visible={showImageDialog}
        onDismiss={() => setShowImageDialog(false)}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    marginTop: 16,
  },
});

export default SellerRegistrationForm;
