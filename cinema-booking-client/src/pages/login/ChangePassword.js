import './changePassword.css';
import {Link} from 'react-router-dom';

//Change password to something new in the DB. Needs a button to return to the edit page
const ChangePassword = () => {
    return (
    <div className="change-pw-wrap">
        <form>

        <div className="password-container">
           <label>Enter your Current Password</label>
            <input type="password" name="currentPass" required /> 
        </div>
        
        <div className="password-container">
            <label>New Password</label>
            <input type="password" name="newPass" required />
        </div>

        <div className="password-container">
            <label>Type Password Again</label>
            <input type="password" name="resetPassCheck" required />
        </div>

        </form>
        <Link className="change-pw-btn" to="/profile">Update Password</Link>
    </div>
    );
};

export default ChangePassword;