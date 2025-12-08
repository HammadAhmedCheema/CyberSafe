import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Hero from '../components/Hero';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/'); // Redirect to home on success
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div>
            <Hero title="Login" subtitle="Access your account to report incidents." />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary-blue text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Login
                            </button>
                        </form>
                        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                            Don't have an account? <Link to="/register" className="text-primary-blue hover:underline">Register</Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
