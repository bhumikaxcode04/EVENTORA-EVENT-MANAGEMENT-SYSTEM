import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400); // 400ms debounce
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
       {/* Hero Section */}

<div className="relative overflow-hidden rounded-[35px] mb-14">

    {/* Background Image */}

    <img
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop"
        alt="Event"
        className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}

    <div className="absolute inset-0 bg-gradient-to-r from-[#081B4B]/90 via-[#0E2F78]/80 to-[#1D4ED8]/75"></div>

    <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">

        <div className="grid lg:grid-cols-2 items-center gap-10">

            {/* Left */}

            <div>

                <span className="inline-flex items-center bg-blue-500/20 border border-blue-300/40 px-5 py-2 rounded-full text-blue-100 text-sm font-medium backdrop-blur-md mb-6">
                    🎉 Welcome to Eventora
                </span>

                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">

                    Discover Amazing

                    <span className="block text-cyan-300">
                        Events Near You
                    </span>

                </h1>

                <p className="mt-6 text-blue-100 text-lg leading-8 max-w-xl">
                    Book concerts, hackathons, workshops, conferences,
                    sports events and college festivals with just a few clicks.
                    Explore events happening around you and reserve your seat instantly.
                </p>

                {/* Search */}

                <div className="relative mt-10 max-w-xl">

                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

                    <input
                        type="text"
                        placeholder="Search your favourite event..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-5 pl-14 pr-5 rounded-full bg-white shadow-2xl border border-blue-200 text-gray-700 outline-none focus:ring-4 focus:ring-cyan-300"
                    />

                </div>

                {/* Stats */}

                <div className="flex gap-10 mt-10 flex-wrap">

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            500+
                        </h2>

                        <p className="text-blue-100">
                            Events
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            15K+
                        </h2>

                        <p className="text-blue-100">
                            Tickets Booked
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            100+
                        </h2>

                        <p className="text-blue-100">
                            Organizers
                        </p>
                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="hidden lg:flex justify-center">

                <div className="relative">

                    {/* Floating Card */}

                    <div className="bg-white rounded-3xl p-8 shadow-2xl w-80">

                        <div className="bg-gradient-to-r from-[#0E2F78] to-[#2563EB] rounded-2xl h-40 flex items-center justify-center">

                            <FaTicketAlt className="text-white text-7xl" />

                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-800">
                            EVENTORA PASS
                        </h2>

                        <p className="text-gray-500 mt-3">
                            One platform to discover concerts, workshops,
                            hackathons, seminars and unforgettable experiences.
                        </p>

                        <button className="mt-6 w-full bg-[#0E2F78] hover:bg-[#1D4ED8] text-white py-3 rounded-xl font-semibold transition">
                            Explore Events
                        </button>

                    </div>

                    {/* Floating Small Cards */}

                    <div className="absolute -left-12 top-10 bg-white rounded-xl shadow-lg px-4 py-3">
                        🎵 Music Fest
                    </div>

                    <div className="absolute -right-12 bottom-10 bg-white rounded-xl shadow-lg px-4 py-3">
                        🎟 250+ Bookings
                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
            {/* Why Choose Us / Features row */}
            {/* Why Choose Eventora */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

    <div className="bg-white rounded-3xl p-8 shadow-lg border-t-4 border-blue-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl mb-6">
            🎫
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Instant Ticket Booking
        </h3>

        <p className="text-gray-600 leading-7">
            Reserve your seat within seconds with a simple, secure booking experience and instant confirmation.
        </p>
    </div>


    <div className="bg-white rounded-3xl p-8 shadow-lg border-t-4 border-indigo-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl mb-6">
            📅
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Manage Events Easily
        </h3>

        <p className="text-gray-600 leading-7">
            Keep track of your registrations, upcoming events and bookings from one personalized dashboard.
        </p>
    </div>


    <div className="bg-white rounded-3xl p-8 shadow-lg border-t-4 border-cyan-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
        <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-3xl mb-6">
            🛡️
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Trusted & Secure
        </h3>

        <p className="text-gray-600 leading-7">
            Protected authentication, secure payments and reliable ticket management for every event.
        </p>
    </div>

</div>

            <div className="flex items-center justify-between mb-8 px-2 border-b border-gray-200 pb-4">
               <div>
    <p className="text-blue-700 font-semibold uppercase tracking-widest text-sm">
        Discover
    </p>

    <h2 className="text-4xl font-black text-gray-900 mt-1">
        Upcoming Events
    </h2>
</div>
                <div className="text-gray-500 font-medium">{events.length} results found</div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-xl font-semibold text-gray-600">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 text-xl text-gray-500">No events found matching your search.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{events.map((event) => (
    <div
        key={event._id}
        className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
    >
        {/* Image */}
        <div className="relative overflow-hidden h-56">
            {event.image ? (
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-3xl font-bold text-blue-800">
                    {event.category}
                </div>
            )}

            {/* Price */}
            <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}
                </span>
            </div>

            {/* Category */}
            <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {event.category}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-[270px]">

            <h2 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2">
                {event.title}
            </h2>

            <div className="space-y-3 text-gray-600 mb-5">

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                    <FaCalendarAlt className="text-blue-700" />
                    <span className="text-sm">
                        {new Date(event.date).toLocaleDateString(undefined,{
                            weekday:"short",
                            day:"numeric",
                            month:"short",
                            year:"numeric"
                        })}
                    </span>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="text-sm truncate">
                        {event.location}
                    </span>
                </div>

            </div>

            {/* Seats */}
            <div className="mt-auto">

                <div className="flex justify-between text-xs mb-2 text-gray-500">
                    <span>Available Seats</span>
                    <span>
                        {event.availableSeats}/{event.totalSeats}
                    </span>
                </div>

                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                    <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-700 to-cyan-500"
                        style={{
                            width: `${(event.availableSeats / event.totalSeats) * 100}%`
                        }}
                    ></div>

                </div>

                <Link
                    to={`/events/${event._id}`}
                    className="mt-6 block text-center bg-gradient-to-r from-[#0E2F78] to-[#2563EB] hover:from-[#081B4B] hover:to-[#1D4ED8] text-white font-semibold py-3 rounded-xl transition duration-300"
                >
                    View Details →
                </Link>

            </div>

        </div>
    </div>
))}
                </div>
            )}

            {/* Footer Section */}
            <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 text-center">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <FaTicketAlt className="text-gray-800 text-2xl" />
                    <span className="text-xl font-bold text-gray-900">Eventora</span>
                </div>
                <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                    The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let's make memories together.
                </p>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    &copy; {new Date().getFullYear()} Eventora Platform. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;