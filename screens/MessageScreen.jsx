import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { AuthContext } from '../context/AuthContext'
import * as Icon from 'react-native-feather'
import { ChatContext } from '../context/ChatContext'
import { onSnapshot, Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Message from '../components/Message'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import 'react-native-get-random-values';
import { Appbar } from 'react-native-paper'


const MessageScreen = ({ route,navigation }) => {
  const [messages, setMessages] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { data, dispatch } = useContext(ChatContext);
  const { userData } = route.params;
  const [mytext, setMyText] = useState('');
  // const [img, setImg] = useState(null)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
      // console.log("my chat id:",data.chatId)
    })

    return () => {
      unSub();
    }
  }, [data.chatId])

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  //send message
  const handleSend = async () => {
    // console.log("chat id:", data.chatId);
    // console.log(mytext)
    console.log("random", uuid());

    try {
      // If no image attached, send message without image
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: mytext,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      });

      // Update user chats with last message and date
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [`${data.chatId}.lastMessage`]: { mytext },
        [`${data.chatId}.date`]: serverTimestamp()
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: { mytext },
        [`${data.chatId}.date`]: serverTimestamp()
      });

      // Clear text state after sending
      setMyText("");

    } catch (error) {
      console.log(error)

    }

  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center my-3 px-4">
        <View>
        <Pressable onPress={()=>navigation.goBack()}>
          <Icon.ChevronLeft color="black" size={12} />
          </Pressable>
        </View>
        <View>
          <Text className="text-slate-600 text-2xl">{userData.displayName}</Text>
        </View>
        <View></View>
      </View>
      <ScrollView className="flex-1 h-full">
        <View className="w-full">
          {messages.map((m) => {
            return (
              <Message message={m} key={m.id} />
            )
          })}
        </View>
      </ScrollView>

      <KeyboardAvoidingView behavior='padding' className="px-4 bottom-6 flex-row justify-between items-center">
        <TextInput placeholder='enter text here...'
          className="px-4 h-12 w-80 border border-slate-400 rounded-2xl"
          value={mytext}
          onChangeText={(text) => setMyText(text)}
        />
        <Pressable onPress={handleSend} className="bg-orange-500 h-12 w-12 rounded-3xl justify-center items-center">
          <Icon.Send color="black" size={20} />
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({})