import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="logo">CyberSafe</h1>
                <nav className="nav">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/threats" className="nav-link">Threats</NavLink>
                    <NavLink to="/practices" className="nav-link">Practices</NavLink>
                    <NavLink to="/resources" className="nav-link">Resources</NavLink>
                    <NavLink to="/news" className="nav-link">News</NavLink>
                    <NavLink to="/incidents" className="nav-link">Alerts</NavLink>
                    <NavLink to="/contact" className="nav-link">Report</NavLink>
                    
                    {user ? (
                        <>
                            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                            <span className="text-gray-600 dark:text-gray-300 mx-2">Hi, {user.name}</span>
                            <button onClick={handleLogout} className="nav-link text-red-500 hover:text-red-700">Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                    )}
                    
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Header;