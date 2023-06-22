import React, { useState } from 'react';
import { View, ImageBackground, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton, Avatar, MD2Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useUpdateUserMutation } from '../../app/services/authentication/registerServerApi';
import { setUser } from '../../app/actions/userSlice';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomAlert from '../../widgets/customAlert';
import { Styles } from '../../css/design';
import { useToken } from '../../config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Thumbnail = {
  icon: require('../../../assets/icon.png'),
  intro_wallpaper: require('../../../assets/img/wallpaper/entrance.jpeg'),
};

export default function EditProfilePage({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const accessToken = useToken();
  const [email, setEmail] = useState(route.params?.email);
  const [username, setUsername] = useState('');
  const [businessType, setBusinessType] = useState('Seller');
  const [about, setAbout] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState(null); // Assuming the avatar is stored as an image URI

  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();
  console.log('ARE  SURE', accessToken)
  const handleUpdateUser = async () => {
    // Check if the username field is empty
    if (username.trim() === '') {
      Alert.alert('Username is required', 'Please enter a username.');
      return;
    }

    try {
      let contact_no = contactNo;
      let type_of_business = businessType;
      const updatePayload = {
        accessToken,
        email,
        username,
        about,
        contact_no,
        location,
        address,
        avatar,
      };
      console.log('opow Adewa')

      console.log('ACCESS TOKEN', updatePayload)
      const response = await updateUser(updatePayload).unwrap();
      console.log(response, accessToken);

      //add the userinfo
      dispatch(setUser(response))
      Alert.alert('Update Successful', 'User details have been updated successfully!');
    } catch (error) {
      console.log(error)
      // Handle error
      Alert.alert('Update Failed', 'An error occurred during user update.');
    }
  };

  const handleAvatarSelection = () => {
    // Implement avatar selection logic here
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{backgroundColor: MD2Colors.green700}}>
        <CustomAlert visible={isLoading} message="Loading..." />
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View>
              <IconButton  icon={() => <Icon name="arrow-left" size={24} color="white" />} style={{ paddingTop: 20 }} color="white" size={35} onPress={() => navigation.navigate('entrance')} />
            </View>

            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'white',
                borderTopRadius: 130,
                paddingTop: 100,
                paddingBottom: 45,
              }}
            >
                {/* Avatar */} 
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  {avatar === null ? (
                    <Avatar.Text label={email.charAt(0).toUpperCase()} size={150} />
                  ) : (
                    <Avatar.Image source={avatar} size={150} />
                  )}
                </View>
          
              <Text style={{ fontSize: 40, color: 'green', fontWeight: 'bold' }}>Edit Your Profile</Text>
              <Text style={{ fontSize: 19, color: 'green', fontWeight: 'bold', marginBottom: 20 }}>Update your profile information</Text>

              <View style={{ marginVertical: 30 }}>
                {/* Email */}
                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                  <TextInput
                    label="Email"
                    mode="outlined"
                    outlineColor="green"
                    activeColor="green"
                    placeholder="Email*"
                    value={email}
                    onChangeText={setEmail}
                    disabled
                  />
                </KeyboardAvoidingView>

                {/* Username */}
                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                  <TextInput
                    label="Username"
                    mode="outlined"
                    outlineColor="green"
                    activeColor="green"
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                  />
                </KeyboardAvoidingView>

                {/* Business Type */}
                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                  <TextInput
                    label="Business Type"
                    mode="outlined"
                    outlineColor="green"
                    activeColor="green"
                    placeholder="Business Type"
                    value={businessType}
                    onChangeText={setBusinessType}
                    disabled
                  />
                </KeyboardAvoidingView>

                {/* About */}
                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                  <TextInput
                    label="About"
                    mode="outlined"
                    outlineColor="green"
                    activeColor="green"
                    placeholder="About"
                    value={about}
                    multiline={true}
                    onChangeText={setAbout}
                  />
                </KeyboardAvoidingView>

                {/* Contact No */}
                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                  <TextInput
                    label="Contact No"
                    mode="outlined"
                    outlineColor="green"
                    activeColor="green"
                    placeholder="Contact No"
                    value={contactNo}
                    onChangeText={setContactNo}
                    keyboardType='phone-pad'
                  />
                </KeyboardAvoidingView>

                {/* Location */}
                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                  <TextInput
                    label="Location"
                    mode="outlined"
                    outlineColor="green"
                    activeColor="green"
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                    keyboardType='default'
                  />
                </KeyboardAvoidingView>

                {/* Address */}
                <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
                  <TextInput
                    label="Address"
                    mode="outlined"
                    outlineColor="green"
                    activeColor="green"
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                  />
                </KeyboardAvoidingView>

              </View>

              <Button mode="contained" style={{ width: 260, backgroundColor: 'green' }} onPress={handleUpdateUser}>
                Save
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
