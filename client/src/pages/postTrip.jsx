import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '../components/listItem';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function PostTrip() {

    // States

    const navigate = useNavigate();
    const [trip, setTrip] = useState({});
    const [errors, setErrors] = useState();
    const [countries, setCountries] = useState([])
    const [continents, setContinent] = useState([])
    const [continentId, setContinentId] = useState("");
    const [countryId, setCountryId] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    // useEffect to get continents from the database

    useEffect(() => {
        axios.get("http://localhost:3000/continents")
            .then((res) => { setContinent(res.data) })
    }, [])

    useEffect(() => {
        if (continentId) {

            axios.get("http://localhost:3000/countries/" + continentId)
                .then((res) => {
                    setCountries(res.data)
                }).catch((err) => console.log(err))

        }
    }, [continentId])

    function handleContinentSelect(e) {
        console.log("continent id :", continents.find(continent => continent.name === e.target.value)._id)
        setContinentId(continents.find(continent => continent.name === e.target.value)._id)
        setCountryId("")
    }

    function handleCountrySelect(e) {
        const selectedCountry = countries.find(country => country.name === e.target.value);
        if (selectedCountry) {
            const countryId = selectedCountry._id;
            setCountryId(countryId);
            console.log("country id is:", countryId, e.target.value);
        }
    }

    // Form handling

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTrip((values) => ({ ...trip, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let key in trip) {
            console.log(key, trip[key])
            formData.append(key, trip[key]);
        }

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }


        try {

            const result = await axios.post('http://localhost:3000/post-trip/' + countryId, formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                })
            if (result.status === 200) {
                alert("Trip posted successfully");
                navigate('/trips')
            } else {
                setError(result.data.message);
            }
        } catch (err) {
            if (err.response.status === 401) {
                setError("You need to have an account to post a trip");
            } else {
                setError(err.response.data.message);
            }
        }
    }

    const handleImageInput = (e) => {
        console.log(e.target.files);
        setImages(e.target.files);

    }



    return (
        <>
            <div className="max-h-[80vh] overflow-y-auto p-4 mx-auto bg-lime-300 shadow-md">
                <h1 className="text-center mb-4">Post your Trip</h1>
                {error && <div>
                    <p className="text-red-500">{error}</p>
                    {!user && <p><Link to="/login"> <span className='text-lime-800 font-bold hover:underline '>Log in now</span></Link> to create Trips!</p>}
                </div>}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-3" >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="title">Trip Title: </label>
                            <input type="text" name="title" value={trip.title} onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-fit" />
                        </div>
                        <div className="flex flex-row">
                            <label htmlFor="continent">Continent</label>
                            <select name="continent" id="continent-select" onChange={handleContinentSelect} className="p-2 border border-gray-300 rounded w-fit">
                                <option value="">Select Continent</option>
                                {continents.map((continent) => <ListItem key={continent._id} id={continent._id} name={continent.name} />)}
                            </select>
                            <label htmlFor="country">Country</label>
                            <select name="country" id="country-select" onChange={handleCountrySelect} className="p-2 border border-gray-300 rounded w-fit">
                                <option value="">Select Country</option>
                                {countries.map((country) => <ListItem key={country._id} id={country._id} name={country.name} />)}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description">Description: </label>
                            <input type="text" name="description" value={trip.description} onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-fit" />
                        </div>
                        <div className="flex flex-row">
                            <label htmlFor="startDate">Start Date: </label>
                            <input type="date" name="startDate" value={trip.startDate} onChange={handleInputChange} className="p-2 border border-gray-300 rounded " />
                            <label htmlFor="endDate">End Date: </label>
                            <input type="date" name="endDate" value={trip.endDate} onChange={handleInputChange} className="p-2 border border-gray-300 rounded " />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="budget">Budget: </label>
                            <input type="number" name="budget" value={trip.budget} onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-fit" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="images">Images: </label>
                            <input type="file" name="images" multiple onChange={handleImageInput} className="p-2 border border-gray-300 rounded w-fit" />
                        </div>

                    </div>
                    <button type="submit" className="flex place-self-center p-3 bg-lime-600 text-white rounded hover:bg-green-600 w-fit">Submit Trip</button>
                </form>
            </div>

        </>
    );
}

export default PostTrip;