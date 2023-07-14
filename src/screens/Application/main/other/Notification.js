import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, FlatList } from 'react-native';
import {
  Appbar,
  List,
  TouchableRipple,
  Switch,
  Dialog,
  Button,
  Text,
  useTheme,
  Divider,
  MD2Colors,
  IconButton
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomAvatar from "../../../../Components/CustomAvatar";

const friendRequests = [
  { id: 1, first_name: 'John', last_name: 'Doe', avatar: "https", email: 'gaert'},
  { id: 2, name: 'Jane Smith', email: 'df' },
  { id: 3, name: 'Alice Johnson', email:"op" },
];

const NotificationPage = () => {
  const navigation = useNavigation();
  const [requests, setRequests] = useState(friendRequests); // State variable to track the friend requests

  const theme = useTheme();


  const handleAction = (action, requestId) => {
    // Filter the requests and update the state to remove the selected item
    if (action === 'decline') {
      const updatedRequests = requests.filter((item) => item.id !== requestId);
      setRequests(updatedRequests);
    }
    // Implement your logic here based on the action (add/decline) and the requestId
  };
  
  const renderItem = ({ item }) => (
    <View>
      <TouchableRipple onPress={() => handleAction('add', item.id)}>
        <List.Item
        titleStyle={{color: theme.colors.color}}
          title={item?.first_name+" "+item?.last_name}
          left={() => (
            <CustomAvatar email={item?.email} avatar={item?.avatar} />
          )}
          right={() => (
            <View style={styles.actionContainer}>
              <Button mode="contained" style={styles.addButton} onPress={() => handleAction('add', item.id)}>
                Add
              </Button>
              <IconButton icon="close" size={20} onPress={() => handleAction('decline', item.id)} />
            </View>
          )}
        />
      </TouchableRipple>
      <Divider />
    </View>
  );

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Notifications" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <ScrollView>
          <View>
            <FlatList
              data={requests} // Render the updated requests instead of the initial friendRequests
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    marginRight: 0,
  },
});

export default NotificationPage;
