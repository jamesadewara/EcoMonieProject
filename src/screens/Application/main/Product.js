import React, { useState, useEffect, useContext } from 'react';

import { View, Text, StatusBar, ScrollView, TouchableOpacity, Dimensions, Image,   StyleSheet } from 'react-native';

import { Appbar, Portal, FAB, MD2Colors, Chip } from 'react-native-paper';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import { useNavigation } from '@react-navigation/native';

import CustomAlert from '../../../widgets/customAlert';

import Refresher from '../../../widgets/Refresher';

import { COLOURS } from '../../../css/design';
import { useToken } from '../../../config';
import { useGetProductsQuery } from '../../../app/services/features/productServerApi';





const ProductPage = () => {
  const navigation = useNavigation();

  const accessToken = useToken();
  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery({ accessToken });

  const productsList = products;
  console.log(productsList, 'opo')


  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const ProductCard = ({ data }) => {
    console.log(data);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('product_info', { data })}
        style={{
          width: '48%',
          marginVertical: 14,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <View
            style={{
              position: 'absolute',
              width: '20%',
              height: '24%',
              backgroundColor: COLOURS.green,
              top: 0,
              left: 0,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.white,
                fontWeight: 'bold',
                letterSpacing: 1,
              }}
            >
              {data.offPercentage}%
            </Text>
          </View>
          <Image
            source={{ uri: data.productImage[0].img }}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}
        >
          {data.productName}
        </Text>
  
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 12,
            }}
          ></Text>
        </View>
  
        <Text>₦ {data.productPrice}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <CustomAlert visible={isLoading || isFetching} message="Loading..." />
      {/* <SafeAreaView>
        <Appbar.Header>
          <Appbar.Content title="Store" style={{textAlign: "center"}} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
          <ScrollView>
            <View style={{ padding: 16 }}>
              <ScrollView>
                <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 18, color: COLOURS.black, fontWeight: '500', letterSpacing: 1 }}
                  >
                    Result(s)
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                    fontWeight: '400',
                      opacity: 0.5,
                      marginLeft: 10,
                    }}
                  >
                    {productsList.length}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {productsList?.map((data) => (
                  <ProductCard data={data} key={data.id} />
                ))}
              </View>
            </View>
          </ScrollView>
         
      </SafeAreaView> */}
      <FAB
        icon="plus"
        color="white"
        style={[styles.fabStyle, { backgroundColor: MD2Colors.green700 }]}
        onPress={() => Linking.openURL(articleInfo.video_ads_link)}
      />
    </SafeAreaProvider>
  );
  
};

export default ProductPage;

const styles = StyleSheet.create({
  fabStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

})


//first page design
// import * as React from "react";
// import { Text, StyleSheet, Pressable, View } from "react-native";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

