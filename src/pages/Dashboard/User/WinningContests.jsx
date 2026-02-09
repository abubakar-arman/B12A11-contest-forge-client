import { useEffect, useState } from 'react';
import ContestListWinCard from '../../Shared/ContestListWinCard';

const WinningContests = () => {
    const [contests, setContests] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api.json')
            const data = await res.json()
            setContests(data)
        }
        fetchData()
    }, [setContests])
    console.log('contests', contests);

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