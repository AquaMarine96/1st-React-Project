import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { useNavigate } from 'react-router-dom';


function Profile() {

    const { user } = useAuthContext();
    const [saved, setSaved] = useState(false);
    const [change, setChange] = useState(false);
    const [newAvatar, setNewAvatar] = useState(null);
    const navigate = useNavigate();

    const [profileInputs, setProfileInputs] = useState(null);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProfileInputs(values => ({ ...profileInputs, [name]: value }));

    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSaved(true);
        const formData = new FormData();

        for (let key in profileInputs) {
            formData.append(key, profileInputs[key])
        }
        if (newAvatar) {
            formData.append('avatar', newAvatar)
        }
        try {
            const response = await axios.patch('http://localhost:3000/profile/' + user._id, formData, { withCredentials: true })
            console.log(response.data)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }
    const changeAvatar = (e) => {
        e.preventDefault();
        setChange(!change);
    }
    const handleAvatarInput = (e) => {
        setNewAvatar(e.target.files[0])
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])


    return (
        <>
            {user ?
                <div>
                    <h1 className="m-2">{user.username}'s Profile</h1>
                    {saved && <p className="text-green-500">Changes saved!</p>}
                    <form onSubmit={handleFormSubmit}>
                        <img className="size-24" src={`http://localhost:3000/${user.avatar}`} alt="avatar" />
                        {!change && <div>
                            < button className="m-2 hover:bg-lime-700 rounded p-2" onClick={changeAvatar}>Change Avatar</button><br />
                        </div>}
                        {change && <div>
                            <input className="m-2" type="file" name="avatar" id="avatar" onChange={handleAvatarInput} /><br />
                            <button className="m-2 hover:bg-lime-700 rounded p-2" onClick={changeAvatar}>Cancel</button><br />
                        </div>}
                        <label htmlFor="username">Username</label>
                        <input className="m-2" type="text" name="username" id="username" placeholder={user.username} onChange={handleInputChange} /><br />
                        <label htmlFor="email">Email</label>
                        <input className="m-2" type="email" name="email" id="email" placeholder={user.email} onChange={handleInputChange} /><br />
                        <label htmlFor="password">Password</label>
                        <input className="m-2" type="password" name="password" id="password" value={user.password} onChange={handleInputChange} /><br />
                        <button className="m-2 hover:bg-lime-700 rounded p-2" type="submit">Save changes</button><br />
                    </form>
                </div >
                : <h1>loading...</h1>
            }
        </>
    );
}

export default Profile;