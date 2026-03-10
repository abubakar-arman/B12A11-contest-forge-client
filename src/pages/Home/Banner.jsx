import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner2 from "../../Components/Spinner2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LandingSkelitonLoader from "../../Components/LandingSkelitonLoader";

const Banner = () => {
    const axiosSecure = useAxiosSecure()
    const { data: images, isLoading, error } = useQuery({
        queryKey: ['contests'],
        queryFn: () => axiosSecure.get(`/api/home/banner`).then(res => res.data.imgs)
    })

    if (isLoading) return <LandingSkelitonLoader />;
    if (error) return <p>Error: {error.message}</p>
    return (
        <div className="relative">
            <h3
                className='text-2xl lg:text-3xl font-bold text-primary mb-5 -mt-30 md:-mt-10 absolute top-1/3 z-110 left-1/2 -translate-x-1/2 '
                style={{ WebkitTextStroke: '1px var(--color-primary-content)' }}
            >Craft Greatness. Launch Contests</h3>
            <h5
                className='text-neutral-content font-bold mb-5 -mt-10 md:mt-0 w-full px-10 text-center absolute top-1/3 z-110 left-1/2 -translate-x-1/2'
            >"Discover, join and create exciting coding contests – compete with peers,<br />showcase your skills and win real prizes all in one collaborative platform."</h5>
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
            <Link
                to='/all-contests'
                className='btn btn-primary absolute top-1/2 mt-20 z-110 left-1/2 
                -translate-x-9/12 '
            >Participate Now</Link>

            <Carousel autoPlay infiniteLoop dynamicHeight={false} showThumbs={false}>
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