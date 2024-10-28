import { useState } from "react";
import NewsCard from "./newsCard";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";


const Carousel = ({ array }) => {
    const [index, setIndex] = useState(0);
    const nextSlide = () => {
        setIndex((prevIndex) => prevIndex === array.length - 1 ? 0 : prevIndex + 1);
    }
    const prevSlide = () => {
        setIndex((prevIndex) => prevIndex === 0 ? array.length - 1 : prevIndex - 1);
    }

    return (
        <>
            <div className="relative w-full max-w-lg mx-auto " >
                <div className="overflow-hidden relative">
                    <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
                        {array && array.map((image, index) => (
                            <div key={index} className="min-w-full">
                                <img src={`http://localhost:3000/${image}`} alt={`Slide ${index + 1}`} className="size-fit" />
                            </div>
                        ))}
                    </div>
                </div>
                <button

                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2">

                    <HiChevronLeft size={30} onClick={prevSlide} />
                </button>
                <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2">

                    <HiChevronRight size={30} onClick={nextSlide} />
                </button>
            </div>




        </>

    )
}

export default Carousel;


// {news && news.map((newsItem, newsIndex) => (
//     <NewsCard key={newsIndex} title={newsItem.title} content={newsItem.content} image={newsItem.image} />
// ))}

/* <div className="overflow-hidden relative">

            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
                {array}
            </div>

            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button className="p-1 rounded-full shadow bg-white-80 text-grey-200 hover:bg-white">
                    <HiChevronLeft size={30} onClick={prevSlide} />
                </button>
                <button className="p-1 rounded-full shadow bg-white-80 text-grey-200 hover:bg-white">
                    <HiChevronRight size={30} onClick={nextSlide} />
                </button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {array && array.map((_, i) => (
                        <div className={` transition-all w-2 h-2 bg-white rounded-full ${index === i ? "p-2" : "bg-opacity-40"}`}></div>
                    ))}
                </div>
            </div>
        </div> */