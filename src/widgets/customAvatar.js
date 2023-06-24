import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar } from "react-native-paper";

const CustomAvatar = ({avatar, email, size}) => {
    
    return (
        <View>
            {avatar === null ? (
              <Avatar.Text label={email.charAt(0).toUpperCase()} size={size} />
            ) : (
              <Avatar.Image source={avatar} size={size} />
            )}
        </View>
    )
}

export default CustomAvatar;