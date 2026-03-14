import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Hero from '../components/Hero';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user, register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await register(name, email, password);
            navigate('/'); 
        } catch (err) {
            setError(err.message || 'Failed to register');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page px-4">
            <div className="w-full max-w-md animate-in">
                <div className="glass p-10 border-glow-blue relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl -mr-16 -mt-16 rounded-full" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-purple/10 blur-3xl -ml-16 -mb-16 rounded-full" />
                    
                    <div className="relative z-10 text-center mb-10">
                        <h2 className="text-3xl font-bold logo mb-2">Register</h2>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">Create New Account</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 font-mono text-xs animate-shake">
                             [ERROR]: {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                             <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/30 transition-all font-light"
                                required
                            />
                        </div>
                        <div>
                             <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@domain.com"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/30 transition-all font-light"
                                required
                            />
                        </div>
                        <div>
                             <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/30 transition-all font-light"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-full py-4 text-sm tracking-widest uppercase font-bold mt-4"
                        >
                             {isSubmitting ? 'Registering...' : 'Register Account'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-500 text-sm font-light">
                         Existing account? <Link to="/login" className="text-neon-purple hover:text-neon-pink transition hover:underline">Login here</Link>
                    </p>
                </div>
                
                <p className="text-center mt-8 text-[10px] text-gray-600 font-mono uppercase tracking-[0.3em] opacity-50">
                    Network: Mainnet-V1 • Latency: 12ms
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
