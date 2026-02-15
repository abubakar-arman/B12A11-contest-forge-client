import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner2 from "../../Components/Spinner2";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
    const axiosSecure = useAxiosSecure()
    const { data: images, isLoading, error } = useQuery({
        queryKey: ['contests'],
        queryFn: () => axiosSecure.get(`/api/home/banner`).then(res => res.data.imgs)
    })

    if (isLoading) return <Spinner2 />;
    if (error) return <p>Error: {error.message}</p>
    return (
        <div className="relative">
            <div className="absolute top-1/2 z-100 left-1/2 -translate-x-1/2 w-80">
                <form className='mb-5 flex'>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name="search" type="search" placeholder="Search" />
                    </label>
                    <button className='btn btn-warning ml-4 '>Search</button>
                </form>
            </div>
            <Carousel autoPlay infiniteLoop dynamicHeight="false">
                {
                    images.map((im, i) => (
                        <div key={i} className="h-[70vh] w-full">
                            <img src={im} className="h-full w-full object-cover" />
                            {/* <p className="legend">Legend 1</p> */}
                        </div>
                    ))
                }
                {/* <div>
                    <img src="/carousel/slide2.jpg" />
                    <p className="legend">Legend 2</p>
                </div> */}
            </Carousel>

        </div>
    );
};

export default Banner;