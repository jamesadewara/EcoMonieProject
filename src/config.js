import { useSelector } from 'react-redux';

export const BASE_URL = "https://teenssdgclimatechangeapp.pythonanywhere.com";

export const isLaunched = () => useSelector((state) => state.launch.intro);
