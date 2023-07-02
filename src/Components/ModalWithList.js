import React, { useState } from 'react';
import { Dialog, List, Avatar, Checkbox, MD3LightTheme, MD3Colors, MD2Colors } from 'react-native-paper';
import { ScrollView } from 'react-native';

const ModalWithList = ({ visible, onDismiss, categories, setValue,backgroundColor, color }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setValue(category)
    onDismiss()
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss} style={{backgroundColor: backgroundColor, padding: 1, borderRadius:5}}>
      <Dialog.ScrollArea style={{ maxHeight: 400 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }}>
          <List.Section>
            <List.Subheader style={{color:color}}>Select Categories</List.Subheader>
            {categories?.map((category, index) => (
              <List.Item
                key={index}
                style={{backgroundColor: backgroundColor}}
                titleStyle={{color:color}}
                title={category.title}
                left={() => (
                  <Avatar.Image source={{ uri: category.logo}} size={40} style={{backgroundColor: backgroundColor}} />
                )}
                right={() => (
                  <Checkbox
                    status={selectedCategory === category ? 'checked' : 'unchecked'}
                    onPress={() => handleCategorySelect(category)}
                  />
                )}
              />
            ))}
          </List.Section>
        </ScrollView>
      </Dialog.ScrollArea>
    </Dialog>
  );
};

export default ModalWithList;
