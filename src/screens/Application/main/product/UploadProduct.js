import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Appbar, IconButton, TextInput, Button, Snackbar } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Swiper from 'react-native-swiper';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

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
      {imgs?.map((data, index) => (
        <View style={styles.slide} key={index}>
          <Image source={{ uri: data.uri }} style={{ height: '100%', width: '100%' }} />
        </View>
      ))}
    </Swiper>
  );
};

const UploadProductPage = ({route}) => {
  const navigation = useNavigation();
  const productInfo = route.params?.productInfo;
  const [appendImages, setAppendImages] = useState(productInfo?.image || []);
  const [currentIndx, setCurrentIndx] = useState(0);
  const [swiperKey, setSwiperKey] = useState(0);
  const [trashName, setTrashName] = useState(productInfo?.name || "");
const [price, setPrice] = useState(productInfo?.price ? productInfo.price.toString() : "");
const [description, setDescription] = useState(productInfo?.description || "");
  const [isConnected, setIsConnected] = useState(true);

  console.log(productInfo.image)

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

  const handleOpenCamera = async () => {
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

  const handleUpload = () => {
    // Perform the action when the button is pressed
    console.log('Button pressed');
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Upload Trash" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView>
          <View style={{ backgroundColor: 'white', height: 300, width: '100%' }}>
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
            {/* Trash Name */}
            <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
              <TextInput
                label="Trash Name"
                mode="outlined"
                outlineColor="green"
                activeColor="green"
                placeholder="Trash Name*"
                value={trashName}
                keyboardType="default"
                onChangeText={setTrashName}
              />
            </KeyboardAvoidingView>
            {/* Price */}
            <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
              <TextInput
                label="Price"
                mode="outlined"
                outlineColor="green"
                activeColor="green"
                placeholder="Price*"
                value={price}
                keyboardType="decimal-pad"
                onChangeText={setPrice}
              />
            </KeyboardAvoidingView>
            {/* Description */}
            <KeyboardAvoidingView style={{ width: 260, margin: 20 }}>
              <TextInput
                label="Description"
                mode="outlined"
                outlineColor="green"
                activeColor="green"
                placeholder="Description*"
                value={description}
                multiline={true}
                onChangeText={setDescription}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={[styles.container, {marginBottom: 100}]}>
            <Button
              mode="contained"
              style={{ width: 100, alignSelf: 'center' }}
              onPress={handleUpload}
              disabled={!isConnected || trashName.trim() === '' || price.trim() === ''}
            >
              Next
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
      {!isConnected && (
        <Snackbar visible={!isConnected} onDismiss={() => {}}>
          No internet connection
        </Snackbar>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageSection: {
    flexDirection: 'row',
    height: 340,
    width: '100%',
    backgroundColor: 'red',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  iconButton: {
    alignSelf: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default UploadProductPage;
