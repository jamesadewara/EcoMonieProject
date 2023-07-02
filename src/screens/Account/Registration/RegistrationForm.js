import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Text, // Import Text component from react-native
} from 'react-native';
import {
  Button,
  TextInput,
  HelperText,
  Appbar,
  IconButton,
  useTheme,
  Checkbox,
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import CustomAvatar from '../../../widgets/customAvatar';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Styles } from '../../../css/design';
import { MD2Colors } from 'react-native-paper';

const RegistrationForm = ({ route, navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(route.params?.email || '');
  const [password, setPassword] = useState(route.params?.password || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [about, setAbout] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const theme = useTheme();

  const handleAvatarSelection = async () => {
    // ...
  };

  const handleSubmit = () => {
    setFormSubmitted(true);

    if (
      fullName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      phoneNumber.trim() === '' ||
      shippingAddress.trim() === '' ||
      billingAddress.trim() === '' ||
      paypalEmail.trim() === '' ||
      !acceptTerms
    ) {
      return;
    }

    console.log('Full Name:', fullName);
    console.log('Email Address:', email);
    console.log('Password:', password);
    console.log('Phone Number:', phoneNumber);
    console.log('Shipping Address:', shippingAddress);
    console.log('Billing Address:', billingAddress);
    console.log('PayPal Email:', paypalEmail);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Registration" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <ScrollView>
          <KeyboardAvoidingView
            style={[Styles.mb2, Styles.w3, Styles.container]}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <CustomAvatar size={150} avatar={profilePicture} email={email} />
                <View style={styles.cameraIconWrapper}>
                  <IconButton
                    icon="camera"
                    color="white"
                    style={styles.cameraIcon}
                    onPress={handleAvatarSelection}
                  />
                </View>
              </View>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                label="Full Name"
                value={fullName}
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                keyboardType="default"
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
                onChangeText={(value) => setFullName(value)}
              />
              {formSubmitted && fullName.trim() === '' && (
                <HelperText type="error">Full Name is required</HelperText>
              )}

              <TextInput
                label="Phone Number"
                value={phoneNumber}
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                onChangeText={(value) => setPhoneNumber(value)}
                keyboardType="phone-pad"
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="phone" />}
              />
              {formSubmitted && phoneNumber.trim() === '' && (
                <HelperText type="error">Phone Number is required</HelperText>
              )}

              {/* Rest of the code... */}

              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={acceptTerms ? 'checked' : 'unchecked'}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  color={theme.colors.primary}
                />
                <Text style={styles.checkboxLabel}>
                  Accept our terms and conditions
                </Text>
              </View>

              {/* Button to navigate to terms and conditions */}
              <Button
                mode="text"
                onPress={() => {
                  // Navigate to terms and conditions screen
                  navigation.navigate('TermsAndConditions');
                }}
              >
                View Terms and Conditions
              </Button>

              <Button
                mode="contained"
                buttonColor={MD2Colors.green500}
                onPress={handleSubmit}
                style={[Styles.w2, { alignSelf: 'center' }]}
                loading={isLoading}
                disabled={!isConnected || isLoading || !acceptTerms}
              >
                Submit
              </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  // ...
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  // ...
});

export default RegistrationForm;
