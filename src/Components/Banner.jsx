import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel'

const Banner = () => {
    return (
        <div className="banner">
            <Carousel autoPlay infiniteLoop dynamicHeight="false">
                <div>
                    <img src="/carousel/slide1.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/carousel/slide2.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;