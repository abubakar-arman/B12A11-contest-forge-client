import React, { useEffect } from 'react';
import WinnerCard from '../../Components/WinnerCard';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner2 from '../../Components/Spinner2';

const Winners = () => {
    const axiosSecure = useAxiosSecure()
    const { data: winners, isLoading, error } = useQuery({
        queryKey: ['winners'],
        queryFn: () => axiosSecure.get(`/api/winners`).then(res => res.data.result),
    })
    const swiperRef = React.useRef(null);

    useEffect(() => {
        // Force autoplay to start after a small delay
        if (swiperRef.current && swiperRef.current.swiper) {
            setTimeout(() => {
                swiperRef.current.swiper.autoplay.start();
            }, 500);
        }
    }, [winners]);

    if (isLoading) return <Spinner2 />
    if (error) return <p>Error: {error.message}</p>
    return (
        <div className='mt-10 mb-10 text-center' data-aos='fade-right'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>Contest Winners</h3>
            <div className="cards w-full">
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    centeredSlides={true}
                    spaceBetween={20}
                    grabCursor={true}
                    loop={true}
                    initialSlide={Math.floor(winners.length / 2)}  // ← Start from center
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        waitForTransition: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                    onInit={(swiper) => swiper.autoplay.start()}
                >
                    {winners.map((winner, i) => (
                        <SwiperSlide key={i}>
                            <div className="flex justify-center">
                                <WinnerCard winner={winner} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Winners;