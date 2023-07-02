// Import necessary dependencies and modules
import React, { useRef, useContext, useState } from 'react';
import { View, FlatList, Animated, ImageBackground, StatusBar } from 'react-native';
import { Button, MD2Colors } from 'react-native-paper';

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
  const navigation = useNavigation(); // Access the navigation object
  const dispatch = useDispatch(); // Access the dispatch function
  const [currentIndex, setCurrentIndex] = useState(0); // Define and initialize state variables
  const scrollX = useRef(new Animated.Value(0)).current; // Create a ref for the scroll value
  const slidesRef = useRef(null); // Create a ref for the FlatList component

  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index); // Update the current index when the viewable items change
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current; // Set the viewability configuration

  return (
    <ImageBackground style={[Styles.mh100, Styles.mw100]} source={Thumbnail.intro_wallpaper}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']}
        style={Styles.defaultGradient}
      />
      <StatusBar
        barStyle="light-content" // Use light text color for status bar
        backgroundColor="transparent" // Set status bar background color to transparent
        translucent // Make the status bar translucent
      />
      <View style={Styles.container}>
        <View style={{ flex: 3 }}>
          {/* Render the FlatList */}
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

        <View style={{ marginBottom: 90,alignSelf:'center' }}>
          {/* Render the Paginator */}
          <Paginator data={slides} scrollX={scrollX} />
          {/* Render the Button */}
          <Button
            mode='contained'
            onPress={() => { dispatch(authValid(true)) }}
          >
            Click Next
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
