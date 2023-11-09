import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

const GuardianNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.assign("/");
    };
    return (
        <nav>
            <Link to="/GuardianHome" className="title">
                LOGO
            </Link>
            <div
                className="menu"
                onClick={() => {
                    setMenuOpen(!menuOpen);
                }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/GuardianHome">HOME</NavLink>
                </li>
                <li>
                    <NavLink to="/Ledger">STUDENT LEDGER</NavLink>
                </li>
                <li>
                    <NavLink to="/GuardianAttendance">ATTENDANCE</NavLink>
                </li>
                <li>
                    <NavLink to="/GuardianGrade">GRADES</NavLink>
                </li>
                <li>
                    <Link to="/" onClick={handleLogout} className="logout">
                        LOGOUT
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default GuardianNavbar;
