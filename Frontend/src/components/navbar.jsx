import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return ( 
  <nav>
    <Link to="/AdminHome">Website</Link>
    <ul>
        <li>
            <Link to='/Student'>STUDENT</Link>
        </li>
        <li>
            <Link to='/Faculty'>FACULTY</Link>
        </li>
        <li>
            <Link to='/Guardian'>GUARDIAN</Link>
        </li>
        <li>
            <Link to='/Admin'>ADMIN</Link>
        </li>
        <li>
            <Link to='/'>LOGOUT</Link>
        </li>
    </ul>
  </nav>
  )
}

export default Navbar



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