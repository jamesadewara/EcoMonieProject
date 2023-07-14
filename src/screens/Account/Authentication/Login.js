import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {  setCredentials } from '../../../app/actions/authSlice';
import { useLoginMutation } from '../../../app/services/authentication/authApiSlice';
import { Styles } from '../../../css/design';
import CustomAlert from '../../../Components/CustomAlert';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import ImageDialog from '../../../Components/MessageDialog';

// Define the thumbnail image
const Thumbnail = {
  intro_wallpaper: require('../../../../assets/img/wallpaper/entrance.jpeg'),
};

export default function LoginPage() {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const [alertMessage, setAlertMessage] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Mutation hook for login functionality
  const [login] = useLoginMutation();

  // Access the current theme from react-native-paper
  const theme = useTheme();

  // Email validation logic
  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // useEffect to listen for internet connectivity changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Function to log in the user
  const loginUser = async () => {
    setIsLoading(true);
    setAlertMessage("Login you in");

    try {
      const response = await login({ email, password });
      console.log(response)
      if (response.error && response.error.status === 401) {
        setDialogTitle('Login Failed');
        setDialogMessage(
          'User does not exist, try another email and password.'
        );
        setDialogStatus('error');
        setShowImageDialog(true);
      } else if (response.error && response.error.status === "FETCH_ERROR") {
        setDialogTitle('Login Error');
        setDialogMessage(
          'An error occurred while login, please try again later.'
        );
        setDialogStatus('error');
        setShowImageDialog(true);
      } else {
        // Save token and dispatch user data
        dispatch(setCredentials({ ...response }));
      }
    } catch (error) {
      setDialogTitle('Login Error');
      setDialogMessage(
        'An error occurred while login, please try again later.'
      );
      setDialogStatus('error');
      setShowImageDialog(true);
    }

    setIsLoading(false);
  };

  // Function to handle login form submission
  const handleLogin = () => {
    setFormSubmitted(true);

    if (!isInternetConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet connection.');
      return;
    }

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Invalid Credentials', 'Please enter both email and password');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    loginUser();
  };

  return (
    <ImageBackground style={[Styles.mh100]} source={Thumbnail.intro_wallpaper}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.5)']}
        style={[Styles.defaultGradient, { opacity: 0.45 }]}
      />
      <StatusBar
        barStyle="light-content" // Use light text color for status bar
        backgroundColor="transparent" // Set status bar background color to transparent
        translucent // Make the status bar translucent
      />
      <CustomAlert visible={isLoading} message={alertMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View>
            {/* Back button */}
            <IconButton
              icon={() => <Icon name="arrow-left" size={24} color="white" />}
              style={{ paddingTop: 20 }}
              color="white"
              size={35}
              onPress={() => navigation.navigate('entrance')}
            />
            {/* Login heading */}
            <Text variant="displaySmall" style={{ color: 'white', textAlign: 'center', textAlignVertical: 'center', marginVertical: 50, fontWeight: 'bold' }}>
              Login
            </Text>
          </View>

          <View
            style={{ alignItems: 'center', backgroundColor: theme.colors.background, borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center', paddingBottom: 45 }}
          >
            {/* Welcome back text */}
            <Text style={{ fontSize: 40, color: theme.colors.color, fontWeight: 'bold' }}>Welcome back</Text>
            {/* Login instructions */}
            <Text style={{ fontSize: 19, color: theme.colors.color, fontWeight: 'bold', marginBottom: 20 }}>
              Login to your Account
            </Text>
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
                    <HelperText type="error" visible={email.trim() === ''} style={{ marginLeft: 10, marginTop: -8 }}>
                      Email is required
                    </HelperText>
                  )}
                  {formSubmitted && !validateEmail(email) && (
                    <HelperText type="error" visible={!validateEmail(email)} style={{ marginLeft: 10, marginTop: -8 }}>
                      Please enter a valid email address
                    </HelperText>
                  )}
                </View>
                <View style={[Styles.mb2]}>
                  {/* Password input */}
                  <TextInput
                    label="Password"
                    mode="outlined"
                    outlineColor={theme.colors.green500}
                    selectionColor={theme.colors.green700}
                    textColor={theme.colors.color}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                  />
                  <Button mode="text" style={{alignSelf:'flex-end'}} onPress={()=>navigation.navigate("forgot_password")} >Forgot password?</Button>
                  {/* Password validation error */}
                  {formSubmitted && password.trim() === '' && (
                    <HelperText type="error" visible={password.trim() === ''} style={{ marginLeft: 10, marginTop: -8 }}>
                      Password is required
                    </HelperText>
                  )}
                </View>
              </KeyboardAvoidingView>
            </View>

            {/* Login button */}
            <Button mode="contained" color="green" onPress={handleLogin}>
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
      <ImageDialog status={dialogStatus} title={dialogTitle} message={dialogMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} visible={showImageDialog} onDismiss={() => setShowImageDialog(false)} />
    </ImageBackground>
  );
}
