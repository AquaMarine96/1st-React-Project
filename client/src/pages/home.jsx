import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from '../components/carousel';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {

            try {
                const result = await axios.get('http://localhost:3000/home', { withCredentials: true })
                if (result.status === 200) {
                    console.log(result.data)
                }
            } catch (error) {
                alert(error.response.data.message)
                navigate('/login')
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <Carousel array={news} />
        </>
    );
}

export default Home;