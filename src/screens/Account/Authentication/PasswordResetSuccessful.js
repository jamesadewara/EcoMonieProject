import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView, StatusBar, StyleSheet, Image } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton, useTheme, Appbar } from 'react-native-paper';
import { Styles } from '../../../css/design';
import CustomAlert from '../../../Components/CustomAlert';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import ImageDialog from '../../../Components/MessageDialog';
import { useNavigation } from '@react-navigation/native';

// Get All Images for the Screen
const Thumbnail = {
  notice: require('../../../../assets/img/logo/success.png'),
};

const PasswordResetSuccessfulPage = ({route}) => {
  const email = route.params?.email;
  const password = route.params?.password;



  

  const [isLoading, setIsLoading] = useState(false);
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const [alertMessage, setAlertMessage] = useState('');

  const navigation = useNavigation();

  // Access the current theme from react-native-paper
  const theme = useTheme();

    // Function to log in the user
    const loginUser = async () => {
      setIsLoading(true);
      setAlertMessage("Login you in");
  
      try {
        const response = await login({ email, password });
        console.log(response)
        if (response.error && response.error.status === 401) {
          setDialogTitle('Login Failed');
          setDialogMessage(
            'User does not exist, try another email and password.'
          );
          setDialogStatus('error');
          setShowImageDialog(true);
        } else if (response.error && response.error.status === "FETCH_ERROR") {
          setDialogTitle('Login Error');
          setDialogMessage(
            'An error occurred while login, please try again later.'
          );
          setDialogStatus('error');
          setShowImageDialog(true);
        } else {
          // Save token and dispatch user data
          dispatch(setCredentials({ ...response }));
        }
      } catch (error) {
        setDialogTitle('Login Error');
        setDialogMessage(
          'An error occurred while login, please try again later.'
        );
        setDialogStatus('error');
        setShowImageDialog(true);
      }
  
      setIsLoading(false);
    };

  const handleLogin = () => {
    // Logic to navigate to the login screen
    loginUser()
    
  };

  return (
    <SafeAreaProvider>
      <StatusBar
          barStyle={theme.colors.status} // Use light text color for status bar
          backgroundColor="transparent" // Set status bar background color to transparent
          translucent // Make the status bar translucent
        />
      <CustomAlert visible={isLoading} message={alertMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="Confirmation" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <View style={styles.container}>
        <Image
            source={Thumbnail.notice}
            style={styles.image}
            resizeMode="contain"
        />
        <Text style={[styles.title,{color:theme.colors.color}]}>Password Reset Success</Text>
        <Text style={[styles.message,{color:theme.colors.color}]}>Your password has been successfully reset.</Text>
        <Button onPress={()=>handleLogin()} style={styles.nextButton}>
          Login
        </Button>
        </View>

      <ImageDialog status={dialogStatus} title={dialogTitle} message={dialogMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} visible={showImageDialog} onDismiss={() => setShowImageDialog(false)} />

    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  nextButton: {
    marginTop: 20,
    width: 200,
  },
});

export default PasswordResetSuccessfulPage;

