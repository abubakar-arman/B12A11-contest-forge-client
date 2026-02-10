import { useState } from 'react';
import ContestListWinCard from '../../Shared/ContestListWinCard';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api';
import Spinner2 from '../../../Components/Spinner2';

const WinningContests = () => {
    const {user} = useAuth()
    const {data: winning_contest_ids, isLoading: idsLoading } = useQuery({
        queryKey: ['userData', user?.email],
        queryFn: () => api.get('/api/user/find/' + user.email).then(res => res.data.result.winning_contests),
        enabled: !!user?.email
    })

    const { data: contests, isLoading : contestsLoading, error: contestError } = useQuery({
        queryKey: ['contests'],
        queryFn: () => api.get(`/api/contests`).then(res => res.data.result),
        select: (contests) => contests.filter(c => c.status === 'approved' && winning_contest_ids.includes(c._id)),
        enabled: !!winning_contest_ids,
    })

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    if (contestsLoading || idsLoading) return <Spinner2 />
    if (contestError) return <p>Error: {contestError.message}</p>
    
    // pagination
    const totalPages = Math.ceil(contests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = contests.slice(startIndex, endIndex);

    return (
        <div className='mt-10 mb-10 text-center'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>My Winning Contests</h3>
            <div className="cards grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                {
                    currentItems.map((contest, i) => (
                        <ContestListWinCard contest={contest} key={i} />
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

export default WinningContests;