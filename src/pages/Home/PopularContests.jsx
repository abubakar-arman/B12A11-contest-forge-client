import { Link } from 'react-router';
import ContestCard from '../Shared/ContestCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/api';
import Spinner2 from '../../Components/Spinner2';

const PopularContents = () => {
    const { data: contests, isLoading, error } = useQuery({
        queryKey: ['popularContests'],
        queryFn: () => api.get(`/api/popular-contests`).then(res => res.data.result),
        select: (contests) => contests.filter(c => c.status === 'approved')
    })
    // console.log('data:', data);

    if (isLoading) return <Spinner2 />
    if (error) return <p>Error: {error.message}</p>
    
    //TopRatedMVs
    return (
        <div className='mt-10 mb-10 text-center'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>Popular Contests</h3>
            <div className="cards grid grid-cols-1 md:grid-cols-3 justify-center lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                {
                    contests?.map((contest, i) => (
                        <ContestCard contest={contest} key={i} />
                    ))
                }

            </div>
            <Link to='/all-contests' className='btn btn-primary btn-lg mt-10'>Show All Contests</Link>
        </div>
    );
};

export default PopularContents;