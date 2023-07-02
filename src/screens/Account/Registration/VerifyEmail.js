import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Image,
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
  Snackbar,
  useTheme,
  MD2Colors,
  MD3Colors,
} from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import CustomAlert from '../../../widgets/customAlert';
import { useVerifyemailMutation } from '../../../app/services/registration/emailVerifyApiSlice';
import { Styles } from '../../../css/design';

const Thumbnail = {
  anime: require("../../../../assets/img/anime/question-1.png"),
};

const EmailVerificationPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const { top: topInset } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const [verifyemail] = useVerifyemailMutation();
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
    setIsLoading(true);
    navigation.replace("verify_code", { email: email });
    try {
      const emailVerifier = await verifyemail({ email });

      if (emailVerifier.error?.data?.error) {
        Alert.alert(
          "Verification Error",
          "It seems like the user with this email already has an account. Please try with a different email."
        );
        navigation.replace("verify_code", { email: email });
      }

      console.log(emailVerifier);
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred, please recheck your email and try again later. Thank you.'
      );
    }

    setIsLoading(false);
  };

  const handleEmailVerification = () => {
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
      return;
    }

    if (email.trim() === '') {
      Alert.alert('Invalid Email', 'Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    verifyUserEmail();
  };

  const validateEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Verify Email" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <CustomAlert visible={isLoading} message="Loading..." />
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
          <View style={{ alignSelf: 'center', alignItems: 'center' }}>
            <View>
              <KeyboardAvoidingView style={[Styles.w3]}>
                <TextInput
                  label="Email"
                  mode="outlined"
                  outlineColor={MD2Colors.green500}
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
                  <HelperText type="error" visible={email.trim() === ''}>
                    Email is required
                  </HelperText>
                )}
                {formSubmitted && !validateEmail(email) && (
                  <HelperText type="error" visible={!validateEmail(email)}>
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
                disabled={!isConnected || !validateEmail(email)}
              >
                Verify
              </Button>
            </View>
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

export default EmailVerificationPage;
