import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

const TrendsSection = ({ products, navigation }) => {

    const ProductCard = ({ product, navigation }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('product_info', { product })}
        style={{
          width: '48%',
          marginVertical: 14,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: "#eeeeee",
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <View
            style={{
              position: 'absolute',
              width: '20%',
              height: '24%',
              backgroundColor: "green",
              top: 0,
              left: 0,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
          </View>
          <Image
            source={product.image[0].image }
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: "#3a3a3a",
            fontWeight: '600',
            marginBottom: 2,
          }}
        >
          {product.name}
        </Text>
  
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 12,
            }}
          ></Text>
        </View>
  
        <Text>₦ {product.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {products?.map((product) => (
            <ProductCard product={product} navigation={navigation} key={product.id} />
        ))}
    </View>

  );
};

export default TrendsSection;
