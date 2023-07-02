import { useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';

// Define the base URL
export const BASE_URL = "http://192.168.118.146:9000"; //"https://teenssdgclimatechangeapp.pythonanywhere.com";

// Function to check if the app has been launched before
export const isLaunched = () => useSelector((state) => state.launch.intro);

// Function to store the theme value
export const storeThemeValue = async (value) => {
    try {
      const themeFilePath = `${FileSystem.documentDirectory}theme.txt`;
      await FileSystem.writeAsStringAsync(themeFilePath, value);
    } catch (error) {
      console.log('Error storing theme value:', error);
    }
  };
  
  // Function to retrieve the theme value as a boolean
export const getThemeValue = async () => {
  try {
    const themeFilePath = `${FileSystem.documentDirectory}theme.txt`;
    const fileExists = await FileSystem.getInfoAsync(themeFilePath);
    if (fileExists.exists) {
      const fileContent = await FileSystem.readAsStringAsync(themeFilePath);
      return fileContent === 'true'; // Convert the string value to a boolean
    } else {
      // Return default value if the file does not exist
      return false; // Or true depending on your default theme
    }
  } catch (error) {
    console.log('Error retrieving theme value:', error);
    return false; // Or true depending on your default theme
  }
};
