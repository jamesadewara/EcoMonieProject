import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, Avatar, Text, TouchableRipple } from 'react-native-paper';
import CustomAvatar from '../Components/CustomAvatar';
import { useNavigation } from '@react-navigation/native';

const ChatList = ({ partners, backgroundColor, color }) => {
  const navigation = useNavigation()
  // Function to get the current time in the desired format
  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}${ampm}`;
  };

  // Function to handle the dialog logic
  const showDialog = () => {
    // Handle dialog logic here
  };

  return (
    <ScrollView>
      <List.Section style={{ paddingHorizontal: 10 }}>
        {partners.map((partner) => (
          <TouchableRipple
            key={partner.id}
            onPress={()=>navigation.navigate("room")} // Invoke onPress function when pressed
            rippleColor="beige"
            style={{ backgroundColor: backgroundColor, paddingHorizontal: 0, borderRadius: 10, marginVertical: 5 }}
          >
            <List.Item
              title={partner.username}
              description={partner.email}
              style={styles.listItem}
              titleStyle={{ color: color }}
              right={() => (
                <Text style={[styles.timeText, { color: color }]}>
                  {getCurrentTime()}
                </Text>
              )}
              left={() => (
                <CustomAvatar
                  // avatar={partner.avatar}
                  email={partner.email}
                  size={50}
                  style={[styles.avatar, { backgroundColor: backgroundColor }]}
                />
              )}
            />
          </TouchableRipple>
        ))}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  avatar: {
    marginVertical: 10,
    marginRight: 10,
  },
  timeText: {
    fontSize: 12,
  },
});

export default ChatList;
