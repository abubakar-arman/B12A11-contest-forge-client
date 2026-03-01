import { Link } from 'react-router';
import ContestCard from '../Shared/ContestCard';
import { useQuery } from '@tanstack/react-query';
import Spinner2 from '../../Components/Spinner2';
import useAxiosSecure from '../../hooks/useAxiosSecure'

const PopularContests = () => {
    const axiosSecure = useAxiosSecure()
    const { data: contests, isLoading, error } = useQuery({
        queryKey: ['popularContests'],
        queryFn: () => axiosSecure.get(`/api/popular-contests`).then(res => res.data.result),
        select: (contests) => contests.filter(c => c.status === 'approved')
    })
    // console.log('data:', data);

    if (isLoading) return <Spinner2 />
    if (error) return <p>Error: {error.message}</p>

    //TopRatedMVs
    return (
        <div className='mt-10 mb-10 text-center' data-aos='slide-up'>
            <h3 className='text-3xl font-bold text-base-content mb-5'>Popular Contests</h3>
            {!contests.length ? <h5 className='text-xl text-center font-bold text-neutral mb-5'>No items to show</h5> : ''}
            <div className="cards grid grid-cols-1 md:grid-cols-3 md:gap-4 justify-center lg:grid-cols-4 lg:gap-8 space-y-2 lg:space-y-0 px-5 lg:px-20">
                {
                    contests?.map((contest, i) => (
                        <ContestCard contest={contest} key={i} />
                    ))
                }

            </div>
            {!!contests.length && <Link to='/all-contests' className='btn btn-primary btn-lg mt-10'>Show All Contests</Link>}
        </div>
    );
};

export default PopularContests;