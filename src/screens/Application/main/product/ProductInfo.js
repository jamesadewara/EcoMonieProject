import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, Appbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';


const SwiperComponent = () => {
  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={{
        backgroundColor: "#000",
        borderColor: "#000",
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10
      }}
      activeDotColor="#FFF"
      activeDotStyle={{
        borderColor: "#000",
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10
      }}
    >
      <View style={styles.slide}>
        <Image
          source={require('../../../../../assets/img/anime/calmness.png')}
          style={{ height: 300, width: 300 }}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require('../../../../../assets/img/anime/calmness.png')}
          style={{ height: 300, width: 300 }}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require('../../../../../assets/img/anime/calmness.png')}
          style={{ height: 300, width: 300 }}
        />
      </View>
    </Swiper>
  );
};

const ProductInfoPage = ({ route }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Trash Detail's" />
      </Appbar.Header>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              <SwiperComponent />
            </View>

            <View style={styles.footer}>
              <Image
                source={require('../../../../../assets/img/anime/calmness.png')}
                style={styles.footerIcon}
              />
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>Autobe best Chair</Text>
              </View>
              <View>
                <Text style={styles.price}>324.69 USD</Text>
                <Text style={styles.description}>
                Full sleeves short dress with three attractive colors and available in various sizes.
                </Text>
              </View>

        
            <View style={{alignSelf: 'center', paddingVertical: 100}}>
              <Button mode="contained" style={{backgroundColor: "green", width: 250}} onPress={() => console.log('making payment')}>PURCHASE NOW</Button>
            </View>
            
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10
  },
  header: {
    flexDirection: "row",
    width: "100%",
    marginTop: 40
  },
  backButton: {
    width: 15,
    height: 15
  },
  cartIcon: {
    width: "50%",
    alignItems: "flex-end"
  },
  cartIconImage: {
    width: 16,
    height: 20
  },
  content: {
    flexDirection: "row",
    height: 340,
    width: "100%"
  },
  statusIndicator: {
    marginTop: 150
  },
  indicatorDot: {
    backgroundColor: "#3f3a42",
    height: 25,
    width: 25,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFF",
    elevation: 5
  },
  activeIndicatorDot: {
    backgroundColor: "#707070",
    marginVertical: 10
  },
  footer: {
    width: "100%",
    alignItems: "flex-end"
  },
  footerIcon: {
    marginTop: -45,
    width: 15,
    height: 20
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 20,
    width: "100%"
  },
  infoHeader: {
    width: "65%"
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#4f4a4a",
    textAlign: 'center'
  },
  ratingContainer: {
    width: "35%"
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 9,
    color: "#4f4a4a"
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#b3aeae"
  },
  description: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    color: "#b3aeae",
    marginTop: 20
  },
  scrollView: {
    marginTop: 40
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f6fb",
    height: 80,
    width: 80,
    borderRadius: 25,
    marginRight: 20
  },
  image: {
    height: 80,
    width: 80
  },
  purchaseButton: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15
  },
  purchaseIcon: {
    height: 20,
    width: 16
  },
  purchaseText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginHorizontal: 15
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  }
});

export default ProductInfoPage;
