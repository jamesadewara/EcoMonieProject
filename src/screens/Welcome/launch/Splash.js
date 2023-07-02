import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { View, Animated, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { authValid } from '../../../app/actions/launchSlice';
import { selectCurrentToken } from '../../../app/actions/authSlice';

// Get All Images for the Screen
const Thumbnail = {
  icon: require('../../../../assets/icon.png'),
};

const BGColor = MD2Colors.green100;

const SplashPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const showedIntro = useSelector(selectCurrentToken);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showedIntro) {
        navigation.replace('intro');
      } else {
        dispatch(authValid(true));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 30,
        backgroundColor: BGColor,
      }}
    >
      <StatusBar
        barStyle="dark-content" // Use light text color for status bar
        backgroundColor="transparent" // Set status bar background color to transparent
        translucent // Make the status bar translucent
      />
      <Animated.View
        style={{
          flex: 1,
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.Image
          source={Thumbnail.icon}
          style={{
            width: 230,
            height: 230,
            marginBottom: 20,
          }}
        />
      </Animated.View>
      <ActivityIndicator style={{ marginTop: 16 }} animating={true} color={MD2Colors.green300} />
    </View>
  );
};

export default SplashPage;
