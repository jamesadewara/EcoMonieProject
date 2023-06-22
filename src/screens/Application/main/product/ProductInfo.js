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


//
// import * as React from "react";
// import { Image } from "expo-image";
// import { StyleSheet, Text, Pressable, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FontFamily, FontSize, Color } from "../GlobalStyles";

// const DETAILSP = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.detailsP}>
//       <Image
//         style={styles.image2Icon}
//         contentFit="cover"
//         source={require("../assets/image-2.png")}
//       />
//       <Text style={[styles.blusoMochine, styles.blusoFlexBox]}>
//         Blusão Mochine
//       </Text>
//       <Text style={[styles.r11165, styles.blusoFlexBox]}>R$ 111,65</Text>
//       <Text
//         style={[styles.blusoEmTric, styles.blusoFlexBox]}
//         numberOfLines={131}
//       >{`Blusão em tricô manga longa. Clássico e muito elegante, a peça é o modelo curinga que combina com as mais diversas possibilidades de looks.
// O TECIDO QUE AMAMOS
// Também conhecido como "malha retilínea", o tricô consiste em uma textura proporcionada pelo entrelaçamento de fios, que resulta em conforto e toque incomparável. Mas não se engane em associá-lo somente ao blusão! Nós amamos as variedades e possibilidades de pesos e toques, que permitem tanto peças quentinhas de inverno como itens modernos para o verão. Em modelagens justas, valoriza as curvas do corpo, enquanto nas mais largas, oferece sofisticação ao look.`}</Text>
//       <Image
//         style={styles.detailsPChild}
//         contentFit="cover"
//         source={require("../assets/ellipse-10.png")}
//       />
//       <Image
//         style={[styles.basketIcon, styles.backLayout]}
//         contentFit="cover"
//         source={require("../assets/basket.png")}
//       />
//       <Pressable
//         style={[styles.back, styles.backLayout]}
//         onPress={() => navigation.navigate("HOME")}
//       >
//         <Image
//           style={styles.icon}
//           contentFit="cover"
//           source={require("../assets/back1.png")}
//         />
//       </Pressable>
//       <View style={styles.detailsPItem} />
//       <Image
//         style={styles.detailsPInner}
//         contentFit="cover"
//         source={require("../assets/frame-2.png")}
//       />
//       <View style={[styles.ellipseParent, styles.groupPosition]}>
//         <Image
//           style={[styles.groupChild, styles.backLayout]}
//           contentFit="cover"
//           source={require("../assets/ellipse-7.png")}
//         />
//         <Text style={[styles.g, styles.gTypo]}>G</Text>
//       </View>
//       <View style={[styles.ellipseGroup, styles.groupPosition]}>
//         <Image
//           style={[styles.groupChild, styles.backLayout]}
//           contentFit="cover"
//           source={require("../assets/ellipse-5.png")}
//         />
//         <Text style={[styles.p, styles.gTypo]}>P</Text>
//       </View>
//       <View style={[styles.ellipseContainer, styles.groupPosition]}>
//         <Image
//           style={[styles.groupChild, styles.backLayout]}
//           contentFit="cover"
//           source={require("../assets/ellipse-7.png")}
//         />
//         <Text style={[styles.m, styles.gTypo]}>M</Text>
//       </View>
//       <View style={[styles.groupView, styles.groupPosition]}>
//         <Image
//           style={[styles.groupChild, styles.backLayout]}
//           contentFit="cover"
//           source={require("../assets/ellipse-7.png")}
//         />
//         <Text style={[styles.gg, styles.gTypo]}>GG</Text>
//       </View>
//       <View style={styles.addBookmark}>
//         <Image
//           style={styles.addBookmarkIcon}
//           contentFit="cover"
//           source={require("../assets/add-bookmark.png")}
//         />
//       </View>
//       <View style={styles.adicionar}>
//         <Text style={[styles.text, styles.blusoFlexBox]}>0</Text>
//         <Image
//           style={[styles.joyentIcon, styles.iconLayout]}
//           contentFit="cover"
//           source={require("../assets/joyent1.png")}
//         />
//         <Image
//           style={[styles.minusIcon, styles.iconLayout]}
//           contentFit="cover"
//           source={require("../assets/minus1.png")}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   blusoFlexBox: {
//     textAlign: "left",
//     position: "absolute",
//   },
//   backLayout: {
//     height: 40,
//     width: 40,
//     position: "absolute",
//   },
//   groupPosition: {
//     top: 576,
//     height: 40,
//     width: 40,
//     position: "absolute",
//   },
//   gTypo: {
//     fontFamily: FontFamily.urbanistExtrabold,
//     fontWeight: "800",
//     fontSize: FontSize.headingHeadline4_size,
//     top: 8,
//     textAlign: "left",
//     position: "absolute",
//   },
//   iconLayout: {
//     bottom: "16.67%",
//     width: "26.85%",
//     height: "83.33%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     top: "0%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   image2Icon: {
//     top: 171,
//     width: 333,
//     height: 333,
//     left: 48,
//     position: "absolute",
//   },
//   blusoMochine: {
//     top: 115,
//     left: 109,
//     fontSize: FontSize.size_11xl,
//     fontWeight: "700",
//     fontFamily: FontFamily.urbanistBold,
//     color: Color.black,
//   },
//   r11165: {
//     top: 851,
//     fontSize: FontSize.size_6xl,
//     fontWeight: "900",
//     fontFamily: FontFamily.urbanistBlack,
//     color: Color.black,
//     left: 48,
//   },
//   blusoEmTric: {
//     top: 652,
//     left: 55,
//     fontSize: FontSize.size_lg,
//     fontWeight: "500",
//     fontFamily: FontFamily.urbanistMedium,
//     color: Color.dimgray_200,
//     width: 318,
//     height: 164,
//     overflow: "hidden",
//   },
//   detailsPChild: {
//     top: 831,
//     left: 325,
//     width: 70,
//     height: 70,
//     position: "absolute",
//   },
//   basketIcon: {
//     top: 846,
//     left: 340,
//   },
//   icon: {
//     height: "100%",
//     width: "100%",
//   },
//   back: {
//     left: 28,
//     top: 63,
//   },
//   detailsPItem: {
//     top: 538,
//     left: 53,
//     borderStyle: "solid",
//     borderColor: "#000",
//     borderTopWidth: 4.2,
//     width: 322,
//     height: 4,
//     position: "absolute",
//   },
//   detailsPInner: {
//     top: 530,
//     left: 78,
//     width: 20,
//     height: 20,
//     position: "absolute",
//   },
//   groupChild: {
//     top: 0,
//     left: 0,
//   },
//   g: {
//     left: 12,
//     color: Color.black,
//   },
//   ellipseParent: {
//     left: 236,
//   },
//   p: {
//     left: 14,
//     color: "#bebebe",
//   },
//   ellipseGroup: {
//     left: 68,
//   },
//   m: {
//     left: 10,
//     color: Color.black,
//   },
//   ellipseContainer: {
//     left: 152,
//   },
//   gg: {
//     left: 4,
//     color: Color.black,
//   },
//   groupView: {
//     left: 320,
//   },
//   addBookmarkIcon: {
//     right: "0%",
//     bottom: "0%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     top: "0%",
//     left: "0%",
//     height: "100%",
//     position: "absolute",
//     overflow: "hidden",
//     width: "100%",
//   },
//   addBookmark: {
//     top: 65,
//     width: 50,
//     height: 50,
//     left: 340,
//     position: "absolute",
//   },
//   text: {
//     top: "-8.33%",
//     left: "34.9%",
//     fontSize: FontSize.size_21xl,
//     fontWeight: "600",
//     fontFamily: FontFamily.urbanistSemibold,
//     color: Color.black,
//   },
//   joyentIcon: {
//     right: "15.44%",
//     left: "57.72%",
//   },
//   minusIcon: {
//     right: "73.15%",
//     left: "0%",
//     width: "26.85%",
//     height: "83.33%",
//   },
//   adicionar: {
//     top: 842,
//     left: 170,
//     width: 149,
//     height: 48,
//     position: "absolute",
//   },
//   detailsP: {
//     backgroundColor: Color.white,
//     flex: 1,
//     height: 926,
//     overflow: "hidden",
//     width: "100%",
//   },
// });

// export default DETAILSP;
