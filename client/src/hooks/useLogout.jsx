import { useAuthContext } from './useAuthContext.jsx';
import axios from 'axios';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        try {
            const result = await axios.get('http://localhost:3000/logout', { withCredentials: true })
            if (result) {
                console.log(result.data.message)
                dispatch({ type: 'LOGOUT' })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return { logout }
};