// import necessary dependencies and modules
import React, { useRef, useContext, useState } from 'react';
import { View, FlatList, Animated, ImageBackground } from 'react-native';
import { Text, Button, MD2Colors } from 'react-native-paper';


import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import slides from './slides';
import OnboardingItem from './onBoardingItem';
import Paginator from './paginator';
import { useDispatch } from 'react-redux';
import { Styles } from '../../../css/design';
import { authValid } from '../../../app/actions/launchSlice';



// Get All Images for the Screen
const Thumbnail = {
  icon: require('../../../../assets/icon.png'),
  intro_wallpaper: require('../../../../assets/img/wallpaper/wallpaper-0.gif'),
};


export default function IntroPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <ImageBackground style={[Styles.mh100]} source={Thumbnail.intro_wallpaper}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']}
          style={Styles.defaultGradient}
        />
        <View style={Styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                    )}
                    onViewableItemsChanged={viewableItemChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <Paginator data={slides} scrollX={scrollX} />

            <View style={{ marginBottom: 90 }}>
            <Button mode='contained-tonal' style={{ backgroundColor: MD2Colors.green100 }} onPress={() => {dispatch(authValid(true))}}>Click Next</Button>
            </View>
        </View>
    </ImageBackground>
  );
}
