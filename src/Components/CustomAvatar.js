import React from 'react';
import { View } from 'react-native';
import { Avatar, useTheme } from "react-native-paper";

const CustomAvatar = ({ avatar, email, size }) => {
  const theme = useTheme();
  return (
    <View>
      {avatar === null ? (
        email === null || email === undefined ? (
          <Avatar.Icon size={size} style={{backgroundColor:theme.colors.appbar}}/> // Using default icon if email is null or undefined
        ) : (
          <Avatar.Text label={email.substring(0, 1).toUpperCase()} size={size} style={{backgroundColor:theme.colors.appbar}}/>
        )
      ) : (
        <Avatar.Image source={{ uri: avatar }} size={size} style={{backgroundColor:theme.colors.appbar}}/> // Wrapping avatar with an object for the source prop
      )}
    </View>
  );
};

export default CustomAvatar;
