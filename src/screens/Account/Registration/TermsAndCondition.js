import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Image, ActivityIndicator, Linking ,StatusBar} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, MD2Colors, Appbar,useTheme } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import ErrorPage from '../../../Components/ErrorPage';


const TermsPage = ({route}) => {
    const navigation = useNavigation();
    const link = "https://www.google.com"
    const page = "Terms & Condtion"
    const [isError, setIsError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Theme
  const theme = useTheme();


  const reloadWebView = () => {
    setIsError(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    reloadWebView();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderWebView = () => {
    if (isError) {
      return <ErrorPage handleRefresh={handleRefresh} />
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
        <StatusBar barStyle={theme.colors.status} />
        <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
          <Appbar.BackAction
            iconColor={theme.colors.color}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content title={page} titleStyle={{color:theme.colors.color}}/>
          </Appbar.Header>
        <ScrollView
            contentContainerStyle={{backgroundColor:theme.colors.background, flex:1}}
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

export default TermsPage;
