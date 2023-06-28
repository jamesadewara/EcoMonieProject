import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Appbar, TextInput, HelperText, Snackbar } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../app/actions/authSlice';
import CustomAlert from '../../../widgets/customAlert';
import { useSignupMutation } from '../../../app/services/registration/signupApiSlice';
import { useLoginMutation } from '../../../app/services/authentication/authApiSlice';
import { userRegistered } from '../../../app/actions/launchSlice';

const CreatePasswordPage = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params?.email;
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
      dispatch(setCredentials({ ...userData, email }));
      dispatch(userRegistered(true));
      Alert.alert('Login Successful', 'You have successfully logged in! Please click on continue as we reset your page. Thank you!');
    } catch (error) {
      if (error.status === 'FETCH_ERROR') {
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else {
        Alert.alert('Login Failed', 'Please try logging in.');
      }
      console.log(error, 'o', email, password);
    }
    setIsLoading(false);
  };

  const signupUser = async () => {
    setIsLoading(true);
    try {
      const createUser = await signup({ email, password });
      console.log(createUser)
      //if sign up was successful
      if ( createUser.data ) {
        logUser()
      }
      else{
        Alert.alert("Login Failed", "Something went wrong. We will be redirecting you to our login page where you will have to login manually")
        navigation.navigate("login")
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

  const handleCreatePassword = async () => {
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setFormSubmitted(true);
      setIsPasswordMatched(true);
      return;
    }

    if (password.length < 8) {
      setIsPasswordMatched(false);
      return;
    }

    if (password !== confirmPassword) {
      setIsPasswordMatched(false);
      return;
    }

    // Perform password creation logic
    setIsPasswordMatched(true); // Passwords match

    // log user in and show the profile page as for registration account
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet connection.');
      return;
    }

    await signupUser();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Create Password" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        <CustomAlert visible={isLoading} message="Loading..." />
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
          <View>
            <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
              <TextInput
                label="Password"
                mode="outlined"
                placeholder="Enter Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={togglePasswordVisibility}
                  />
                }
              />
              <TextInput
                label="Confirm Password"
                mode="outlined"
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={toggleConfirmPasswordVisibility}
                  />
                }
              />
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
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleCreatePassword}
              disabled={!isConnected || password.trim() === ''}
            >
              Create
            </Button>
          </View>
        </ScrollView>
        {!isConnected && (
          <Snackbar visible={!isConnected}>
            No internet connection. Please check your network settings.
          </Snackbar>
        )}
      </SafeAreaView>
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
  input: {
    marginBottom: 16,
  },
  button: {
    width: 200,
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default CreatePasswordPage;
