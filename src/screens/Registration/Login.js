import React, { useRef, useEffect, useState } from 'react';
import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../app/actions/authSlice';
import { useLoginMutation } from '../../app/services/authentication/authApiSlice';
import { Styles } from '../../css/design';
import CustomAlert from '../../widgets/customAlert';
import Icon from 'react-native-vector-icons/FontAwesome';

const Thumbnail = {
  icon: require('../../../assets/icon.png'),
  intro_wallpaper: require('../../../assets/img/wallpaper/entrance.jpeg'),
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [credent, setCredent] = useState(null);
  const navigation = useNavigation();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const hasErrors = (value) => {
    return !value.includes('@');
  };

  const logUser = async () => {
    try {
      const userData = await login({ email, password }).unwrap();
      setEmail('');
      setPassword('');
      Alert.alert('Login Successful', 'You have successfully logged in! Please click on continue as we reset your page. Thank you!');
        dispatch(setCredentials({ ...userData, email }));
      
    } catch (error) {
      if (error.status === 'FETCH_ERROR') {
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else if (error.status === 401) {
        Alert.alert('Login Failed', 'User does not exist, try another email and password.');
      }
      console.log(error);
      setHasExecuted(false);
    }
  }

  const handleLogin = () => {
    setFormSubmitted(true);

    if (email.trim() === '') {
      Alert.alert('Invalid Email', 'Email is required');
    } else if (!hasErrors(email) && password.trim() !== '') {
      logUser();
    } else {
      Alert.alert('Invalid Credentials', 'Please enter a valid email and password');
    }
  }


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
            <Text
              variant="displaySmall"
              style={{ color: 'white', textAlign: 'center', textAlignVertical: 'center', marginVertical: 50 }}
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
                />
                {formSubmitted && email.trim() === '' && (
                  <HelperText type="error" visible={email.trim() === ''}>
                    Email is required
                  </HelperText>
                )}
                {formSubmitted && hasErrors(email) && (
                  <HelperText type="error" visible={hasErrors(email)}>
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
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                {formSubmitted && password.trim() === '' && (
                  <HelperText type="error" visible={password.trim() === ''}>
                    Password is required
                  </HelperText>
                )}
              </KeyboardAvoidingView>
            </View>

            <Button mode="contained" style={{ width: 260 }} color="green" onPress={handleLogin}>
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
