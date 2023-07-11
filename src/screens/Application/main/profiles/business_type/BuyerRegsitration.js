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
import { useGetUserQuery, useRegisterasbuyerMutation } from '../../../../../app/services/registration/signupApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../../../app/actions/authSlice';
import { useGetSettingsQuery } from '../../../../../app/services/features/settingsServerApi';
import CustomAlert from '../../../../../Components/CustomAlert';
import ImageDialog from '../../../../../Components/MessageDialog';



const BuyerRegistrationForm = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [about, setAbout] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const [registerasbuyer] = useRegisterasbuyerMutation();
  const accessToken = useSelector(selectCurrentToken)
  // Query for getting user info
  const { data: userInfo, isLoadingUser, isError, refetch } = useGetUserQuery({ accessToken });
  // Query for getting settings info
  const { data: settings, isLoadingSettings, isErrorSettings, refetch:refetchSetiings } = useGetUserQuery({ accessToken });

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
      setProfilePicture(manipResult.uri);
    }
  };

  
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const handleBuyerRegistration = async () => {
    if (!profilePicture) {
      // Handle the case where no profile picture is selected
      Alert.alert('Profile Picture Required', 'Please select a profile picture.');
      return;
    }
  
    const formData = new FormData();
    formData.append('user', userInfo.id);
    formData.append('profile_pic', {
      uri: profilePicture,
      name: 'profile_picture.png',
      type: 'image/png',
    });
    formData.append('address', address);
    formData.append('phone_number', phoneNumber);
    formData.append('about', about);
  
    try {
      setIsLoading(true);
      setAlertMessage('Creating your profile');
      const response = await registerasbuyer({
        accessToken,
        formData, // Pass the FormData object directly
      });
  
      // Handle successful registration response here
      navigation.replace('hurray');
    } catch (error) {
      setAlertMessage('Rolling back changes');
      console.log('Buyer registration failed:', error);
      // Handle registration failure here
      setDialogTitle('Profile Update Failed');
      setDialogMessage(error.message);
      setDialogStatus('error');
      setShowImageDialog(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = () => {
    
    if (!address || !phoneNumber || !acceptTerms) {
      return;
    }

    handleBuyerRegistration()
  };

  return (
    <SafeAreaProvider>
      <CustomAlert visible={isLoading} message={alertMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />
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
              <CustomAvatar size={150} avatar={profilePicture} email={userInfo?.email} />
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
                label="Address"
                value={address}
                placeholder="Address"
                onChangeText={text => setAddress(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="default"
                mode="outlined"
                left={<TextInput.Icon icon="map-marker" />}
              />
              {!address && <HelperText type="error">Please enter your address</HelperText>}
              <TextInput
                label="Phone Number"
                value={phoneNumber}
                placeholder="Phone Number"
                onChangeText={text => setPhoneNumber(text)}
                outlineColor={MD2Colors.green500}
                selectionColor={theme.colors.color}
                textColor={theme.colors.color}
                keyboardType="phone-pad"
                mode="outlined"
                left={<TextInput.Icon icon="phone" />}
              />
              {!phoneNumber && <HelperText type="error">Please enter your phone number</HelperText>}
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
                  navigation.navigate('terms', { page: "Terms & Conditions", link: settings?.terms_and_service });
                }}
              >
                View Terms and Conditions
              </Button>
              <Button
                mode="contained"
                onPress={()=>handleSubmit()}
                style={[styles.submitButton, { backgroundColor: MD2Colors.green500 }]}
                loading={isLoading}
                disabled={!isConnected || isLoading || !acceptTerms}
              >
                Submit
              </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <ImageDialog status={dialogStatus} title={dialogTitle} message={dialogMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} visible={showImageDialog} onDismiss={() => setShowImageDialog(false)} />
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

export default BuyerRegistrationForm;
