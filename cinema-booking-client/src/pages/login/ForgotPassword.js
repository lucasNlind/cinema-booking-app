import React from 'react';
import './forgotpassword.css';

const ForgotPassword = () => {
    return (
    <div  className="forgot-pw-wrap">
        <h1>Email Password Reset</h1>
        <hr className="line-break"></hr>
        <div className="forgot-pw-fields">
        <form>
        <div className="input-container">
            <label>Enter Email</label>
            <input type="text" name="title" required />
        </div>

        <br></br>

        <div className="button-container">
            <input className="forgot-submit" type="submit" />
        </div>
        </form>
        </div>
    </div>
    );
};

export default ForgotPassword;