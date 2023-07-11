import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import {
  Button,
  TextInput,
  HelperText,
  Appbar,
  Snackbar,
  IconButton,
  useTheme,
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import CustomAvatar from '../../../../Components/CustomAvatar';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Styles } from '../../../../css/design';
import { MD2Colors } from 'react-native-paper'; // Import MD2Colors from react-native-paper

const EditProfilePage = ({ route, navigation }) => {
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

  const theme = useTheme(); // Access the current theme from react-native-paper

  const handleAvatarSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Permission to access the media library is required!'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Set the aspect ratio for cropping (square in this example)
      quality: 1, // Image quality (0 to 1)
    });

    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ crop: { originX: 0, originY: 0, width: result.width, height: result.height } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setProfilePicture(manipResult.uri);
    }
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
      paypalEmail.trim() === ''
    ) {
      // Display error message if any of the important fields are empty
      return;
    }

    // Handle form submission logic here
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
        <Appbar.Content title="MyProfile" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <ScrollView>
          <KeyboardAvoidingView
            style={[Styles.mb2, Styles.w3,Styles.container]}
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

              <TextInput
                label="Shipping Address"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                value={shippingAddress}
                onChangeText={(value) => setShippingAddress(value)}
                keyboardType="default"
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="map-marker" />}
              />
              {formSubmitted && shippingAddress.trim() === '' && (
                <HelperText type="error">Shipping Address is required</HelperText>
              )}

              <TextInput
                label="Billing Address"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                value={billingAddress}
                onChangeText={(value) => setBillingAddress(value)}
                keyboardType="default"
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="map-marker" />}
              />
              {formSubmitted && billingAddress.trim() === '' && (
                <HelperText type="error">Billing Address is required</HelperText>
              )}

              <TextInput
                label="PayPal Email"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                value={paypalEmail}
                onChangeText={(value) => setPaypalEmail(value)}
                keyboardType="email-address"
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />
              {formSubmitted && paypalEmail.trim() === '' && (
                <HelperText type="error">PayPal Email is required</HelperText>
              )}
              
              <Button
                mode="contained"
                buttonColor={MD2Colors.green500}
                onPress={handleSubmit}
                style={[Styles.w2,{alignSelf:'center'}]}
                loading={isLoading}
                disabled={!isConnected || isLoading}
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
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: MD2Colors.green500,
    borderRadius: 20,
  },
  cameraIcon: {
    margin: 4,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: MD2Colors.green500,
  },
});

export default EditProfilePage;
