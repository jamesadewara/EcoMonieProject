import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text, Appbar, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../app/actions/authSlice';
import { useGetUserQuery } from '../app/services/registration/signupApiSlice';

// Get All Images for the Screen
const Thumbnail = {
  inform: require('../../assets/img/anime/calmness.png'),
};

const SetupProfile = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const accessToken = useSelector(selectCurrentToken);

  // Query for getting user info
  const { data: userInfo, isLoading, isError, refetch } = useGetUserQuery({ accessToken });

  const handleNext = () => {
    console.log(userInfo)
    if (!userInfo?.is_buyer || !userInfo?.is_seller) {
      navigation.navigate("business_type");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Thumbnail.inform}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: theme.colors.color }]}>Not yet through</Text>
      <Text style={[styles.message, { color: theme.colors.color }]}>Setup your profile.</Text>
      <Button mode="contained" onPress={handleNext} style={styles.editButton}>
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  editButton: {
    marginTop: 20,
    width: 200,
  },
});

export default SetupProfile;
