import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./navbar.css";

const GuardianNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false) 
    return ( 
    <nav>
      <Link to="/GuardianHome" className="title">LOGO</Link>
      <div className="menu" onClick={() => {
          setMenuOpen(!menuOpen);
      }}>
          <span></span>
          <span></span>
          <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
          <li>
              <NavLink to='/Ledger'>STUDENT LEDGER</NavLink>
          </li>
          <li>
              <NavLink to='/Attendance'>ATTENDANCE</NavLink>
          </li>
          <li>
              <NavLink to='/Grades'>GRADES</NavLink>
          </li>
          <li>
            <Link to='/' className="logout">LOGOUT</Link>
        </li>
      </ul>
    </nav>
    )
}

export default GuardianNavbar