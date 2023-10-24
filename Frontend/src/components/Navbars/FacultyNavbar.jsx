import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./navbar.css";

const FacultyNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = ()=>{
        sessionStorage.clear();
        window.location.assign("/");
    }

    return ( 
    <nav>
      <Link to="/FacultyHome" className="title">LOGO</Link>
      <div className="menu" onClick={() => {
          setMenuOpen(!menuOpen);
      }}>
          <span></span>
          <span></span>
          <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
          <li>
              <NavLink to='/Courses'>COURSES</NavLink>
          </li>
          <li>
              <NavLink to='/APCreation'>ASSESSMENT/PROJECT CREATION</NavLink>
          </li>
          <li>
              <NavLink to='/EnterMarks'>ENTER MARKS</NavLink>
          </li>
          <li>
            <Link  onClick={handleLogout} to='/' className="logout">LOGOUT</Link>
        </li>
      </ul>
    </nav>
    )
}

export default FacultyNavbar