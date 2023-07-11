import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Text, Alert, Platform } from 'react-native';
import { Button, TextInput, HelperText, Appbar, IconButton, useTheme, Checkbox } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import CustomAvatar from '../../../../../Components/CustomAvatar';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SellerRegistrationForm = () => {
  const navigation = useNavigation();
  const [businessProfilePic, setBusinessProfilePic] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [about, setAbout] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setIsConnected(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ crop: { originX: 0, originY: 0, width: result.width, height: result.height } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setBusinessProfilePic(manipResult.uri);
    }
  };

  const handleSubmit = () => {
    if (!businessAddress || !businessPhoneNumber || !acceptTerms) {
      return;
    }

    console.log('Form submitted!');
    console.log('Business Profile Pic:', businessProfilePic);
    console.log('Company Name:', companyName);
    console.log('Business Address:', businessAddress);
    console.log('Business Phone Number:', businessPhoneNumber);
    console.log('About:', about);
    console.log('Paypal Email:', paypalEmail);
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction
          iconColor={theme.colors.color}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Profile" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
        <ScrollView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <CustomAvatar size={150} avatar={businessProfilePic} />
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
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.formContainer}>
              <TextInput
                label="Company Name"
                value={companyName}
                placeholder="Company Name"
                onChangeText={text => setCompanyName(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="default"
                mode="outlined"
                left={<TextInput.Icon icon="office-building" />}
              />
              {!companyName && <HelperText type="error">Please enter your company name</HelperText>}
              <TextInput
                label="Business Address"
                value={businessAddress}
                placeholder="Business Address"
                onChangeText={text => setBusinessAddress(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="default"
                mode="outlined"
                left={<TextInput.Icon icon="map-marker" />}
              />
              {!businessAddress && <HelperText type="error">Please enter your business address</HelperText>}
              <TextInput
                label="Business Phone Number"
                value={businessPhoneNumber}
                placeholder="Business Phone Number"
                onChangeText={text => setBusinessPhoneNumber(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="phone-pad"
                mode="outlined"
                left={<TextInput.Icon icon="phone" />}
              />
              {!businessPhoneNumber && <HelperText type="error">Please enter your business phone number</HelperText>}
              <TextInput
                label="Write about yourself"
                value={about}
                onChangeText={text => setAbout(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                keyboardType="default"
                multiline
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="comment-text" />}
              />
              <TextInput
                label="Paypal Email"
                value={paypalEmail}
                placeholder="Paypal Email"
                onChangeText={text => setPaypalEmail(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="email-address"
                mode="outlined"
                left={<TextInput.Icon icon="email" />}
              />
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={acceptTerms ? 'checked' : 'unchecked'}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  color={theme.colors.primary}
                />
                <Text style={[styles.checkboxLabel, { color: theme.colors.color }]}>
                  Accept our terms and conditions
                </Text>
              </View>
              <Button
                mode="text"
                onPress={() => {
                  // Navigate to terms and conditions screen
                  navigation.navigate('terms');
                }}
              >
                View Terms and Conditions
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={[styles.submitButton, { backgroundColor: MD2Colors.green500 }]}
                loading={isLoading}
                disabled={!isConnected || isLoading || !acceptTerms}
              >
                Submit
              </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
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
  input: {
    marginBottom: 12,
  },
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
  submitButton: {
    marginTop: 16,
    backgroundColor: MD2Colors.green500,
  },
});

export default SellerRegistrationForm;
