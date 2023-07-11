import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text, Appbar, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Get All Images for the Screen
const Thumbnail = {
    welcome: require('../../../../../../assets/img/logo/success.png'),
  };

const HurrayPage = () => {
    const theme = useTheme()
  const navigation = useNavigation()
    
  return (
    <SafeAreaProvider style={{backgroundColor:theme.colors.background}} >
      <Appbar.Header style={{backgroundColor:theme.colors.background}}>
        <Appbar.Content title="" titleStyle={{ color: theme.colors.color }} />
        <Appbar.Action icon="close" iconColor={theme.colors.color} onPress={() => navigation.navigate("main")} />
      </Appbar.Header>
        <View style={styles.container}>
        <Image
            source={Thumbnail.welcome}
            style={styles.image}
            resizeMode="contain"
        />
        <Text style={[styles.title,{color:theme.colors.color}]}>Hurray!</Text>
        <Text style={[styles.subtitle,{color:theme.colors.color}]}>Welcome to our community!</Text>
        <Text style={[styles.message,{color:theme.colors.color}]}>Thank you for registering. You can now enjoy all the features and benefits our app has to offer.</Text>
        <Button onPress={()=>navigation.navigate("main")} style={styles.nextButton}>
          Next
        </Button>
        </View>
    </SafeAreaProvider>
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
  nextButton: {
    marginTop: 20,
    width: 200,
  },
});

export default HurrayPage;
