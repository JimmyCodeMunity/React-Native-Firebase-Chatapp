import { Alert, Keyboard, SafeAreaView, Pressable, StyleSheet, Text,Image, TextInput, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { auth, db, storage } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import * as Icon from 'react-native-feather'

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState();
  const [displayName, setDisplayName] = useState('Clava')
  const [email, setEmail] = useState('clava02@gmail.com');
  const [password, setPassword] = useState('123456')
  const { setCurrentUser } = useContext(AuthContext)
  const [uploading, setUploading] = useState(false);
  // const file = 
  const [file, setFile] = useState(null);




  //pick image
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        console.log(result.assets[0].uri)
        setFile(result.assets[0].uri);
      }
    } catch (E) {
      console.log(E);
    }
  };


  const handleLogin = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a storage reference with a unique name (use the user's UID as the file name)
      const storageRef = ref(storage, `avatars/${user.uid}`);

      // Upload the file to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress tracking if needed
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Upload error:', error);
          setErr(true);
        },
        async () => {
          // Handle successful uploads on complete
          try {
            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Update the user's profile with display name and photo URL
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL
            });

            // Create a document in Firestore to store user data
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });


            await setDoc(doc(db, "userChats", user.uid), {

            })
            // Redirect to the home page
            await navigate.navigation('Login');
          } catch (error) {
            console.error('Error updating profile or setting document:', error);
            setErr(true);
          }
        }
      );
    } catch (error) {
      console.error('User creation error:', error);
      setErr(true);
    }
    Keyboard.dismiss();
  }
  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <View className="px-4 space-y-5 justify-center items-center">
        <Text className="font-semibold text-xl text-orange-500">Create Account</Text>
        {uploading && <ActivityIndicator />}
        {file && (
          <>
            <Image source={{ uri: file }} className="h-20 w-20 rounded-full" />
          </>
        )}
        <TextInput
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          placeholder='enter username'
          placeholderTextColor=""
          className="h-10 w-80 rounded-md border text-gray-400 border-slate-300 px-4" />
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
        <TouchableOpacity onPress={pickImage} className="h-10 w-40 rounded-md justify-center items-center bg-orange-500">
          <Text className="text-white font-semibold text-xl items-center justify-center">
            <Icon.Image color="black" />
            Upload Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} className="h-10 w-60 rounded-md justify-center items-center bg-orange-500">
          <Text className="text-white font-semibold text-xl">Create Account</Text>
        </TouchableOpacity>

        <Pressable onPress={() => navigation.goBack()}>
          <Text className="text-orange-300 text-xl">Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})