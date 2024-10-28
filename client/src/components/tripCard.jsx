import Carousel from './carousel.jsx';

function TripCard({ trip }) {
    return (
        <>
            <div className="bg-lime-700 rounded-sm w-fit pl-2 pr-2 pt-1 pb-1">
                <h1>{trip.title}</h1>
                <Carousel array={trip.images} />
                <p>Description : {trip.description}</p>
                <p>Budget : {trip.budget}</p>
                {trip.postedBy.username && <p>Posted by: {trip.postedBy.username}</p>}
            </div>

        </>
    );
}

export default TripCard;