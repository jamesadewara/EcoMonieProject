// import necessary dependencies and modules
import React, { useContext } from 'react';

import { View, ImageBackground } from 'react-native';

import { Text, Button, MD2Colors } from 'react-native-paper';


import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';


import { Styles } from '../../css/design';

import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from "../../app/actions/authSlice"

const Thumbnail = {
  intro_wallpaper: require('../../../assets/img/wallpaper/entrance.jpeg'),
};

export default function IntroPage() {

  const navigation = useNavigation();
  const token = useSelector(selectCurrentToken)
  const user = useSelector(selectCurrentUser)

  return (
    <ImageBackground style={[Styles.mh100]} source={Thumbnail.intro_wallpaper}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.5)']}
        style={[Styles.defaultGradient, {opacity: 0.45}]}
      />
      <View style={Styles.container}>
        <View style={{ flex: 3, padding: 15, }}>
          <Text variant='displaySmall' style={{color: "white", textAlign: "center", top: "45%" }}>
            Earn, Impact and be Aware{token}l{user}
          </Text>
        </View>

          
        <View style={{ marginBottom: 90, alignItems: "center" }}>
          <Button mode='contained' style={{width: 260}} buttonColor={MD2Colors.green900} onPress={() => navigation.navigate('login')}>
            Login
          </Button>
          <Text style={{color: "white", marginVertical: 20}}>
            Or
          </Text>
          <Button mode='contained' style={{width: 260}} buttonColor={MD2Colors.green700} onPress={() => navigation.navigate('register')}>
            Signup
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
