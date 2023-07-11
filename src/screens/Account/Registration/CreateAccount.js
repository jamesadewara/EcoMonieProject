import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  HelperText,
  useTheme,
  MD2Colors,
  IconButton
} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../app/actions/authSlice';

import { Styles } from '../../../css/design';
import CustomAlert from '../../../Components/CustomAlert';
import ImageDialog from '../../../Components/MessageDialog';
import { useSignupMutation } from '../../../app/services/registration/signupApiSlice';
import { useLoginMutation } from '../../../app/services/authentication/authApiSlice';
import CustomAvatar from '../../../Components/CustomAvatar';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const CreateAccountPage = ({ route }) => {
  const navigation = useNavigation();
  const email = 'jamesadewara3@gmail.com'//route.params?.email;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [signup] = useSignupMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const { top: topInset } = useSafeAreaInsets();
  const [isConnected, setIsConnected] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
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

  const loginUser = async () => {
    setIsLoading(true);
    setAlertMessage('Logging you in...');
    try {
      const response = await login({ email, password });
      if (response.error && response.error.status === 401) {
        setDialogTitle('Login Failed');
        setDialogMessage('User does not exist. Please try another email and password.');
        setDialogStatus('error');
        setShowImageDialog(true);
      } else if (response.error && response.error.status === 'FETCH_ERROR') {
        setDialogTitle('Login Error');
        setDialogMessage('An error occurred while logging in. Please try again later.');
        setDialogStatus('error');
        setShowImageDialog(true);
      } else {
        // Save token and dispatch user data
        dispatch(setCredentials({ ...response, email }));
      }
    } catch (error) {
      setDialogTitle('Login Error');
      setDialogMessage('An error occurred while logging in. Please try again later.');
      setDialogStatus('error');
      setShowImageDialog(true);
    }
    setIsLoading(false);
  };

  const signupUser = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('profile_pic', {
      uri: profilePicture,
      name: `${email}.png`,
      type: 'image/png',
    });
    formData.append('password', password);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    
    setIsLoading(true);
    setAlertMessage('Signing you up...');
    try {
      const response = await signup(formData);
      if (response.error && response.error.status === 400) {
        navigation.navigate('login');
      } else {
        // Log the user in
        loginUser();
      }
    } catch (error) {
      setDialogTitle('Signup Failed');
      setDialogMessage('An error occurred while signing up. Please try again.');
      setDialogStatus('error');
      setShowImageDialog(true);
    }
    setIsLoading(false);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUser = async () => {
    if (!isConnected) {
      return;
    }

    if (email.trim() === '') {
      Alert.alert('Invalid Email', 'Email is required.');
      navigation.navigate('verify_email');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      navigation.navigate('verify_email');
      return;
    }

    if (password.trim() === '' || confirmPassword.trim() === '') {
      setFormSubmitted(true);
      setIsPasswordMatched(true);
      return;
    }

    if (password.length < 8 || password !== confirmPassword) {
      setIsPasswordMatched(false);
      return;
    }

    if (email.toLowerCase().includes(password.toLowerCase())) {
      Alert.alert('Invalid Password', 'Password cannot be too similar to the email.');
      return;
    }

    if (firstName.trim() === '' || lastName.trim() === '') {
Alert.alert('Invalid Name', 'Please enter your first and last name.');
      return;
    }

    if (!profilePicture) {
      // Handle the case where no profile picture is selected
      Alert.alert('Profile Picture Required', 'Please select a profile picture.');
      return;
    }

    setIsPasswordMatched(true);
    signupUser();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <CustomAlert visible={isLoading} message={alertMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />
      <StatusBar barStyle={theme.colors.status} />
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Register" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: topInset }]}>
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
        <View>
          <KeyboardAvoidingView style={[Styles.m2, Styles.w3]}>
            {/* Password Input */}
            <View style={[Styles.mb2]}>
              <TextInput
                label="Password"
                mode="outlined"
                placeholder="Enter Password"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={togglePasswordVisibility}
                  />
                }
              />
              {/* Password Error */}
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
            </View>

            {/* Confirm Password Input */}
            <View style={[Styles.mb2]}>
              <TextInput
                label="Confirm Password"
                mode="outlined"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={toggleConfirmPasswordVisibility}
                  />
                }
              />
            </View>

            {/* First Name Input */}
            <View style={[Styles.mb2]}>
              <TextInput
                label="First Name"
                mode="outlined"
                placeholder="Enter First Name"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            {/* LastName Input */}
            <View style={[Styles.mb2]}>
              <TextInput
                label="Last Name"
                mode="outlined"
                placeholder="Enter Last Name"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </KeyboardAvoidingView>
        </View>

        <View style={styles.container}>
          <Button
            loading={isLoading}
            mode="contained"
            style={{marginVertical:20}}
            color={theme.colors.green700}
            onPress={handleSignUser}
          >
            Signup
          </Button>
        </View>
      </ScrollView>
      <ImageDialog status={dialogStatus} title={dialogTitle} message={dialogMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} visible={showImageDialog} onDismiss={() => setShowImageDialog(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default CreateAccountPage;
