import {Link} from 'react-router-dom'
import './profile.css';

//Profile component that has fields to change name, password, see and delete saved payments
// Needs fields to edit name and a table to see saved payments
const Profile = () => {
    return (
        <div className="profile-wrap">
            <h1 className="profile-title">My Profile</h1>

            <hr className="line-break"></hr>

            <div className="profile-block">
                <h2 className="h2-subtitles">Details</h2>
                Name: 
                <input type="text" value="Aben Ricks" className="profile-name"/>
                <br></br>
                Email:
                <input type="text" value="abenricks@gmail.com" className="profile-email" readonly/>
                <br></br>
                <button className="profile-btn" type="button"> Edit Profile</button>
                <Link className="profile-btn" to="/changepassword">Change Password</Link>

                <br></br>

                <input type="checkbox" className="promo-checkbox"/>Registered for Promotions
            </div> 

            <div className="profile-block">
                <h2 className="h2-subtitles">Payments</h2>
                <span className="saved-payments">Saved Payments: </span>

                <table className="profile-table">
                    <tr className="profile-row">
                        <th className="profile-head">Name</th>
                        <th className="profile-head">Type</th>
                        <th className="profile-head">Last 4 digits</th>
                    </tr>
                    <tr className="profile-row">
                        <td className="profile-content">Aben's Credit</td>
                        <td className="profile-content">Visa</td>
                        <td className="profile-content">**** 0849</td>
                        <td className="profile-content"><button className="card-btns" type="button">Edit</button></td>
                        <td className="profile-content"><button className="card-btns" type="button">Delete</button></td>
                    </tr>
                </table>

                {/**Add a chart for editing and deleting payments */}
                <br></br>
            
                <div className="profile-center">
                    
 
                    <Link className="profile-btn" to="/addpayment">Add Payment Method</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;