import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/app/store';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import ScreenManager from "./src/ScreenManager";
// import Albums from './src/Albums';
// import NewAlbumForm from './src/NewAlbumForm';



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    secondary: 'lightgreen',
  },
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        {/* <Albums /> */}
        <ScreenManager />
      </PaperProvider>
    </StoreProvider>
  );
}