import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

const CodeVerificationPage = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params?.email;
  const [verificationCode, setVerificationCode] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const { top: topInset } = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCodeVerification = async () => {
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
      return;
    }

    if (verificationCode.trim().length !== 5) {
      setFormSubmitted(true);
      return;
    }

    // Perform verification code validation and sign-up logic
    navigation.navigate('register', { email });
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Verify Code" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
          <View>
            <KeyboardAvoidingView style={{ alignSelf: "center", margin: 20 }}>
              <TextInput
                label="Verification Code"
                mode="outlined"
                placeholder="EM-XXXXX"
                keyboardType="numeric"
                value={verificationCode}
                onChangeText={setVerificationCode}
                style={{ width: 200 }}
                maxLength={5}
                left={<TextInput.Icon icon="lock" />} // Add the lock icon
              />
              {formSubmitted && verificationCode.trim().length !== 5 && (
                <HelperText type="error" visible={true}>
                  Verification code should be 5 digits
                </HelperText>
              )}
            </KeyboardAvoidingView>
          </View>
          <View style={styles.container}>
            <Button
              mode="contained"
              style={{ width: 100, alignSelf: 'center' }}
              onPress={handleCodeVerification}
              disabled={!isConnected || verificationCode.trim().length !== 5}
            >
              Verify
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
      {!isConnected && (
        <Snackbar visible={!isConnected} onDismiss={() => {}}>
          No internet connection
        </Snackbar>
      )}
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
});

export default CodeVerificationPage;
