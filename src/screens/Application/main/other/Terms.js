import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Image, ActivityIndicator, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '../../../../css/design';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, MD2Colors, Appbar } from "react-native-paper";
import { BASE_URL } from "../../../../config"
import { useNavigation } from '@react-navigation/native';

const Thumbnail = {
  noNetwork: require('../../../../../assets/img/anime/noInternet.gif'),
};

const TermsPage = ({route}) => {
    const navigation = useNavigation();
    const link = route.params?.link;
    const page = route.params?.page;
    const [isError, setIsError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


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
      return (
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']} style={Styles.defaultGradient} />
            <View style={styles.noConnectionContainer}>
              <Text style={{ color: MD2Colors.green100, fontSize: 25, fontWeight: "bold", marginBottom: 15 }}>
                NO NETWORK CONNECTION
              </Text>
              <Image source={Thumbnail.noNetwork} style={{ width: 150, height: 150 }} />
              <View>
                <Button style={{ backgroundColor: MD2Colors.green400 }} onPress={() => handleRefresh()} mode="contained">
                  Reload
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      );
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
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
            <Appbar.Content title={page} />
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

export default TermsPage;
