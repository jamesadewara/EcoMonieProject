// Import statements
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, ImageBackground, ScrollView, View, Image, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Searchbar, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { selectCurrentToken } from '../../../../app/actions/authSlice';
import { useSelector } from 'react-redux';
import { useGetSettingsQuery } from '../../../../app/services/features/settingsServerApi';
import { ProductList, CategoryList } from '../../../../Components/ProductCard'; // Assuming ProductList and CategoryList are exported from the mentioned path
import { useGetUserQuery } from '../../../../app/services/registration/signupApiSlice';
import { useGetCategoryQuery, useGetProductsQuery } from '../../../../app/services/features/productServerApi';

// Sample data for category and product
const categoryData = [
  {
    id: '1',
    name: 'Trye',
    source: require("../../../../../assets/img/anime/calmness.png"),
    bg: "cyan",
    fg: "black"
  }
];

const productData = [
  {
    id: '1',
    name: 'Adewa',
    description: "sdfghjkil",
    price: "123",
    source: require('../../../../../assets/img/anime/calmness.png'),
    avatar: null
  }
];

const SearchPage = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [showCateg, setShowCateg] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Navigation
  const navigation = useNavigation();

  // Redux state
  const accessToken = useSelector(selectCurrentToken);

  // Custom hooks to fetch data from APIs
  const { data: productsData, isLoading: isLoadingProducts, isError: isErrorProducts, error: errorProducts, refetch: productsRefetch } = useGetProductsQuery({ accessToken });
  const { data: categoriesData, isLoading: isLoadingCategories, isError: isErrorCategories, error: errorCategories } = useGetCategoryQuery({ accessToken });
  const { data: userInfo, isLoading: isLoadingUser, isError: isErrorUser, refetch: userRefetch } = useGetUserQuery({ accessToken });
  const { data: settings = [], isLoading: isLoadingSettings, refetch: settingsRefetch } = useGetSettingsQuery({ accessToken });

  // Theme
  const theme = useTheme();

  // useEffect to fetch data on component mount
  useEffect(() => {
    userRefetch();
    settingsRefetch();
    productsRefetch();
  }, []);

  // Function to handle search
  const handleSearch = (query) => {
    setFilteredProducts(productsData.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.price.toString().includes(query.toLowerCase()) ||
      product.category.title.toString().toLowerCase().includes(query.toLowerCase())
    ));
  };

  // Function to handle search query change
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setShowCateg(!query);
    handleSearch(query);
  };

  // Function to handle refreshing the products data
  const handleRefresh = () => {
    setRefreshing(true);
    productsRefetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Function to handle category filter
  const handleFilterCateg = (arg) => {
    handleSearch(arg);
    setShowCateg(!arg);
  };

  // Render no results found message
  const renderNoResultsFound = () => (
    <Text style={{ textAlign: 'center', margin: 30,color:theme.colors.color }}>
      No results found
    </Text>
  );

  // Render results count
  const renderResultsCount = () => (
    <Text style={{ margin: 10,color:theme.colors.color  }}>
      Result(s) found: {filteredProducts.length}
    </Text>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
          <Appbar.BackAction
            icon="magnify"
            iconColor={theme.colors.color}
            onPress={() => navigation.goBack()}
          />
          <Searchbar
            placeholder="Find trash..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            placeholderTextColor="#aaa"
            inputStyle={{ color: theme.colors.color }}
            style={{ flex: 1, marginRight: 16, backgroundColor: theme.colors.appbar }}
            clearIcon={null}
            iconColor={theme.colors.color}
          />
        </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.background, flex: 1 }}>
          {filteredProducts.length === 0 ? renderNoResultsFound() : renderResultsCount()}
          <View>
            {showCateg ? (
              <CategoryList categoriesData={categoriesData} handleFilterCateg={handleFilterCateg} />
            ) : (
              <ProductList products={filteredProducts} backgroundColor={theme.colors.cardsdiaogs} color={theme.colors.color} navigation={navigation} refreshing={refreshing} handleRefresh={handleRefresh} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
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
});

export default SearchPage;
