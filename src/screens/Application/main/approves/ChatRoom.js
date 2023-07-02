import React, { useState } from 'react';
import {
  Appbar,
  useTheme,
  Provider as PaperProvider,
  Menu,
  Divider,
  TextInput,
  MD2Colors,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomAvatar from '../../../../Components/CustomAvatar';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;

const ChatMessageList = () => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'me', content: 'Hello', timestamp: '10:00 AM' },
    { id: '2', sender: 'other', content: 'Hi', timestamp: '10:01 AM' },
    // Add more messages here
  ]);

  const renderChatMessage = ({ item }) => {
    const isMe = item.sender === 'me';

    return (
      <View style={[styles.messageContainer, isMe ? styles.rightMessage : styles.leftMessage]}>
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.chatContainer}>
      <FlatList
        data={messages}
        renderItem={renderChatMessage}
        keyExtractor={(item) => item.id}
        inverted // This will show the latest message at the bottom
      />
    </View>
  );
};

const ChatRoomPage = () => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    // Wrap the components with the necessary providers
    <SafeAreaProvider>
      <PaperProvider>
        {/* Top App Bar */}
        <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
          {/* Back Button */}
          <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
          {/* Custom Avatar */}
          <Appbar.Action icon={<CustomAvatar />} onPress={() => {}} />
          {/* Title */}
          <Appbar.Content title="Adewara" titleStyle={{ color: theme.colors.color }} />
          {/* Menu Button */}
          <Menu
            contentStyle={{ backgroundColor: theme.colors.background }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                onPress={openMenu}
                color={theme.colors.color}
              />
            }
          >
            {/* Menu Items */}
            <Menu.Item
              titleStyle={{ color: theme.colors.color }}
              leadingIcon="cart"
              onPress={() => {
                navigation.navigate('payment');
              }}
              title="Make Payment Now"
            />
            {/* Divider */}
            <Divider style={{ color: theme.colors.appbar }} />
          </Menu>
        </Appbar.Header>
        {/* Safe Area View */}
        <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
          {/* Content */}
          <ChatMessageList />
          <View style={[styles.bottom, { paddingBottom: bottom,justifyContent:'center',alignSelf:'center' }]}>
            <TextInput
              mode="outlined"
              multiline={true}
              activeOutlineColor={theme.colors.cardsdiaogs}
              cursorColor={theme.colors.color}
              textColor={theme.colors.color}
              style={[styles.input, { backgroundColor: theme.colors.appbar }]}
              placeholder="Type something..."
              keyboardType="default"
              value={message}
              onChangeText={setMessage}
              right={<TextInput.Icon icon="send" color={theme.colors.color} />}
            />
          </View>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: MD2Colors.green300,
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: MD2Colors.blue300,
  },
  messageText: {
    fontSize: 16,
    color:'white',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    color: '#eeeeee',
  },
  bottom: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  input: {
    flex: 0.9,
    marginBottom:18
  },
});

export default ChatRoomPage;
