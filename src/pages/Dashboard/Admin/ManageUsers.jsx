import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { MdCancel, MdSubject } from "react-icons/md";
import { Link } from 'react-router';
import api from '../../../config/api';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import Spinner2 from '../../../Components/Spinner2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => axiosSecure.get(`/api/users`).then(res => res.data.result),
    })
    // console.log('data:', data);

    const queryClient = useQueryClient();
    const mutationChangeRole = useMutation({
        mutationFn: (updatedUser) => {
            const { _id, ...userData } = updatedUser
            return api.put(`/api/users/${_id}`, userData)
        },
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['users'] })

            toast.success('Role updated')
            // console.log('Role Updated');
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })

    const mutationDelete = useMutation({
        mutationFn: (_id) => api.delete(`/api/users/${_id}`),
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['users'] })

            toast.success('User deleted')
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })

    const [selectedUser, setSelectedUser] = useState(null)
    const [newRole, setNewRole] = useState('user')
    const modalRef = useRef(null)

    const handleChangeRole = (user) => {
        setSelectedUser(user)
        setNewRole(user.role)
        modalRef.current?.showModal()
    }

    const handleSubmitRoleChange = async () => {
        if (newRole === selectedUser.role) {
            toast.warning('Select a different role');
            return;
        }
        // return
        mutationChangeRole.mutateAsync({ ...selectedUser, role: newRole })
        modalRef.current?.close()
    }

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    if (isLoading) return <Spinner2 />
    if (error) return <p>Error: {error.message}</p>

    // pagination
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = users.slice(startIndex, endIndex);

    return (
        <div>
            <h3 className='text-3xl font-bold text-accent-content mb-5 text-center'>Manage Users</h3>
            {!currentItems.length ? <h5 className='text-xl font-bold text-neutral mb-5'>No items to show</h5> : ''}
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
                                        {user.name}
                                    </div>
                                </td>
                                <td>
                                    {user.id}
                                </td>
                                <td>{user.email}</td>
                                <td>{user?.role?.toUpperCase()}</td>
                                <th className='flex gap-1'>
                                    <Link to={`/dashboard/profile/${user._id}`} className="btn btn-primary btn-square tooltip" data-tip="Open Profile"><IoIosOpen /></Link>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Change Role"
                                        onClick={() => handleChangeRole(user)}><FaEdit /></button>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Remove User"
                                    onClick={() => mutationDelete.mutate(user._id)}><MdCancel /></button>
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
            {/* Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change User Role</h3>
                    {selectedUser && (
                        <div>
                            <p className="py-4">User: <strong>{selectedUser.name || selectedUser.email}</strong></p>
                            <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="creator">Creator</option>
                            </select>
                        </div>
                    )}
                    <div className="modal-action">
                        <button onClick={() => handleSubmitRoleChange()} className="btn btn-primary">
                            Save
                        </button>
                        <button onClick={() => modalRef.current?.close()} className="btn">
                            Close
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ManageUsers;