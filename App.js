import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationHandler from './navigation/NavigationHandler';
import GlobalState from './context';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

export default function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <NavigationHandler />
        <StatusBar style="dark" hidden={true} />
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
