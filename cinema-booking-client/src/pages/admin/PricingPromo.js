import React from 'react';
import './pricingpromo.css';

const PricingPromo = () => {
    return (
        <div>
            
            <div className="pricingpromo">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

    <h1>Pricing</h1>
      <table>
        <tr>
          <th>Category</th>
          <th>Price</th>
          <th>Manage Pricing and Fees</th>
        </tr>
        <tr>
          <td>Child Ticket</td>
          <td>$8.00</td>
          <button className="addBtn">Suspend</button>
          <button className="addBtn">Update</button>
          <button className="addBtn">Delete</button>
        </tr>
        <tr>
          <td>Adult Ticket</td>
          <td>$12.00</td>
          <button className="addBtn">Suspend</button>
          <button className="addBtn">Update</button>
          <button className="addBtn">Delete</button>
        </tr>
        <tr>
          <td>Senior Ticket</td>
          <td>$10.00</td>
          <button className="addBtn">Suspend</button>
          <button className="addBtn">Update</button>
          <button className="addBtn">Delete</button>
        </tr>
        <tr>
          <td>Booking Fee</td>
          <td>$3.65</td>
          <button className="addBtn">Suspend</button>
          <button className="addBtn">Update</button>
          <button className="addBtn">Delete</button>
        </tr>
      </table>

      <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

    <h1>Promotions</h1>
      <table>
        <tr>
          <th>Promo Code</th>
          <th>Discount</th>
          <th>Manage Promotions</th>
        </tr>
        <tr>
          <td>CINE20</td>
          <td>20% off total</td>
          <button className="addBtn">Suspend</button>
          <button className="addBtn">Update</button>
          <button className="addBtn">Delete</button>
        </tr>
        <tr>
          <td>SORRY10</td>
          <td>10% off single ticket</td>
          <button className="addBtn">Suspend</button>
          <button className="addBtn">Update</button>
          <button className="addBtn">Delete</button>
        </tr>
        <tr>
          <td>WEDNIGHT</td>
          <td>50% off Wed night shows</td>
          <button className="addBtn">Suspend</button>
          <button className="addBtn">Update</button>
          <button className="addBtn">Delete</button>
        </tr>
        <tr>
          <td>ABEN</td>
          <td>bogo 50%</td>
          <button className="addBtn">Suspend</button>
          <button className="addBtn">Update</button>
          <button className="addBtn">Delete</button>
        </tr>
      </table>

    </div>

            

        </div>
    );
};

export default PricingPromo;