import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Appbar, FAB, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetProductsQuery } from '../../../app/services/features/productServerApi';
import { useGetUserQuery } from '../../../app/services/user/userApiSlice';
import { useGetSettingsQuery } from '../../../app/services/features/settingsServerApi';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../app/actions/authSlice';
import CustomAlert from '../../../widgets/customAlert';


const Thumbnail = {
  noNetwork: require('../../../../assets/img/anime/noInternet.gif'),
  icon: require('../../../../assets/icon.png')
};

const windowWidth = Dimensions.get('window').width;

const ProductCard = ({ onPress, source, name, price, description, date, width }) => {
  const currentDateTime = new Date();
  const djangoDate = new Date(date);
  const isNew = djangoDate > currentDateTime;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 30,
        backgroundColor: '#FFF',
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
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
      }}>
        <Text style={{
          fontWeight: 'bold',
          color: '#4f4a4a',
          fontSize: 12
        }} numberOfLines={1} ellipsizeMode='tail'>
          {name}
        </Text>
        <View style={{
          height: 4,
          width: 4,
          borderRadius: 4,
          backgroundColor: 'red',
          marginHorizontal: 4
        }} />
      </View>
      {isNew && (
        <Text style={{
          color: 'red',
          fontSize: 9,
          fontWeight: 'bold'
        }}>
          New
        </Text>
      )}
      <Text style={{
        fontSize: 9,
        color: '#4f4a4a',
        fontWeight: 'normal',
      }} numberOfLines={3} ellipsizeMode='tail'>
        {description}
      </Text>
      <View style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        width: '100%'
      }}>
        <View style={{
          width: '80%'
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold'
          }}>{price} NGN</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProductPage = () => {
  const navigation = useNavigation();
  const accessToken = useSelector(selectCurrentToken);

  const { data: products, isLoading, isError, error, refetch } = useGetProductsQuery({ accessToken });
  const { data: userInfo, isLoadingUser, isErrorUser, refetch: userRefetch } = useGetUserQuery({ accessToken });
  // fetch settings data
  console.log(userInfo)
  const {
    data: settings = [],
    isLoadingSettings,
    refetch: settingsRefetch,
  } = useGetSettingsQuery({ accessToken });

  useEffect(() => {
    userRefetch();
    settingsRefetch();
    refetch();
  }, []);

  const handleRefresh = () => {
    refetch();
  };

  const renderView = () => {
    if (isError) {
      return (
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']} style={styles.defaultGradient} />
            <View style={styles.noConnectionContainer}>
              <Text style={{ color: 'green', fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}>
                NO NETWORK CONNECTION
              </Text>
              <Image source={Thumbnail.noNetwork} style={{ width: 150, height: 150 }} />
              <View>
                <Button style={{ backgroundColor: 'green' }} onPress={handleRefresh} mode="contained">
                  Reload
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      );
    }

    return (
      <View>
        {isLoading && (
          <CustomAlert visible={isLoading} message="Loading..." />
        )}
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={[styles.container, {}]}>
            {products?.map((data) => (
              <ProductCard
                key={data.id}
                width={windowWidth / 2.2}
                source={{ uri: data.image[0].img }}
                name={data.name}
                description={data.description}
                price={data.price}
                onPress={() => navigation.navigate('product_info', { data, settings, userInfo })}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.Content title="Store" />
        <Appbar.Action icon="magnify" onPress={() => navigation.navigate('search')} />
      </Appbar.Header>

      {renderView()}

      {userInfo?.type_of_business === '2' && (
        <FAB
          icon="plus"
          color="white"
          style={styles.fabStyle}
          onPress={() => navigation.navigate('upload')}
        />
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  fabStyle: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C853',
  },
  defaultGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  noConnectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductPage;
