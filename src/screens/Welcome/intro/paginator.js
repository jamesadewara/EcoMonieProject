import React, { useRef } from 'react';
import { View, Animated, StyleSheet, useWindowDimensions } from 'react-native';

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        // Define the input range for interpolation
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        // Interpolate the dot width based on the scrollX value
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        // Interpolate the dot opacity based on the scrollX value
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ececec",
    marginHorizontal: 8,
  },
});
