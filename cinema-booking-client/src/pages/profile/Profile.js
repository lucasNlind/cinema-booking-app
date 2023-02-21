// this is the profile page that will show info, and link to the editProfile page

import {Link} from 'react-router-dom'
import './profile.css';

const Profile = () => {
    return (
        <div className="profileWrap">
            <h1 className="profileTitle">Your Profile</h1>
            <hr></hr>


            <span className="profileName">Name: Aben Ricks</span> 
            <br></br>
            <span className="profileEmail">Email: abenricks@gmail.com</span>
            <br></br>
            <span className="savedPayments">Saved Payments: </span>

            <div className="buttonCenter">
            <Link className="profileBtn" to="/changepassword">Change Password</Link>
            <br></br>
            <br></br>
            <br></br>
            <Link className="profileBtn" to="/addpayment">Add Payment Method</Link>
            </div>

        </div>
    );
};

export default Profile;