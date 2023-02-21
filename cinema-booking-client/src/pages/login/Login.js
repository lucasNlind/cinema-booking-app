import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    return (
        <div>
            
    <div className="form">
      <form>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div>
        <Link className="seatBtn" to="/forgotpassword">Forgot Password</Link>
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>

            

        </div>
    );
};

export default Login;