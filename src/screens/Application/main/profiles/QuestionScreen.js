import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Button, Text, Appbar, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../../../app/services/registration/signupApiSlice';
import { selectCurrentToken } from '../../../../app/actions/authSlice';
import NetInfo from '@react-native-community/netinfo';
import ImageDialog from '../../../../Components/MessageDialog';

// Get All Images for the Screen
const Thumbnail = {
  question: require('../../../../../assets/img/anime/question-1.png'),
};

const QuestionScreen = () => {
  const [isBuyer, setIsBuyer] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const accessToken = useSelector(selectCurrentToken);
  // Query for getting user info
  const { data: userInfo, isLoading, isError, refetch } = useGetUserQuery({ accessToken });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setDialogTitle('No Internet Connection');
        setDialogMessage('Please check your internet connection.');
        setDialogStatus('nointernet');
        setShowImageDialog(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = () => {
    setIsBuyer(!isBuyer);
  };

  const handleNext = () => {
    if (!isBuyer) {
      navigation.navigate('register_seller');
    } else {
      navigation.navigate('register_buyer');
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.Content title="" titleStyle={{ color: theme.colors.color }} />
        <Appbar.Action icon="close" iconColor={theme.colors.color} onPress={() => navigation.navigate('main')} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={[styles.welcometext, { color: theme.colors.color }]} numberOfLines={1}
        ellipsizeMode="tail">
          Hi {userInfo?.first_name} {userInfo?.last_name}
        </Text>
        <Image source={Thumbnail.question} style={styles.image} />
        <Text style={[styles.question, { color: theme.colors.color }]}>
          Do you want to be a buyer or a seller?
        </Text>
        <Button
          mode={isBuyer ? 'contained' : 'outlined'}
          onPress={handleToggle}
          style={styles.button}
        >
          Buyer
        </Button>
        <Button
          mode={isBuyer ? 'outlined' : 'contained'}
          onPress={handleToggle}
          style={styles.button}
        >
          Seller
        </Button>
        <Button onPress={handleNext} style={styles.nextButton} disabled={!isConnected} >
          Next
        </Button>
      </View>
      <ImageDialog
        status={dialogStatus}
        title={dialogTitle}
        message={dialogMessage}
        backgroundColor={theme.colors.cardsdialogs}
        color={theme.colors.color}
        visible={showImageDialog}
        onDismiss={() => setShowImageDialog(false)}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcometext: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginBottom: 10,
    width: 200,
  },
  nextButton: {
    marginTop: 20,
    width: 200,
  },
});

export default QuestionScreen;
