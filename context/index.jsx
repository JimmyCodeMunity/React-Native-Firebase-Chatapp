import React, { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Create the GlobalState component
function GlobalState({ children }) {
    // Define the state that you want to share globally
    const [state, setState] = useState({
        // Initial global state values
    });

    const [showLoginView, setShowLoginView] = useState(true);
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentUser, setCurrentUser] = useState("");
    const [allUsers, setAllUsers] = useState([])
    const [aallChatRoooms, setAllChatRooms] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [currentGroupName, setCurrentGroupName] = useState("");

    return (
        <GlobalContext.Provider value={{
            showLoginView,
            setShowLoginView,
            currentUsername,
            setCurrentUsername,
            currentUser,
            setCurrentUser,
            allUsers,
            setAllUsers,
            modalVisible,
            setModalVisible,
            currentGroupName,
            setCurrentGroupName
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
