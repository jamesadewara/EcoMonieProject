import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme } from 'react-native-paper';

const Thumbnail = {
  noNetwork: require('../../assets/img/anime/noInternet.gif'),
};

const ErrorPage = ({ handleRefresh }) => {
  const theme = useTheme();

  return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']}>
          <View style={styles.noConnectionContainer}>
            <Text style={{ color: theme.colors.color, fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}>
              NO NETWORK CONNECTION
            </Text>
            <Image source={Thumbnail.noNetwork} style={{ width: 150, height: 150 }} />
            <View>
              <Button
                style={{ backgroundColor: theme.colors.green400 }}
                onPress={handleRefresh}
                mode="contained"
              >
                Reload
              </Button>
            </View>
          </View>
        </LinearGradient>
      </View>
  );
};

const styles = {
  noConnectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ErrorPage;
