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
            <Link style={{paddingLeft:'1%', paddingRight:'0'}} to="/AdminHome" className="title">Home</Link>
            <div className="menu" onClick={() => {
                setMenuOpen(!menuOpen);
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""} style={{paddingRight:'1%', display:'flex', flexDirection:'row'}}>
                <li> 
                    <Link onClick={handleLogout} to='/' className="logout">LOGOUT</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNavbar