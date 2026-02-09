import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { MdCancel, MdSubject } from "react-icons/md";
import { Link } from 'react-router';

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/users.json')
            const data = await res.json()
            setUsers(data)
        }
        fetchData()
    }, [setUsers])
    console.log('users', users);

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
                        {users.map((user, i) => (
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
                                                    src={`${user.photo}`}
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
            </div>
        </div>
    );
};

export default ManageUsers;