import React from 'react';
import {Link} from "react-router-dom";
import './navbarElements.css';
import logo from "../../images/logo-design-color.png";


const NavbarElements= () =>{
    return (
        <div className="sticky-bar">
            
            <ul className="navflex">
                <img className="nav-logo" src={logo} alt="logo"/>
                <h1 className="nav-title">C3 Cinemas</h1>
                {/**This is an invisible divider so the logos are on one side and the links are on the other */}
                <h1 className='divider'>  </h1>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/adminhome">Admin</Link>
            </li>
            </ul>
        </div>
  );
}
export default NavbarElements;
