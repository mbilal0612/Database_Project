import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./navbar.css";

const AdminNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false) 
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
              <NavLink to='/Admin'>ADMIN</NavLink>
          </li>
          <li>
              <NavLink to='/Faculty'>FACULTY</NavLink>
          </li>
          <li>
              <NavLink to='/Guardian'>GUARDIAN</NavLink>
          </li>
          <li>
              <NavLink to='/Student'>STUDENT</NavLink>
          </li>
          <li>
            <Link to='/' className="logout">LOGOUT</Link>
        </li>
      </ul>
    </nav>
    )
}

export default AdminNavbar