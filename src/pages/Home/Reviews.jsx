import React, { useEffect, useState } from 'react';
import ReviewCard from '../../Components/ReviewCard';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const swiperRef = React.useRef(null);

    useEffect(() => {
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    console.log('reviews', reviews);


    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setTimeout(() => {
                swiperRef.current.swiper.autoplay.start();
            }, 500);
        }
    }, [reviews]);

    return (
        <div className='mt-10 mb-10 text-center'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>Reviews</h3>
            <div className="cards w-full">
                <Swiper
                    ref={swiperRef}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}  // Mobile: 1 slide
                    breakpoints={{
                        640: { slidesPerView: 2 },      // Tablet: 2 slides
                        1024: { slidesPerView: 3 },     // Desktop: 3 slides
                    }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        waitForTransition: false,
                    }}
                    loop={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {reviews.map((review, i) =>
                        <SwiperSlide key={i}>
                            <div className="flex justify-center">
                                <ReviewCard review={review} />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;