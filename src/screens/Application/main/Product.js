import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../app/actions/authSlice';
import ErrorPage from '../../../Components/ErrorPage';
import { ProductList } from '../../../Components/ProductCard';
import LoadingSkeleton from '../../../Components/LoadingSkeleton';
import SetupProfile from '../../../Components/SetupProfile';
import { useGetProductsQuery, useDeleteProductMutation } from '../../../app/services/features/productServerApi';
import { useGetUserQuery } from '../../../app/services/registration/signupApiSlice';
import ImageDialog from '../../../Components/MessageDialog';
import CustomAlert from '../../../Components/CustomAlert';

const ProductPage = () => {
  const navigation = useNavigation();
  const accessToken = useSelector(selectCurrentToken);
  const theme = useTheme();

  // State variables
  const [refreshing, setRefreshing] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);
  const [isSeller, setIsSeller] = useState(true);
  const [isLongPress, setIsLongPress] = useState(false); // State variable to track long press
  const [selectedProductIds, setSelectedProductIds] = useState([]); // State variable to hold selected product IDs
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mutation hook for deleting products
  const [deleteProduct] = useDeleteProductMutation();

  // Query for getting products
  const {
    data: productsData = [],
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: productsRefetch,
  } = useGetProductsQuery({ accessToken });

  // Query for getting user info
  const {
    data: userInfo,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    refetch: userRefetch,
  } = useGetUserQuery({ accessToken });

  // Effects to handle user info and product data
  useEffect(() => {
    if (isErrorUser) {
      // Handle error case
      setIsBuyer(true);
      setIsSeller(true);
    } else if (!isLoadingUser && userInfo) {
      // Handle success case
      setIsBuyer(userInfo?.is_buyer);
      setIsSeller(userInfo?.is_seller);
    }
  }, [isErrorUser, isLoadingUser, userInfo]);

  useEffect(() => {
    productsRefetch();
    userRefetch();
  }, []); // Run the effect only once

  // Function to handle refreshing of data
  const handleRefresh = () => {
    setRefreshing(true);
    productsRefetch();
    userRefetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Function to handle long press
  const handleLongPress = () => {
    setIsLongPress(true);
  };

  // Function to handle closing the app bar
  const handleAppBarClose = () => {
    setIsLongPress(false);
    setSelectedProductIds([]); // Set the selectedProductIds to an empty array
  };

  // Function to delete products
  const handleDeleteProducts = async () => {
    setIsLoading(true);
    setAlertMessage(`Deleting ${selectedProductIds.length} products`);

    try {
      for (let i = 0; i < selectedProductIds.length; i++) {
        setAlertMessage(`Deleting ${selectedProductIds.length - i} products`);
        const response = await deleteProduct({ id: selectedProductIds[i] });
        console.log(response);

        try{
          
          if (response.error.name == "AbortError") {
            setDialogTitle('Aborted');
            setDialogMessage(response.error.message);
            setShowImageDialog(true);
        }
      }
      }
    } catch (error) {
      setDialogTitle('Login Error');
      setDialogMessage('An error occurred while login, please try again later.');
      setDialogStatus('error');
      setShowImageDialog(true);
    }

    setIsLoading(false);
  };

  // Function to handle delete action in the app bar
  const handleAppBarDelete = () => {
    handleDeleteProducts();
    setIsLongPress(false);
    setSelectedProductIds([]); // Set the selectedProductIds to an empty array
  };

  // Function to render the view based on the state and data
  const renderView = () => {
    if (isErrorUser || isErrorProducts) {
      return <ErrorPage handleRefresh={handleRefresh} />;
    }

    if (!isBuyer && !isSeller) {
      return <SetupProfile />;
    }

    if (isLoadingUser || isLoadingProducts || refreshing) {
      return <LoadingSkeleton isLoading={true} />;
    }

    return (
      <ProductList
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        handleLongPress={handleLongPress}
        isLongPress={isLongPress}
        products={productsData}
        selectedProductIds={selectedProductIds}
        setSelectedProductIds={setSelectedProductIds}
        setIsLongPress={setIsLongPress}
      />
    );
  };

  console.log(selectedProductIds);

  return (
    <SafeAreaProvider>
      <CustomAlert
        visible={isLoading}
        message={alertMessage}
        backgroundColor={theme.colors.cardsdialogs}
        color={theme.colors.color}
      />

      {/* App bar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        {isLongPress ? (
          <>
            <Appbar.Content title={`${selectedProductIds.length} selected`} titleStyle={{ color: theme.colors.color }} />
            <Appbar.Action icon="close" color={theme.colors.color} onPress={handleAppBarClose} />
            <Appbar.Action icon="delete" color={theme.colors.color} onPress={handleAppBarDelete} />
          </>
        ) : (
          <>
            <Appbar.Content title="Trash" titleStyle={{ color: theme.colors.color }} />
            <Appbar.Action
              icon="magnify"
              iconColor={theme.colors.color}
              onPress={() => navigation.navigate('search')}
              onLongPress={handleLongPress}
            />
          </>
        )}
      </Appbar.Header>

      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        {renderView()}
      </View>

      {/* Floating action button */}
      {!isErrorUser && !isErrorProducts && !isLoadingUser && !isLoadingProducts && !refreshing && userInfo?.is_seller && (
        <FAB
          icon="plus"
          color="white"
          style={[styles.fabStyle, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('upload')}
        />
      )}

      <ImageDialog
        status={dialogStatus}
        title={dialogTitle}
        message={dialogMessage}
        backgroundColor={theme.colors.cardsdialogs}
        color={theme.colors.color}
        visible={showImageDialog}
        onDismiss={() => setShowImageDialog(false)}
      />
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
  },
});

export default ProductPage;
