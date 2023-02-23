import React from 'react';
import { Link } from 'react-router-dom';
import './adminhome.css';

const AdminHome = () => {
    return (

        
        <div className='admin-home'>

            <h1>Admin Home</h1>
            <hr></hr>
            <div className="button-center">
            <br></br>
            <Link className="admin-home-btn" to="/editmovie">Manage Movies</Link>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <Link className="admin-home-btn" to="/pricingpromo">Manage Promotions and Pricing</Link>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <Link className="admin-home-btn" to="/userportal">Manage Users</Link>
            </div>



        </div>
    );
};

export default AdminHome;