// const HOME = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.home}>
//       <Text style={styles.outonoInverno}>Outono Inverno</Text>
//       <Pressable
//         style={[styles.bookmark, styles.saleLayout]}
//         onPress={() => navigation.navigate("SAVED")}
//       >
//         <Image
//           style={styles.iconLayout}
//           contentFit="cover"
//           source={require("../assets/bookmark.png")}
//         />
//       </Pressable>
//       <Pressable
//         style={[styles.chatBubble, styles.saleLayout]}
//         onPress={() => navigation.navigate("CHAT")}
//       >
//         <Image
//           style={styles.iconLayout}
//           contentFit="cover"
//           source={require("../assets/chat-bubble.png")}
//         />
//       </Pressable>
//       <Pressable
//         style={[styles.user, styles.saleLayout]}
//         onPress={() => navigation.navigate("USER")}
//       >
//         <Image
//           style={styles.iconLayout}
//           contentFit="cover"
//           source={require("../assets/user.png")}
//         />
//       </Pressable>
//       <Image
//         style={[styles.homeIcon, styles.saleLayout]}
//         contentFit="cover"
//         source={require("../assets/home1.png")}
//       />
//       <Pressable
//         style={[styles.basket, styles.menuLayout]}
//         onPress={() => navigation.navigate("CART")}
//       >
//         <Image
//           style={styles.iconLayout}
//           contentFit="cover"
//           source={require("../assets/basket1.png")}
//         />
//       </Pressable>
//       <Pressable
//         style={styles.blusoBrancoParent}
//         onPress={() => navigation.navigate("DETAILSP")}
//       >
//         <View style={[styles.blusoBranco, styles.blusoPosition1]}>
//           <LinearGradient
//             style={[styles.blusoBrancoChild, styles.blusoPosition]}
//             locations={[0, 1]}
//             colors={["#dce2e2", "rgba(217, 217, 217, 0)"]}
//           />
//           <Image
//             style={[styles.blusoBrancoItem, styles.blusoLayout]}
//             contentFit="cover"
//             source={require("../assets/ellipse-13.png")}
//           />
//           <Image
//             style={[styles.blusoBrancoInner, styles.blusoLayout]}
//             contentFit="cover"
//             source={require("../assets/ellipse-2.png")}
//           />
//           <Image
//             style={[styles.ellipseIcon, styles.blusoLayout]}
//             contentFit="cover"
//             source={require("../assets/ellipse-3.png")}
//           />
//           <Text style={[styles.blusoRequest, styles.r9999Typo]}>
//             Blusão Request
//           </Text>
//           <Text style={[styles.r9999, styles.r9999Typo]}>R$ 99,99</Text>
//           <Image
//             style={[styles.salePriceTag, styles.saleLayout]}
//             contentFit="cover"
//             source={require("../assets/sale-price-tag.png")}
//           />
//           <Image
//             style={styles.image7Icon}
//             contentFit="cover"
//             source={require("../assets/image-7.png")}
//           />
//         </View>
//         <View style={[styles.blusoBege, styles.blusoPosition1]}>
//           <LinearGradient
//             style={[styles.blusoBrancoChild, styles.blusoPosition]}
//             locations={[0, 1]}
//             colors={["#dce2e2", "rgba(217, 217, 217, 0)"]}
//           />
//           <Image
//             style={[styles.blusoBrancoItem, styles.blusoLayout]}
//             contentFit="cover"
//             source={require("../assets/ellipse-14.png")}
//           />
//           <Image
//             style={[styles.blusoBegeInner, styles.mudarCorIconPosition]}
//             contentFit="cover"
//             source={require("../assets/ellipse-21.png")}
//           />
//           <Image
//             style={[styles.ellipseIcon, styles.blusoLayout]}
//             contentFit="cover"
//             source={require("../assets/ellipse-31.png")}
//           />
//           <Text style={[styles.blusoRequest, styles.r9999Typo]}>
//             Blusão Confort
//           </Text>
//           <Text style={[styles.r9999, styles.r9999Typo]}>R$ 159,65</Text>
//           <Image
//             style={[styles.salePriceTag1, styles.saleLayout]}
//             contentFit="cover"
//             source={require("../assets/sale-price-tag.png")}
//           />
//           <Image
//             style={styles.image6Icon}
//             contentFit="cover"
//             source={require("../assets/image-6.png")}
//           />
//         </View>
//         <View style={styles.blusoPosition}>
//           <LinearGradient
//             style={[styles.blusoBrancoChild, styles.blusoPosition]}
//             locations={[0, 1]}
//             colors={["#dce2e2", "rgba(217, 217, 217, 0)"]}
//           />
//           <Text style={[styles.blusoRequest, styles.r9999Typo]}>
//             Blusão Mochine
//           </Text>
//           <Text style={[styles.r9999, styles.r9999Typo]}>R$ 111,65</Text>
//           <Image
//             style={[styles.salePriceTag, styles.saleLayout]}
//             contentFit="cover"
//             source={require("../assets/sale-price-tag.png")}
//           />
//           <Image
//             style={[styles.mudarCorIcon, styles.mudarCorIconPosition]}
//             contentFit="cover"
//             source={require("../assets/mudar-cor.png")}
//           />
//         </View>
//       </Pressable>
//       <View style={[styles.search, styles.menuLayout]}>
//         <Image
//           style={[styles.searchIcon, styles.iconLayout]}
//           contentFit="cover"
//           source={require("../assets/search.png")}
//         />
//       </View>
//       <View style={[styles.menu, styles.menuLayout]}>
//         <Image
//           style={[styles.searchIcon, styles.iconLayout]}
//           contentFit="cover"
//           source={require("../assets/menu1.png")}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   saleLayout: {
//     height: 40,
//     width: 40,
//     position: "absolute",
//   },
//   menuLayout: {
//     height: 35,
//     width: 35,
//     top: 58,
//     position: "absolute",
//   },
//   blusoPosition1: {
//     width: 316,
//     top: 0,
//     position: "absolute",
//   },
//   blusoPosition: {
//     left: 0,
//     width: 316,
//     top: 0,
//     height: 513,
//     position: "absolute",
//   },
//   blusoLayout: {
//     height: 25,
//     left: 25,
//     width: 25,
//     position: "absolute",
//   },
//   r9999Typo: {
//     fontSize: FontSize.size_11xl,
//     left: 25,
//     textAlign: "left",
//     color: Color.black,
//     position: "absolute",
//   },
//   mudarCorIconPosition: {
//     left: 21,
//     position: "absolute",
//   },
//   iconLayout: {
//     height: "100%",
//     width: "100%",
//   },
//   outonoInverno: {
//     top: 171,
//     left: 75,
//     fontSize: FontSize.size_21xl,
//     fontWeight: "700",
//     fontFamily: FontFamily.urbanistBold,
//     textAlign: "left",
//     color: Color.black,
//     position: "absolute",
//   },
//   bookmark: {
//     left: 151,
//     top: 858,
//     width: 40,
//   },
//   chatBubble: {
//     left: 246,
//     top: 858,
//     width: 40,
//   },
//   user: {
//     left: 341,
//     top: 858,
//     width: 40,
//   },
//   homeIcon: {
//     left: 56,
//     top: 858,
//     width: 40,
//   },
//   basket: {
//     left: 364,
//   },
//   blusoBrancoChild: {
//     borderRadius: Border.br_11xl,
//     backgroundColor: "transparent",
//   },
//   blusoBrancoItem: {
//     top: 339,
//   },
//   blusoBrancoInner: {
//     top: 384,
//   },
//   ellipseIcon: {
//     top: 429,
//   },
//   blusoRequest: {
//     fontWeight: "500",
//     fontFamily: FontFamily.urbanistMedium,
//     top: 32,
//   },
//   r9999: {
//     top: 68,
//     fontWeight: "800",
//     fontFamily: FontFamily.urbanistExtrabold,
//   },
//   salePriceTag: {
//     left: 260,
//     top: 32,
//   },
//   image7Icon: {
//     top: 209,
//     left: 124,
//     width: 177,
//     height: 310,
//     position: "absolute",
//   },
//   blusoBranco: {
//     left: 674,
//     height: 519,
//   },
//   blusoBegeInner: {
//     top: 380,
//     height: 33,
//     width: 25,
//     left: 21,
//   },
//   salePriceTag1: {
//     left: 600,
//     top: 32,
//   },
//   image6Icon: {
//     top: 226,
//     left: 444,
//     width: 176,
//     height: 287,
//     position: "absolute",
//   },
//   blusoBege: {
//     left: 340,
//     height: 513,
//   },
//   mudarCorIcon: {
//     top: 216,
//     width: 279,
//     height: 297,
//   },
//   blusoBrancoParent: {
//     top: 307,
//     width: 308,
//     height: 513,
//     left: 56,
//     position: "absolute",
//   },
//   searchIcon: {
//     top: "0%",
//     right: "0%",
//     bottom: "0%",
//     left: "0%",
//     maxWidth: "100%",
//     maxHeight: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   search: {
//     left: 306,
//   },
//   menu: {
//     left: 56,
//   },
//   home: {
//     backgroundColor: Color.white,
//     flex: 1,
//     height: 926,
//     overflow: "hidden",
//     width: "100%",
//   },
// });

