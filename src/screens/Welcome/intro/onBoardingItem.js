import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      {/* Render the image */}
      <Image source={item.image} style={[styles.image, { width: 230, resizeMode: "contain" }]} />

      <View style={{ flex: 0.3 }}>
        {/* Render the title */}
        <Text style={styles.title}>{item.title}</Text>
        {/* Render the description */}
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    flex: 0.7,
    justifyContent: "center"
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "white",
    textAlign: "center"
  },
  description: {
    fontWeight: "300",
    color: "white",
    paddingHorizontal: 64,
    textAlign: "center"
  },
});
