import { useState, useEffect } from "react";
import axios from "axios";
import ListItem from "../components/listItem";
import TripCard from "../components/tripCard";


function TripSearch() {


    const [countries, setCountries] = useState([])
    const [continents, setContinent] = useState([])
    const [continentId, setContinentId] = useState("");
    const [countryId, setCountryId] = useState("");
    const [trips, setTrips] = useState([])
    const [tripImages, setTripImages] = useState([])
    const [selectedTrip, setSelectedTrip] = useState(null)

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

    //useEffect to get Trips from selected country

    useEffect(() => {
        if (countryId) {

            axios.get("http://localhost:3000/trips/" + countryId, { withCredentials: true })
                .then((res) => {
                    console.log("data is for trip:", res.data);
                    if (Array.isArray(res.data)) {
                        setTrips(res.data);
                    } else if (Object.keys(res.data).length === 0) {
                        setTrips([])
                    }
                    console.log(trips)
                })
                .catch(err => console.log(err))
        }

    }, [countryId])


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

    function showDetails(e) {
        console.log(e.target)
        setSelectedTrip(trips.find(trip => trip.title === e.target.innerText));

    }


    return (
        <>
            <h1>Search for a Trip</h1>
            <div className="flex h-screen bg-lime-400">
                <div className="w-1/3 bg-lime-700 border-r overflow-y-auto">
                    <div className="p-4 border-b bg-lime-500">
                        <select className="w-full p-2 border rounded-md" name="continent" id="continent-select" onChange={handleContinentSelect}>
                            <option value="">Select Continent</option>
                            {continents.map((continent) => <ListItem key={continent._id} id={continent._id} name={continent.name} />)}
                        </select>
                    </div>
                    <div className="p-4 border-b bg-lime-500">
                        <select className="w-full p-2 border rounded-md" name="country" id="country-select" onChange={handleCountrySelect} >
                            <option value="">Select Country</option>
                            {countries.map((country) => <ListItem key={country._id} id={country._id} name={country.name} />)}
                        </select>
                    </div>
                    <div id="trip-list">
                        {trips && trips.map((trip) => {
                            return (
                                <div key={trip.id} className="p-4 border-b hover:bg-lime-200 cursor-pointer">
                                    <h3 className="text-lg font-semibold" onClick={showDetails}>{trip.title}</h3>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="w-2/3 p-6 bg-lime-500 overflow-y-auto">
                    {selectedTrip ? <TripCard trip={selectedTrip} /> : <h2>No trip selected</h2>}
                </div>
            </div>

            {/* <div className="min-h-screen overflow-auto">




                {(trips.length === 0 && countryId) && <h2 className="text-lime-900">No trips found</h2>}
                {trips && trips.map((trip) => {
                    return (
                        <>
                            <TripCard trip={trip} />
                        </>

                    )
                }
                )}
            </div> */}
        </>

    );
}

export default TripSearch;


// <div className="flex flex-row" key={trip._id}>
// {trip.images.map((image, index) => {
//     console.log("tripimageis", image)
//     return (
//         <img key={index} src={`http://localhost:3000/${image}`} alt="trip" className="size-48" />
//     )
// })}

// </div><br />
// <h2>{trip.title}</h2>
// <p>{trip.description}</p>
// {trip.postedBy.username && <p>posted by: {trip.postedBy.username}</p>}