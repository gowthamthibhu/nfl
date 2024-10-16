import React from 'react';
import { Link } from 'react-router-dom'; // Using React Router for navigation
import './Sidebar.css'; // Import the CSS for the sidebar

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Menu</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
                </li>
                <li>
                    <Link to="/settings" className="sidebar-link">Settings</Link>
                </li>
                <li>
                    <Link to="/reports" className="sidebar-link">Reports</Link>
                </li>
                <li>
                    <Link to="/help" className="sidebar-link">Help</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
