import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { MdCancel, MdSubject } from "react-icons/md";
import { Link } from 'react-router';
import api from '../../../config/api';

const ManageUsers = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => api.get(`/api/users`),
    })
    // console.log('data:', data);

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    if (isLoading) return <div className="text-center p-10">Loading Users...</div>;
    if (error) return <p>Error: {error.message}</p>
    const users = data.data.result

    // pagination
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = users.slice(startIndex, endIndex);

    return (
        <div>
            <h3 className='text-3xl font-bold text-accent-content mb-5 text-center'>Manage Users</h3>
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
                            <th>User</th>
                            <th>UserID</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((user, i) => (
                            <tr key={i}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12 ">
                                                <img
                                                    src={`${user.photoUrl}`}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.id}
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role.toUpperCase()}</td>
                                <th className='flex gap-1'>
                                    <Link to={`/user-profile/${user.id}`} className="btn btn-primary btn-square tooltip" data-tip="Open Profile"><IoIosOpen /></Link>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Change Role"><FaEdit /></button>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Remove User"><MdCancel /></button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>User</th>
                            <th>UserID</th>
                            <th>Email</th>
                            <th>Role</th>
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

export default ManageUsers;