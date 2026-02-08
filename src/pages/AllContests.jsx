import React, { useEffect, useState } from 'react';
import { FaTrophy, FaUsers } from 'react-icons/fa6';
import ContestCard from './Shared/ContestCard';

const AllContests = () => {
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
            <h3 className='text-3xl font-bold text-accent-content mb-5'>All Contests</h3>

            <div className="tabs tabs-border flex justify-center">
                <input type="radio" name="my_tabs_2" className="tab" aria-label="All Contests" defaultChecked />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <div className="cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                        {
                            contests.map((contest, i) => (
                                <ContestCard contest={contest} key={i} />
                            ))
                        }
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Apps" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <div className="cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                        {
                            contests
                                .filter((contest) => contest.category == 'app')
                                .map((contest, i) => (
                                    <ContestCard contest={contest} key={i} />
                                ))
                        }
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Logo" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <div className="cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                        {
                            contests
                                .filter((contest) => contest.category == 'logo')
                                .map((contest, i) => (
                                    <ContestCard contest={contest} key={i} />
                                ))
                        }
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Art" />
                <div className="tab-content border-base-300 bg-base-100 p-10">
                    <div className="cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                        {
                            contests
                                .filter((contest) => contest.category == 'art')
                                .map((contest, i) => (
                                    <ContestCard contest={contest} key={i} />
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllContests;