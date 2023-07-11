import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, RefreshControl, ImageBackground } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ProductCard = ({ onPress, source, name, price, description, date, width, backgroundColor, color }) => {
  const currentDateTime = new Date();
  const djangoDate = new Date(date);
  const isNew = djangoDate > currentDateTime;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 30,
        backgroundColor: backgroundColor,
        height: 210,
        width: width,
        elevation: 2,
        borderRadius: 10,
        padding: 15,
        marginRight: 5,
      }}
    >
      <Image
        source={source}
        style={{
          width: '100%',
          height: "60%",
          borderRadius: 10,
        }}
      />
      <View style={styles.cardInfoContainer}>
        <Text
          style={[styles.cardTitle, { color: color }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <View style={styles.cardInfo}>
          <View style={styles.newIndicator} />
        </View>
      </View>
      {isNew && (
        <Text style={styles.newText}>New</Text>
      )}
      <Text
        style={[styles.cardDescription, { color: color }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={[styles.priceText, { color: color }]}>{price} NGN</Text>
      </View>
    </TouchableOpacity>
  );
};

export const  ProductList = ({ products,userInfo, navigation, handleRefresh, refreshing, color, backgroundColor }) => {
  return (
    <View>
      {/* Add the Appbar component here */}
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} enabled={true} />
      }>
        <View style={styles.container}>
          {products && products.length > 0 ? (
            products.map((data) => (
              <ProductCard
                key={data.id}
                width={windowWidth / 2.2}
                source={{ uri: data?.image[0]?.img }}
                name={data.name}
                description={data.description}
                price={data.price}
                color={color}
                backgroundColor={backgroundColor}
                onPress={() =>
                  navigation.navigate('product_info', {
                    data,userInfo:userInfo
                  })
                }
              />
            ))
          ) : (
            <Text style={{color:color}}>
              {products ? 'No products available.' : 'Loading products...'}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const CategoryCard = ({ source, name, bg, fg, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={source}
        style={styles.categoryCard}
      >
        <Text style={styles.categoryName}>{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const CategoryList = ({ categoriesData, handleFilterCateg }) => {
  return (
    <ScrollView style={styles.categoryScrollView} horizontal showsHorizontalScrollIndicator={false}>
      {categoriesData?.map((category) => (
        <CategoryCard
          key={category.id}
          bg={category.background_color}
          fg={category.foreground_color}
          source={{ uri: category.logo }}
          name={category.title}
          onPress={() => handleFilterCateg(category.title)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    alignItems: 'center',
  },
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
    fontSize: 15,
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
});
