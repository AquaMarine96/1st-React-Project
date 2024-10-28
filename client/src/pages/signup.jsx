import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignUp() {

    const navigate = useNavigate();
    const [signInputs, setSignInputs] = useState({})
    const [errors, setErrors] = useState({})
    const [avatar, setAvatar] = useState(null);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSignInputs(values => ({ ...signInputs, [name]: value }));

    }
    const handleAvatarInput = (e) => {
        setAvatar(e.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(signInputs)
        // if (validateForm(signInputs)) {


        // } else {
        //     console.log("Invalid form")

        // }

        const formData = new FormData();
        for (let key in signInputs) {
            formData.append(key, signInputs[key]);
        }
        if (avatar) {
            console.log("avatar: ", avatar);
            formData.append('avatar', avatar);
        }

        try {
            const result = await axios.post('http://localhost:3000/signup', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.status === 201) {
                alert("User signed up successfully");
                navigate('/login')
            }
        } catch (err) {
            console.log("error signing up: ", err.response.data.message);
            alert("error signing up: ", err.response.data.message);
        }
    }




    const validateForm = (inputs) => {
        const newErrors = {};

        // Username validation
        if (!/^[a-zA-Z0-9._]{3,15}$/.test(inputs.username)) {
            newErrors.username = 'Username must be 3-15 characters long and contain only letters, numbers, underscores, and dots.';
        } else if (/\s/.test(inputs.username)) {
            newErrors.username = 'Username must not contain any whitespace.';
        }

        // Password validation
        if (inputs.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        } else if (!/[A-Z]/.test(inputs.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter.';
        } else if (!/[a-z]/.test(inputs.password)) {
            newErrors.password = 'Password must contain at least one lowercase letter.';
        } else if (!/[0-9]/.test(inputs.password)) {
            newErrors.password = 'Password must contain at least one digit.';
        } else if (!/[^A-Za-z0-9]/.test(inputs.password)) {
            newErrors.password = 'Password must contain at least one special character.';
        } else if (/\s/.test(inputs.password)) {
            newErrors.password = 'Password must not contain any whitespace.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return (
        <>
            <h1>Sign Up page</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="username">Username: </label>
                <input className="border-black m-1 border-2" type="text" name="username" value={signInputs.username} onChange={handleInputChange} required />
                {errors && <p className="text-red-500">{errors.username}</p>}
                <br />
                <label htmlFor="password">Password: </label>
                <input className="border-black m-1 border-2" type="password" name="password" value={signInputs.password} onChange={handleInputChange} required />
                {errors && <p className="text-red-500">{errors.password}</p>}
                <br />
                <label htmlFor="email">Email: </label>
                <input className="border-black m-1 border-2" type="text" name="email" value={signInputs.email} onChange={handleInputChange} required />
                {errors && <p className="text-red-500">{errors.email}</p>}
                <br />
                <label htmlFor="avatar">Select Avatar: </label>
                <input type="file" className="border-black m-1 border-2" name="avatar" onChange={handleAvatarInput} />
                <input className="bg-white p-1 border-lime-950 border-1 shadow-md hover:cursor-pointer" type="submit" />
            </form>

        </>
    );
}

export default SignUp;