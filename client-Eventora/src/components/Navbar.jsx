import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarCheck } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#071739] via-[#0B2C67] to-[#174EA6] shadow-xl">

            <div className="container mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                    >

                        <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-md group-hover:rotate-6 transition">

                            <FaCalendarCheck className="text-[#0B2C67] text-xl" />

                        </div>

                        <div>

                            <h1 className="text-2xl font-extrabold tracking-wide text-white">
                                Eventora
                            </h1>

                            <p className="text-blue-200 text-xs tracking-[2px] uppercase">
                                Event Management
                            </p>

                        </div>

                    </Link>

                    {/* Menu */}

                    <div className="flex flex-wrap items-center justify-center gap-6 font-medium">

                        <Link
                            to="/"
                            className="text-blue-100 hover:text-white transition"
                        >
                            Events
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="text-blue-100 hover:text-white transition"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-white text-[#0B2C67] hover:bg-blue-100 px-5 py-2 rounded-full font-semibold transition shadow-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-blue-100 hover:text-white transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-cyan-400 hover:bg-cyan-300 text-[#071739] px-5 py-2 rounded-full font-bold transition shadow-md"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;