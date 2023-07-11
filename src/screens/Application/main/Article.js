import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Linking,
  PanResponder,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Appbar, useTheme, MD2Colors } from "react-native-paper";
import ErrorPage from '../../../Components/ErrorPage';
import { BASE_URL } from '../../../config';
import LoadingSkeleton from '../../../Components/LoadingSkeleton';


const Thumbnail = {
  icon: require('../../../../assets/icon.png')
};

const ArticlePage = () => {
  // State variables
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const webViewRef = useRef(null);
  const [panResponderEnabled, setPanResponderEnabled] = useState(false);

  // Access the current theme from react-native-paper
  const theme = useTheme();

  // Handle link press
  const handleLinkPress = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Cannot open URL: ', url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  // Reload the WebView
  const reloadWebView = () => {
    setIsError(false);
    webViewRef.current.reload();
  };

  // Handle pull-to-refresh action
  const handleRefresh = () => {
    if (!panResponderEnabled) {
      // Refresh only when pan responder is enabled (hand is very close to the top)
      return;
    }
    setRefreshing(true);
    reloadWebView();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const injectedJavaScript = `(function() {
    var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: ${theme.colors.mode ? 'dark' : 'light'})');
    var rootElement = document.querySelector(':root');
    rootElement.setAttribute('data-color-scheme', colorSchemeQuery.matches ? 'dark' : 'light');
  })();`;

  // Pan responder configuration
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Check if the hand is very close to the top (adjust the threshold as needed)
        return gestureState.dy < -50;
      },
      onPanResponderGrant: () => {
        // Enable pan responder when gesture begins
        setPanResponderEnabled(true);
      },
      onPanResponderRelease: () => {
        // Disable pan responder when gesture is released
        setPanResponderEnabled(false);
      },
    })
  ).current;

  // Render the WebView component
  const renderWebView = () => {
    if (isError) {
      return <ErrorPage handleRefresh={handleRefresh} />;
    }

    if (isLoading) {
      return (
        <LoadingSkeleton isLoading={isLoading} />
      );
    }


    return (
      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: `${BASE_URL}/ecomonie/website/` }}
          injectedJavaScript={injectedJavaScript}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onNavigationStateChange={(navState) => {
            if (!navState.url.includes(`${BASE_URL}/ecomonie/website/`)) {
              // Check if the website/link is not in the navState URL
              handleLinkPress(navState.url);
              // Open the link in an external browser
            }
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      {/* Appbar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.Action icon={Thumbnail.icon} size={48} iconColor={MD2Colors.green500} />
        <Appbar.Content title="EcoMonie" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} enabled={true} />
        }
        {...panResponder.panHandlers}
      >
        {/* Render WebView */}
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

export default ArticlePage;
