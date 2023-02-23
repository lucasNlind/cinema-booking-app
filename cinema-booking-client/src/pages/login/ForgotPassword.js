import React from 'react';
import './forgotpassword.css';

const ForgotPassword = () => {
    return (

        <div>
                    
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