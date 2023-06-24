import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View, KeyboardAvoidingView
} from 'react-native';

import { Button, List, TouchableRipple, Dialog, Portal, Appbar, MD2Colors, TextInput } from 'react-native-paper';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import CustomAlert from '../../../../widgets/customAlert';

import { useGetSettingsQuery } from '../../../../app/services/features/settingsServerApi';
import { useDispatch, useSelector } from 'react-redux';

const ChangePasswordPage = ({route}) => {
    const navigation = useNavigation();
    const email = route.params?.email;

  const accessToken = useSelector((state) => state.user.token);
  const {
    data: settings = [],
    isLoading,
    isFetching,
  } = useGetSettingsQuery({ accessToken });

  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const handlePasswordUpdate = async() => {

  }
  
  return (
    
    <SafeAreaProvider>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
          <Appbar.Content title="Change password" />
        </Appbar.Header>
      {/* <CustomAlert visible={settings.isLoading} message="Loading..." /> */}
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                    <TextInput
                    label="Old Password"
                    mode="outlined"
                    outlineColor="green"
                    selectionColor="green"
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    />
                    {formSubmitted && password.trim() === '' && (
                    <HelperText type="error" visible={password.trim() === ''}>
                        Password is required
                    </HelperText>
                    )}
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                    <TextInput
                    label="New Password"
                    mode="outlined"
                    outlineColor="green"
                    selectionColor="green"
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    />
                    {formSubmitted && password.trim() === '' && (
                    <HelperText type="error" visible={password.trim() === ''}>
                        Password is required
                    </HelperText>
                    )}
                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                    <TextInput
                    label="Confirm Password"
                    mode="outlined"
                    outlineColor="green"
                    selectionColor="green"
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    />
                    {formSubmitted && password.trim() === '' && (
                    <HelperText type="error" visible={password.trim() === ''}>
                        Password is required
                    </HelperText>
                    )}
                </KeyboardAvoidingView>
            </View>
            <View styles={styles.container}>
                <Button mode="contained" style={{ width: 100, backgroundColor: "green", alignSelf: 'center' }} onPress={handlePasswordUpdate}>
                Submit
                </Button>
            </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  }
});

export default ChangePasswordPage;