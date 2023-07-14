import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { Appbar, IconButton, TextInput, Button, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Swiper from 'react-native-swiper';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

import { selectCurrentToken } from '../../../../app/actions/authSlice';
import { useSelector } from 'react-redux';
import ConfirmationDialog from '../../../../Components/ConfirmationDialog';
import { useCreateProductMutation, useGetCategoryQuery } from '../../../../app/services/features/productServerApi';
import CustomAlert from '../../../../Components/CustomAlert';

import { Styles } from '../../../../css/design';
import { useGetUserQuery } from '../../../../app/services/registration/signupApiSlice';
import ImageDialog from '../../../../Components/MessageDialog';

const SwiperComponent = ({ imgs }) => {
  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={{
        backgroundColor: '#000',
        borderColor: '#000',
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
      }}
      activeDotColor="#FFF"
      activeDotStyle={{
        borderColor: '#000',
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
      }}
    >
      {imgs && imgs.length > 0
        ? imgs.map((data, index) => (
            <View style={styles.slide} key={index}>
              <Image source={{ uri: data.uri }} style={{ height: '100%', width: '100%' }} />
            </View>
          ))
        : null}
    </Swiper>
  );
};

const UploadProductPage = () => {
  const navigation = useNavigation();
  const [appendImages, setAppendImages] = useState([]);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [swiperKey, setSwiperKey] = useState(0);
  const [trashName, setTrashName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [category, setCategory] = useState('');

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createProduct] = useCreateProductMutation();

  const accessToken = useSelector(selectCurrentToken);
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories, error: errorCategories } = useGetCategoryQuery({ accessToken });
  const { data: userInfo = [], isLoading: isLoadingUser, isError: isErrorUser, refetch: userRefetch } = useGetUserQuery({ accessToken });
  const theme = useTheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setAppendImages([]); // Reset appendImages to an empty array when the component mounts
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleCategorySelect = (category) => {
    // Update the selected categories state
    setSelectedCategories((prevSelectedCategories) => {
      const isSelected = prevSelectedCategories.includes(category);
      if (isSelected) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handleOpenCamera = async () => {
    if (appendImages.length >= 5) {
      setDialogTitle('Maximum Image Reached');
      setDialogMessage('You can only add up to 5 images.');
      setDialogStatus('error');
      setShowImageDialog(true);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Set the aspect ratio for cropping (square in this example)
      quality: 1, // Image quality (0 to 1)
    });

    if (!result.cancelled) {
      const isImageExists = appendImages.some((image) => image.uri === result.uri);
      if (!isImageExists) {
        const manipResult = await ImageManipulator.manipulateAsync(
          result.uri,
          [{ crop: { originX: 0, originY: 0, width: result.width, height: result.assets[0].height } }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        setAppendImages((prevImages) => [...prevImages, manipResult]);
        setSwiperKey((prevKey) => prevKey + 1); // Increment the key value
      }
    }
  };

  const handleRemoveImage = (index) => {
    setAppendImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleUpload = async () => {
    setIsLoading(true);
    setAlertMessage("Uploading...")
    if (appendImages.length === 0) {
      setDialogTitle('No Images');
      setDialogMessage('Please select at least one image.');
      setDialogStatus('error');
      setShowImageDialog(true);
      return;
    }
    console.log(category.id, 'kiop')
  
    const formData = new FormData();
    formData.append('seller', userInfo?.id);
    formData.append('title', trashName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category?.id);


    appendImages.forEach((file, index) => {
      formData.append(`images`, {
        uri: file.uri,
        name: `image_${index}.png`,
        type: 'image/png',
      });
    });
    

    console.log(formData, 'payload');

  
    try {
      const response = await createProduct(formData);

      //if the timeout reaches
      try{
        if (response.error.status == "AbortError" ) {
            setDialogTitle('Abort Error');
            setDialogMessage('Timeout reached. could not fetch resources try again.');
            setShowImageDialog(true);
        }
      }
      catch{}
 
      console.log(response);
      //go back
      navigation.goBack()
    } catch (error) {
      console.log(error)
        if (error.status === 'FETCH_ERROR') {
          setDialogTitle('Network Error');
          setDialogMessage('Please check your internet connection.');
          setDialogStatus('nointernet');
          setShowImageDialog(true);
        } else {
          setDialogTitle('Whoops!');
          setDialogMessage('Something went wrong, please try again later.');
          setDialogStatus('nointernet');
          setShowImageDialog(true);
        }
      }
      setIsLoading(false);
    }
  


  const handleUploadProduct = async () => {
    if (appendImages.length === 0) {
      setDialogTitle('No Images');
      setDialogMessage('Please select at least one image.');
      setDialogStatus('error');
      setShowImageDialog(true);
      return;
    }

    await handleUpload();
  };

  const chooseCateg = () => {
    setModalVisible(true);
  };

  const hideModalCateg = () => {
    setModalVisible(false);
  };

  const handleConnectionAlert = () => {
    setDialogTitle('Not Connected');
    setDialogMessage('You are currently not connected to the internet. Please check your internet connection and try again.');
    setDialogStatus('nointernet');
    setShowImageDialog(true);
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} iconColor={theme.colors.color} />
        <Appbar.Content title="Upload Trash" titleStyle={{ color: theme.colors.color }} />
      </Appbar.Header>

      <ConfirmationDialog
        visible={modalVisible}
        onDismiss={closeModal}
        categories={categories}
        setValue={setCategory}
        selectedCategories={selectedCategories}
        onSelectCategory={handleCategorySelect}
      />
      <CustomAlert visible={isLoading} message={alertMessage} backgroundColor={theme.colors.cardsdialogs} color={theme.colors.color} />
      <ScrollView style={{ backgroundColor: theme.colors.background }}>
        <View style={{ backgroundColor: theme.colors.cardsdialogs, height: 300, width: '90%', margin: 30, borderRadius: 50, alignSelf: 'center' }}>
          <View style={styles.container}>
            {appendImages.length > 0 && <SwiperComponent key={swiperKey} imgs={appendImages} />}
            {appendImages.length > 0 && (
              <IconButton
                icon="close"
                iconColor={theme.colors.background}
                style={[styles.removeButton, { backgroundColor: theme.colors.color }]}
                onPress={() => handleRemoveImage(currentIndx)}
              />
            )}
            <IconButton icon="camera" iconColor={theme.colors.background} style={[styles.iconButton, { backgroundColor: theme.colors.color }]} onPress={isConnected ? handleOpenCamera : handleConnectionAlert} />
          </View>
        </View>
        <View style={{ marginVertical: 30, alignSelf: 'center' }}>
          <KeyboardAvoidingView style={{ width: 310, margin: 20 }}>
            {/* Trash Name */}
            <TextInput
              label="Trash Name"
              mode="outlined"
              outlineColor={theme.colors.green500}
              selectionColor={theme.colors.green700}
              textColor={theme.colors.color}
              style={[Styles.mb2]}
              placeholder="Trash Name*"
              value={trashName}
              keyboardType="default"
              onChangeText={setTrashName}
            />

            {/* Category Type */}
            <TouchableOpacity onPress={chooseCateg} activeOpacity={0.8}>
              <TextInput
                label="Category"
                mode="outlined"
                outlineColor={theme.colors.green500}
                selectionColor={theme.colors.green700}
                textColor={theme.colors.color}
                style={[Styles.mb2]}
                placeholder="Category*"
                value={category?.name}
                keyboardType="default"
                onChangeText={setCategory}
                editable={false}
              />
            </TouchableOpacity>

            {/* Price */}
            <TextInput
              label="Price"
              mode="outlined"
              outlineColor={theme.colors.green500}
              selectionColor={theme.colors.green700}
              textColor={theme.colors.color}
              style={[Styles.mb2]}
              placeholder="Price NGN"
              value={price}
              keyboardType="decimal-pad"
              onChangeText={setPrice}
            />

            {/* Description */}
            <TextInput
              label="Description"
              mode="outlined"
              outlineColor={theme.colors.green500}
              selectionColor={theme.colors.green700}
              textColor={theme.colors.color}
              style={[Styles.mb2]}
              placeholder="Description*"
              value={description}
              multiline={true}
              onChangeText={setDescription}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={[styles.container, { marginBottom: 100 }]}>
          <Button mode="contained" style={{ width: 100, alignSelf: 'center' }} onPress={isConnected ? handleUploadProduct : handleConnectionAlert}>
            Submit
          </Button>
        </View>
      </ScrollView>

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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  iconButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
});

export default UploadProductPage;
