// Navbar.js
"use client";
import Link from 'next/link';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link href="/" className="navbar-brand">Fitness Hub</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={() => setIsNavExpanded(!isNavExpanded)}
                    aria-controls="navbarNav"
                    aria-expanded={isNavExpanded}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavExpanded ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/fitness-challenge-tracker" className="nav-link">Fitness Challenge Tracker</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/calorie-tracker" className="nav-link">Nutrition Meter</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/health-tracker" className="nav-link">Health Tracker</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
