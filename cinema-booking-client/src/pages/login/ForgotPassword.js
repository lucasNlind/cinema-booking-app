import React from 'react';
import './forgotpassword.css';

const ForgotPassword = () => {
    return (
    <div  className="forgot-pw-wrap">
        <form>
        <div className="input-container">
            <label>Enter Email</label>
            <input type="text" name="title" required />
        </div>

        <br></br>

        <div className="button-container">
            <input type="submit" />
        </div>
        </form>
    </div>
    );
};

export default ForgotPassword;