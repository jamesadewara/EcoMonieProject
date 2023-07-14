import { useNavigation } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { RadioButton, TouchableRipple, useTheme } from 'react-native-paper';

const ProductCard = ({
  id,
  source,
  name,
  price,
  description,
  date,
  color,
  imgColor,
  select,
  onRadioButtonClick,
  selectedProductIds,
}) => {
  const currentDateTime = new Date();
  const djangoDate = new Date(date);
  const isNew = djangoDate > currentDateTime;

  const [isChecked, setIsChecked] = useState(false);

  const handleRadioButtonClick = () => {
    setIsChecked(!isChecked);
    onRadioButtonClick(id); // Pass the ID of the product card to the parent component
  };


  useEffect(() => {
    setIsChecked(selectedProductIds.includes(id));
  }, [selectedProductIds, id]);
  
  useEffect(() => {
    if (selectedProductIds.length === 0) {
      setIsChecked(false);
    }
  }, [selectedProductIds]);



  return (
    <View>
      {select && (
        <View style={styles.radioButtonContainer}>
          <RadioButton
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={handleRadioButtonClick}
            color={color}
            uncheckedColor={color}
          />
        </View>
      )}

      <Image
        source={source}
        style={{
          width: '100%',
          height: '60%',
          borderRadius: 10,
          backgroundColor: imgColor,
        }}
      />
      <View style={styles.cardInfoContainer}>
        <Text style={[styles.cardTitle, { color }]} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
      </View>
      <Text style={[styles.cardDescription, { color }]} numberOfLines={2} ellipsizeMode="tail">
        {description}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={[styles.priceText, { color }]}>{price} NGN</Text>
      </View>
    </View>
  );
};
export const ProductList = ({ products, refreshing, handleRefresh, handleLongPress, isLongPress, setSelectedProductIds,selectedProductIds, setIsLongPress }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  

  const handleCategorySelect = () => {
    handleLongPress();
  };

  const handleRadioButtonClick = (productId) => {
    setSelectedProductIds((prevIds) => {
      if (prevIds.includes(productId)) {
        // Remove the productId if already selected
        return prevIds.filter((id) => id !== productId);
      } else {
        // Add the productId if not already selected
        return [...prevIds, productId];
      }
    });
  };
  


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} enabled={true} />
      }
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {products && products.length > 0 ? (
          products?.map((data) => (
            <TouchableRipple
              key={data.id}
              rippleColor="grey"
              onPress={() =>
                navigation.navigate('product_info', {
                  productInfo: data,
                })
              }
              onLongPress={handleCategorySelect}
              style={{
                marginTop: 30,
                backgroundColor: theme.colors.cardsdialogs,
                height: 230,
                width: 160,
                elevation: 2,
                borderRadius: 10,
                padding: 15,
                marginRight: 5,
                borderWidth: 1,
                borderColor: theme.colors.color, // Add white border color
              }}
            >
              <ProductCard
                key={data.id}
                id={data.id}
                source={{ uri: data?.images[0]?.image }}
                name={data.title}
                description={data.description}
                price={data.price}
                color={theme.colors.color}
                imgColor={theme.colors.appbar}
                select={isLongPress} // Set select prop based on long press state
                onRadioButtonClick={handleRadioButtonClick} // Pass the handleRadioButtonClick function
                selectedProductIds={selectedProductIds} // Pass the selected product IDs
              />
            </TouchableRipple>
          ))
        ) : (
          <Text style={styles.noProductsText}>
            {products ? 'No products available.' : 'Loading products...'}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const CategoryCard = ({ source, name, bg, fg, onPress }) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="grey"
      style={{
        borderRadius: 10,
        width: 230,
        height: 130,
        marginBottom: 40,
        overflow: 'hidden',
      }}
    >
      <ImageBackground source={source} style={styles.categoryCard}>
        <Text style={styles.categoryName}>{name}</Text>
      </ImageBackground>
    </TouchableRipple>
  );
};

export const CategoryList = ({ categoriesData, handleFilterCateg }) => {
  return (
    <ScrollView style={styles.categoryScrollView} horizontal showsHorizontalScrollIndicator={false}>
      {categoriesData?.map((category) => (
        <TouchableRipple
          onPress={() => handleFilterCateg(category.title)}
          rippleColor="grey"
          style={{
            borderRadius: 10,
            width: 230,
            height: 130,
            marginBottom: 40,
            overflow: 'hidden',
          }}
          key={category.id}
        >
          <CategoryCard
            bg={category.background_color}
            fg={category.foreground_color}
            source={{ uri: category.logo }}
            name={category.title}
            onPress={() => handleFilterCateg(category.title)}
          />
        </TouchableRipple>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newIndicator: {
    height: 4,
    width: 4,
    borderRadius: 4,
    backgroundColor: 'red',
    marginHorizontal: 4,
  },
  newText: {
    color: 'red',
    fontSize: 9,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 9,
    fontWeight: 'normal',
  },
  cardFooter: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    width: '100%',
  },
  priceText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  noProductsText: {
    textAlign: 'center',
    margin: 30,
  },
  categoryScrollView: {
    paddingHorizontal: 10,
  },
  categoryCard: {
    height: 130,
    width: 230,
    marginRight: 20,
    borderRadius: 10,
    marginBottom: 40,
    opacity: 0.7,
    padding: 12,
    marginTop: 20,
  },
  categoryName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  productCardContainer: {
    height: 'auto',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    position: 'relative',
  },
  radioButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
