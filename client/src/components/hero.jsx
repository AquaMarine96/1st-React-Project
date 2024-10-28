import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogout } from '../hooks/useLogout.jsx';

function Hero({ user }) {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const handleLogOut = async () => {
        await logout();
        window.location.reload();
    }


    return (
        <>
            <div className=" bg-lime-300 flex flex-row justify-between drop-shadow-md">
                <Link to="/"><img src="../public/images/logo-transparent.png" alt="Exceyete Logo" className="size-20 m-5" /></Link>
                <div className="flex flex-col justify-center">
                    <h2 className=" mt-2 text-green-900 text-center" >Browse experiences all over the globe or create your own. </h2>
                    <h6 className="text-green-950 m-1 font-semibold text-center">All in one page.</h6>
                </div>
                <nav>
                    <ul className="flex flex-row justify-between mt-2">
                        {user ? <li className="flex flex-row p-2 mt-9 mr-4 text-lg">
                            <Link to="/profile">
                                <img className="size-10" src={`http://localhost:3000/${user.avatar}`} alt="user_avatar" />

                            </Link>
                            <span className="font-bold hover:bg-lime-700 ml-4">{user.username}</span>
                        </li>
                            : null}
                        <li className="hover:bg-lime-700 rounded-lg p-2 mt-9 mr-2 text-lg">
                            {!user ? <Link to="/login">Login</Link> : <button onClick={handleLogOut}>Log out</button>}
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Hero;