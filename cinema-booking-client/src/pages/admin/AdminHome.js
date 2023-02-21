import React from 'react';
import { Link } from 'react-router-dom';
import './adminhome.css';

const AdminHome = () => {
    return (

        
        <div className='adminhome'>

            <h1>Admin Home</h1>
            <hr></hr>
            <div className="buttonCenter">
            <br></br>
            <Link className="seatBtn" to="/editmovie">Manage Movies</Link>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <Link className="seatBtn" to="/pricingpromo">Manage Promotions and Pricing</Link>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <Link className="seatBtn" to="/userportal">Manage Users</Link>
            </div>



        </div>
    );
};

export default AdminHome;