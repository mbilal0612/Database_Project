import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./navbar.css";

const AdminNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.assign("/");
    };


    return (
        <nav>
            <Link to="/AdminHome" className="title">LOGO</Link>
            <div className="menu" onClick={() => {
                setMenuOpen(!menuOpen);
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <Link onClick={handleLogout} to='/' className="logout">LOGOUT</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNavbar