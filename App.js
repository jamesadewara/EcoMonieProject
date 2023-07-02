import React, { useState, useEffect } from 'react';
import { Provider as StoreProvider, useSelector } from 'react-redux';

import store from './src/app/store';
import ScreenManager from './src/ScreenManager';


export default function App() {
  

  return (
    <StoreProvider store={store}>
      
        <ScreenManager />
  
    </StoreProvider>
  );
}
