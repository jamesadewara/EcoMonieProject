import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Title, Subheading } from 'react-native-paper';


const ResetPasswordLinkSentPage = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigation.navigate('NextScreen');
    }
  }, [countdown, navigation]);

  const handleSkip = () => {
    navigation.navigate('NextScreen');
  };

  return (
    <View>
      <Title>Password Reset Link Sent</Title>
      <Subheading>
        An email with instructions to reset your password has been sent to your registered email address.
      </Subheading>
      <Text>Countdown: {countdown}</Text>
      <Button title="Skip" onPress={handleSkip} />
    </View>
  );
};

export default ResetPasswordLinkSentPage;
