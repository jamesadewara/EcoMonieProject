import React, { useState, useContext } from 'react';

import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';

import { Text, Button, TextInput, HelperText, IconButton, MD2Colors } from 'react-native-paper';


import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import { useSignupMutation } from '../../app/services/authentication/registerServerApi';

import CustomAlert from '../../widgets/customAlert';

import { Styles } from '../../css/design';

const Thumbnail = {
  icon: require('../../../assets/icon.png'),
  intro_wallpaper: require('../../../assets/img/wallpaper/entrance.jpeg'),
};

export default function SignupPage() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const usernameRegex = /^[a-zA-Z0-9@/./+/-/_]*$/;

  const hasErrors = (value) => {
    return !value.includes('@');
  };

  const handleSignup = async () => {
    setFormSubmitted(true);
  
    if (username.trim() === '') {
      Alert.alert('Invalid Username', 'Username is required');
    } else if (!usernameRegex.test(username)) {
      Alert.alert(
        'Invalid Username',
        'Username should contain only letters, numbers, and @/./+/-/_ characters'
      );
    } else if (email.trim() === '') {
      Alert.alert('Invalid Email', 'Email is required');
    } else if (!hasErrors(email) && password.trim() !== '') {
      try {
        const signupPayload = { username, email, password };
        const response = await signup(signupPayload).unwrap();
        const signupToken = response.access; // Assuming the token is stored in the `access` field of the response
  
        // Dispatch an action to store the signup token in the Redux store
        // Replace 'storeSignupToken' with the appropriate action dispatch in your Redux store
        storeSignupToken(signupToken);
  
        // Navigate to the desired screen upon successful signup
        navigation.navigate('Home'); // Replace 'Home' with your desired screen name
  
        Alert.alert('Signup Successful', 'You have successfully signed up!');
      } catch (error) {
        if (error.response) {
          Alert.alert('Signup Failed', 'An error occurred during signup.');
        } else if (error.request) {
          Alert.alert('Network Error', 'Please check your internet connection.');
        } else {
          Alert.alert('Error', 'Failed to sign up. Please try again later.');
        }
      }
    } else {
      Alert.alert('Invalid Credentials', 'Please enter a valid email and password');
    }
  };
  

  const handleUsernameChange = (text) => {
    setUsername(text);
    
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
              icon="arrow-left"
              style={{ paddingTop: 20 }}
              iconColor="white"
              size={35}
              onPress={() => navigation.navigate('entrance')}
            />
            <Text variant="displaySmall" style={{ color: 'white', textAlign: 'center', textAlignVertical: 'center', marginVertical: 50 }}>
              Signup
            </Text>
          </View>

          <View style={{ alignItems: 'center', backgroundColor: 'white', borderTopRightRadius: 130, paddingTop: 100, alignItems: 'center', paddingBottom: 45 }}>
            <Text style={{ fontSize: 40, color: MD2Colors.green900, fontWeight: 'bold' }}>Be a part of us</Text>
            <Text style={{ fontSize: 19, color: MD2Colors.green500, fontWeight: 'bold', marginBottom: 20 }}>Signup for an account</Text>

            <View style={{ marginVertical: 30 }}>
              <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                <TextInput
                  label="Username"
                  mode="outlined"
                  outlineColor={MD2Colors.green400}
                  activeOutlineColor={MD2Colors.green900}
                  placeholder="Username*"
                  keyboardType="default"
                  value={username}
                  onChangeText={handleUsernameChange}
                />
                {formSubmitted && username.trim() === '' && <HelperText type="error" visible={username.trim() === ''}>Username is required</HelperText>}
              </KeyboardAvoidingView>

              <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                <TextInput
                  label="Email"
                  mode="outlined"
                  outlineColor={MD2Colors.green400}
                  activeOutlineColor={MD2Colors.green900}
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
                  activeOutlineColor={MD2Colors.green900}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                {formSubmitted && password.trim() === '' && <HelperText type="error" visible={password.trim() === ''}>Password is required</HelperText>}
              </KeyboardAvoidingView>
            </View>

            <Button mode="contained" style={{ width: 260 }} backgroundColor={MD2Colors.green900} onPress={handleSignup}>
              Signup
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
