import React from 'react';
import { FaTasks, FaUserCircle } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router';
import { GiDiamondTrophy } from "react-icons/gi";
import { GrTrophy } from "react-icons/gr";
import { ToastContainer } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import api from '../config/api';
import { IoIosAddCircle } from 'react-icons/io';
import { MdCreateNewFolder, MdDarkMode, MdLightMode } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';


const DashboardLayout = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const { data, isLoading, error } = useQuery({
        queryKey: ['userData'],
        queryFn: () => api.get(`/api/user/find/` + user.email),
        enabled: !!user
    })
    // console.log(_id);
    
    const navigate = useNavigate()
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

    useEffect(() => {
        const html = document.querySelector('html')
        html.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleLogout = () => {
        logout();
        navigate('/')
    }

    const handleTheme = checked => {
        const theme = checked ? 'dark' : 'light'
        setTheme(theme)
    }


    if (isLoading) return <div className="text-center p-10">Loading user...</div>;
    if (error) return <p>Error: {error.message}</p>
    const userData = data?.data?.result
    const _id = userData._id

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <div className='navbar-start'>
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    </div>
                    <div className="navbar-end">

                        {isAuthenticated &&
                            <div className="dropdown">

                                <div tabIndex={0} role='button' className="avatar mr-4">
                                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="dropdown-content card card-sm bg-base-100 z-100 w-64 shadow-md right-0">
                                    <div className="card-body">
                                        <p className='font-semibold text-xl'>{user.displayName}</p>
                                        <p>Email : {user.email}</p>
                                        <button onClick={handleLogout} className="btn bg-red-700 text-base-100">Logout</button>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="theme flex items-center gap-2">
                            <MdLightMode /><input onChange={(e) => handleTheme(e.target.checked)} checked={theme === 'dark' ? 'checked' : ''} type="checkbox" className="toggle" /><MdDarkMode />
                        </div>
                    </div>
                </nav>
                {/* Page content here */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/dashboard/my-participated-contests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right">Participated Contests</Link>
                        </li> */}

                        {/* User Nav*/}
                        <li>
                            <Link to="/dashboard/my-participated-contests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Participated Contests">
                                <GrTrophy />
                                <span className="is-drawer-close:hidden">Participated Contests</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-winning-contests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Winning Contests">
                                <GiDiamondTrophy />
                                <span className="is-drawer-close:hidden">Winning Contests</span>
                            </Link>
                        </li>

                        {/* Creator Nav*/}
                        <li>
                            <Link to="/dashboard/add-contest" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Contest">
                                <IoIosAddCircle />
                                <span className="is-drawer-close:hidden">Add Contest</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/created-contests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Created Contests">
                                <MdCreateNewFolder />
                                <span className="is-drawer-close:hidden">My Created Contests</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/submitted-tasks" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Submitted Tasks">
                                <FaTasks />
                                <span className="is-drawer-close:hidden">Submitted Tasks</span>
                            </Link>
                        </li>

                        {/* Admin Nav*/}
                        <li>
                            <Link to="/dashboard/manage-contests" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Contests">
                                <MdCreateNewFolder />
                                <span className="is-drawer-close:hidden">Manage Contests</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/manage-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
                                <GiDiamondTrophy />
                                <span className="is-drawer-close:hidden">Manage Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/dashboard/profile/" + _id} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                                <FaUserCircle />
                                <span className="is-drawer-close:hidden">Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default DashboardLayout;