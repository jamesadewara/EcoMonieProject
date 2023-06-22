import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, HelperText, Avatar, Appbar, Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../../../../context/authContext';
import { Styles } from '../../../../store/design';
import Refresher from '../../../../widgets/Refresher';
import { useSelector } from 'react-redux';

const Thumbnail = {
  icon: require('../../../../../assets/icon.png'),
  intro_wallpaper: require('../../../../../assets/img/wallpaper/entrance.jpeg'),
};

const BusinessTypePicker = ({ value, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (itemValue) => {
    onChange(itemValue);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedValue}>{value ? value : 'Select Business Type'}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect('buyer')}>
            <Text>Buyer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect('seller')}>
            <Text>Seller</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default function ProfilePage() {
  const navigation = useNavigation();
  const { } = useContext(AuthContext);
  const user = useSelector((state) => state.user.userInfo);
  const credentials = useSelector((state) => state.user.credentials);
  console.log("USER PROFILE", user.email)

  // State variables
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [businessType, setBusinessType] = useState(user.type_of_business);
  const [contactNo, setContactNo] = useState(user.contact_no);
  const [location, setLocation] = useState(user.location);
  const [address, setAddress] = useState(user.address);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Error variables
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [businessTypeError, setBusinessTypeError] = useState('');
  const [contactNoError, setContactNoError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleUpdateAccount = () => {
    console.log('Save button clicked');
    setFormSubmitted(true);

    // Validation logic here

    // Perform account update logic here
  };

  const renderUserPicture = () => {
    if (user.avatar) {
      return <Avatar.Image source={{ uri: user.avatar }} size={120} />;
    } else {
      return <Avatar.Text size={120} label={user.email.charAt(0).toUpperCase()} />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate("home")} />
          <Appbar.Content title="Profile" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
            <Refresher>
              <View style={styles.userPictureContainer}>
                {renderUserPicture()}
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  label="Username"
                  value={username}
                  onChangeText={setUsername}
                  error={usernameError !== ''}
                  style={Styles.textInput}
                />
                <HelperText type="error" visible={usernameError !== ''}>
                  {usernameError}
                </HelperText>

                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  error={emailError !== ''}
                  style={Styles.textInput}
                />
                <HelperText type="error" visible={emailError !== ''}>
                  {emailError}
                </HelperText>

                <BusinessTypePicker value={businessType} onChange={setBusinessType} />
                <HelperText type="error" visible={businessTypeError !== ''}>
                  {businessTypeError}
                </HelperText>

                <TextInput
                  label="Contact No"
                  value={contactNo}
                  onChangeText={setContactNo}
                  error={contactNoError !== ''}
                  style={Styles.textInput}
                />
                <HelperText type="error" visible={contactNoError !== ''}>
                  {contactNoError}
                </HelperText>

                <TextInput
                  label="Location"
                  value={location}
                  onChangeText={setLocation}
                  error={locationError !== ''}
                  style={Styles.textInput}
                />
                <HelperText type="error" visible={locationError !== ''}>
                  {locationError}
                </HelperText>

                <TextInput
                  label="Address"
                  value={address}
                  onChangeText={setAddress}
                  error={addressError !== ''}
                  style={Styles.textInput}
                />
                <HelperText type="error" visible={addressError !== ''}>
                  {addressError}
                </HelperText>
              </View>
            </Refresher>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleUpdateAccount} style={Styles.button}>
            Save
          </Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userPictureContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  selectedValue: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});
// import * as React from "react";
// import { StyleSheet, View } from "react-native";
// import { Image } from "expo-image";

// const EditProfile = () => {
//   return (
//     <View style={styles.editprofile}>
//       <View style={styles.editprofileChild} />
//       <View style={styles.editprofileItem} />
//       <Image
//         style={styles.editprofileInner}
//         contentFit="cover"
//         source={require("../assets/group-2.png")}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   editprofileChild: {
//     backgroundColor: "#00a743",
//     height: 200,
//     zIndex: 0,
//     alignSelf: "stretch",
//   },
//   editprofileItem: {
//     backgroundColor: "#fff",
//     zIndex: 1,
//     marginTop: -30,
//     alignSelf: "stretch",
//     flex: 1,
//   },
//   editprofileInner: {
//     position: "absolute",
//     top: 77,
//     left: 95,
//     width: 186,
//     height: 186,
//     zIndex: 2,
//   },
//   editprofile: {
//     backgroundColor: "#f6f6f6",
//     width: "100%",
//     height: 844,
//     overflow: "hidden",
//     justifyContent: "flex-end",
//     flex: 1,
//   },
// });

// export default EditProfile;
