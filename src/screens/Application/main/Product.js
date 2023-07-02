import React, { useEffect,useState} from 'react';
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
import { useGetUserQuery } from '../../../app/services/user/userApiSlice';
import CustomAlert from '../../../widgets/customAlert';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../app/actions/authSlice';
import ErrorPage from '../../../Components/ErrorPage';
import { ProductList } from '../../../Components/ProductCard';


const ProductPage = () => {
  const navigation = useNavigation();
  const accessToken = useSelector(selectCurrentToken);
  const theme = useTheme();

  // Query for getting products
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch: productsRefetch,
  } = useGetProductsQuery({ accessToken });

  // Query for getting user info
  const {
    data: userInfo = [],
    isLoadingUser,
    isErrorUser,
    refetch: userRefetch,
  } = useGetUserQuery({ accessToken });

  // Query for getting settings
  const {
    data: settings = [],
    isLoadingSettings,
    refetch: settingsRefetch,
  } = useGetSettingsQuery({ accessToken });

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Fetch user, settings, and products data on component mount
    userRefetch();
    settingsRefetch();
    productsRefetch();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // Refresh the products data
    productsRefetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderView = () => {
    if (isError) {
      return <ErrorPage handleRefresh={handleRefresh} />;
    }

    if (isLoading || isLoadingUser || isLoadingSettings) {
      return <CustomAlert visible={true} message="Loading..." />;
    }

    // Log the names of the products
    products?.forEach((data) => {
      console.log(data.name, 'Tests');
    });

    // Render the list of products
    return <ProductList products={products} backgroundColor={theme.colors.cardsdiaogs} color={theme.colors.color} navigation={navigation} refreshing={refreshing} handleRefresh={handleRefresh} />;
  };

  return (
    <SafeAreaProvider>
      {/* App bar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.Content
          title="Trash"
          titleStyle={{ color: theme.colors.color }}
        />
        <Appbar.Action
          icon="magnify"
          iconColor={theme.colors.color}
          onPress={() => navigation.navigate('search')}
        />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        {/* Render the view */}
        {renderView()}
      </SafeAreaView>

      {/* Floating action button */}
      {userInfo.type_of_business === '2' && (
        <FAB
          icon="plus"
          color="white"
          style={styles.fabStyle}
          onPress={() => navigation.navigate('upload', { productInfo: {} })}
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
