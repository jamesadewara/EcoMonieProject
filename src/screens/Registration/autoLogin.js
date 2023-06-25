import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../../app/services/authentication/loginServerApi';
import { setToken } from '../../app/actions/userSlice';
import { Styles } from '../../css/design';

const Thumbnail = {
  calmness: require('../../../assets/img/anime/calmness.png'),
};

export default function AutoLoginPage({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch;

  const [login] = useLoginMutation();
  const { width, height } = useWindowDimensions();
  const [loginToken, setLoginToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Set initial value to true
  const [isDispatched, setIsDispatched] = useState(false);

  const autoLogin = async () => {
    setIsLoading(true);
    setIsDispatched(false);
    try {
      const email = route.params?.email;
      const password = route.params?.password;
      const loginPayload = { email, password };

      const response = await login(loginPayload).unwrap();

      setLoginToken(response.access);

      Alert.alert('Login Successful', 'Welcome aboard this journey!');
      setIsDispatched(true);
    } catch (error) {
      if (error.request) {
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else {
        navigation.navigate('login');
        Alert.alert(
          'Error',
          'An error occurred. We apologize for any inconvenience. You will be redirected to the login page where you can provide your email and password to sign in. Thank you.'
        );
      }
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);
  
  useEffect(() => {
    if (isDispatched && loginToken) {
      dispatch(setToken(loginToken));
      navigation.replace('editprofile', { email: route.params?.email });
      setIsDispatched(false);
    }
  }, [isDispatched, loginToken]);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']} style={Styles.defaultGradient} />
        <View style={[styles.container, { width, height }]}>
          <Text variant="headlineLarge" style={{ color: 'white', top: 50 }}>
            Setting up your page
          </Text>
          <Image source={Thumbnail.calmness} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Please remain calm while we set things up</Text>
            <ActivityIndicator size="large" color="green" />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
});
