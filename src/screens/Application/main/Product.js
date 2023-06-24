import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Linking } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

const products = [
  {
    id: '1',
    name: 'Adewa',
    description: "sdfghjkil",
    price: "123",
    source: require('../../../../assets/img/anime/calmness.png'),
    avatar: null
  }
]
const windowWidth = Dimensions.get('window').width;


const ProductCard = ({ onPress, source, profile, name, price, description, date, width }) => {
  // Get the current datetime
  const currentDateTime = new Date();

  // Convert the Django datetime string to a JavaScript Date object
  const djangoDate = new Date(date);

  // Compare the two datetime values
  const isNew = djangoDate > currentDateTime;
console.log('width', width)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 30,
        backgroundColor: "#FFF",
        height: 210,
        width: width,
        elevation: 2,
        borderRadius: 10,
        padding: 15,
        marginRight: 5,
      }}
    >
      <Image
        source={source}
        style={{
          width: '100%',
          height: 70,
          borderRadius: 10
        }}
      />
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
      }}>
        <Text style={{
          fontWeight: "bold",
          color: "#4f4a4a",
          fontSize: 12
        }} numberOfLines={1} ellipsizeMode='tail'>
          {name}
        </Text>
        <View style={{
          height: 4,
          width: 4,
          borderRadius: 4,
          backgroundColor: "red",
          marginHorizontal: 4
        }}>
        </View>
        
      </View>
      <Text style={{
          color: "red",
          fontSize: 9,
          fontWeight: "bold"
        }}>
          {isNew ? "New" : ""}
        </Text>
      <Text style={{
        fontSize: 9,
        color: "#4f4a4a",
        fontWeight: "normal", 
      }} numberOfLines={3} ellipsizeMode='tail'>
        {description}
      </Text>
      <View style={{
        flexDirection: "row",
        marginTop: 5,
        alignItems: "center",
        width: "100%"
      }}>
        <View style={{
          width: "80%"
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: "bold"
          }}>{price} NGN</Text>
        </View>
        {/* <View style={{
          width: "20%",
        }}>
          <Image
            source={profile}
            style={{
              alignSelf: "flex-end",
              width: 25,
              height: 25
            }}
          />
        </View> */}
      </View>
    </TouchableOpacity>
  );
}

const ProductPage = () => {
  const navigation = useNavigation(); // Add this line if using React Navigation

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.Content title="Store" />
        <Appbar.Action icon="magnify" onPress={() => navigation.navigate('search')} />
      </Appbar.Header>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={[styles.container, {}]}>
            {products?.map((data) => (
              <ProductCard key={data.id} width={windowWidth/2.2}
                source={data.source}
                name={data.name} 
                description={data.description} price={data.price}
                onPress={() => navigation.navigate('product_info', {data})}
              />
            ))}
          </View>
      </ScrollView>
      <FAB
        icon="plus"
        color="white"
        style={styles.fabStyle}
        onPress={() => Linking.openURL(articleInfo.video_ads_link)}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  scrollView: {
    flex: 1,
  },
  container: {
    width: "100%",
    flexDirection: 'row',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  fabStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 120,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00C853",
  },
});

export default ProductPage;
