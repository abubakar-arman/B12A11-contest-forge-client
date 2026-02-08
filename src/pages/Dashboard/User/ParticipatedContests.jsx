import React, { useEffect, useState } from 'react';
import ContestCard from '../../Shared/ContestCard';
import ContestListCard from '../../Shared/ContestListCard';

const ParticipatedContests = () => {
    const [contests, setContests] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api.json')
            const data = await res.json()
            setContests(data)
        }
        fetchData()
    }, [setContests])
    console.log('contests', contests);

    return (
        <div className='mt-10 mb-10 text-center'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>My Participated Contests</h3>
            <div className="cards grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                {
                    contests.map((contest, i) => (
                        <ContestListCard contest={contest} key={i} />
                    ))
                }

            </div>
        </div>
    );
};

export default ParticipatedContests;