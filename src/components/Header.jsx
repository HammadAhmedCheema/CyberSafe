import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="logo">CyberSafe</h1>
                {/* Simple Menu Toggle instead of "three lines" if user prefers, but standard hamburger with md:hidden is usually best. 
                    However, the user said "remove the three lines". I will replace it with a "MENU" text button for a cleaner cyber look. */}
                <button 
                    className="md:hidden text-neon-blue font-mono text-xs tracking-widest px-3 py-1 border border-neon-blue/30 rounded-lg hover:bg-neon-blue/10 transition z-50 uppercase"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? 'CLOSE' : 'MENU'}
                </button>

                <nav className={`nav ${isMenuOpen ? 'hidden' : 'hidden md:flex'}`}>
                    <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
                    <NavLink to="/threats" className="nav-link" onClick={closeMenu}>Threats</NavLink>
                    <NavLink to="/practices" className="nav-link" onClick={closeMenu}>Practices</NavLink>
                    <NavLink to="/resources" className="nav-link" onClick={closeMenu}>Resources</NavLink>
                    <NavLink to="/news" className="nav-link" onClick={closeMenu}>News</NavLink>
                    <NavLink to="/incidents" className="nav-link" onClick={closeMenu}>Alerts</NavLink>
                    <NavLink to="/contact" className="nav-link" onClick={closeMenu}>Report</NavLink>
                    
                    {user ? (
                        <div className="flex items-center gap-4 ml-2 pl-4 border-l border-white/10">
                            {user.role === 'admin' && (
                                <NavLink to="/dashboard" className="nav-dashboard" onClick={closeMenu}>Dashboard</NavLink>
                            )}
                            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-xs uppercase font-bold tracking-tighter border border-red-500/20 px-3 py-1.5 rounded hover:bg-red-500/5 transition">Exit</button>
                        </div>
                    ) : (
                        <NavLink to="/login" className="btn btn-primary ml-4 py-2 text-xs" onClick={closeMenu}>Login</NavLink>
                    )}
                </nav>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center glass animate-in p-10">
                        <div className="flex flex-col items-center gap-6 w-full max-w-xs text-center">
                            <NavLink to="/" className="nav-link text-2xl" onClick={closeMenu}>Home</NavLink>
                            <NavLink to="/threats" className="nav-link text-2xl" onClick={closeMenu}>Threats</NavLink>
                            <NavLink to="/practices" className="nav-link text-2xl" onClick={closeMenu}>Practices</NavLink>
                            <NavLink to="/resources" className="nav-link text-2xl" onClick={closeMenu}>Resources</NavLink>
                            <NavLink to="/news" className="nav-link text-2xl" onClick={closeMenu}>News</NavLink>
                            <NavLink to="/incidents" className="nav-link text-2xl" onClick={closeMenu}>Alerts</NavLink>
                            <NavLink to="/contact" className="nav-link text-2xl" onClick={closeMenu}>Report</NavLink>
                            
                            <div className="w-full h-px bg-white/10 my-4" />
                            
                            {user ? (
                                <>
                                    {user.role === 'admin' && (
                                        <NavLink to="/dashboard" className="nav-link text-2xl" onClick={closeMenu}>Dashboard</NavLink>
                                    )}
                                    <button onClick={() => { handleLogout(); closeMenu(); }} className="btn btn-primary w-full py-4">Logout</button>
                                </>
                            ) : (
                                <NavLink to="/login" className="btn btn-primary w-full py-4" onClick={closeMenu}>Login</NavLink>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;