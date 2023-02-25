import './changePassword.css';

//Change password to something new in the DB. Needs a button to return to the edit page
const ChangePassword = () => {
    return (
    <div className="change-pw-wrap">
        <form>
        
        <div className="password-container">
            <label>New Password</label>
            <input type="password" name="newPass" required />
        </div>

        <div className="password-container">
            <label>Type Password Again</label>
            <input type="password" name="resetPassCheck" required />
        </div>
       
        </form>
    </div>
    );
};

export default ChangePassword;