import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { MdSubject } from "react-icons/md";
import { Link } from 'react-router';

const CreatedContests = () => {
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
        <div>
            <h3 className='text-3xl font-bold text-accent-content mb-5 text-center'>My Created Contests</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Contest</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((contest, i) => (
                            <tr key={i}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={`/posters/${contest.banner_url}`}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{contest.contest_name}</div>
                                            <div className="text-sm opacity-50">{contest.prize_money}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {contest.deadline.split('T')[0]}
                                </td>
                                <td>Approved</td>
                                <th className='flex gap-1'>
                                    <Link to={`/contest-details/${contest.id}`} className="btn btn-primary btn-square tooltip" data-tip="Open"><IoIosOpen /></Link>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Edit"><FaEdit /></button>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Submissions"><MdSubject /></button>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Delete"><FaTrash /></button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Contest</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
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
        </div>
    );
};

export default CreatedContests;