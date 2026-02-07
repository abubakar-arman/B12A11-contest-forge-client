import { Link } from 'react-router';
import ContestCard from './ContestCard';

const PopularContents = ({ contests }) => {
    console.log('contests', contests);

    //TopRatedMVs
    return (
        <div className='mt-10 mb-10 text-center' data-aos='zoom-in'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>Popular Contests</h3>
            <div className="cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                {
                    contests.map((contest, i) => (
                        <ContestCard contest={contest} key={i} />
                    ))
                }

            </div>
            <Link to='/all-contests' className='btn btn-primary btn-lg mt-10'>Show All Contests</Link>
        </div>
    );
};

export default PopularContents;