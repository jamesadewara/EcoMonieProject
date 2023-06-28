import { useSelector } from 'react-redux';

export const BASE_URL = "http://192.168.206.146:9000"//"https://teenssdgclimatechangeapp.pythonanywhere.com";

export const isLaunched = () => useSelector((state) => state.launch.intro);
