import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MD2Colors,useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import ArticlePage from './main/Article';
import ProductPage from './main/Product';
import SettingsPage from './main/Settings';
import ApprovalPage from './main/Approval';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faHomeAlt, faShoppingBag, faMessage, faCog } from '@fortawesome/free-solid-svg-icons';

const TabArr = [
  {
    route: 'home',
    label: 'Home',
    activeIcon: faHome,
    inActiveIcon: faHomeAlt,
    component: ArticlePage,
  },
  {
    route: 'store',
    label: 'Store',
    activeIcon: faShoppingBag,
    inActiveIcon: faShoppingBag,
    component: ProductPage,
  },
  {
    route: 'chat',
    label: 'Chat',
    activeIcon: faMessage,
    inActiveIcon: faMessage,
    component: ApprovalPage,
  },
  {
    route: 'settings',
    label: 'Settings',
    activeIcon: faCog,
    inActiveIcon: faCog,
    component: SettingsPage,
  },




  // Add other tabs here
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState,color } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);


  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0.2, rotate: '0deg' }, 1: { scale: 1.2, rotate: '360deg' } });
    } else {
      viewRef.current.animate({ 0: { scale: 1.2, rotate: '360deg' }, 1: { scale: 0.7, rotate: '0deg' } });
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <FontAwesomeIcon
          icon={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? MD2Colors.green800 : color}
          size={24}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function MainScreen({route}) {

      // Access the current theme from react-native-paper
      const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          position: 'absolute',
          bottom: 18,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor:theme.colors.appbar,
        },
      }}
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} color={theme.colors.color}/>,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
