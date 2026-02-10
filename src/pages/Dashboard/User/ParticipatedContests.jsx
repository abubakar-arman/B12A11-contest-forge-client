import React, { useState } from 'react';
import ContestListCard from '../../Shared/ContestListCard';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api';

const ParticipatedContests = () => {
    const {user} = useAuth()
    const {data: userData } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: () => api.get('/api/user/find/' + user.email),
        enabled: !!user?.email
    })
    const participated_contest_ids = userData?.data.result.participated_contests || []
    // console.log(participated_contest_ids);

    const { data: contestData, isLoading : contestIsLoading, error: contestError } = useQuery({
        queryKey: ['contests'],
        queryFn: () => api.get(`/api/contests`),
    })
    
    
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    
    if (contestIsLoading) return <div className="text-center p-10">Loading contests...</div>;
    if (contestError) return <p>Error: {contestError.message}</p>
    const contests = contestData?.data?.result
    const filteredContests = contests.filter(contest => participated_contest_ids?.includes(contest._id))
    // console.log('ff',contests);
    
    // pagination
    const totalPages = Math.ceil(filteredContests?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredContests.slice(startIndex, endIndex);

    return (
        <div className='mt-10 mb-10 text-center'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>My Participated Contests</h3>
            <div className="cards grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                {
                    currentItems.map((contest, i) => (
                        <ContestListCard contest={contest} key={i} />
                    ))
                }

            </div>
            {/* Pagination */}
            <div className="join flex justify-center mt-5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ParticipatedContests;