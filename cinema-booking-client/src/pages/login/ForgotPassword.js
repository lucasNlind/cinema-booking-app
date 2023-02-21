import React from 'react';
import './forgotpassword.css';

const ForgotPassword = () => {
    return (

        <div>
                    <br></br> <br></br>
                    <br></br> <br></br>
        <div>
            A link will be sent to the email associated with your account in order to reset your password. Click on the link in order to be redirected
            to the website and update your password. 
        </div>
        <br></br> <br></br>
    <div  className="form">
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

        </div>
    );
};

export default ForgotPassword;