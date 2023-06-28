import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet, View, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Appbar, TextInput, HelperText, Snackbar } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import CustomAlert from '../../../widgets/customAlert';
import { useVerifyemailMutation } from '../../../app/services/registration/emailVerifyApiSlice';

const EmailVerificationPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const { top: topInset } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const [verifyemail] = useVerifyemailMutation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const verifyUserEmail = async () => {
    setIsLoading(true);
    try {
      const emailVerifier = await verifyemail({ email });

      try {
        if (emailVerifier.error.data.success === false) {
          Alert.alert("Verification Error", "It seems like the user with this email already has an account. Please try with a different email.");
        }
      } catch {
        navigation.navigate("verify_code", { email: email });
      }
      
      console.log(emailVerifier);
    } catch (error) {
      Alert.alert('Error', 'An error occurred, please recheck your email and try again later. Thank you.');
    }
    
    setIsLoading(false);
  };

  const handleEmailVerification = async () => {
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
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Verify Email" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        <CustomAlert visible={isLoading} message="Loading..." />
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
          <View>
            <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
              <TextInput
                label="Email"
                mode="outlined"
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
              style={{ width: 100, alignSelf: 'center' }}
              onPress={handleEmailVerification}
              disabled={!isConnected || !validateEmail(email)}
            >
              Next
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
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default EmailVerificationPage;
