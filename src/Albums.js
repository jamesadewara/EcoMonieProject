import { View } from "react-native";
import { useGetAlbumsQuery } from "./app/services/jsonServerApi";
import { useCreateAlbumMutation } from "./app/services/jsonServerApi";
import { Button, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";


export default function Albums() {
    const [page, setPage] = React.useState(1);
    const {
        data: albums = [],
        isLoading,
        isFetching,
        isError,
        error,
      } = useGetAlbumsQuery(page);
      const [createAlbum] = useCreateAlbumMutation();


      if (isLoading || isFetching) {
        return <Text style={{top: 150, textAlign: "center"}}>loading...</Text>;
      }
    
      if (isError) {
        console.log({ error });
        return <Text style={{top: 150, textAlign: "center"}}>{error.status}</Text>;
      }
      const productName = "Dustbin Village"
      const productPrice = 9090
      const description = "Here is my products sir abeg com buy am"
      const accessToken =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3OTAyNjMyLCJpYXQiOjE2ODcyOTc4MzIsImp0aSI6ImMyNTI4M2NlYmI0YjQ3MmRhNzNiYmFiY2Y3MTU3MDU1IiwidXNlcl9pZCI6MX0.xyr0waBKqyhmyxY4xszV-tnPMWetEyBrhazqCSeJNBU"

      
  function submitAlbum() {
    createAlbum({productName, productPrice, description, accessToken});

  }


    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    {albums?.map((album) => (
                        <View key={album.id}>
                            <Text>{album.id} - {album.productName}</Text>
                        </View>
                    ))}
                </View>
                <View>
        
                <Button mode="contained"
        disabled={page <= 1} 
        onPress={() => setPage((prev) => prev - 1)}
      >
        Prev
      </Button>
      <Button
        mode="contained-tonal"
        disabled={albums.length < 10}
        onPress={() => setPage((prev) => prev + 1)}
      >
        Next
      </Button>
      <Button mode="contained"
        onPress={() => submitAlbum()}>CLICK ME NOW</Button>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

