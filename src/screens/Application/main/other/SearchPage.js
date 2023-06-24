import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, ImageBackground, ScrollView, View, Image, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Searchbar, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const categories = [
  {
    id: '1',
    name: 'Trye',
    source: require("../../../../../assets/img/anime/calmness.png"),
    bg: "cyan",
    fg: "black"
  }
];

const CategoryCard = ({ source, name, bg, fg, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={source}
        style={{
          height: 130,
          width: 230,
          marginRight: 20,
          borderRadius: 10,
          marginBottom: 40,
          opacity: 0.7,
          backgroundColor: bg,
          marginLeft: 3,
          padding: 12,
          marginTop: 20
        }}
      >
        <Text style={{
          fontWeight: 'bold',
          color: fg,
          fontSize: 15
        }}>{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const products = [
  {
    id: '1',
    name: 'Adewa',
    description: "sdfghjkil",
    price: "123",
    source: require('../../../../../assets/img/anime/calmness.png'),
    avatar: null
  }
];
const windowWidth = Dimensions.get('window').width;

const ProductCard = ({ onPress, source, profile, name, price, description, date, width }) => {
  const currentDateTime = new Date();
  const djangoDate = new Date(date);
  const isNew = djangoDate > currentDateTime;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 30,
        backgroundColor: "#FFF",
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
          height: 70,
          borderRadius: 10
        }}
      />
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
      }}>
        <Text style={{
          fontWeight: "bold",
          color: "#4f4a4a",
          fontSize: 12
        }} numberOfLines={1} ellipsizeMode='tail'>
          {name}
        </Text>
        <View style={{
          height: 4,
          width: 4,
          borderRadius: 4,
          backgroundColor: "red",
          marginHorizontal: 4
        }}>
        </View>
      </View>
      <Text style={{
        color: "red",
        fontSize: 9,
        fontWeight: "bold"
      }}>
        {isNew ? "New" : ""}
      </Text>
      <Text style={{
        fontSize: 9,
        color: "#4f4a4a",
        fontWeight: "normal",
      }} numberOfLines={3} ellipsizeMode='tail'>
        {description}
      </Text>
      <View style={{
        flexDirection: "row",
        marginTop: 5,
        alignItems: "center",
        width: "100%"
      }}>
        <View style={{
          width: "80%"
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: "bold"
          }}>{price} NGN</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [showCateg, setShowCateg] = useState(true);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setShowCateg(!query);
  };

  const handleFilterCateg = (arg) => {
    console.log(arg);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Search" />
        </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Searchbar
              placeholder="Find trash..."
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{ marginHorizontal: 16, marginTop: 16 }}
            />
            <ScrollView style={{ paddingHorizontal: 10 }} horizontal showsHorizontalScrollIndicator={false}>
              {showCateg ?
                categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    bg={category.bg}
                    fg={category.fg}
                    source={category.source}
                    name={category.name}
                    onPress={() => handleFilterCateg(category.name)}
                  />
                ))
                :
                products.map((data) => (
                  <ProductCard
                    key={data.id}
                    width={windowWidth / 2.2}
                    source={data.source}
                    name={data.name}
                    description={data.description}
                    price={data.price}
                    onPress={() => navigation.navigate('product_info', { data })}
                  />
                ))
              }
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SearchPage;
