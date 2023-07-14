import { useSelector } from 'react-redux';

// Define the base URL
export const BASE_URL = "http://192.168.95.146:8000"; //"https://teenssdgclimatechangeapp.pythonanywhere.com";

export const APP_VERSION = "1.0.0";

export const API_TIMEOUT = 7000;

// Function to check if the app has been launched before
export const isLaunched = () => useSelector((state) => state.launch.intro);

