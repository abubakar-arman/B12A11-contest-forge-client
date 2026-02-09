import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { MdSubject } from "react-icons/md";
import { Link } from 'react-router';
import api from '../../../config/api';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const CreatedContests = () => {
    const {user} = useAuth()
    const { data, isLoading, error } = useQuery({
        queryKey: ['contests'],
        queryFn: () => api.get(`/api/contests`),
    })

    const queryClient = useQueryClient();
    const mutationDelete = useMutation({
        mutationFn: (_id) => api.delete(`/api/contests/${_id}`),
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['contests'] })

            toast.success('Contest deleted')
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    if (isLoading) return <div className="text-center p-10">Loading contests...</div>;
    if (error) return <p>Error: {error.message}</p>
    const contests = data.data.result
    const creatorContests = contests.filter(contest => contest.created_by == user.email)

    // pagination
    const totalPages = Math.ceil(creatorContests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = creatorContests.slice(startIndex, endIndex);
    
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
                            <th>Created By</th>
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
                                                    src={`/posters/${contest.image}`}
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
                                    {contest.created_by}
                                </td>
                                <td>
                                    {contest.deadline?.split('T')[0]}
                                </td>
                                <td>Approved</td>
                                <th className='flex gap-1'>
                                    <Link to={`/contest-details/${contest._id}`} className="btn btn-primary btn-square tooltip" data-tip="Open"><IoIosOpen /></Link>
                                    <Link to={`/dashboard/update-contest/${contest._id}`} className="btn btn-primary btn-square tooltip" data-tip="Edit"><FaEdit /></Link>
                                    <Link to={`/dashboard/submitted-tasks/${contest._id}`} className="btn btn-primary btn-square tooltip" data-tip="Submissions"><MdSubject /></Link>
                                    <button
                                        className="btn btn-primary btn-square tooltip"
                                        data-tip="Delete"
                                        onClick={() => mutationDelete.mutate(contest._id)}
                                    ><FaTrash /></button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Contest</th>
                            <th>Created By</th>
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