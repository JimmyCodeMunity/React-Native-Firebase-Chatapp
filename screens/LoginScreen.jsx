import { Alert, Keyboard, SafeAreaView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState();
  const [email, setEmail] = useState('ghostbmer@gmail.com');
  const [password, setPassword] = useState('123456')
  const { setCurrentUser } = useContext(AuthContext)


  const handleLogin = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          navigation.navigate('Chat')
          setCurrentUser(user);
        })
        .catch((error) => {
          console.log(error)
          Alert.alert("error logging you in..")
        })

    } catch (error) {
      console.log("login faield with error", error)

    }
    Keyboard.dismiss();
  }
  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <View className="px-4 space-y-5 justify-center items-center">
        <Text className="font-semibold text-xl text-orange-500">Login</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder='enter email'
          placeholderTextColor=""
          className="h-10 w-80 rounded-md border text-gray-400 border-slate-300 px-4" />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder='enter password'
          placeholderTextColor="gray"
          className="h-10 w-80 rounded-md border text-gray-400 border-slate-300 px-4" />
        <TouchableOpacity onPress={handleLogin} className="h-10 w-60 rounded-md justify-center items-center bg-orange-500">
          <Text className="text-white font-semibold text-xl">Login</Text>
        </TouchableOpacity>

        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text className="text-orange-300 text-xl">Create account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})