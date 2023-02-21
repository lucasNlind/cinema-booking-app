import React from 'react';
import './addpromo.css';

const AddPromo = () => {
    return (

        <div>
            
    <div  className="form">
      <form>
        <div className="input-container">
          <label>Promo Code</label>
          <input type="text" name="title" required />
        </div>
        <div className="input-container">
          <label>Discount Offered</label>
          <input type="text" name="category" required />
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

export default AddPromo;