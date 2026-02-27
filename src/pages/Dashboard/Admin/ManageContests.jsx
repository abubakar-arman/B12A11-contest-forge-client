import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import Spinner2 from '../../../Components/Spinner2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageContests = () => {
    const axiosSecure = useAxiosSecure()
    const { data: contests, isLoading, error } = useQuery({
        queryKey: ['contests'],
        queryFn: () => axiosSecure.get(`/api/contests`).then(res => res.data.result),
    })

    const queryClient = useQueryClient();
    const mutationDelete = useMutation({
        mutationFn: (_id) => axiosSecure.delete(`/api/contests/${_id}`),
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['contests'] })

            toast.success('Contest deleted')
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })
    const mutationReject = useMutation({
        mutationFn: (contest) => {
            const { _id, status, ...rest } = contest // eslint-disable-line
            const newData = { ...rest, status: "rejected" }
            return axiosSecure.put(`/api/contests/${_id}`, newData)
        },
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['contests'] })

            toast.success('Status Updated')
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })
    const mutationApprove = useMutation({
        mutationFn: (contest) => {
            const { _id, status, ...rest } = contest // eslint-disable-line
            const newData = { ...rest, status: "approved" }
            return axiosSecure.put(`/api/contests/${_id}`, newData)
        },
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['contests'] })

            toast.success('Status updated')
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    if (isLoading) return <Spinner2 />
    if (error) return <p>Error: {error.message}</p>


    // pagination
    const totalPages = Math.ceil(contests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = contests.slice(startIndex, endIndex);

    return (
        <div>
            <h3 className='text-3xl font-bold text-accent-content mb-5 text-center'>Manage Contests</h3>
            {!currentItems.length ? <h5 className='text-xl text-center font-bold text-neutral mb-5'>No items to show</h5> : ''}
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
                                                    src={contest.image}
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
                                <td>
                                    <span
                                        className={`font-bold ${contest.status == 'approved' ? 'text-green-600'
                                            : contest.status === 'rejected' ? 'text-red-600' : 'text-gray-500'}`}>
                                        {contest.status?.toUpperCase()}
                                    </span>
                                </td>
                                <th className='flex gap-1'>
                                    <Link to={`/contest-details/${contest._id}`} className="btn btn-primary btn-square tooltip" data-tip="Open"><IoIosOpen /></Link>
                                    <button
                                        className={`btn btn-primary btn-square tooltip${contest.status === 'approved' ? ' btn-disabled' : ''}`}
                                        data-tip="Approve"
                                        onClick={() => mutationApprove.mutate(contest)}
                                    ><FaCheckCircle /></button>
                                    <button
                                        className={`btn btn-primary btn-square tooltip${contest.status === 'rejected' ? ' btn-disabled' : ''}`}
                                        data-tip="Reject"
                                        onClick={() => mutationReject.mutate(contest)}
                                    ><IoIosCloseCircle /></button>
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

export default ManageContests;