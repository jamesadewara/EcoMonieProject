import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Image, ActivityIndicator, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '../../../../css/design';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, MD2Colors, Appbar, useTheme } from "react-native-paper";
import { BASE_URL } from "../../../../config"
import { useNavigation } from '@react-navigation/native';
import ErrorPage from '../../../../Components/ErrorPage';
import { selectCurrentToken } from '../../../../app/actions/authSlice';
import { useGetSettingsQuery } from '../../../../app/services/features/settingsServerApi';
import { useSelector } from 'react-redux';

const PaymentPage = ({ route }) => {
  const navigation = useNavigation();
  const accessToken = useSelector(selectCurrentToken);

  // Query for getting settings
  const {
    data: settings = [],
    isLoading,
    isError,
    refetch
  } = useGetSettingsQuery({ accessToken });

  const link = "https:www.com"//settings//.payment_api
  console.log(settings)

  // Theme
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const reloadWebView = () => {
    refetch()
  };

  const handleRefresh = () => {
    setRefreshing(true);
    reloadWebView();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderWebView = () => {
    // Display error page if there is an error
    if (isError) {
      return <ErrorPage handleRefresh={handleRefresh} />;
    }

    return (
      <View style={styles.webViewContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={MD2Colors.green400} />
          </View>
        )}
        <WebView
          source={{ uri: link }}
          onError={() => setIsError(true)}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction
          iconColor={theme.colors.color}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Payment" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {renderWebView()}
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
  noConnectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default PaymentPage;
