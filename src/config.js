import { useSelector } from 'react-redux';

export const BASE_URL = "http://192.168.213.146:9000";

export const isLaunched = () => useSelector((state) => state.launch.intro);
