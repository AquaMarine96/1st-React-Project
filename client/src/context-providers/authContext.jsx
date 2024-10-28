import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';


export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/', { withCredentials: true });
                if (response.status === 200) {
                    dispatch({ type: 'LOGIN', payload: response.data.user });
                } else {
                    dispatch({ type: 'LOGOUT' });
                }
            } catch (err) {
                console.log(err)
                dispatch({ type: 'LOGOUT' });
            }
        }
        getUser()
    }, [])
    console.log('AuthContext state : ', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}



