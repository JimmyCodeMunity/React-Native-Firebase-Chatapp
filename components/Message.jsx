import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


const MyMessage = ({ message }) => (
    <View style={styles.myMessage}>
        <Text style={styles.text}>{message}</Text>
    </View>
);

const OtherMessage = ({ message }) => (
    <View style={styles.otherMessage}>
        <Text style={styles.text}>{message}</Text>
    </View>
);
const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext);
    return (
        <View className="w-full flex-col px-4 py-2">
            <View className="w-full">
                {
                    message.senderId === currentUser.uid ?
                        <View className="justify-end flex-row w-full">
                            <View className="h-10 w-20 flex-row bg-orange-500 justify-center items-center rounded-bl-xl rounded-tr-xl rounded-br-0 rounded-tl-xl">
                                <Text className="text-white">{message.text}</Text>
                            </View>
                        </View>
                        :
                        <View>
                            <View className="h-10 w-20 bg-black justify-center items-center rounded-bl-0 rounded-tr-xl rounded-br-xl rounded-tl-3xl">
                                <Text className="text-white">{message.text}</Text>
                            </View>
                        </View>
                }
            </View>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    myMessage: {
        alignSelf: 'flex-end',
        margin: 10,
        backgroundColor: '#007bff',
        borderRadius: 20,
        padding: 10,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        margin: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        padding: 10,
    },
    text: {
        color: '#fff',
    },
})