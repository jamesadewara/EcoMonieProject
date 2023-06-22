import React, { useState } from 'react';
import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton, MD2Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSignupMutation } from '../../app/services/authentication/registerServerApi';
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomAlert from '../../widgets/customAlert';
import { Styles } from '../../css/design';

const Thumbnail = {
  icon: require('../../../assets/icon.png'),
  intro_wallpaper: require('../../../assets/img/wallpaper/entrance.jpeg'),
};

export default function SignupPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const hasErrors = (value) => {
    return !value.includes('@');
  };

  const isPasswordValid = (value) => {
    const isSimilarToEmail = email.toLowerCase().includes(value.toLowerCase());
    return value.length >= 8 && value !== 'password' && !isSimilarToEmail;
  };

  const handleSignup = async () => {
    setFormSubmitted(true);

    if (email.trim() === '') {
      Alert.alert('Invalid Email', 'Email is required');
    } else if (email === password) {
      Alert.alert('Invalid Credentials', 'Email and password cannot be identical');
    } else if (!hasErrors(email) && isPasswordValid(password)) {
      try {
        const signupPayload = { email, password };
        const response = await signup(signupPayload).unwrap();
        console.log(response);

        // Navigate to the edit profile screen screen upon successful signup
        navigation.navigate('autologin', { email: email, password: password });
        // Alert.alert('Signup Successful', 'You have successfully signed up! Welcome aboard!. please wait while we log you in, Thank you!');

        
      } catch (error) {
        if (error.response) {
          Alert.alert('Signup Failed', 'An error occurred during signup.');
        } else if (error.request) {
          Alert.alert('Network Error', 'Please check your internet connection.');
        } else {
          console.log("stars", error.data)
          try{
            if (error.response.status == 400) {
              try {
                const message = error.response.data.password[0] || 'A user with this account already exists, please try another email.';
                Alert.alert('Error', message);
              } catch {
                const message = 'A user with this account already exists, please try another email.';
                Alert.alert('Error', message);
              }
            } else {
              Alert.alert('Error', 'An error occurred during signup.');
            }
          }
          catch{
            if (error.status == 400) {
              try {
                const message = error.data.password[0] || 'A user with this account already exists, please try another email.';
                Alert.alert('Error', message);
              } catch {
                const message = 'A user with this account already exists, please try another email.';
                Alert.alert('Error', message);
              }
            } else {
              Alert.alert('Error', 'An error occurred during signup.');
            }
          }
        }
      }
    } else {
      Alert.alert('Invalid Credentials', 'Please enter a valid email and password');
    }
  };

  return (
    <ImageBackground style={[Styles.mh100]} source={Thumbnail.intro_wallpaper}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.5)']} style={[Styles.defaultGradient, { opacity: 0.45 }]} />
      <CustomAlert visible={isLoading} message="Loading..." />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View>
            <IconButton icon={() => <Icon name="arrow-left" size={24} color="white" />} style={{ paddingTop: 20 }} color="white" size={35} onPress={() => navigation.navigate('entrance')} />
            <Text variant="displaySmall" style={{ color: 'white', textAlign: 'center', textAlignVertical: 'center', marginVertical: 50 }}>
              Signup
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              borderTopRightRadius: 130,
              paddingTop: 100,
              alignItems: 'center',
              paddingBottom: 45,
            }}
          >
            <Text style={{ fontSize: 40, color: MD2Colors.green900, fontWeight: 'bold' }}>Be a part of us</Text>
            <Text style={{ fontSize: 19, color: MD2Colors.green500, fontWeight: 'bold', marginBottom: 20 }}>Signup for an account</Text>

            <View style={{ marginVertical: 30 }}>
              <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                <TextInput
                  label="Email"
                  mode="outlined"
                  outlineColor={MD2Colors.green400}
                  activeColor={MD2Colors.green900}
                  placeholder="Email*"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                {formSubmitted && email.trim() === '' && <HelperText type="error" visible={email.trim() === ''}>Email is required</HelperText>}
                {formSubmitted && hasErrors(email) && <HelperText type="error" visible={hasErrors(email)}>Please enter a valid email address</HelperText>}
              </KeyboardAvoidingView>

              <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                <TextInput
                  label="Password"
                  mode="outlined"
                  outlineColor={MD2Colors.green400}
                  activeColor={MD2Colors.green900}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                {formSubmitted && password.trim() === '' && <HelperText type="error" visible={password.trim() === ''}>Password is required</HelperText>}
                {formSubmitted && email === password && (
                  <HelperText type="error" visible={email === password}>
                    Email and password cannot be identical
                  </HelperText>
                )}
                {formSubmitted && !isPasswordValid(password) && (
                  <HelperText type="error" visible={!isPasswordValid(password)}>
                    {password.length < 8
                      ? 'This password is too short. It must contain at least 8 characters.'
                      : password === 'password'
                      ? 'This password is too common. Please choose a different one.'
                      : 'This password is too similar to the email.'}
                  </HelperText>
                )}
              </KeyboardAvoidingView>
            </View>

            <Button mode="contained" style={{ width: 260, backgroundColor: MD2Colors.green900 }} onPress={handleSignup}>
              Signup
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
