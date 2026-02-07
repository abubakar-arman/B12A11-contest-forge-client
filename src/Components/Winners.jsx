import React, { useEffect, useState } from 'react';
import WinnerCard from './WinnerCard';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const Winners = () => {
    const [winners, setWinners] = useState([])

    useEffect(() => {
        fetch('/winners.json')
            .then(res => res.json())
            .then(data => setWinners(data))
    }, [])
    return (
        <div className='mt-10 mb-10 text-center'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>Contest Winners</h3>
            <div className="cards w-full">
                <Swiper
                    slidesPerView={4}
                    centeredSlides={true}
                    spaceBetween={0}
                    grabCursor={true}
                    loop={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                        waitForTransition: false,
                        pauseOnMouseEnter: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {winners.map((winner, i) => <SwiperSlide key={i}><WinnerCard winner={winner} /></SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    );
};

export default Winners;