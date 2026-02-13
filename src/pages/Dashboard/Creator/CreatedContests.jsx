import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { MdSubject } from "react-icons/md";
import { Link } from 'react-router';
import api from '../../../config/api';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import Spinner2 from '../../../Components/Spinner2';

const CreatedContests = () => {
    const { user } = useAuth()
    const { data: contests, isLoading, error } = useQuery({
        queryKey: ['contests'],
        queryFn: () => api.get(`/api/contests`).then(res => res.data.result),
        select: (contests) => contests.filter(c => c.created_by === user.email),
        enabled: !!user?.email,
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
    
    const mutationDeregister = useMutation({
        mutationFn: (data) => api.put(`/api/contest/deregister/${data.id}`, {email: data.email}),
        onSuccess: (res) => {
            console.log('Server response:', res.data)
            queryClient.invalidateQueries({ queryKey: ['contests']})
            toast.success('Contest Deregistration successful')
        },
        onError: (err) => console.error('Mutation Failed:', err)
    })

    const [selectedContestId, setSelectedContestId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    if (isLoading) return <Spinner2 />
    if (error) return <p>Error: {error.message}</p>

    // pagination
    const totalPages = Math.ceil(contests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = contests.slice(startIndex, endIndex);

    const selectedContest = contests?.find(c => c._id === selectedContestId)

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
                                    <Link to={`/contest-details/${contest._id}`} className={`btn btn-primary btn-square tooltip`} data-tip="Open"><IoIosOpen /></Link>
                                    <Link to={`/dashboard/update-contest/${contest._id}`} className={`btn btn-primary btn-square tooltip ${contest.status === 'pending' ? '' : 'btn-disabled'}`} data-tip="Edit"><FaEdit /></Link>
                                    <Link to={`/dashboard/submitted-tasks/${contest._id}`} className={`btn btn-primary btn-square tooltip`} data-tip="Submissions"><MdSubject /></Link>

                                    <button
                                        className={`btn btn-primary btn-square tooltip`}
                                        data-tip="Participants"
                                        onClick={() => {
                                            setSelectedContestId(contest._id);
                                            document.getElementById('contest_participants_modal').showModal();
                                        }}
                                    ><FaUsers /></button>

                                    <button
                                        className={`btn btn-primary btn-square tooltip ${contest.status === 'pending' ? '' : 'btn-disabled'}`}
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

                <dialog id="contest_participants_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Participants</h3>
                        <ul className="menu bg-base-200 min-h-full w-80 p-4">
                            {
                                selectedContest?.participated_users.map((usr, i) => (
                                    <li key={i} className="my-1">
                                        <div className="flex justify-between items-center w-full">
                                            <span className="font-medium">{i + 1}. {usr}</span>

                                            <button
                                                className="btn btn-ghost btn-square btn-sm text-red-700 tooltip"
                                                data-tip="Remove"
                                                onClick={() => mutationDeregister.mutate({id: selectedContest._id, email: usr})}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </li>))
                            }

                        </ul>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default CreatedContests;