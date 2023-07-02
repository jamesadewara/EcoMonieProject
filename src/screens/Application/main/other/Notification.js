import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Appbar, List, TouchableRipple, Switch, Dialog, Button, Text, MD2Colors,useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const NotificationPage = () => {
  const navigation = useNavigation();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const theme = useTheme();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Notifications" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <SafeAreaView style={{backgroundColor: theme.colors.background, flex:1}}>
        <ScrollView>
          <List.Section style={{ paddingHorizontal: 10 }}>
            <TouchableRipple
              style={[styles.listItem, { backgroundColor: theme.colors.cardsdiaogs }]}
            >
              <List.Item
              titleStyle={{color:theme.colors.color}}
              descriptionStyle={{color:"#aaa"}}
                style={styles.listItemContent}
                description="By setting this to true we will be sending you our new updates, so stay tuned"
                title="Allow our Newsletter"
                left={() => <List.Icon icon="email" color={MD2Colors.amber700}  />}
                right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} ios_backgroundColor="#E5E5EA"/>}
              />
            </TouchableRipple>
          </List.Section>
        </ScrollView>
      </SafeAreaView>

      {/* <Dialog visible={dialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Reset Systems Cache</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            By clicking on it, you accept that the seller has transferred the trash to you.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>No</Button>
          <Button onPress={() => { hideDialog(); }}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog> */}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default NotificationPage;
