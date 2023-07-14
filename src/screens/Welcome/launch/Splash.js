import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, MD2Colors, useTheme } from 'react-native-paper';
import { View, Animated, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { authValid } from '../../../app/actions/launchSlice';
import { selectCurrentToken } from '../../../app/actions/authSlice';

// Get All Images for the Screen
const Thumbnail = {
  icon: require('../../../../assets/icon.png'),
};

const SplashPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectCurrentToken)
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!accessToken) {
        navigation.replace('intro');
      } else {
        dispatch(authValid(true));
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [accessToken]);
  

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2, // Change this value to adjust the fade intensity (0.0 - 1.0)
          duration: 1000, // Adjust the duration as needed
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const renderBackgroundStickers = () => {
    const numberOfStickers = 50; // Adjust the number of stickers as needed
    const stickersPerRow = 5; // Adjust the number of stickers per row as needed
    const stickerSize = 70; // Size of the stickers (assuming square shape)
    const horizontalSpacing = 20; // Adjust the horizontal spacing between stickers as needed
    const verticalSpacing = 20; // Adjust the vertical spacing between rows as needed

    const rows = Math.ceil(numberOfStickers / stickersPerRow); // Calculate the number of rows needed

    const stickerComponents = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < stickersPerRow; col++) {
        const index = row * stickersPerRow + col;
        if (index >= numberOfStickers) break;

        const left = col * (stickerSize + horizontalSpacing);
        const top = row * (stickerSize + verticalSpacing);

        const stickerStyle = {
          position: 'absolute',
          top: top,
          left: left,
          width: stickerSize,
          height: stickerSize,
          opacity: fadeAnim, // Apply the fade animation to each sticker
          transform: [{ rotate: `${Math.random() * 360}deg` }], // Rotate each sticker randomly
          zIndex: -1, // Send the stickers to the background
        };

        stickerComponents.push(
          <Animated.Image key={index} source={Thumbnail.icon} style={stickerStyle} />
        );
      }
    }

    return stickerComponents;
  };

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
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar
        barStyle={theme.colors.statusbar} // Use light text color for status bar
        backgroundColor="transparent" // Set status bar background color to transparent
        translucent // Make the status bar translucent
      />
      {/* Render the background stickers */}
      {renderBackgroundStickers()}
      <View
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
      </View>
      <ActivityIndicator style={{ marginTop: 16 }} animating={true} color={MD2Colors.green300} />
    </View>
  );
};

export default SplashPage;
