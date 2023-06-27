import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Appbar, List, IconButton, Dialog, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomAvatar from '../../../widgets/customAvatar';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetOrdersQuery } from '../../../app/services/features/orderServiceApi';
import { selectCurrentToken } from '../../../app/actions/authSlice';
import { useSelector } from 'react-redux';
import CustomAlert from '../../../widgets/customAlert';

const Thumbnail = {
  noNetwork: require('../../../../assets/img/anime/noInternet.gif'),
  icon: require('../../../../assets/icon.png')
};

const ApprovalPage = () => {
  const navigation = useNavigation();

  const [dialogVisible, setDialogVisible] = useState(false);

  const accessToken = useSelector(selectCurrentToken);
  // fetch orders data
  const { data: orders = [], isLoading, isError, error, refetch } = useGetOrdersQuery({ accessToken });

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const handleRefresh = () => {
    refetch(); // Refresh the data by refetching the orders
  };

  const renderView = () => {
    if (isError) {
      return (
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']} style={styles.defaultGradient} />
            <View style={styles.noConnectionContainer}>
              <Text style={{ color: 'green', fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}>
                NO NETWORK CONNECTION
              </Text>
              <Image source={Thumbnail.noNetwork} style={{ width: 150, height: 150 }} />
              <View>
                <Button style={{ backgroundColor: 'green' }} onPress={handleRefresh} mode="contained">
                  Reload
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      );
    }
    return (
      <View>
        {isLoading && (
          <CustomAlert visible={isLoading} message="Loading..." />
        )}
        <ScrollView>
          <List.Section style={{ paddingHorizontal: 10 }}>
            {orders.map((data) => (
              <List.Item
                key={data.id}
                title={data.username}
                description={data.email}
                style={{ backgroundColor: "#fafafa", paddingLeft: 10 }}
                right={() => (
                  <IconButton
                    icon="send"
                    color='blue'
                    size={20}
                    onPress={showDialog}
                  />
                )}
                left={() => <CustomAvatar avatar={data.avatar} email={data.email} size={40} />}
                onPress={() => {
                  // Handle item press
                }}
              />
            ))}
          </List.Section>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.Content title="Approval's" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        {renderView()}
      </SafeAreaView>

      <Dialog visible={dialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Payment</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyMedium'>
            You admit that the seller has given you your sale.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>No</Button>
          <Button onPress={hideDialog}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  defaultGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  noConnectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ApprovalPage;
