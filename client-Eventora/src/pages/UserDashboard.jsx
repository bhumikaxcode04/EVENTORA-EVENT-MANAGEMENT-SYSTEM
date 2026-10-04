import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaTimesCircle } from 'react-icons/fa';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (window.confirm('Are you sure you want to cancel this booking request?')) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling booking');
            }
        }
    };

    if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading dashboard...</div>;

    return (
        <div className="max-w-6xl mx-auto">
<div className="relative overflow-hidden rounded-3xl mb-10 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 p-8 shadow-xl">

    {/* Decorative Circle */}
    <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full"></div>

    <div className="relative flex items-center gap-6">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-white text-gray-900 flex items-center justify-center text-4xl font-black shadow-lg">
            {user?.name.charAt(0).toUpperCase()}
        </div>

        {/* Text */}
        <div>
            <h1 className="text-3xl font-bold text-white">
                {user?.name}
            </h1>

            <p className="text-gray-300 mt-1">
                User Dashboard
            </p>
        </div>

    </div>

</div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                    <FaTicketAlt className="text-gray-700" /> My Bookings requests
                </h2>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaTicketAlt className="text-gray-300 text-3xl" />
                    </div>
                    <p className="text-xl text-gray-500 mb-6 mt-4 font-medium">You haven't booked any events yet.</p>
                    <Link to="/" className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition shadow-md">
                        Browse Events
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
<div
    key={booking._id}
    className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden"
>

    <div className="h-2 bg-gradient-to-r from-[#0E2F78] via-[#2563EB] to-cyan-400"></div>

    <div className="p-6">

        <div className="flex justify-between items-start">

            <div>

                <p className="uppercase text-xs tracking-widest text-blue-700 font-bold">
                    Event
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-2 leading-tight">
                    {booking.eventId.title}
                </h3>

            </div>

            <div className="flex flex-col gap-2">

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                }`}>
                    {booking.status}
                </span>

                {booking.status !== 'cancelled' && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.paymentStatus === 'paid'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                        {booking.paymentStatus}
                    </span>
                )}

            </div>

        </div>

        <div className="mt-6 space-y-4">

            <div className="flex justify-between">

                <span className="text-gray-500">📅 Date</span>

                <span className="font-semibold">
                    {new Date(booking.eventId.date).toLocaleDateString()}
                </span>

            </div>

            <div className="flex justify-between">

                <span className="text-gray-500">💳 Amount</span>

                <span className="font-semibold">
                    {booking.amount === 0 ? "FREE" : `₹${booking.amount}`}
                </span>

            </div>

            <div className="flex justify-between">

                <span className="text-gray-500">🕒 Booked</span>

                <span className="font-semibold">
                    {new Date(booking.bookedAt).toLocaleDateString()}
                </span>

            </div>

        </div>

    </div>

    <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">

        <Link
            to={`/events/${booking.eventId._id}`}
            className="font-semibold text-blue-700 hover:text-blue-900"
        >
            View Event →
        </Link>

        <button
            onClick={() => cancelBooking(booking._id)}
            className="text-red-500 hover:text-red-700 font-semibold flex items-center gap-2"
        >
            <FaTimesCircle />
            Cancel
        </button>

    </div>

</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;