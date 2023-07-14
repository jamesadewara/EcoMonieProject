import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Text, Alert, Platform } from 'react-native';
import { Button, TextInput, HelperText, Appbar, IconButton, useTheme, Checkbox } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useGetUserQuery, useRegisterasbuyerMutation } from '../../../../../app/services/registration/signupApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../../../app/actions/authSlice';
import { useGetSettingsQuery } from '../../../../../app/services/features/settingsServerApi';
import CustomAlert from '../../../../../Components/CustomAlert';
import ImageDialog from '../../../../../Components/MessageDialog';

const BuyerRegistrationForm = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
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
  
  const [registerasbuyer] = useRegisterasbuyerMutation();
  const accessToken = useSelector(selectCurrentToken);

  // Query for getting user info
  const { data: userInfo, isLoadingUser, isError, refetch } = useGetUserQuery({ accessToken });

  // Query for getting settings info
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

  const handleBuyerRegistration = async () => {
    try {
      setIsLoading(true);
      setAlertMessage('Creating your profile');

      const response = await registerasbuyer({
        accessToken,
        user: userInfo?.id,
        company_name: companyName,
        address: address,
        phone_number: phoneNumber,
        about,
      });

      // Handle successful registration response here
      navigation.replace('hurray');
    } catch (error) {
      setAlertMessage('Rolling back changes');
      console.log('Buyer registration failed:', error);
      // Handle registration failure here
      setDialogTitle('Profile Update Failed');
      setDialogMessage(error.message);
      setDialogStatus('error');
      setShowImageDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Email validation logic
  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  
  const handleSubmit = () => {
    setFormSubmitted(true);
    
    if (!address || !phoneNumber || !acceptTerms) {
      return;
    }

    handleBuyerRegistration();
  };

  return (
    <SafeAreaProvider>
      {/* Loading Alert */}
      <CustomAlert visible={isLoading} message={alertMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />

      {/* Appbar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction iconColor={theme.colors.color} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Buyer's Profile" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>

      <ScrollView style={{ backgroundColor: theme.colors.background }}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* Company Name */}
            <View style={styles.formContainer}>
              <TextInput
                label="Company Name"
                value={companyName}
                placeholder="Your Company's Name"
                onChangeText={text => setCompanyName(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="default"
                mode="outlined"
                left={<TextInput.Icon icon="account" />}
              />
              {formSubmitted && companyName.trim() === '' && (
                <HelperText type="error" visible={companyName.trim() === ''} style={{ marginLeft: 10, marginTop: -2 }}>
                  Company's name is required
                </HelperText>
              )}
            </View>

            {/* Address */}
            <View style={styles.formContainer}>
              <TextInput
                label="Address"
                value={address}
                placeholder="Address"
                onChangeText={text => setAddress(text)}
                outlineColor={MD2Colors.green500}
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

            {/* Phone Number */}
            <View style={styles.formContainer}>
              <TextInput
                label="Phone Number"
                value={phoneNumber}
                placeholder="Phone Number"
                onChangeText={text => setPhoneNumber(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="phone-pad"
                mode="outlined"
                left={<TextInput.Icon icon="phone" />}
              />
              {formSubmitted && phoneNumber.trim() === '' && (
                <HelperText type="error" visible={phoneNumber.trim() === ''} style={{ marginLeft: 10, marginTop: -2 }}>
                  Please enter your phone number
                </HelperText>
              )}
            </View>

            {/* About */}
            <View style={styles.formContainer}>
              <TextInput
                label="Write about yourself"
                value={about}
                onChangeText={text => setAbout(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                keyboardType="default"
                multiline
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="comment-text" />}
              />

              {/* Terms and Conditions Checkbox */}
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

              {/* View Terms and Conditions Button */}
              <Button
                mode="text"
                onPress={() => {
                  // Navigate to terms and conditions screen
                  navigation.navigate('terms', { page: "Terms & Conditions", link: settings?.terms_and_service });
                }}
              >
                View Terms and Conditions
              </Button>

              {/* Submit Button */}
              <Button
                mode="contained"
                onPress={() => handleSubmit()}
                style={[styles.submitButton, { backgroundColor: MD2Colors.green500 }]}
                loading={isLoading}
                disabled={!isConnected || isLoading || !acceptTerms}
              >
                Submit
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>

      {/* Image Dialog */}
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
  avatarContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: MD2Colors.green500,
    borderRadius: 20,
  },
  cameraIcon: {
    margin: 4,
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
    backgroundColor: MD2Colors.green500,
  },
});

export default BuyerRegistrationForm;
