import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, KeyboardAvoidingView, Text, TouchableOpacity, Alert } from 'react-native';
import { Appbar, IconButton, TextInput, Button, Snackbar, Portal, Provider, Modal,useTheme, MD2Colors } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Swiper from 'react-native-swiper';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

import { useGetCategoryQuery } from '../../../../app/services/features/productsCategoryServerApi';
import { selectCurrentToken } from '../../../../app/actions/authSlice';
import { useSelector } from 'react-redux';
import ModalWithList from '../../../../Components/ModalWithList';
import { useCreateProductMutation, useCreateProductImgMutation, useGetProductsQuery } from '../../../../app/services/features/productServerApi';
import CustomAlert from '../../../../widgets/customAlert';
import { Styles } from '../../../../css/design';

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
      {imgs && imgs.length > 0 ? (
        imgs.map((data, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{ uri: data.uri }} style={{ height: '100%', width: '100%' }} />
          </View>
        ))
      ) : null}
    </Swiper>
  );
};

const UploadProductPage = ({ route }) => {
  const navigation = useNavigation();
  const [appendImages, setAppendImages] = useState([]);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [swiperKey, setSwiperKey] = useState(0);
  const [trashName, setTrashName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [uploadedImgList, setUploadedImgList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const [createProductImg] = useCreateProductImgMutation();

  const accessToken = useSelector(selectCurrentToken);
  const { data: categories, isLoadingCategories, isErrorCategories, errorCategories } = useGetCategoryQuery({ accessToken });
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
      Alert.alert('Maximum Image Reached', 'You can only add up to 5 images.');
      return;
    }

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

    setCurrentIndx((prevIndex) => {
      if (prevIndex > 0 && prevIndex === index) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleImgUpload = async () => {
    const formData = new FormData();

    appendImages.forEach((image, index) => {
      const file = {
        uri: image.uri,
        name: `image_${index + 1}.png`,
        type: 'image/png',
      };

      formData.append(`image_${index + 1}`, file);
    });

    try {
      const img = formData;
      const payload = { img, accessToken };
      const uplProImgReq = await createProductImg(payload);
      return uplProImgReq.data.image_ids
      setUploadedImgList(uplProImgReq.data.image_ids);
      console.log('uploaded imgs successfully');
    } catch (error) {
      // Handle error
      return []

      setUploadedImgList([]);
    }
  };

  const handleUpload = async () => {
    // Perform the action when the button is pressed
    const img_list= await handleImgUpload();
    console.log(img_list, 'cross check it')
    try {
      const user = 1;
      const name = trashName;
      const ordered = false;
      const payload = {
        user,
        name,
        price,
        image: img_list,
        category: category.id,
        description,
        accessToken,
        ordered,
      };
      const uplProReq = await createProduct(payload);
      console.log(uplProReq, 'test');
      console.log(payload, 'test');
      Alert.alert('Upload Successful', 'Your upload was successful.');
      //if no errors
      console.log(uploadedImgList);
      navigation.goBack()

    } catch (error) {
      if (error.status === 'FETCH_ERROR') {
        Alert.alert('Network Error', 'Please check your internet connection.');
      } else {
        Alert.alert('Upload Error', 'Something went wrong, please try again later.');
      }
      
    }
  };

  const handleUploadProduct = async () => {
    if (appendImages.length === 0) {
      Alert.alert('No Images', 'Please select at least one image.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    await handleUpload();
    setIsLoading(false);
  };

  const chooseCateg = () => {
    setModalVisible(true);
  };

  const hideModalCateg = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} iconColor={theme.colors.color} />
        <Appbar.Content
          title="Upload Trash"
          titleStyle={{ color: theme.colors.color }}
        />
      </Appbar.Header>

      <Portal>
        <ModalWithList
          backgroundColor={theme.colors.cardsdiaogs}
          color={theme.colors.color}
          visible={modalVisible}
          onDismiss={closeModal}
          categories={categories}
          setValue={setCategory}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
        />
      </Portal>
      <CustomAlert visible={isLoading} message="Loading..." />
      <ScrollView style={{backgroundColor: theme.colors.background}}>
        <View style={{ backgroundColor: theme.colors.cardsdiaogs, height: 300, width: '90%', margin: 30, borderRadius: 50, alignSelf: 'center' }}>
          <View style={styles.container}>
            {appendImages.length > 0 && <SwiperComponent key={swiperKey} imgs={appendImages} />}
            {appendImages.length > 0 && (
              <IconButton
                icon="close"
                iconColor="#aaa"
                style={styles.removeButton}
                onPress={() => handleRemoveImage(currentIndx)}
              />
            )}
            <IconButton icon="camera" style={styles.iconButton} onPress={handleOpenCamera} />
          </View>
        </View>
        <View style={{ marginVertical: 30, alignSelf: 'center' }}>
          <KeyboardAvoidingView style={{ width: 310, margin: 20 }}>
            {/* Trash Name */}
            <TextInput
              label="Trash Name"
              mode="outlined"
              outlineColor={MD2Colors.green500}
              selectionColor={MD2Colors.green700}
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
                outlineColor={MD2Colors.green500}
              selectionColor={MD2Colors.green700}
              textColor={theme.colors.color}
              style={[Styles.mb2]}
                placeholder="Category*"
                value={category.title}
                keyboardType="default"
                onChangeText={setCategory}
                editable={false}
              />
            </TouchableOpacity>

            {/* Price */}
            <TextInput
              label="Price"
              mode="outlined"
              outlineColor={MD2Colors.green500}
              selectionColor={MD2Colors.green700}
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
              outlineColor={MD2Colors.green500}
              selectionColor={MD2Colors.green700}
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
          <Button
            mode="contained"
            style={{ width: 100, alignSelf: 'center' }}
            onPress={handleUploadProduct}
            disabled={!isConnected || trashName.trim() === '' || price.trim() === ''}
          >
            Next
          </Button>
        </View>
      </ScrollView>

      {!isConnected && (
        <Snackbar visible={!isConnected} onDismiss={() => {}}>
          No internet connection. Please check your network settings.
        </Snackbar>
      )}
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
