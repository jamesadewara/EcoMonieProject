import React from 'react';
import { View, Image } from 'react-native';
import { Button, Dialog, Paragraph } from 'react-native-paper';

// Get All Images for the Screen
const Thumbnail = {
  email_logo: require('../../assets/img/logo/email.png'),
  error_logo: require('../../assets/img/logo/error.png'),
  success_logo: require('../../assets/img/logo/success.png'),
  nointernet_logo: require('../../assets/img/logo/nointernet.png'),
};

const ImageDialog = ({ visible, onDismiss, backgroundColor, color, title, message, status }) => {
  const getImageSource = () => {
    if (status === 'email') {
      return Thumbnail.email_logo;
    } else if (status === 'error') {
      return Thumbnail.error_logo;
    } else if (status === 'success') {
      return Thumbnail.success_logo;
    } else if (status === 'nointernet') {
      return Thumbnail.nointernet_logo;
    }
    return null;
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss} style={{ backgroundColor, borderRadius: 5, borderColor: color, borderWidth: 2 }}>
      <Dialog.Title style={{ color, textAlign: 'center' }}>{title}</Dialog.Title>
      <Dialog.Content>
        <View style={{ alignItems: 'center' }}>
          {status && <Image source={getImageSource()} style={{ width: 100, height: 100 }} />}
        </View>
        <Paragraph style={{ color, textAlign: 'center' }}>{message}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ImageDialog;
