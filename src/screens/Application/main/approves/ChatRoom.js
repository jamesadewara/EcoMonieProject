import React, { useState,useRef,useEffect } from 'react';
import {
  Appbar,
  useTheme,
  Provider as PaperProvider,
  Menu,
  Divider,
  TextInput,
  MD2Colors,
  Avatar
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Text, Linking } from 'react-native';
import CustomAvatar from '../../../../Components/CustomAvatar';

const ChatMessageList = ({messages}) => {
  const flatListRef = useRef(null);
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
      ref={flatListRef}
        data={messages}
        renderItem={renderChatMessage}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const ChatRoomPage = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'me', content: 'Hello', timestamp: '10:00 AM' },
    { id: '2', sender: 'other', content: 'Hi', timestamp: '10:01 AM' },
    // Add more messages here
  ]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const sendMessage = () => {
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: 'other',
      content: message,
      timestamp: '10:00 AM'
    };
  
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage('');
  };
  

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
          <Appbar.Action icon={<Avatar.Image
        source=""
        size={60}
        style={[styles.avatar,{backgroundColor:theme.colors.appbar}]}
      />}/>
          <Appbar.Content title="Adewara" titleStyle={{ color: theme.colors.color }} />
          <Menu
            visible={visible}
            contentStyle={{backgroundColor:theme.colors.cardsdialogs}}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                onPress={openMenu}
                color={theme.colors.color}
              />
            }
          >
            <Menu.Item
              leadingIcon="cart"
              titleStyle={{ color: theme.colors.color }}
              onPress={() => {
                navigation.navigate('payment');
                closeMenu();
              }}
              title="Make Payment Now"
            />
            <Divider style={{coor:"#aaa"}}/>
            <Menu.Item
            leadingIcon='phone'
              titleStyle={{ color: theme.colors.color }}
              onPress={() => {
                Linking.openURL('tel:081092871654');
                closeMenu();
              }}
              title="Make A Phone Call"
            />
            <Divider />
          </Menu>
        </Appbar.Header>
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
          <ChatMessageList messages={messages} />
          <View style={styles.bottom}>
            <TextInput
              mode="outlined"
              multiline={true}
              activeColor={theme.colors.primary}
              activeOutlineColor={theme.colors.primary}
              selectionColor="teal"
              cursorColor={theme.colors.primary}
              textColor={theme.colors.color}
              style={[styles.input, { backgroundColor: theme.colors.background }]}
              placeholder="Type something..."
              keyboardType="default"
              value={message}
              onChangeText={setMessage}
              right={
                <TextInput.Icon
                  icon="send"
                  color={theme.colors.primary}
                  onPress={sendMessage}
                  disabled={!message}
                />
              }
            />
          </View>
        </View>
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
    maxWidth: '75%',
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
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    color: '#eeeeee',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom:20
  },
  input: {
    flex: 0.9,
  },
});

export default ChatRoomPage;
