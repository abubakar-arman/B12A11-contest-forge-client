import { FaTrophy, FaUsers } from 'react-icons/fa6';
import ContestCard from './Shared/ContestCard';
import { useQuery } from '@tanstack/react-query';
import Spinner2 from '../Components/Spinner2';
import useAxiosSecure from '../hooks/useAxiosSecure'

const AllContests = () => {
    const axiosSecure = useAxiosSecure()
    const { data: contests, isLoading, error } = useQuery({
        queryKey: ['contests'],
        queryFn: () => axiosSecure.get(`/api/contests`).then(res => res.data.result),
        select: (contests) => contests.filter(c => c.status === 'approved')
    })
    // console.log('data:', contests);

    if (isLoading) return <Spinner2 />;
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className='mt-10 mb-10 text-center'>
            <h3 className='text-3xl font-bold text-base-content mb-5'>All Contests</h3>

            <div className="tabs tabs-border flex justify-center">
                <input type="radio" name="my_tabs_2" className="tab" aria-label="All Contests" defaultChecked />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <div className="cards grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-8 space-y-2 lg:space-y-0 lg:px-20">
                        {
                            contests.map((contest, i) => (
                                <ContestCard contest={contest} key={i} />
                            ))
                        }
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Apps" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <div className="cards grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-8 space-y-2 lg:space-y-0 lg:px-20">
                        {
                            contests
                                .filter((contest) => contest.contest_type == 'app')
                                .map((contest, i) => (
                                    <ContestCard contest={contest} key={i} />
                                ))
                        }
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Logo" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <div className="cards grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-8 space-y-w lg:space-y-0 lg:px-20">
                        {
                            contests
                                .filter((contest) => contest.contest_type == 'logo')
                                .map((contest, i) => (
                                    <ContestCard contest={contest} key={i} />
                                ))
                        }
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Art" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <div className="cards grid grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-8 space-y-2 lg:space-y-0 lg:px-20">
                        {
                            contests
                                .filter((contest) => contest.contest_type == 'art')
                                .map((contest, i) => (
                                    <ContestCard contest={contest} key={i} />
                                ))
                        }
                    </div>
                </div>
            </div>
            {!contests.length ? <h5 className='text-xl text-center font-bold text-neutral mb-5'>No items to show</h5> : ''}
        </div>
    );
};

export default AllContests;