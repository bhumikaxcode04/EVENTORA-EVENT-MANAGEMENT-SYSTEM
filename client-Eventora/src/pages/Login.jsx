import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                const data = await login(email, password);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            } else {
                const data = await verifyOTP(email, otp);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            }
        } catch (err) {
            if (err.needsVerification) {
                setShowOTP(true);
                setError('Account not verified. A new OTP has been sent to your email.');
            } else {
                setError(err.message || err);
            }
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
                    "linear-gradient(rgba(7,23,57,.80),rgba(7,23,57,.85)),url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1800&auto=format&fit=crop')"
            }}
        >

            <div>

                <span className="bg-cyan-400 text-[#071739] px-4 py-2 rounded-full font-semibold">
                    EVENTORA
                </span>

                <h1 className="text-5xl font-extrabold mt-8 leading-tight">
                    Welcome
                    <br />
                    Back.
                </h1>

                <p className="mt-6 text-blue-100 text-lg leading-8">
                    Manage your bookings, discover exciting events,
                    and never miss an unforgettable experience.
                </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
                    <h2 className="text-3xl font-bold">500+</h2>
                    <p className="text-blue-100 mt-2">Events</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
                    <h2 className="text-3xl font-bold">15K+</h2>
                    <p className="text-blue-100 mt-2">Bookings</p>
                </div>

            </div>

        </div>


        {/* Right Side */}

        <div className="p-10 lg:p-14">

            <h2 className="text-4xl font-bold text-[#071739]">
                Sign In
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
                Continue your event journey.
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

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e)=>setOtp(e.target.value)}
                        maxLength="6"
                        required
                        className="w-full border rounded-xl px-5 py-4 tracking-[10px] text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
                    />

                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#0B2C67] hover:bg-[#174EA6] text-white font-bold transition"
                >
                    {loading
                        ? "Please wait..."
                        : showOTP
                        ? "Verify OTP"
                        : "Login"}
                </button>

            </form>

            <p className="text-center mt-8 text-gray-600">

                Don't have an account?

                <Link
                    to="/register"
                    className="ml-2 font-bold text-[#0B2C67] hover:underline"
                >
                    Register
                </Link>

            </p>

        </div>

    </div>

</div>
);
};

export default Login;