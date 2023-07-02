import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, BackHandler } from 'react-native';

const CustomAlert = ({ visible, message }) => {
  const [colorChanged, setColorChanged] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (visible) {
      timeoutId = setTimeout(() => {
        visible = false;
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [visible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackButton = () => {
    if (visible && !colorChanged) {
      setColorChanged(true);
      setTimeout(() => {
        visible = false; // Cancel the operation by setting visible to false
      }, 3000);
      return true;
    }
    return false;
  };

  return (
    <Modal visible={visible} transparent={true}  animationType="fade">
      <View style={styles.container}>
        <View style={[styles.alertBox,]}>
          <ActivityIndicator animate={true} size={90} color={colorChanged ? 'red' : 'green'} />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    // backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: "transparent"
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomAlert;
