import React, { createContext, useReducer } from 'react';
import userContextReducer from './userContextReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [state, dispatch] = useReducer(userContextReducer, {
        token: null,
        signedIn: false,
    });

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;