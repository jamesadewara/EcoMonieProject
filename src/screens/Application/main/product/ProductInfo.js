import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Appbar, MD2Colors, useTheme } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentToken } from '../../../../app/actions/authSlice';
import { useSelector } from 'react-redux';
import { useDeleteProductMutation } from '../../../../app/services/features/productServerApi';
import NetInfo from '@react-native-community/netinfo';
import CustomAvatar from '../../../../Components/CustomAvatar';
import { useGetUserQuery } from '../../../../app/services/registration/signupApiSlice';

const SwiperComponent = ({ imgs, backgroundColor, color }) => {
  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={{
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
      }}
      activeDotColor={color}
      activeDotStyle={{
        borderColor: backgroundColor,
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
      }}
    >
      {imgs?.map((data) => (
        <View style={styles.slide} key={data.id}>
          <Image source={{ uri: data.image }} style={{ height: 300, width: 300 }} />
        </View>
      ))}
    </Swiper>
  );
};

const ProductInfoPage = ({ route }) => {
  const navigation = useNavigation();
  const productInfo = route.params?.productInfo;
  const accessToken = useSelector(selectCurrentToken);
  const { data: userInfo = {}, isLoading: isLoadingUser, isError: isErrorUser } = useGetUserQuery({ accessToken });
  const [deleteProduct] = useDeleteProductMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const theme = useTheme();

  // Check internet connection on component mount
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDeleteTrash = () => {
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

  const showAlert = () => {
    Alert.alert(
      'No Internet Connection',
      'Please check your internet connection and try again.',
      [{ text: 'OK' }]
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
        <CustomAvatar size={48} avatar={userInfo?.profile_pic} email={userInfo?.email} />
      </Appbar.Header>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
        <ScrollView>
          <View style={styles.container}>
            {/* Image Slider */}
            <View style={styles.content}>
              <SwiperComponent imgs={productInfo.images} backgroundColor={theme.colors.background} color={theme.colors.color} />
            </View>

            {/* Product Information */}
            <View style={styles.infoContainer}>
              <View style={styles.infoHeader}>
                <Text style={[styles.infoTitle, { color: theme.colors.color }]}>
                  TITLE: {productInfo?.title}
                </Text>
              </View>
              <View>
                <Text style={[styles.price, { color: theme.colors.color }]}>
                  CATEGORY: {productInfo?.category.name}
                </Text>
                <Text style={[styles.price, { color: theme.colors.color }]}>
                  PRICE: {productInfo?.price} NGN
                </Text>
                <Text style={[styles.description, { color: theme.colors.color }]}>
                  DESCRIPTION: {productInfo?.description}
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                {userInfo?.is_seller ? (
                  // Update Button
                  <Button
                    mode="contained"
                    icon="upload"
                    color={MD2Colors.blue500}
                    style={styles.button}
                    onPress={isConnected ? () => navigation.navigate('upload') : showAlert}
                    disabled={!isConnected}
                  >
                    Update
                  </Button>
                ) : (
                  // Make A Request Button
                  <Button
                    mode="contained"
                    color="#4caf50"
                    style={styles.button}
                    onPress={isConnected ? () => console.log('makingyourrequest') : showAlert}
                    disabled={!isConnected}
                  >
                    Request
                  </Button>
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
