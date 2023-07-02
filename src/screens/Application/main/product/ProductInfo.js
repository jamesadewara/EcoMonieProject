import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Button,
  Appbar,
  MD2Colors,
  Snackbar,
  useTheme,
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentToken } from '../../../../app/actions/authSlice';
import { useSelector } from 'react-redux';
import { useDeleteProductMutation } from '../../../../app/services/features/productServerApi';
import CustomAlert from '../../../../widgets/customAlert';

const SwiperComponent = ({ imgs }) => {
  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={{
        backgroundColor: '#000',
        borderColor: '#000',
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
      }}
      activeDotColor="#FFF"
      activeDotStyle={{
        borderColor: '#000',
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
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
  const { data: productInfo, userInfo } = route.params;
  const accessToken = useSelector(selectCurrentToken);
  const [deleteProduct] = useDeleteProductMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const theme = useTheme();

  // Check internet connection on component mount
  useEffect(() => {
    const checkInternetConnection = async () => {
      try {
        const response = await fetch('https://google.com'); // Replace with an actual API endpoint
        setIsConnected(response.ok);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkInternetConnection();
  }, []);

  const handleDeleteTrash = () => {
    console.log(productInfo.id);
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setIsLoading(true);
            try {
              const id = productInfo.id;
              const payload = {
                id,
                accessToken,
              };
              const delTrash = await deleteProduct(payload);
              console.log(delTrash);
              navigation.goBack();
            } catch (error) {
              console.log('Error deleting trash:', error);
            }
            setIsLoading(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction
          iconColor={theme.colors.color}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title="Trash Detail's"
          titleStyle={{ color: theme.colors.color }}
        />
      </Appbar.Header>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      >
        <CustomAlert visible={isLoading} message="Loading..." />
        <ScrollView>
          <View style={styles.container}>
            {/* Image Slider */}
            <View style={styles.content}>
              <SwiperComponent imgs={productInfo.image} />
            </View>

            {/* Product Information */}
            <View style={styles.infoContainer}>
              <View style={styles.infoHeader}>
                <Text
                  style={[styles.infoTitle, { color: theme.colors.color }]}
                >
                  {productInfo.name}
                </Text>
              </View>
              <View>
                <Text style={[styles.price, { color: theme.colors.color }]}>
                  PRICE: {productInfo.price} NGN
                </Text>
                <Text
                  style={[styles.description, { color: theme.colors.color }]}
                >
                  DESCRIPTION: {productInfo.description}
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                {!productInfo.ordered ? (
                  userInfo?.type_of_business === '2' ? (
                    <>
                      {/* Delete Button */}
                      <Button
                        mode="contained"
                        icon="delete"
                        color={MD2Colors.red300}
                        style={styles.button}
                        onPress={() => handleDeleteTrash()}
                        disabled={!isConnected}
                      >
                        Delete
                      </Button>

                      {/* Update Button */}
                      <Button
                        mode="contained"
                        icon="upload"
                        color={MD2Colors.blue500}
                        style={styles.button}
                        onPress={() =>
                          navigation.navigate('upload', { productInfo })
                        }
                        disabled={!isConnected}
                      >
                        Update
                      </Button>
                    </>
                  ) : (
                    // Make A Request Button
                    <Button
                      mode="contained"
                      color="#4caf50"
                      style={styles.button}
                      onPress={() => console.log('makingyourrequest')}
                      disabled={!isConnected}
                    >
                      Make A Request
                    </Button>
                  )
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* Snackbar for internet connection */}
      <Snackbar
        visible={!isConnected && snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        No internet connection
      </Snackbar>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  content: {
    flexDirection: 'row',
    height: 340,
    width: '100%',
  },
  infoContainer: {
    marginTop: 20,
    width: '100%',
  },
  infoHeader: {
    marginBottom: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 20,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    marginRight: 10,
  },
});

export default ProductInfoPage;
