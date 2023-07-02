import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView, Snackbar, StatusBar } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton, useTheme, MD2Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../app/actions/authSlice';
import { useLoginMutation } from '../../../app/services/authentication/authApiSlice';
import { Styles } from '../../../css/design';
import CustomAlert from '../../../widgets/customAlert';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';

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
  const logUser = async () => {
    setIsLoading(true);
    try {
      const userData = await login({ email, password });
      dispatch(setCredentials({ ...userData, email }));
      Alert.alert('Login Successful', 'You have successfully logged in! Please click on continue as we reset your page. Thank you!');
    } catch (error) {
      if (error.status === 'FETCH_ERROR') {
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else if (error.status === 401) {
        Alert.alert('Login Failed', 'User does not exist, try another email and password.');
      } else {
        Alert.alert('Login Error', 'An error occurred while login, please try again later.');
      }
      console.log(error, 'o', email, password);
    }
    setIsLoading(false);
  };

  // Function to handle login form submission
  const handleLogin = () => {
    setFormSubmitted(true);
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Invalid Credentials', 'Please enter both email and password');
    } else if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
    } else {
      logUser();
    }
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
      <CustomAlert visible={isLoading} message="Loading..." />
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
            <Text variant='displaySmall'
              style={{ color: 'white', textAlign: 'center', textAlignVertical: 'center', marginVertical: 50, fontWeight: "bold" }}
            >
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
                {/* Email input */}
                <TextInput
                  label="Email"
                  mode="outlined"
                  outlineColor={MD2Colors.green500}
                  selectionColor={MD2Colors.green700}
                  textColor={theme.colors.color}
                  style={[Styles.mb2]}
                  placeholder="Email*"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  right={<TextInput.Icon icon="email" />}
                />
                {/* Email validation error */}
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
      
                {/* Password input */}
                <TextInput
                  label="Password"
                  mode="outlined"
                  outlineColor={MD2Colors.green500}
                  selectionColor={MD2Colors.green700}
                  textColor={theme.colors.color}
                  style={[Styles.mb2]}
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
                {/* Password validation error */}
                {formSubmitted && password.trim() === '' && (
                  <HelperText type="error" visible={password.trim() === ''}>
                    Password is required
                  </HelperText>
                )}
              </KeyboardAvoidingView>
            </View>

            {/* Login button */}
            <Button
              mode="contained"
              color="green"
              onPress={handleLogin}
              disabled={!isInternetConnected || email.trim() === '' || password.trim() === ''}
            >
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
      {/* Display no internet connection message */}
      {!isInternetConnected && (
        <Snackbar visible={!isInternetConnected} onDismiss={() => {}}>
          No internet connection
        </Snackbar>
      )}
    </ImageBackground>
  );
}
