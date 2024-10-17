import React from 'react';
import { Link } from 'react-router-dom'; 
import './Sidebar.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Menu</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
                </li>
                <li>
                    <Link to="/programs" className="programs-link">Programs</Link>
                </li>
                <li>
                    <Link to="/learners" className="learners-link">Learners</Link>
                </li>
                <li>
                    <Link to="/analytics" className="analytics-link">Analytics</Link>
                </li>
                <li>
                    <Link to="/assessment" className="assessment-link">Assessment</Link>
                </li>
                <li>
                    <Link to="/settings" className="settings-link">Settings</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
