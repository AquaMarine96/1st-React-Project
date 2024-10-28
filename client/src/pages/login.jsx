import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext.jsx';


function Login() {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [signInputs, setSignInputs] = useState({})
    const { logIn, error, isLoading } = useLogin();

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSignInputs(values => ({ ...signInputs, [name]: value }));

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await logIn(signInputs);

    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])


    return (
        <>
            <h1>Log in page</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input className="border-black m-1 border-2" type="text" name="username" value={signInputs.username} onChange={handleInputChange} required />
                <br />
                <label htmlFor="password">Password: </label>
                <input className="border-black m-1 border-2" type="password" name="password" value={signInputs.password} onChange={handleInputChange} required />

                <br />
                <button disabled={isLoading} className="bg-white p-1 border-lime-950 border-1 shadow-md" type="submit">Log in</button>
            </form>
            <p>Not a User? <Link to="/signup"> <span className='text-lime-800 font-bold hover:underline '>Sign in now!</span></Link></p>
        </>
    );
}

export default Login;