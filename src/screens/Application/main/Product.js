import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';

import { Appbar, Portal, FAB, MD2Colors, Chip } from 'react-native-paper';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import { useNavigation } from '@react-navigation/native';

// import CustomAlert from '../../../widgets/customAlert';

// import Refresher from '../../../widgets/Refresher';

// import { COLOURS } from '../../../css/design';
// import { useToken } from '../../../config';
// import { useGetProductsQuery } from '../../../app/services/features/productServerApi';


import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

///components
import CategoryTab from '../../../components/CategoryTab';
import TrendsSection from '../../../components/TrendsSection';
import { ScrollView } from 'react-native';



const ProductPage = () => {
  const navigation = useNavigation();

  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5', icon: 'information' },
    // Add more categories as needed
  ];

  const trend = [
    {
      id:1, name: "Tyre Off", price: "200", image: [
      {
        id: 1,
        image: require("../../../../assets/img/anime/calmness.png")
      }
    ],
  },
  {
    id:2, name: "Tyre Off", price: "200", image: [
    {
      id: 1,
      image: require("../../../../assets/img/anime/calmness.png")
    }
  ],
},{
  id:3, name: "Tyre Off", price: "200", image: [
  {
    id: 1,
    image: require("../../../../assets/img/anime/calmness.png")
  }
],
},{
  id:4, name: "Tyre Off", price: "200", image: [
  {
    id: 1,
    image: require("../../../../assets/img/anime/calmness.png")
  }
],
}
  ]
  
  return (
  <SafeAreaProvider>
    {/* <CustomAlert visible={settings.isLoading} message="Loading..." /> */}
    <SafeAreaView style={styles.safeAreaContainer}>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
          <View >
            <CategoryTab categories={categories} />
            <TrendsSection products={trend} navigation={navigation} />
          </View>
          
      </ScrollView>
    </SafeAreaView>
    <FAB
        icon="plus"
        color="white"
        style={[styles.fabStyle, { backgroundColor: MD2Colors.green700 }]}
        onPress={() => Linking.openURL(articleInfo.video_ads_link)}
      />
  </SafeAreaProvider>
      
        // {/* <Appbar.Header>
        //   <Appbar.Content title="Store" />
        //   <Appbar.Action icon="magnify" onPress={() => {}} />
        // </Appbar.Header> */}
        

  );
  
};

export default ProductPage;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  container: {
    flex: 1,
  },
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


// const ProductPage = () => {
//   const navigation = useNavigation();

  // const accessToken = useToken();
  // const {
  //   data: products = [],
  //   isLoading,
  //   isFetching,
  // } = useGetProductsQuery({ accessToken });

  // const productsList = products;
  // console.log(productsList, 'opo')


//   const [state, setState] = React.useState({ open: false });

//   const onStateChange = ({ open }) => setState({ open });

//   const { open } = state;

//   const ProductCard = ({ data }) => {
//     console.log(data);
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('product_info', { data })}
//         style={{
//           width: '48%',
//           marginVertical: 14,
//         }}
//       >
//         <View
//           style={{
//             width: '100%',
//             height: 100,
//             borderRadius: 10,
//             backgroundColor: COLOURS.backgroundLight,
//             position: 'relative',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: 8,
//           }}
//         >
//           <View
//             style={{
//               position: 'absolute',
//               width: '20%',
//               height: '24%',
//               backgroundColor: COLOURS.green,
//               top: 0,
//               left: 0,
//               borderTopLeftRadius: 10,
//               borderBottomRightRadius: 10,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 12,
//                 color: COLOURS.white,
//                 fontWeight: 'bold',
//                 letterSpacing: 1,
//               }}
//             >
//               {data.offPercentage}%
//             </Text>
//           </View>
//           <Image
//             source={{ uri: data.productImage[0].img }}
//             style={{
//               width: '80%',
//               height: '80%',
//               resizeMode: 'contain',
//             }}
//           />
//         </View>
//         <Text
//           style={{
//             fontSize: 12,
//             color: COLOURS.black,
//             fontWeight: '600',
//             marginBottom: 2,
//           }}
//         >
//           {data.productName}
//         </Text>
  
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Text
//             style={{
//               fontSize: 12,
//             }}
//           ></Text>
//         </View>
  
//         <Text>₦ {data.productPrice}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaProvider>
//       <CustomAlert visible={isLoading || isFetching} message="Loading..." />
//       {/* <SafeAreaView>
//         <Appbar.Header>
//           <Appbar.Content title="Store" style={{textAlign: "center"}} />
//           <Appbar.Action icon="magnify" onPress={() => {}} />
//         </Appbar.Header>
//           <ScrollView>
//             <View style={{ padding: 16 }}>
//               <ScrollView>
//                 <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
//               </ScrollView>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Text
//                     style={{ fontSize: 18, color: COLOURS.black, fontWeight: '500', letterSpacing: 1 }}
//                   >
//                     Result(s)
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       color: COLOURS.black,
//                     fontWeight: '400',
//                       opacity: 0.5,
//                       marginLeft: 10,
//                     }}
//                   >
//                     {productsList.length}
//                   </Text>
//                 </View>
//               </View>
//               <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
//                 {productsList?.map((data) => (
//                   <ProductCard data={data} key={data.id} />
//                 ))}
//               </View>
//             </View>
//           </ScrollView>
         
//       </SafeAreaView> */}
//       <FAB
//         icon="plus"
//         color="white"
//         style={[styles.fabStyle, { backgroundColor: MD2Colors.green700 }]}
//         onPress={() => Linking.openURL(articleInfo.video_ads_link)}
//       />
//     </SafeAreaProvider>
//   );
  
// };

// export default ProductPage;

// const styles = StyleSheet.create({
//   fabStyle: {
//     alignSelf: 'flex-end',
//     position: 'absolute',
//     bottom: 16,
//     right: 16,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     elevation: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

// })


