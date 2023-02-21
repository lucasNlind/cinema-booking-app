import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const ChangePassword = () => {
    return (
        <div>
            
    <div className="form">
      <form>
        
        <div className="input-container">
          <label>New Password</label>
          <input type="password" name="newPass" required />
        </div>
        <div className="input-container">
          <label>Type Password Again</label>
          <input type="password" name="resetPassCheck" required />
        </div>
       
      </form>
    </div>

            

        </div>
    );
};

export default ChangePassword;