import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { DefaultTheme, DarkTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import store from './src/app/store';
import ScreenManager from './src/ScreenManager';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  // Customize the theme colors
  theme.colors.primary = 'green';
  theme.colors.accent = 'lightgreen';

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <ScreenManager />
      </PaperProvider>
    </StoreProvider>
  );
}
