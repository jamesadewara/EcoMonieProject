import { View } from "react-native";
import { useCreateAlbumMutation } from "./app/services/jsonServerApi";
import { Button, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function NewAlbumForm() {
    const productName = "Dustbin Village"
    const productPrice = 9090
    const description = "Here is my products sir abeg com buy am"
  const [createAlbum, { isLoading }] = useCreateAlbumMutation();

  function submitAlbum() {
    createAlbum({productName, productPrice, description});

  }

  return (
    <SafeAreaProvider>
            <SafeAreaView>
            <Text>
                New Form
            </Text>
              
                <View>
        
                <Button mode="contained"
        onPress={() => submitAlbum()}
      >
        Prev
      </Button>
      <Text>
        {isLoading}
      </Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    
  );
}
