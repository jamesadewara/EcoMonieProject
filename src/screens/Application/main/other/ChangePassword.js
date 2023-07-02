import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  HelperText,
  useTheme,
  MD2Colors,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../../../../css/design';

const ChangePasswordPage = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params?.email;
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePasswordUpdate = async () => {
    // Handle password update logic here
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Change Password" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <ScrollView>
          <View>
            <KeyboardAvoidingView style={[Styles.m2, StyleSheet.w3]}>
              {/* Old Password Input */}
              <TextInput
                label="Old Password"
                mode="outlined"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
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

              {/* New Password Input */}
              <TextInput
                label="New Password"
                mode="outlined"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
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

              {/* Confirm Password Input */}
              <TextInput
                label="Confirm Password"
                mode="outlined"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
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

          {/* Submit Button */}
          <View style={styles.container}>
            <Button
              mode="contained"
              buttonColor={MD2Colors.green500}
              style={{ width: 100, alignSelf: 'center' }}
              onPress={handlePasswordUpdate}
            >
              Submit
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ChangePasswordPage;
