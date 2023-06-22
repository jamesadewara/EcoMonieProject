import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Appbar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLOURS } from '../../../../css/design';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const ProductInfoPage = ({ route }) => {
  const navigation = useNavigation();
  const productInfo = route.params;
  const product = productInfo.data;
  console.log('particular', product);

  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  const showCase = useMemo(() => {
    if (product.productImage) {
      return product.productImage.map((data) => data.img);
    }
    return [];
  }, [product.productImage]);
  console.log(showCase);

  // product horizontal scroll product card
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{ uri: item }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
          <Appbar.Content title="Product" />
        </Appbar.Header>
        <ScrollView>
          <View
            style={{
              backgroundColor: COLOURS.backgroundLight,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 4,
            }}>
            <FlatList
              data={showCase}
              horizontal
              renderItem={renderProduct}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0.8}
              snapToInterval={width}
              bounces={false}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                useNativeDriver: false,
              })}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                marginTop: 32,
              }}>
              {product.productImage
                ? product.productImage.map((data, index) => {
                    let opacity = position.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [0.2, 1, 0.2],
                      extrapolate: 'clamp',
                    });
                    return (
                      <Animated.View
                        key={index}
                        style={{
                          width: '16%',
                          height: 2.4,
                          backgroundColor: COLOURS.black,
                          opacity,
                          marginHorizontal: 4,
                          borderRadius: 100,
                        }}></Animated.View>
                    );
                  })
                : null}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 30 }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Smokehouse</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginHorizontal: 20 }}>
                  Address
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#a4a4a9' }}>
                  Address: Beef burger
                </Text>
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 28, marginLeft: 80 }}>$12.99</Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 30, marginHorizontal: 20 }}>
              Details
            </Text>
            <Text
              style={{
                color: '#a4a4a9',
                fontWeight: 'bold',
                fontSize: 15,
                marginTop: 10,
                marginHorizontal: 20,
                textAlign: 'justify',
              }}>
              The most unique fire grilled patty, flame grilled, charred, seared, well-done All natural beef,
              grass-feed beef, Fiery, juicy, greacy. delicous moist The most unique fire grilled patty, flame
              grilled, charred, seared, well-done All natural beef, grass-feed beef, Fiery, juicy, greacy.
              delicous moist
            </Text>

            <View
              style={{
                position: 'absolute',
                backgroundColor: '#000',
                height: 50,
                width: 50,
                bottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              <Button mode="contained" onPress={() => console.log('opening paypal')}>
                PURCHASE
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProductInfoPage;
