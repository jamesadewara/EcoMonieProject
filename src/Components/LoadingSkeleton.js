import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator,  useTheme  } from 'react-native-paper';

const LoadingSkeleton = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <View style={[styles.loadingContainer,{backgroundColor: theme.colors.background}]}>
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