import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme } from 'react-native-paper';

const Thumbnail = {
  noNetwork: require('../../assets/img/anime/noInternet.gif'),
};

const ErrorPage = ({ handleRefresh }) => {
  const theme = useTheme();
  const [floatAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    startFloatingAnimation();
  }, []);

  const startFloatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title,{color:theme.colors.color}]}>NO NETWORK CONNECTION</Text>
      <Animated.Image
        source={Thumbnail.noNetwork}
        style={[
          styles.image,
          { transform: [{ translateY: floatAnimation }] }
        ]}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleRefresh}
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Reload
        </Button>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
  buttonContainer: {
    marginTop: 50,
  },
  button: {
    backgroundColor: 'grey',
  },
  buttonContent: {
    height: 50,
  },
};

export default ErrorPage;
