import { Link, Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="flex flex-row justify-center" >
                <nav >
                    <ul className="flex flex-row justify-between">
                        <li className="hover:bg-lime-700 rounded-lg p-2 m-3">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:bg-lime-700 rounded-lg p-2 m-3">
                            <Link to="/search-trip">Search for a Trip</Link>
                        </li>
                        <li className="hover:bg-lime-700 rounded-lg p-2 m-3">
                            <Link to="/post-trip">Post a Trip</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Navbar;