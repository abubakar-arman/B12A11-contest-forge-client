import React, { useEffect, useState } from 'react';
import WinnerCard from '../../Components/WinnerCard';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const Winners = () => {
    const [winners, setWinners] = useState([])
    const swiperRef = React.useRef(null);

    useEffect(() => {
        fetch('/winners.json')
            .then(res => res.json())
            .then(data => setWinners(data))
    }, [])

    useEffect(() => {
        // Force autoplay to start after a small delay
        if (swiperRef.current && swiperRef.current.swiper) {
            setTimeout(() => {
                swiperRef.current.swiper.autoplay.start();
            }, 500);
        }
    }, [winners]);
    return (
        <div className='mt-10 mb-10 text-center'>
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