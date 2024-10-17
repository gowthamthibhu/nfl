// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Sidebar.css'; 

const Sidebar = () => {
    return (
        <nav className="sidebar" aria-label="Main navigation">
            <h2 className="sidebar-title">Menu</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
                </li>
                <li>
                    <Link to="/programs" className="sidebar-link">Programs</Link>
                </li>
                <li>
                    <Link to="/learners" className="sidebar-link">Learners</Link>
                </li>
                <li>
                    <Link to="/analytics" className="sidebar-link">Analytics</Link>
                </li>
                <li>
                    <Link to="/assessment" className="sidebar-link">Assessment</Link>
                </li>
                <li>
                    <Link to="/settings" className="sidebar-link">Settings</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
