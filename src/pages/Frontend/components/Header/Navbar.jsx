import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

import { auth } from '../../../../config/firebase'
import { signOut } from 'firebase/auth'

import Home from '../../Home'
import About from '../../About'
import Contact from '../../Contact'
import Todos from '../../Todos'

function Navbar() {

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/Contact' },
        { name: 'About', path: '/About' },
        { name: 'Todos', path: '/Todos' },
    ];

    const { isAuthenticated, dispatch } = useContext(AuthContext);

    // console.log('dispatch', dispatch)

    const handleLogout = () => {

        signOut(auth)
            .then(() => {
                dispatch({ type: 'LOGOUT' })
                toast.success('Use is Logout');
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <nav className={`w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 shadow-md backdrop-blur-lg py-3 md:py-4`}>
            {/* Desktop Nav */}
            <div className="flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 text-gray-700 `}>
                        {link.name}
                        <div className={`bg-[#449DD1] h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
            </div>

            {/* Desktop Right */}
            <div className='flex gap-2'>
                {isAuthenticated
                    ? <>
                        <Link to='/Dashboard' className="bg-[#449DD1] !text-white px-8 py-2.5 rounded-full cursor-pointer">Dashboard</Link>
                        <button onClick={handleLogout} className="bg-red-600 !text-white px-8 py-2.5 rounded-full cursor-pointer">Logout</button>
                    </>
                    : <Link to='/authentication/Login' className="bg-[#449DD1] !text-white px-8 py-2.5 rounded-full cursor-pointer">Login</Link>
                }

            </div>

        </nav>
    )
}

export default Navbar