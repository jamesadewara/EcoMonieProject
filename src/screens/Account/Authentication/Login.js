import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView, Snackbar } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../app/actions/authSlice';
import { useLoginMutation } from '../../../app/services/authentication/authApiSlice';
import { Styles } from '../../../css/design';
import CustomAlert from '../../../widgets/customAlert';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';

const Thumbnail = {
  intro_wallpaper: require('../../../../assets/img/wallpaper/entrance.jpeg'),
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();


  const validateEmail = (value) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
      }
      else{
        Alert.alert('Login Failed', 'User does not exist, try another email and password.');
      }
      console.log(error, 'o', email, password);
    } 
    setIsLoading(false);
  };

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
      <CustomAlert visible={isLoading} message="Loading..." />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View>
            <IconButton
              icon={() => <Icon name="arrow-left" size={24} color="white" />}
              style={{ paddingTop: 20 }}
              color="white"
              size={35}
              onPress={() => navigation.navigate('entrance')}
            />
            <Text variant='displaySmall'
              style={{ color: 'white', textAlign: 'center', textAlignVertical: 'center', marginVertical: 50, fontWeight: "bold" }}
            >
              Login
            </Text>
          </View>

          <View
            style={{ alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center', paddingBottom: 45 }}
          >
            <Text style={{ fontSize: 40, color: 'green', fontWeight: 'bold' }}>Welcome back</Text>
            <Text style={{ fontSize: 19, color: 'green', fontWeight: 'bold', marginBottom: 20 }}>
              Login to your Account
            </Text>

            <View style={{ marginVertical: 30 }}>
              <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                <TextInput
                  label="Email"
                  mode="outlined"
                  outlineColor="green"
                  selectionColor="green"
                  placeholder="Email*"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  right={<TextInput.Icon icon="email" />}
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

              <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                <TextInput
                  label="Password"
                  mode="outlined"
                  outlineColor="green"
                  selectionColor="green"
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
                {formSubmitted && password.trim() === '' && (
                  <HelperText type="error" visible={password.trim() === ''}>
                    Password is required
                  </HelperText>
                )}
              </KeyboardAvoidingView>
            </View>

            <Button
              mode="contained"
              style={{ width: 260 }}
              color="green"
              onPress={handleLogin}
              disabled={!isInternetConnected || email.trim() === '' || password.trim() === ''}
            >
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
      {!isInternetConnected && (
        <Snackbar visible={!isInternetConnected} onDismiss={() => {}}>
          No internet connection
        </Snackbar>
      )}
    </ImageBackground>
  );
}
