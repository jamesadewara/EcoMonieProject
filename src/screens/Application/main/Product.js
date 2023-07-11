import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Appbar, FAB, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetProductsQuery } from '../../../app/services/features/productServerApi';
import { useGetSettingsQuery } from '../../../app/services/features/settingsServerApi';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../app/actions/authSlice';
import ErrorPage from '../../../Components/ErrorPage';
import { ProductList } from '../../../Components/ProductCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomAlert from "../../../Components/CustomAlert";
import { useGetUserQuery } from '../../../app/services/registration/signupApiSlice';
import LoadingSkeleton from '../../../Components/LoadingSkeleton';


const ProductPage = () => {
  const navigation = useNavigation();
  const accessToken = useSelector(selectCurrentToken);
  const theme = useTheme();

  // Loading and error states
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [error, setError] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  // Query for getting user info
  const {
    data: userInfo = [],
    isLoading: isLoadingUser,
    isError: isErrorUser,
    refetch: userRefetch,
  } = useGetUserQuery({ accessToken });

  // Query for getting settings
  const {
    data: settings = [],
    isLoading: isLoadingSettings,
    isError: isErrorSettings,
    refetch: settingsRefetch,
  } = useGetSettingsQuery({ accessToken });

  // Query for getting products
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: productsRefetch,
  } = useGetProductsQuery({ accessToken });

  // Filtered products state
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch user, settings, and products data on component mount
    Promise.all([userRefetch(), settingsRefetch(), productsRefetch()])
      .then(() => {
        setLoadingUser(false);
        setLoadingProducts(false);
        setLoadingSettings(false);
      })
      .catch(() => {
        setLoadingUser(false);
        setLoadingProducts(false);
        setLoadingSettings(false);
        setError(true);
      });
  }, []);

  const handleRefresh = () => {
    // Refresh the products data
    Promise.all([productsRefetch()])
      .then(() => {
        setLoadingProducts(false);
        setFilteredProducts(productsData);
      })
      .catch(() => {
        setLoadingProducts(false);
        setError(true);
      });
  };

  const handleFilterUserProducts = (query) => {
    setFilterActive((filterActive) => !filterActive);

    // Check if productsData is defined before filtering
    if (filterActive) {
      setFilteredProducts(
        productsData.filter((product) =>
          product.user.toString().includes(query.toString())
        )
      );
    } else {
      setFilteredProducts(productsData);
    }
  };

  const renderView = () => {
    if (isErrorSettings || isErrorUser || isErrorProducts) {
      return <ErrorPage handleRefresh={handleRefresh} />;
    }

    if (loadingUser || loadingProducts || loadingSettings) {
      return <LoadingSkeleton isLoading={true} />
    }

    return (
      <ProductList
        products={filteredProducts}
        userInfo={userInfo}
        backgroundColor={theme.colors.cardsdialogs}
        color={theme.colors.color}
        navigation={navigation}
        refreshing={isLoadingProducts}
        handleRefresh={handleRefresh}
      />
    );
  };

  useEffect(() => {
    setFilteredProducts(productsData);
  }, [productsData]);

  return (
    <SafeAreaProvider>
      {/* App bar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.Content
          title="Trash"
          titleStyle={{ color: theme.colors.color }}
        />
        {userInfo.type_of_business === '2' && (
        <Appbar.Action
          icon={filterActive ? 'close' : 'filter'}
          iconColor={theme.colors.color}
          onPress={() => handleFilterUserProducts(userInfo.id)}
        />
        )}
        <Appbar.Action
          icon="magnify"
          iconColor={theme.colors.color}
          onPress={() => navigation.navigate('search')}
        />
      </Appbar.Header>

      <View style={{ flex: 1,backgroundColor:theme.colors.background }}>
      {renderView()}
      </View>

      {/* Floating action button */}
      {userInfo.type_of_business === '2' && (
        <FAB
          icon="plus"
          color="white"
          style={styles.fabStyle}
          onPress={() =>
            navigation.navigate('upload', { productInfo: {} })
          }
        />
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#1C8749',
  },
  defaultGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  noConnectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductPage;
