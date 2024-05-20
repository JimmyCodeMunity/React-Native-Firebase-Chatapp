import { Platform } from "react-native";
import { io } from "socket.io-client";

export default BaseURL = Platform.OS === 'android' ? 'http://10.0.2.3:3000':'exp://192.168.1.212:8081';


export const socket = io.connect('http://10.0.2.2:5000')