import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Navbar = () => {
    const { logout, isAuthenticated, user } = useAuth()
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

    const navLinks = <>
        <li key={1}>
            <NavLink to='/' >Home</NavLink>
        </li>
        <li key={2}>
            <NavLink to='/all-contests' >All Contests</NavLink>
        </li>
        {isAuthenticated ?
            <>
                <li key={3}>
                    <NavLink to='/dashboard/' >My Dashboard</NavLink>
                </li>
            </>
            :
            <>
                <li key={33}>
                    <NavLink to='/leaderboard' >Leaderboard</NavLink>
                </li>
                <li key={3}>
                    <NavLink to='/login' >Login</NavLink>
                </li>
                <li key={4}>
                    <NavLink to='/signup' >Signup</NavLink>
                </li>
            </>
        }
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="font-semibold menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <div>
                        <Logo />
                    </div>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    {navLinks}
                </ul>
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
        </div>
    );
};

export default Navbar;