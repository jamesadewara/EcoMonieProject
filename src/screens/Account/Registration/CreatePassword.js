import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  HelperText,
  Snackbar,
  useTheme,
  MD2Colors,
} from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../app/actions/authSlice';
import { useSignupMutation } from '../../../app/services/registration/signupApiSlice';
import { useLoginMutation } from '../../../app/services/authentication/authApiSlice';
import { userRegistered } from '../../../app/actions/launchSlice';
import { StatusBar } from 'expo-status-bar';
import { Styles } from '../../../css/design';

const CreatePasswordPage = ({ route }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(route.params?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const { top: topInset } = useSafeAreaInsets();
  const [isConnected, setIsConnected] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    // Check internet connection
    const checkInternetConnection = async () => {
      try {
        const response = await fetch('https://www.google.com');
        setIsConnected(response.status === 200);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkInternetConnection();
  }, []);

  const logUser = async () => {
    setIsLoading(true);
    try {
      const userData = await login({ email, password });
      navigation.navigate('register');
      dispatch(setCredentials({ ...userData, email }));
    } catch (error) {
      if (error.status === 'FETCH_ERROR') {
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else {
        Alert.alert(
          'Error',
          'Something went wrong. We will be redirecting you to our login page where you will have to login manually'
        );
        navigation.navigate('login');
      }
      console.log(error, 'o', email, password);
    }
    setIsLoading(false);
  };

  const signupUser = async () => {
    setIsLoading(true);
    try {
      const createUser = await signup({ email, password });
      console.log(createUser);
      if (createUser.data) {
        logUser();
      } else {
        // Handle signup failure
      }
    } catch (error) {
      if (error.status === 'FETCH_ERROR') {
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else {
        Alert.alert('Signup Failed', 'An error occurred, please try again.');
      }
      console.log(error, 'o', email, password);
    }
    setIsLoading(false);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleCreatePassword = async () => {
    navigation.navigate('register', { email, password });
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet connection.');
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

    if (password.trim() === '' || confirmPassword.trim() === '') {
      setFormSubmitted(true);
      setIsPasswordMatched(true);
      return;
    }

    if (password.length < 8 || password !== confirmPassword) {
      setIsPasswordMatched(false);
      return;
    }

    if (email.includes(password)) {
      Alert.alert('Invalid Password', 'Password cannot be the same as the email.');
      return;
    }

    setIsPasswordMatched(true);
    navigation.navigate('register', { email, password });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <SafeAreaProvider>
      {/* App header */}
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Create Password" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>

      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
          <View>
            <KeyboardAvoidingView style={[Styles.m2, Styles.w3]}>
              {/* Password input */}
              <TextInput
                label="Password"
                mode="outlined"
                placeholder="Enter Password"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={togglePasswordVisibility}
                  />
                }
              />

              {/* Confirm Password input */}
              <TextInput
                label="Confirm Password"
                mode="outlined"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={toggleConfirmPasswordVisibility}
                  />
                }
              />

              {/* Password validation errors */}
              {formSubmitted && (password.trim() === '' || confirmPassword.trim() === '') && (
                <HelperText type="error" visible={true}>
                  Password is required
                </HelperText>
              )}
              {!isPasswordMatched && (
                <HelperText type="error" visible={!isPasswordMatched}>
                  {password.length < 8 ? 'Password should be at least 8 characters' : 'Passwords do not match'}
                </HelperText>
              )}
            </KeyboardAvoidingView>
          </View>

          <View style={styles.container}>
            {/* Next button */}
            <Button
              loading={isLoading}
              mode="contained"
              color={theme.colors.green700}
              onPress={handleCreatePassword}
              disabled={!isConnected || password.trim() === ''}
            >
              Next
            </Button>
          </View>
        </ScrollView>

        {/* Internet connection snackbar */}
        {!isConnected && (
          <Snackbar visible={!isConnected} onDismiss={() => {}}>
            No internet connection. Please check your network settings.
          </Snackbar>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePasswordPage;
