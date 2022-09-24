//REACT
import { createContext, useEffect, useReducer } from "react"

//FIREBASE
import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser } from "../utils/firebase/firebase";

//IMPORTS
import { createAction } from '../utils/reducer/reducer'

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case 'SET_CURRENT_USER':
            return {
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type: ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const { currentUser } = state;

    const setCurrentUser = (user) => {
        dispatch(
            createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
        );
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])

    const value = { currentUser, setCurrentUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
