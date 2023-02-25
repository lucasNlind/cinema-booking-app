import {Link} from 'react-router-dom'
import './profile.css';

//Profile component that has fields to change name, password, see and delete saved payments
// Needs fields to edit name and a table to see saved payments
const Profile = () => {
    return (
        <div className="profile-wrap">
            <h1 className="profile-title">Your Profile</h1>

            <hr className="line-break"></hr>

            <span className="profile-name">Name: Aben Ricks</span> 
            <br></br>
            <span className="profile-email">Email: abenricks@gmail.com</span>
            <br></br>
            <span className="saved-payments">Saved Payments: </span>
            <br></br>
            
            <div className="profile-center">
                <Link className="profile-btn" to="/changepassword">Change Password</Link>
 
                <Link className="profile-btn" to="/addpayment">Add Payment Method</Link>
            </div>
        </div>
    );
};

export default Profile;