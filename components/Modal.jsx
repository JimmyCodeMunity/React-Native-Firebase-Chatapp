import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard } from 'react-native';
import { GlobalContext } from '../context';
import { socket } from '../utils';

const RoomModal = () => {
    const { modalVisible, setModalVisible,currentGroupName,setCurrentGroupName } = useContext(GlobalContext);


    const handleCreateNewRoom =()=>{
        console.log(currentGroupName);
        setModalVisible(false);

        socket.emit("createNewRoom",currentGroupName);
        setCurrentGroupName('');
        Keyboard.dismiss();

    }
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView} className="w-full px-4">
                <View style={styles.modalView} className="w-full justify-center items-center rounded-md py-5 space-y-5 px-4 bg-black ">
                    <TextInput className="h-10 text-white px-4 border border-orange-200 w-full rounded-md"
                        placeholder='enter room name'
                        placeholderTextColor="gray"
                        value={currentGroupName}
                        onChangeText={(value)=>setCurrentGroupName(value)}
                    />
                    <View className="flex-row w-full justify-between items-center">
                        <Pressable
                            className="bg-orange-500 h-10 w-32 justify-center items-center rounded-md"
                            onPress={handleCreateNewRoom}>
                            <Text style={styles.textStyle}>Add Room</Text>
                        </Pressable>
                        <Pressable
                            className="bg-white h-10 w-32 justify-center items-center rounded-md"
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text className="text-black">Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalsView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default RoomModal;