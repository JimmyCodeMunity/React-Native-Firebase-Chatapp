import React, { useState, useContext } from 'react';
import { SafeAreaView, View, TextInput, Pressable, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import * as Icon from 'react-native-feather';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const SearchScreen = () => {
    const navigation = useNavigation();
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                setUser(doc.data());
            });
        } catch (error) {
            console.log(error);
            setErr(true);
        }
    };

    const handleSelect = async () => {
        if (!user) return;
    
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    
        try {
            const chatDocRef = doc(db, 'chats', combinedId);
            const chatDocSnapshot = await getDoc(chatDocRef);
            
            if (chatDocSnapshot.exists()) {
                console.log('Chat already exists, navigate to Message screen');
                navigation.navigate('Message', { userData: user });
                return;
            }
    
            // Set chat document (will create if not exist)
            await setDoc(chatDocRef, { messages: [] }, { merge: true });
    
            await setDoc(doc(db, 'userChats', currentUser.uid), {
                [combinedId]: {
                    userInfo: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    date: serverTimestamp(),
                },
            }, { merge: true });
    
            await setDoc(doc(db, 'userChats', user.uid), {
                [combinedId]: {
                    userInfo: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    date: serverTimestamp(),
                },
            }, { merge: true });
    
            console.log('Chat document created/updated successfully');
            setUsername('');
            setErr(false);
            setUser(null);
            navigation.navigate('Message', { userData: user });
        } catch (error) {
            console.error('Error creating/updating chat document:', error);
            setErr(error);
            setUsername('');
            setUser(null);
        }
    };
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginTop: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextInput
                    value={username}
                    onChangeText={value => setUsername(value)}
                    style={{ borderWidth: 1, borderColor: '#ccc', height: 40, width: 200, paddingLeft: 10, borderRadius: 20 }}
                    placeholder="Search user"
                />
                <Pressable onPress={handleSearch} style={{ backgroundColor: '#ccc', height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon.Search color="gray" size={20} />
                </Pressable>
            </View>

            {err && <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>User not found</Text>}
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                {user && (
                    <Pressable onPress={handleSelect} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 10 }}>
                        <Image source={{ uri: user.photoURL }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.displayName}</Text>
                        </View>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
