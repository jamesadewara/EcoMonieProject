import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  HelperText,
  MD2Colors,
  Snackbar,
  useTheme,
} from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { useVerifyemailMutation } from '../../../app/services/registration/emailVerifyApiSlice';
import { useCodeverifyMutation } from '../../../app/services/registration/codeVerifyApiSlice';
import { Styles } from '../../../css/design';

const CodeVerificationPage = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params?.email;
  const [verificationCode, setVerificationCode] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const { top: topInset } = useSafeAreaInsets();
  const [verifyemail] = useVerifyemailMutation();
  const [codeverify] = useCodeverifyMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [isResendSuccessfull, setIsResendSuccessfull] = useState(false);

  const theme = useTheme(); // Access the current theme from react-native-paper

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
    setIsResendLoading(true);
    try {
      await verifyemail({ email });
      // If the email was resent successfully, show the text for email was resent
      setIsResendSuccessfull(true);
      Alert.alert(
        'Resent Successfull',
        'We have resent your verification code, you will receive it through your email shortly.'
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred, please recheck your email and try again later. Thank you.'
      );
    }
    setIsResendLoading(false);
  };

  const verifyUserCode = async () => {
    navigation.navigate('create_password', { email: email });
    setIsLoading(true);
    const verification_code = verificationCode;
    try {
      const requestCode = await codeverify({ email, verification_code });
      try {
        if (requestCode.data.success) {
          // If the code is equal, go to the create password page
          navigation.replace('create_account', { email: email });
        }
      } catch {
        if (!requestCode.error.data.success) {
          Alert.alert(
            'Mismatched',
            'The code is not the same, please recheck your email and verify the code again.'
          );
        }
      }
    } catch (error) {
      console.log('error opo', error);
      Alert.alert(
        'Error',
        'An error occurred, please recheck your email and try again later. Thank you.'
      );
    }
    setIsLoading(false);
  };

  const handleCodeVerification = async () => {
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
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
              We have sent a verification code to this email {email}
            </Text>
            <Text style={{ color: theme.colors.color }}>
              Did not receive the verification code? Try clicking on Resend Code
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
      {!isConnected && (
        <Snackbar visible={!isConnected} onDismiss={() => {}}>
          No internet connection
        </Snackbar>
      )}
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
