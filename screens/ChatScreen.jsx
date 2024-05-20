import { FlatList, Pressable, SafeAreaView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import * as Icon from 'react-native-feather'
import ChatComponent from '../components/ChatComponent'
import RooomModal from '../components/Modal'
import { AuthContext } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import Chats from '../components/Chats'

const ChatScreen = ({navigation}) => {
  const { currentUser } = useContext(AuthContext)
  // console.log("userdata", currentUser)

  const handleSignOut = () => {
    signOut(auth)
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between px-4 items-center">
        <View className="flex-row space-x-2 items-center">
          <Image source={{ uri: currentUser.photoURL }} className="h-10 w-10 rounded-full" />
          <Text className="text-xl">{currentUser.displayName}</Text>
        </View>
        <View>
          <Icon.LogOut color="black" size={20} />
        </View>
      </View>

      <View className="flex-1">
        <View className="px-4 flex-row justify-between items-center mt-8">
          <View>
            <Text className="text-3xl font-semibold">Chats</Text>
          </View>
          <View>
            <Pressable onPress={()=>navigation.navigate('Search')}>
              <Icon.Search size={10} color='orange' />
            </Pressable>
          </View>
        </View>

        

        <Chats />
      </View>


      


      <View className="px-5">
        <TouchableOpacity onPress={() => setModalVisible(true)} className="justify-center items-center bg-orange-500 h-10 w-full rounded-md">
          <Text className="text-xl font-semibold text-white">Create Room</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})