import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./navbar.css";

export const StudentNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false) 
  return ( 
  <nav>
    <Link to="/StudentHome" className="title">LOGO</Link>
    <div className="menu" onClick={() => {
        setMenuOpen(!menuOpen);
    }}>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <ul className={menuOpen ? "open" : ""}>
        <li>
            <NavLink to='/Schedule'>SCHEDULE</NavLink>
        </li>
        <li>
            <NavLink to='/Attendance'>ATTENDANCE</NavLink>
        </li>
        <li>
            <NavLink to='/Grades'>GRADES</NavLink>
        </li>
        <li>
            <NavLink to='/Assignments'>ASSIGNMENTS</NavLink>
        </li> 
        <li>
            <Link to='/' className="logout">LOGOUT</Link>
        </li>
    </ul>
  </nav>
  )
}

export default StudentNavbar


// STUDENT VIEW NAV BAR COMPONENTS AND LINKS
/*     <li>
            <Link to='/Schedule'>SCHEDULE</Link>
        </li>
        <li>
            <Link to='/Attendance'>ATTENDANCE</Link>
        </li>
        <li>
            <Link to='/Grades'>GRADES</Link>
        </li>
        <li>
            <Link to='/Assignments'>ASSIGNMENTS</Link>
        </li> */


// GUARDIAN VIEW NAV BAR COMPONENTS AND LINKS
/*     <li>
            <Link to='/Ledger'>STUDENT LEDGER</Link>
        </li>
        <li>
            <Link to='/Attendance'>ATTENDANCE</Link>
        </li>
        <li>
            <Link to='/Grades'>GRADES</Link>
        </li>*/

// FACULTY VIEW NAV BAR COMPONENTS AND LINKS
/*     <li>
            <Link to='/Courses'>COURSES</Link>
        </li>
        <li>
            <Link to='/APCreation'>ASSESSMENT/PROJECT CREATION</Link>
        </li>
        <li>
            <Link to='/EnterMarks'>ENTER MARKS</Link>
        </li>*/