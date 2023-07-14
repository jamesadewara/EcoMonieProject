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

const ResetPasswordLinkSentPage = ({route}) => {
  const [email, setEmail] = useState(route.params?.email||'');

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      handleSkip()
      clearInterval(timer)

    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown, navigation]);

  const handleSkip = () => {
    navigation.replace('reset_password');
  };


  

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
        <Text style={[styles.title,{color:theme.colors.color}]}>Password Reset Link Sent</Text>
        <Text style={[styles.message,{color:theme.colors.color}]}>An email with instructions to reset your password has been sent to your registered email address.</Text>
        <Text style={[styles.subtitle,{color:theme.colors.color}]}>{countdown}</Text>
        <Button onPress={()=>handleSkip()} style={styles.nextButton}>
          Skip
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

export default ResetPasswordLinkSentPage;

