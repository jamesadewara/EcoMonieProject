import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  HelperText,
  useTheme,
  MD2Colors,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../../../css/design';
import CustomAlert from '../../../Components/CustomAlert';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import ImageDialog from '../../../Components/MessageDialog';

const ResetPasswordPage = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params?.email;
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const [alertMessage, setAlertMessage] = useState('');

  const [password, setPassword] = useState('');
  const [confrimPassword, setConfirmPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePasswordReset = async () => {
    // Handle password update logic here
    navigation.replace("password_reset_success", {email:email, password:password})
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
        <Appbar.Content title="Reset Password" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <ScrollView>
          <View>
            <KeyboardAvoidingView style={[Styles.m2, StyleSheet.w3]}>
              {/* New Password Input */}
              <TextInput
                label="New Password"
                mode="outlined"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              {formSubmitted && password.trim() === '' && (
                <HelperText type="error" visible={password.trim() === ''}>
                  Password is required
                </HelperText>
              )}

              {/* Confirm Password Input */}
              <TextInput
                label="Confirm Password"
                mode="outlined"
                outlineColor={MD2Colors.green500}
                selectionColor={MD2Colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              {formSubmitted && password.trim() === '' && (
                <HelperText type="error" visible={password.trim() === ''}>
                  Password is required
                </HelperText>
              )}
            </KeyboardAvoidingView>
          </View>

          {/* Submit Button */}
          <View style={styles.container}>
            <Button
              mode="contained"
              buttonColor={MD2Colors.green500}
              style={{ width: 100, alignSelf: 'center' }}
              onPress={handlePasswordReset}
            >
              Submit
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ImageDialog status={dialogStatus} title={dialogTitle} message={dialogMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} visible={showImageDialog} onDismiss={() => setShowImageDialog(false)} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ResetPasswordPage;
