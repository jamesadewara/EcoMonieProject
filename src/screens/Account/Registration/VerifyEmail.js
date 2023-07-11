import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  HelperText,
  useTheme,
  MD2Colors,
} from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

// Custom Components
import { Styles } from '../../../css/design';
import CustomAlert from '../../../Components/CustomAlert';
import ImageDialog from '../../../Components/MessageDialog';
import { useVerifyemailMutation } from '../../../app/services/registration/emailVerifyApiSlice';

const EmailVerificationPage = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const { top: topInset } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const [verifyemail] = useVerifyemailMutation();
  const theme = useTheme();

  useEffect(() => {
    // Subscribe to network connectivity changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe();
    };
  }, []);

  const verifyUserEmail = async () => {
    setIsLoading(true);
    try {
      const response = await verifyemail({email});
      if (response.data.success) {
        // Handle the success case
        navigation.navigate('verify_code', { email: email });
      }
      else{
        setDialogTitle('Error');
        setDialogMessage(
          response.data.message
        );
        setDialogStatus('error');
        setShowImageDialog(true);
      }
      console.log(response)
      
    } catch (error) {
      // Handle the error case
      setDialogTitle('Error');
      setDialogMessage(
        'An error occurred, please recheck your email and try again later. Thank you.'
      );
      setDialogStatus('error');
      setShowImageDialog(true);
    }
    setIsLoading(false);
  };

  const handleEmailVerification = () => {
    if (!isConnected) {
      setDialogTitle('No Internet Connection');
      setDialogMessage('Please check your internet connection and try again.');
      setDialogStatus('nointernet');
      setShowImageDialog(true);
      return;
    }

    if (email.trim() === '') {
      setFormSubmitted(true);
      return;
    }

    if (!validateEmail(email)) {
      setFormSubmitted(true);
      return;
    }

    verifyUserEmail()
    
  };

  const validateEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <SafeAreaProvider>
      <CustomAlert visible={isLoading} message="Verifying email" backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />
      <StatusBar barStyle={theme.colors.status} />
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
          <Appbar.Content title="Verify Email" titleStyle={{ color: theme.colors.color }} />
        </Appbar.Header>
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
          <View style={{ alignSelf: 'center', alignItems: 'center' }}>
            <View>
              <KeyboardAvoidingView style={[Styles.w3]}>
                <TextInput
                  label="Email"
                  mode="outlined"
                  outlineColor={theme.colors.color}
                  selectionColor={MD2Colors.green700}
                  textColor={theme.colors.color}
                  style={[Styles.mb2]}
                  placeholder="Enter Your Email*"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  left={<TextInput.Icon icon="email" />}
                />
                {formSubmitted && email.trim() === '' && (
                  <HelperText type="error" visible={true}>
                    Email is required
                  </HelperText>
                )}
                {formSubmitted && !validateEmail(email) && (
                  <HelperText type="error" visible={true}>
                    Please enter a valid email address
                  </HelperText>
                )}
              </KeyboardAvoidingView>
            </View>
            <View style={styles.container}>
              <Button
                mode="contained"
                buttonColor={MD2Colors.green500}
                style={{ alignSelf: 'center' }}
                onPress={handleEmailVerification}
              >
                Verify
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ImageDialog status={dialogStatus} title={dialogTitle} message={dialogMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} visible={showImageDialog} onDismiss={() => setShowImageDialog(false)} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default EmailVerificationPage;
