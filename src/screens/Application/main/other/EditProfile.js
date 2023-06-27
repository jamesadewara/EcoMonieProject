import React, { useState } from 'react';
import { View,  ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, Button, TextInput, HelperText, IconButton, Appbar, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../../../widgets/customAlert';
import { Styles } from '../../../../css/design';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomAvatar from '../../../../widgets/customAvatar';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator } from 'expo-image-manipulator';



export default function EditProfilePage({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(route.params?.email);
  const [username, setUsername] = useState('');
  const [businessType, setBusinessType] = useState('Seller');
  const [about, setAbout] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState(null); // Assuming the avatar is stored as an image URI
  const [isLoading, setIsLoading ] = useState(false)

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
        email,
        username,
        about,
        contact_no,
        location,
        address,
        avatar,
      };
      console.log('opow Adewa')

      Alert.alert('Update Successful', 'User details have been updated successfully!');
    } catch (error) {
      console.log(error)
      // Handle error
      Alert.alert('Update Failed', 'An error occurred during user update.');
    }
  };


  const handleAvatarSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Set the aspect ratio for cropping (square in this example)
      quality: 1, // Image quality (0 to 1)
    });
  
    if (!result.canceled) {
      // Crop the image using Expo's ImageManipulator
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ crop: { originX: 0, originY: 0, width: result.width, height: result.height } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      console.log(manipResult)
      //setAvatar(manipResult.uri);

    }
  };
  

  return (
    <SafeAreaProvider>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Edit Profile" />
        </Appbar.Header>
      <SafeAreaView>
        <CustomAlert visible={isLoading} message="Loading..." />
        <ScrollView>
          <View style={{ flex: 1 }}>
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
                  <CustomAvatar size={100} avatar={{ uri: avatar }} email={email} />
                  
                </View>
                <Button title="Select Image" mode="contained" style={{backgroundColor: 'green', marginTop: 30}} onPress={handleAvatarSelection}>Edit Profile </Button>
          
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

              <Button mode="contained" style={{ width: 260, backgroundColor: 'green', marginBottom: 100 }} onPress={handleUpdateUser}>
                Save
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
