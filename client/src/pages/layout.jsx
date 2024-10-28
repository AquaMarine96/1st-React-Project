import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import Hero from '../components/hero.jsx';
import Footer from '../components/footer.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';


function Layout() {
    const { user } = useAuthContext();

    return (
        <>
            <Hero user={user} />
            <Navbar />
            <Outlet />
            <Footer />
        </>

    );
}

export default Layout;