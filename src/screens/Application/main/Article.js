import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Linking, PanResponder, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ErrorPage from '../../../Components/ErrorPage';
import { BASE_URL, API_TIMEOUT } from '../../../config';
import LoadingSkeleton from '../../../Components/LoadingSkeleton';

const Thumbnail = {
  icon: require('../../../../assets/icon.png'),
};

const ArticlePage = () => {
  // State variables
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true initially
  const webViewRef = useRef(null);
  const [panResponderEnabled, setPanResponderEnabled] = useState(false);

  // Access the current theme from react-native-paper
  const theme = useTheme();
  const navigation = useNavigation();

  // Handle link press
  const handleLinkPress = (url) => {
    if (url.startsWith('#')) {
      // Handle internal link navigation
      const anchor = url.substring(1);
      if (anchor === 'about') {
        // Navigate to the About screen
        navigation.navigate('AboutScreen');
      }
    } else {
      // Handle external link navigation
      Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
  };

  // Reload the WebView
  const reloadWebView = () => {
    setIsError(false);
    webViewRef.current?.reload();
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

  const injectedJavaScript = `
    (function() {
      var xhrOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        this.timeout = ${API_TIMEOUT};
        xhrOpen.call(this, method, url, async, user, pass);
      };
    })();

    // Function to send actions to the React Native app
    function sendAction(action) {
      window.ReactNativeWebView.postMessage(JSON.stringify(action));
    }

    // Add event listeners to capture link clicks and button clicks
    document.addEventListener('click', function(event) {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        sendAction({ type: 'link', url: event.target.href });
      }
    });

    document.addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
        event.preventDefault();
        sendAction({ type: 'button', id: event.target.id });
      }
    });

    var rootElement = document.querySelector('body');

    rootElement.style.setProperty('--primary', '${theme.colors.primary}');
    rootElement.style.setProperty('--light-primary', '${theme.colors.lightprimary}');
    rootElement.style.setProperty('--dark-primary', '${theme.colors.darkprimary}');
    rootElement.style.setProperty('--shade-primary-1', '${theme.colors.shadeprimary1}');
    rootElement.style.setProperty('--shade-primary-2', '${theme.colors.shadeprimary2}');
    rootElement.style.setProperty('--background', '${theme.colors.background}');
    rootElement.style.setProperty('--cardsdialogs', '${theme.colors.cardsdialogs}');
    rootElement.style.setProperty('--appbar', '${theme.colors.appbar}');
    rootElement.style.setProperty('--color', '${theme.colors.color}');
    rootElement.style.setProperty('--fade', '${theme.colors.fade}');
  `;

  // Listen to theme changes and update the WebView colors
  useEffect(() => {
    const updatedInjectedJavaScript = `
      var rootElement = document.querySelector('body');

      rootElement.style.setProperty('--primary', '${theme.colors.primary}');
      rootElement.style.setProperty('--light-primary', '${theme.colors.lightprimary}');
      rootElement.style.setProperty('--dark-primary', '${theme.colors.darkprimary}');
      rootElement.style.setProperty('--shade-primary-1', '${theme.colors.shadeprimary1}');
      rootElement.style.setProperty('--shade-primary-2', '${theme.colors.shadeprimary2}');
      rootElement.style.setProperty('--background', '${theme.colors.background}');
      rootElement.style.setProperty('--cardsdialogs', '${theme.colors.cardsdialogs}');
      rootElement.style.setProperty('--appbar', '${theme.colors.appbar}');
      rootElement.style.setProperty('--color', '${theme.colors.color}');
      rootElement.style.setProperty('--fade', '${theme.colors.fade}');
    `;

    webViewRef.current?.injectJavaScript(updatedInjectedJavaScript);
  }, [theme]);

  // Pan responder configuration
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Check if the hand is very close to the top (adjust the threshold as needed)
        const touchPosition = evt.nativeEvent.pageY;
        const topThreshold = 50; // Adjust this threshold as needed
        return gestureState.dy < -topThreshold && touchPosition <= topThreshold;
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

  // Animated value for controlling the AppBar visibility
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  // Function to handle scroll events and update the AppBar visibility
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    { useNativeDriver: true }
  );

  // Animated styles for the AppBar
  const appBarStyle = {
    transform: [
      {
        translateY: scrollOffsetY.interpolate({
          inputRange: [0, 48],
          outputRange: [0, -48],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

    // Handle messages received from the WebView
    const handleWebViewMessage = (event) => {
      const { data } = event.nativeEvent;
      console.log('dfg')
  
      try {
        const action = JSON.parse(data);
        if (action.type === 'link') {
          try{
            handleLinkPress(action.url);
          }
          catch{
            
          }
        } else if (action.type === 'button') {
          // Handle button action
          if (action.id === 'btn-get-started') {
            navigation.navigate('store');
          }
          console.log('Button clicked:', action.id);
        }
      } catch (error) {
        console.error('Error parsing WebView message:', error);
      }
    };
  

  // Render the WebView component
  const renderWebView = () => {
    if (isError) {
      return <ErrorPage handleRefresh={handleRefresh} />;
    }

    if (isLoading) {
      setIsLoading(false)
      return <LoadingSkeleton isLoading={true} />;
    }

    return (
      <Animated.View style={[styles.webViewContainer, appBarStyle]}>
        <WebView
          ref={webViewRef}
          source={{ uri: `${BASE_URL}/ecomonie/website/` }}
          injectedJavaScript={injectedJavaScript}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setIsError(true)}
          onShouldStartLoadWithRequest={(event) => {
            const { url, navigationType } = event;
            if (navigationType === 'click') {
              handleLinkPress(url);
              return false; // Prevent WebView from loading the URL internally
            }
            return true;
          }}
          onMessage={handleWebViewMessage}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaProvider>
      {/* Appbar */}
      <Animated.View style={[styles.appBar, appBarStyle]}>
        <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
          <Appbar.Action icon={Thumbnail.icon} size={48} color={theme.colors.primary} />
          <Appbar.Content title="EcoMonie" titleStyle={{ color: theme.colors.color }} />
        </Appbar.Header>
      </Animated.View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} enabled={true} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...panResponder.panHandlers} // Spread the panResponder's panHandlers onto the ScrollView
      >
        {/* Render WebView */}
        {renderWebView()}
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default ArticlePage;
