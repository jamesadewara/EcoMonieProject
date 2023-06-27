import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, Appbar, MD2Colors } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const SwiperComponent = ({ imgs }) => {
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
      {imgs?.map((data) => (
        <View style={styles.slide} key={data.id}>
          <Image
            source={{ uri: data.img }}
            style={{ height: 300, width: 300 }}
          />
        </View>
      ))}
    </Swiper>
  );
};

const ProductInfoPage = ({ route }) => {
  const navigation = useNavigation();
  const { data: productInfo, settings, userInfo } = route.params;
  const { payment_api: paymentApi } = settings;

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
              <SwiperComponent imgs={productInfo.image} />
            </View>

            <View style={styles.footer}>
              <Image
                source={{ uri: productInfo.image[0].img }}
                style={styles.footerIcon}
              />
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>{productInfo.name}</Text>
              </View>
              <View>
                <Text style={styles.price}>{productInfo.price} NGN</Text>
                <Text style={styles.description}>
                  {productInfo.description}
                </Text>
              </View>

              <View style={{ alignSelf: 'center', paddingVertical: 100 }}>
                {userInfo?.type_of_business === '2' ? (
                  <View style={styles.buttonContainer}>
                    <Button mode="contained" icon="delete" buttonColor={MD2Colors.red500} style={{ flex: 1, marginRight: 10 }} onPress={() => console.log('delete')}>
                      Delete
                    </Button>
                    <Button mode="contained" icon="upload" buttonColor={MD2Colors.blue500} style={{ flex: 1 }} onPress={() => navigation.navigate("upload", {productInfo})}>
                      Update
                    </Button>
                  </View>
                ) : (
                  <Button mode="contained" style={{ backgroundColor: "green", width: 250 }} onPress={() => Linking.openURL(paymentApi)}>PURCHASE NOW</Button>
                )}
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
  content: {
    flexDirection: "row",
    height: 340,
    width: "100%"
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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
  },
});

export default ProductInfoPage;
