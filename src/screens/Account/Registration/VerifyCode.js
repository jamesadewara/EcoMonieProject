import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet, View, KeyboardAvoidingView, Alert, StatusBar } from 'react-native';
import { Button, Appbar, TextInput, HelperText, MD2Colors, useTheme } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { Styles } from '../../../css/design';
import ImageDialog from '../../../Components/MessageDialog';
import { useCodeverifyMutation } from '../../../app/services/registration/codeVerifyApiSlice';
import { useVerifyemailMutation } from '../../../app/services/registration/emailVerifyApiSlice';


const CodeVerificationPage = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params || '';
  const [verificationCode, setVerificationCode] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const { top: topInset } = useSafeAreaInsets();
  const [verifyemail] = useVerifyemailMutation();
  const [codeverify] = useCodeverifyMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [isResendSuccessful, setIsResendSuccessful] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const theme = useTheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const verifyUserEmail = async () => {
    setIsResendLoading(true);
    try {
      const response = await verifyemail({email});
      if (response.data.success) {
        // Handle the success case
        setDialogTitle('Resent Successful')
        setDialogMessage('We have resent your verification code. You will receive it through your email shortly.')
        setDialogStatus('email')
        setShowImageDialog(true);
      }
      else{
        navigation.navigate("verify_email")
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
    setIsResendLoading(false);
  };

  const verifyUserCode = async () => {
    
    setIsLoading(true);
    const code = verificationCode;
    try {
      const requestCode = await codeverify({ email, code });
   
      console.log(requestCode)
      if (requestCode.data.success) {
        navigation.replace('create_account', { email });
      } else {
        setDialogTitle('Mismatched')
        setDialogMessage('The code is not the same. Please recheck your email and verify the code again.')
        setDialogStatus('error')
        setShowImageDialog(true);
      }
    } catch (error) {
      console.log('error opo', error);
      setIsResendSuccessful(true);
      setDialogTitle('Error')
      setDialogMessage('An error occurred. Please recheck your email and try again later. Thank you.')
      setDialogStatus('error')
      setShowImageDialog(true);
    }
    setIsLoading(false);
  };

  const handleCodeVerification = async () => {
    if (!isConnected) {
      Alert.alert('', '');
      setIsResendSuccessful(true);
      setDialogTitle('No Internet Connection')
      setDialogMessage('Please check your internet connection and try again.')
      setDialogStatus('nointernet')
      setShowImageDialog(true);
      return;
    }

    if (verificationCode.trim().length !== 6) {
      setFormSubmitted(true);
      return;
    }

    verifyUserCode();
    
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={theme.colors.status} />
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="VerifyCode" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
          <View>
            <KeyboardAvoidingView style={[Styles.m2, { alignSelf: 'center' }]}>
              <TextInput
                label="Verification Code"
                mode="outlined"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.w2]}
                placeholder="EM-XXXXX"
                keyboardType="numeric"
                value={verificationCode}
                onChangeText={setVerificationCode}
                maxLength={6}
                left={<TextInput.Icon icon="lock" />}
              />
              {formSubmitted && verificationCode.trim().length !== 6 && (
                <HelperText type="error" visible={true}>
                  Verification code should be 6 digits
                </HelperText>
              )}
            </KeyboardAvoidingView>
          </View>
          <View style={styles.container}>
            <Button
              mode="contained"
              style={{ width: 100, alignSelf: 'center' }}
              onPress={handleCodeVerification}
              disabled={!isConnected || verificationCode.trim().length !== 6}
              loading={isLoading}
            >
              Verify
            </Button>
          </View>
          <View style={{ marginVertical: 30, padding: 10 }}>
            <Text style={{ color: theme.colors.color }}>
              We have sent a verification code to this email: {email}
            </Text>
            <Text style={{ color: theme.colors.color }}>
              Did not receive the verification code? Try clicking on Resend Code.
            </Text>
          </View>
          <View style={styles.container}>
            <Button
              mode="text"
              style={{ width: 160, alignSelf: 'center' }}
              onPress={verifyUserEmail}
              disabled={!isConnected}
              loading={isResendLoading}
            >
              Resend Code
            </Button>
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

export default CodeVerificationPage;
