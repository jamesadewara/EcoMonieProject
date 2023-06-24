import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Appbar, List, TouchableRipple, Switch, Dialog, Button, Text, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const NotificationPage = () => {
  const navigation = useNavigation();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Notifications" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView>
          <List.Section style={{ paddingHorizontal: 10 }}>
            <TouchableRipple
              style={[styles.listItem, { backgroundColor: "#fafafa" }]}
            >
              <List.Item
                style={styles.listItemContent}
                description="By setting this to true we will be sending you our new updates, so stay tuned"
                title="Allow our Newsletter"
                left={() => <List.Icon icon="email" color={MD2Colors.amber700}  />}
                right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
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
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
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
