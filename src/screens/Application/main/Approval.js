import React from 'react';

import { SafeAreaView } from 'react-native';

import { ScrollView, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Appbar, Button, List, TouchableRipple, Avatar, ToggleButton } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';


const ApprovalPage = () => {
  const navigation = useNavigation();

  const [status, setStatus] = React.useState('checked');

  const onButtonToggle = value => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };

  return (
    <SafeAreaProvider>
      {/* <CustomAlert visible={settings.isLoading} message="Loading..." /> */}
      <SafeAreaView>
        <Appbar.Header>
          <Appbar.Content title="Cart" />
        </Appbar.Header>
        <View>
          <ScrollView>
            <React.Fragment>
              <List.Section>
                <List.Subheader>
                    Seller
                </List.Subheader>
                <TouchableRipple
                  rippleColor="rgba(0, 0, 0, .32)">
                  <List.Item
                    description="We manufacture tryes."
                    title="Company XYZ"
                    left={() => <Avatar.Text size={45} label="XD" /> }
                    right={() => <ToggleButton
      icon="check"
      value="Received"
      status={status}
      onPress={onButtonToggle}
    />}
                  />
                </TouchableRipple>
              </List.Section>
            </React.Fragment>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  
  );
};

export default ApprovalPage;