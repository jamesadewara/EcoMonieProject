import React from 'react';
import { View } from 'react-native';
import { Avatar } from "react-native-paper";

const CustomAvatar = ({ avatar, email, size }) => {
  return (
    <View>
      {avatar === null ? (
        email === null || email === undefined ? (
          <Avatar.Icon size={size} /> // Using default icon if email is null or undefined
        ) : (
          <Avatar.Text label={email.substring(0, 2).toUpperCase()} size={size} />
        )
      ) : (
        <Avatar.Image source={{ uri: avatar }} size={size} /> // Wrapping avatar with an object for the source prop
      )}
    </View>
  );
};

export default CustomAvatar;
