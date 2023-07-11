import React from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { List, Text, Avatar,useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ChatList = ({ partners, handleRefresh, refreshing }) => {
  const navigation = useNavigation();
  const theme =useTheme();

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const navigateToRoom = () => {
    navigation.navigate('room');
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity onPress={navigateToRoom} style={[styles.chatItem, { }]}>
      <Avatar.Image
        source={{uri:item.profile_pic}}
        size={60}
        style={[styles.avatar,{backgroundColor:theme.colors.appbar}]}
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.username,{color:theme.colors.color}]}>{item.username}</Text>
          <Text style={styles.time}>{getCurrentTime()}</Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={partners}
      keyExtractor={item => item.id}
      renderItem={renderChatItem}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} enabled={true} />
      }
      contentContainerStyle={[styles.container]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  message: {
    fontSize: 14,
    color: '#888',
  },
});

export default ChatList;
