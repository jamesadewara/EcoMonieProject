import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserMutation } from '../../app/services/authentication/registerServerApi';
import { clearUser, setUser } from '../../app/actions/userSlice';
import { Styles } from '../../css/design';

// Get All Images for the Screen
const Thumbnail = {
  authenticating: require('../../../assets/img/anime/authenticating.png'),
};

export default function AutoUpdateUserPage() {
  const navigation = useNavigation();
  const accessToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [getUser] = useGetUserMutation();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    let isCancelled = false;

    const autoUpdateUser = async () => {
      if (!isCancelled) {
        try {
          const getPayload = { accessToken };
          const response = await getUser(getPayload).unwrap();
          dispatch(setUser(response));
     
          Alert.alert(
            'Welcome Again',
            "Welcome back again. I wish you good luck on today's success, Amen in Jesus's name."
          );
        } catch (error) {
          navigation.replace('login');
          Alert.alert(
            'Error',
            'An error occurred. We are sorry for any inconveniences. Please try again. Thank you.'
          );
        }
      }

    };

    autoUpdateUser();

    // handle cleanup
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']} style={Styles.defaultGradient} />
      <View style={[styles.container, { width, height }]}>
        <Image source={Thumbnail.authenticating} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Please be calm as we reset your page.</Text>
          <ActivityIndicator size="large" color="green" />
        </View>
      </View>
    </SafeAreaView>
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
  button: {
    marginVertical: 20,
  },
});
