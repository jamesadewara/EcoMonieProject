import React, { useState } from 'react';
import { BottomNavigation, MD2Colors, Text } from 'react-native-paper';
import ArticlePage from './main/Article';
import ProductPage from './main/Product';
import SettingsPage from './main/Settings';
import MyCartPage from './main/MyCart';

const MainScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'explore', title: 'Explore', focusedIcon: 'compass', unfocusedIcon: 'compass-outline' },
    { key: 'product', title: 'Store', focusedIcon: 'store', unfocusedIcon: 'store-outline' },
    { key: 'cart', title: 'Shop Cart', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    explore: ArticlePage,
    product: ProductPage,
    cart: MyCartPage,
    settings: SettingsPage,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={MD2Colors.green900}
      inactiveColor={MD2Colors.green700}
    />
  );
};

export default MainScreen;
