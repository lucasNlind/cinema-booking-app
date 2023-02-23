import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    return (
    <div className="login-wrap">
        <form>

            <div className="input-container">
                <label>Username </label>
                <input type="text" name="uname" required />
            </div>

            <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" required />
            </div>

            <br></br>

            <div>
                <Link className="seat-btn" to="/forgotpassword">Forgot Password</Link>
                <br></br>
                <br></br>
            </div>

            <div className="button-container">
                <input type="submit" />
            </div>

        </form>
    </div>        
  );
};

export default Login;