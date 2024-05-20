import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';


const Chats = () => {
    const navigation = useNavigation()
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                // console.log('current data', doc.data())
                setChats(doc.data())
            });

            return () => {
                unsub();
            };


        };
        currentUser.uid && getChats();

    }, [currentUser.uid])

    console.log(Object.entries(chats));



    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
        // console.log(u)
        navigation.navigate('Message', { userData: u });
    }
    return (
        <View className="px-4 w-full">
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <Pressable onPress={()=>handleSelect(chat[1].userInfo)} className="flex-row items-start border border-slate-300 border-sm py-2 px-2 border-r-0 border-l-0 border-t-0">
                    <View>
                        <Image source={{ uri: chat[1].userInfo.photoURL }}
                            className="rounded-full h-12 w-12"
                        />
                    </View>
                    <View>
                        <Text className="text-slate-500 text-xl font-semibold">{chat[1].userInfo.displayName}</Text>
                        <Text className="text-slate-400">{chat[1].lastMessage?.mytext}</Text>
                    </View>
                </Pressable>

            ))}

        </View>
    );
}

export default Chats;
