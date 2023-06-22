import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';

const Refresher = ({ apiView, children }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Invoke the view function to refresh the API
    await apiView();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onScroll={(event) => {
        const { nativeEvent } = event;
        if (nativeEvent.contentOffset.y <= 0) {
          handleRefresh();
        }
      }}
    >
      {children}
    </ScrollView>
  );
};

export default Refresher;
