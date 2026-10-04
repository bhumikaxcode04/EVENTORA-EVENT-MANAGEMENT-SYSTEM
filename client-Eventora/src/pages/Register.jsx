import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

 return (
<div className="min-h-screen flex items-center justify-center bg-slate-100 px-6 py-10">

    <div className="grid lg:grid-cols-2 bg-white rounded-[35px] overflow-hidden shadow-2xl max-w-6xl w-full">

        {/* Left Side */}

        <div
            className="hidden lg:flex relative p-12 text-white flex-col justify-between bg-cover bg-center"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(7,23,57,.82),rgba(7,23,57,.86)),url('https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1800&auto=format&fit=crop')"
            }}
        >

            <div>

                <span className="bg-cyan-400 text-[#071739] px-4 py-2 rounded-full font-semibold">
                    EVENTORA
                </span>

                <h1 className="text-5xl font-extrabold mt-8 leading-tight">
                    Join The
                    <br />
                    Community.
                </h1>

                <p className="mt-6 text-blue-100 text-lg leading-8">
                    Create your Eventora account to discover amazing events,
                    book tickets instantly and manage all your registrations
                    from one place.
                </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
                    <h2 className="text-3xl font-bold">500+</h2>
                    <p className="text-blue-100 mt-2">Events</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
                    <h2 className="text-3xl font-bold">20K+</h2>
                    <p className="text-blue-100 mt-2">Users</p>
                </div>

            </div>

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-14">

            <h2 className="text-4xl font-bold text-[#071739]">
                Create Account
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
                Start your journey with Eventora.
            </p>

            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {!showOTP ? (
                    <>

                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />

                    </>
                ) : (

                    <>
                        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">
                            A verification code has been sent to your email.
                        </div>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            required
                            maxLength="6"
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                            className="w-full border rounded-xl px-5 py-4 tracking-[10px] text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                    </>

                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#0B2C67] hover:bg-[#174EA6] text-white font-bold transition"
                >
                    {loading
                        ? "Please wait..."
                        : showOTP
                        ? "Verify Account"
                        : "Create Account"}
                </button>

            </form>

            {!showOTP && (

                <p className="text-center mt-8 text-gray-600">

                    Already have an account?

                    <Link
                        to="/login"
                        className="ml-2 font-bold text-[#0B2C67] hover:underline"
                    >
                        Login
                    </Link>

                </p>

            )}

        </div>

    </div>

</div>
);
};

export default Register;