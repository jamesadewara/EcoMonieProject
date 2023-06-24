import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Appbar, List, TouchableRipple, ToggleButton, Dialog, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomAvatar from '../../../widgets/customAvatar';

const ApprovalPage = () => {
  const navigation = useNavigation();

  const [active, setActive] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleToggle = () => {
    setActive(!active);
    if (active) {
      showDialog()
    }
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const items = [
    {
      id: 1,
      username: "Adewara James",
      email: "jamesadewara@gmail.com",
      avatar: null,
      description: "wants to purchase"
    },
  ];

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.Content title="Approval's" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView>
          <List.Section style={{ paddingHorizontal: 10 }}>
            {items.map((data) => (
              <TouchableRipple
                style={[
                  styles.listItem,
                  { backgroundColor: "#fafafa" },
                ]}
                key={data.id}
              >
                <List.Item
                  style={styles.listItemContent}
                  description={data.description}
                  title={data.username}
                  left={() => (
                    <CustomAvatar avatar={data.avatar} email={data.email} />
                  )}
                  right={() => (
                    <>
                      <ToggleButton
                        icon={active ? 'check' : 'close'}
                        value="toggle"
                        status={active ? 'checked' : 'unchecked'}
                        onPress={handleToggle}
                        iconColor={active ? '#FFFFFF' : '#fafafa'}
                        style={{ backgroundColor: active ? '#00AA00' : 'gray' }}
                      />
                    </>
                  )}
                />
              </TouchableRipple>
            ))}
          </List.Section>
        </ScrollView>
      </SafeAreaView>

      <Dialog visible={dialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Reset Systems Cache</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium'>
              By clicking on it. You accept that the seller has transfered the trash to you.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>No</Button>
            <Button onPress={() => { hideDialog(); }}>
              Yes
            </Button>
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
  listItem: {
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ApprovalPage;
