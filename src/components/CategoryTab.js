import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const CategoryTab = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(1);

  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {categories.map((category) => (
        <Chip
          key={category.id}
          mode={activeCategory === category.id ? 'outlined' : 'flat'}
          onPress={() => handleCategoryPress(category.id)}
          selectedColor={ activeCategory === category.id ? 'white' : 'black'}
          style={[
           { marginRight: 8, backgroundColor: activeCategory === category.id ? 'green' : '#eeeeee' },
          ]}
          icon={category.icon}
        >
          {category.name}
        </Chip>
      ))}
    </ScrollView>
  );
};

export default CategoryTab;

const styles = StyleSheet.create({

});
