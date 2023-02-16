import React from 'react';
import {Link} from "react-router-dom";
import './navbarElements.css';


const NavbarElements= () =>{
  return (
  <ul className="navflex">
      <li>
      <Link to="/">Home</Link>
      </li>
      <li>
      <Link to="/login">Login</Link>
      </li>
      <li>
      <Link to="/register">Register</Link>
      </li>
  </ul>
  );
}
export default NavbarElements;
