import { useState } from 'react';
import { useAuthContext } from './useAuthContext.jsx';
import axios from 'axios';


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const logIn = async (user) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/login', user, { withCredentials: true });
            console.log("logging response", response);

            if (response.status !== 200) {
                setError("Error Logging in: " + response.data.message);
                setIsLoading(false);
            } else {
                try {
                    const userData = await axios.get('http://localhost:3000/', { withCredentials: true });
                    console.log(userData);
                    setIsLoading(false);
                    dispatch({ type: 'LOGIN', payload: userData.data.user });
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.response.data.message);
            setIsLoading(false);
        }
    };




    return { logIn, error, isLoading }
}


