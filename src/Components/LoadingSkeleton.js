import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingSkeleton = ({ isLoading }) => {
  return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator animate={isLoading} size={50} />
    </View>
  )
  
};

export default LoadingSkeleton;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})