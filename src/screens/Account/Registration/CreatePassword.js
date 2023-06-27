import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Appbar, TextInput, HelperText, Snackbar } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const CreatePasswordPage = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params?.email;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { top: topInset } = useSafeAreaInsets();

  const handleCreatePassword = () => {
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setFormSubmitted(true);
      setIsPasswordMatched(true);
      return;
    }

    if (password.length < 8) {
      setIsPasswordMatched(false);
      return;
    }

    if (password !== confirmPassword) {
      setIsPasswordMatched(false);
      return;
    }

    // Perform password creation logic
    setIsPasswordMatched(true); // Passwords match

    // log user in
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Create Password" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
          <View>
            <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
              <TextInput
                label="Password"
                mode="outlined"
                placeholder="Enter Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={togglePasswordVisibility}
                  />
                }
              />
              <TextInput
                label="Confirm Password"
                mode="outlined"
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={toggleConfirmPasswordVisibility}
                  />
                }
              />
              {formSubmitted && (password.trim() === '' || confirmPassword.trim() === '') && (
                <HelperText type="error" visible={true}>
                  Password is required
                </HelperText>
              )}
              {!isPasswordMatched && (
                <HelperText type="error" visible={!isPasswordMatched}>
                  {password.length < 8 ? 'Password should be at least 8 characters' : 'Passwords do not match'}
                </HelperText>
              )}
            </KeyboardAvoidingView>
          </View>
          <View style={styles.container}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleCreatePassword}
              disabled={password.trim() === ''}
            >
              Create
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    width: 200,
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default CreatePasswordPage;
