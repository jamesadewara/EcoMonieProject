import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Image } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { APP_VERSION } from '../../../../config';

// Get All Images for the Screen
const Thumbnail = {
    icon: require('../../../../../assets/icon.png'),
  };

const AboutUsPage = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={[styles.container,{backgroundColor:theme.colors.background}]}>
        <Image source={Thumbnail.icon} style={styles.logo} />
        <Text style={[styles.version,{color:theme.colors.color}]}>App Version {APP_VERSION} </Text>
        <Text style={[styles.aboutText,{color:theme.colors.color}]}>
          
        </Text>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  version: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aboutText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AboutUsPage;
