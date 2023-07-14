import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Divider, Text, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

const OrderHistoryPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  // Sample order history data
  const orderHistory = [
    {
      id: '1',
      orderNumber: 'ORD001',
      date: '2023-07-10',
      total: '$150.00',
      status: 'Delivered',
      buyerName: 'John Doe',
    },
    {
      id: '2',
      orderNumber: 'ORD002',
      date: '2023-07-08',
      total: '$89.99',
      status: 'Processing',
      buyerName: 'Jane Smith',
    },
    // ... more order history data
  ];

  // Render each order item
  const renderOrderItem = ({ item }) => {
    let statusColor, statusIcon;

    if (item.status === 'Delivered') {
      statusColor = 'green';
      statusIcon = 'check-circle';
    } else if (item.status === 'Processing') {
      statusColor = 'blue';
      statusIcon = 'access-time';
    }

    return (
      <View>
        <Card style={[styles.orderCard, {backgroundColor: theme.colors.cardsdialogs}]}>
          <Card.Title title={item.orderNumber} titleStyle={{color: theme.colors.color}} subtitle={item.date} />
          <Divider />
          <Card.Content>
            <View style={styles.statusContainer}>
              <MaterialIcons name={statusIcon} size={24} color={statusColor} style={styles.statusIcon} />
              <Text style={[styles.orderText, { color: statusColor }]}>Status: {item.status}</Text>
            </View>
            <Text style={[styles.orderText, {color: theme.colors.color}]}>Buyer: {item.buyerName}</Text>
            <Text style={[styles.orderText, {color: theme.colors.color}]}>Total: {item.total}</Text>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="History" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Text style={[styles.pageTitle, {color: theme.colors.color}]}>Order History</Text>
        <FlatList
          data={orderHistory}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderCard: {
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIcon: {
    marginRight: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default OrderHistoryPage;
