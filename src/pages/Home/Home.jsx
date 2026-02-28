import Banner from './Banner';
import PopularContests from './PopularContests';
import Winners from './Winners';
import Stats from './Stats';
import Reviews from './Reviews';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    // const {user} = useAuth()

    // useEffect(() => {
    //     console.log(user);
    // },[user])

    return (
        <div>
            <Banner />
            <PopularContests />
            <Stats />
            <Winners />
            <Reviews />
        </div>
    );
};

export default Home;