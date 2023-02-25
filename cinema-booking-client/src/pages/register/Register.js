import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
    return (
    <div className="register-wrap">
        <form>
        <div className="input-container">
            <label>Full Name </label>
            <input type="text" name="fname" required />
        </div>

        <div className="input-container">
            <label>Phone Number </label>
            <input type="text" name="phone" required />
        </div>

        <div className="input-container">
            <label>Email Address</label>
            <input type="text" name="email" required />
        </div>

        <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
        </div>

        <div className="input-container">
            <label>Address</label>
            <input type="text" name="homeAddress" />
        </div>

        <div className="input-container">
            <label>Subscribe to Emails</label>
            <input type="checkbox" name="subscription" />
        </div>

        <br></br>

        <Link className="seatBtn" to="/addpayment">Add Payment Info</Link>

        <br></br>

        <div className="button-container">
            <input type="submit" />
        </div>
        </form>
    </div>
    );
};

export default Register;