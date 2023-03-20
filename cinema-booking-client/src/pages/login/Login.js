import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    return (
    <div className="login-wrap">
        <h1 className="enter-pay-title">Login</h1>
        <hr className="line-break"></hr>
        
        <div className="login-fields">
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
                <Link className="seat-btn" to="/forgotpassword">Forgot Password?</Link>
                <br></br>
                <br></br>
            </div>

            <div className="button-container">
                <input className="seat-btn" type="submit" />
            </div>

        </form>
        </div>
    </div>        
  );
};

export default Login;