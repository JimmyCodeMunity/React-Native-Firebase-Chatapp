import { ImageBackground, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, Alert, Keyboard } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context'

const SplashScreen = ({ navigation }) => {
  

  // function handleRegisterandSignIn(isLogin){

  //   if(currentUsername.trim() !== ''){
  //     const index = allUsers.findIndex(userItem => userItem === currentUsername);

  //     if(isLogin){
  //       if(index === -1){
  //         Alert.alert('please register first');
  //       }else{
  //         setCurrentUser(currentUsername)
  //       }
  //     }else{
  //       if(index === -1){
  //         allUsers.push(currentUsername);
  //         setAllUsers(allUsers);
  //         setCurrentUser(currentUsername);

  //       }else{
  //         Alert.alert('user already exists');
  //       }
  //     }


  //     setCurrentUsername('');

  //   }else{
  //     Alert.alert('Please input all fields')
  //   }
  //   Keyboard.dismiss();

  // }

  // useEffect(()=>{
  //   if(currentUser.trim()) navigation.navigate('Chat')
  // },[currentUser])

  // console.log(allUsers)
  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <Image className="flex-1 w-full h-full" source={require('../assets/spl.jpeg')} />
      <View className="justify-center items-center w-full">


        <View>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')} className="bg-orange-400 h-12 w-60 rounded-2xl justify-center items-center">
            <Text className="text-black font-bold text-xl">Get Started</Text>
          </TouchableOpacity>
        </View>


      </View>

    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})