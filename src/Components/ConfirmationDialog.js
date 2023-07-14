import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Dialog, List, Portal, Provider, Text, useTheme } from 'react-native-paper';
import CustomAvatar from './CustomAvatar';

const ConfirmationDialog = ({ visible, onDismiss, categories, setValue, selectedCategories, onSelectCategory }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category?.name);
    setValue(category)
    console.log(category, 'hui')
    onDismiss()
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ backgroundColor: theme.colors.cardsdialogs, borderRadius: 10, borderColor: theme.colors.color }}>
        <Dialog.Title style={{ color: theme.colors.color }}>Categories</Dialog.Title>
        <Dialog.Content>
          <List.Section>
            {categories?.map((category, index) => (
              <List.Item
                key={index}
                style={{ backgroundColor: theme.colors.background }}
                titleStyle={{ color: theme.colors.color }}
                title={category?.name}
                left={() => <CustomAvatar size={48} avatar={category?.logo } />}
                right={() => (
                  <Checkbox
                    status={selectedCategory === category?.name ? 'checked' : 'unchecked'}
                    onPress={() => handleCategorySelect(category)}
                  />
                )}
              />
            ))}
          </List.Section>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>CLOSE</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;