// export default HOME;


//second page design
// import * as React from "react";
// import { StyleSheet, View, Text, Pressable } from "react-native";
// import { Image } from "expo-image";
// import { useNavigation } from "@react-navigation/native";
// import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

// const SAVED = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.saved}>
//       <View style={[styles.savedChild, styles.image7Layout]} />
//       <View style={[styles.savedItem, styles.savedItemPosition]} />
//       <View style={[styles.savedInner, styles.savedInnerPosition]} />
//       <View style={[styles.rectangleView, styles.image2IconPosition]} />
//       <View style={[styles.savedChild1, styles.image4IconPosition]} />
//       <View style={[styles.savedChild2, styles.image6IconPosition]} />
//       <Text style={styles.explore}>Explore</Text>
//       <Text style={[styles.calaJogger, styles.calaJoggerTypo]}>
//         Calça Jogger
//       </Text>
//       <Text style={[styles.jaquetaJeans, styles.jacketBrownTypo]}>
//         Jaqueta Jeans
//       </Text>
//       <Text
//         style={[styles.jacketBomber, styles.calaJoggerTypo]}
//       >{`Jacket Bomber `}</Text>
//       <Text style={[styles.jeansSkinny, styles.calaJoggerTypo]}>
//         Jeans skinny
//       </Text>
//       <Text style={[styles.coturnoCouro, styles.jacketBrownTypo]}>
//         Coturno Couro
//       </Text>
//       <Text style={[styles.jacketBrown, styles.jacketBrownTypo]}>
//         Jacket brown
//       </Text>
//       <Text style={[styles.r15000, styles.textTypo]}>R$ 150,00</Text>
//       <Text style={[styles.r18000, styles.textTypo]}>R$ 180,00</Text>
//       <Text style={[styles.r180001, styles.textTypo]}>R$ 180,00</Text>
//       <Text style={[styles.r28000, styles.textTypo]}>R$ 280,00</Text>
//       <Text style={[styles.text, styles.textTypo]}>6</Text>
//       <Text style={[styles.r12000, styles.textTypo]}>R$ 120,00</Text>
//       <Text style={[styles.r120001, styles.textTypo]}>R$ 120,00</Text>
//       <Image
//         style={[styles.image1Icon, styles.image7Layout]}
//         contentFit="cover"
//         source={require("../assets/image-1.png")}
//       />
//       <Image
//         style={[styles.image2Icon, styles.image2IconPosition]}
//         contentFit="cover"
//         source={require("../assets/image-21.png")}
//       />
//       <Image
//         style={styles.savedItemPosition}
//         contentFit="cover"
//         source={require("../assets/image-3.png")}
//       />
//       <Image
//         style={styles.savedInnerPosition}
//         contentFit="cover"
//         source={require("../assets/image-5.png")}
//       />
//       <Image
//         style={styles.image4IconPosition}
//         contentFit="cover"
//         source={require("../assets/image-4.png")}
//       />
//       <Image
//         style={styles.image6IconPosition}
//         contentFit="cover"
//         source={require("../assets/image-61.png")}
//       />
//       <Pressable
//         style={[styles.back, styles.backLayout]}
//         onPress={() => navigation.navigate("HOME")}
//       >
//         <Image
//           style={styles.iconLayout}
//           contentFit="cover"
//           source={require("../assets/back1.png")}
//         />
//       </Pressable>
//       <Image
//         style={[styles.bookmarkIcon, styles.backLayout]}
//         contentFit="cover"
//         source={require("../assets/bookmark1.png")}
//       />
//       <View style={[styles.image7, styles.image7Layout]}>
//         <Image
//           style={[styles.image7Icon, styles.iconLayout]}
//           contentFit="cover"
//           source={require("../assets/image-1.png")}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image7Layout: {
//     height: 202,
//     width: 164,
//     left: 40,
//     position: "absolute",
//   },
//   savedItemPosition: {
//     top: 522,
//     height: 202,
//     width: 164,
//     borderRadius: Border.br_xl,
//     left: 40,
//     position: "absolute",
//   },
//   savedInnerPosition: {
//     top: 874,
//     height: 202,
//     width: 164,
//     borderRadius: Border.br_xl,
//     left: 40,
//     position: "absolute",
//   },
//   image2IconPosition: {
//     top: 223,
//     left: 224,
//     height: 202,
//     width: 164,
//     borderRadius: Border.br_xl,
//     position: "absolute",
//   },
//   image4IconPosition: {
//     top: 572,
//     left: 224,
//     height: 202,
//     width: 164,
//     borderRadius: Border.br_xl,
//     position: "absolute",
//   },
//   image6IconPosition: {
//     top: 924,
//     left: 224,
//     height: 202,
//     width: 164,
//     borderRadius: Border.br_xl,
//     position: "absolute",
//   },
//   calaJoggerTypo: {
//     color: Color.darkgray,
//     fontSize: FontSize.size_6xl,
//     textAlign: "center",
//     fontFamily: FontFamily.urbanistSemibold,
//     fontWeight: "600",
//     position: "absolute",
//   },
//   jacketBrownTypo: {
//     textAlign: "left",
//     color: Color.darkgray,
//     fontSize: FontSize.size_6xl,
//     fontFamily: FontFamily.urbanistSemibold,
//     fontWeight: "600",
//     position: "absolute",
//   },
//   textTypo: {
//     fontFamily: FontFamily.urbanistBold,
//     fontWeight: "700",
//     textAlign: "center",
//     color: Color.black,
//     position: "absolute",
//   },
//   backLayout: {
//     height: 40,
//     width: 40,
//     top: 63,
//     position: "absolute",
//   },
//   iconLayout: {
//     height: "100%",
//     width: "100%",
//   },
//   savedChild: {
//     backgroundColor: Color.gainsboro_100,
//     borderRadius: Border.br_xl,
//     top: 175,
//     width: 164,
//   },
//   savedItem: {
//     backgroundColor: Color.gainsboro_100,
//   },
//   savedInner: {
//     backgroundColor: Color.gainsboro_100,
//   },
//   rectangleView: {
//     left: 224,
//     backgroundColor: Color.gainsboro_100,
//   },
//   savedChild1: {
//     backgroundColor: Color.gainsboro_100,
//   },
//   savedChild2: {
//     backgroundColor: Color.gainsboro_100,
//   },
//   explore: {
//     top: 91,
//     left: 164,
//     fontSize: FontSize.size_11xl,
//     textAlign: "center",
//     color: Color.black,
//     fontFamily: FontFamily.urbanistSemibold,
//     fontWeight: "600",
//     position: "absolute",
//   },
//   calaJogger: {
//     top: 390,
//     left: 40,
//   },
//   jaquetaJeans: {
//     top: 437,
//     left: 236,
//   },
//   jacketBomber: {
//     top: 781,
//     left: 236,
//   },
//   jeansSkinny: {
//     top: 1136,
//     left: 224,
//   },
//   coturnoCouro: {
//     top: 734,
//     left: 40,
//   },
//   jacketBrown: {
//     top: 1089,
//     left: 40,
//   },
//   r15000: {
//     top: 428,
//     fontSize: FontSize.headingHeadline4_size,
//     fontWeight: "700",
//     left: 40,
//   },
//   r18000: {
//     top: 772,
//     fontSize: FontSize.headingHeadline4_size,
//     fontWeight: "700",
//     left: 40,
//   },
//   r180001: {
//     top: 1127,
//     fontSize: FontSize.headingHeadline4_size,
//     fontWeight: "700",
//     left: 40,
//   },
//   r28000: {
//     top: 475,
//     fontSize: FontSize.headingHeadline4_size,
//     fontWeight: "700",
//     left: 236,
//   },
//   text: {
//     top: 68,
//     left: 388,
//     fontWeight: "700",
//     fontSize: FontSize.size_6xl,
//   },
//   r12000: {
//     top: 822,
//     fontSize: FontSize.headingHeadline4_size,
//     fontWeight: "700",
//     left: 236,
//   },
//   r120001: {
//     top: 1176,
//     fontSize: FontSize.headingHeadline4_size,
//     fontWeight: "700",
//     left: 224,
//   },
//   image1Icon: {
//     borderRadius: Border.br_xl,
//     top: 175,
//     width: 164,
//   },
//   image2Icon: {
//     left: 224,
//   },
//   back: {
//     left: 28,
//   },
//   bookmarkIcon: {
//     left: 338,
//   },
//   image7Icon: {
//     top: "0%",
//     right: "0%",
//     bottom: "0%",
//     left: "0%",
//     maxWidth: "100%",
//     maxHeight: "100%",
//     borderRadius: Border.br_xl,
//     position: "absolute",
//     height: "100%",
//     overflow: "hidden",
//   },
//   image7: {
//     top: 178,
//   },
//   saved: {
//     backgroundColor: Color.white,
//     flex: 1,
//     height: 1291,
//     overflow: "hidden",
//     width: "100%",
//   },
// });

// export default SAVED;
