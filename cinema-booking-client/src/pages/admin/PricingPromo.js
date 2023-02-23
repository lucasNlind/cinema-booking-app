import React from 'react';
import { Link } from 'react-router-dom';
import './pricingpromo.css';


// may need to change fields so that you can edit a form or input when you click update
// also would be good to have a way to recognize that a promo is suspended (faded out or stated as such)
const PricingPromo = () => {
    return (
    <div className="pricing-promo-wrap">

        <h1>Pricing</h1>
        <table className="promo-tables">
            <tr className="promo-rows">
                <th className="promo-th">Category</th>
                <th className="promo-th">Price</th>
                <th className="promo-th">Manage Pricing and Fees</th>
            </tr>
            <tr className="promo-rows">
                <td>Child Ticket</td>
                <td>$8.00</td>
                <button className="price-btns">Suspend</button>
                <button className="price-btns">Update</button>
                <button className="price-btns">Delete</button>
            </tr>
            <tr className="promo-rows">
                <td>Adult Ticket</td>
                <td>$12.00</td>
                <button className="price-btns">Suspend</button>
                <button className="price-btns">Update</button>
                <button className="price-btns">Delete</button>
            </tr>
            <tr className="promo-rows">
                <td>Senior Ticket</td>
                <td>$10.00</td>
                <button className="price-btns">Suspend</button>
                <button className="price-btns">Update</button>
                <button className="price-btns">Delete</button>
            </tr>
            <tr className="promo-rows">
                <td>Booking Fee</td>
                <td>$3.65</td>
                <button className="price-btns">Suspend</button>
                <button className="price-btns">Update</button>
                <button className="price-btns">Delete</button>
            </tr>
        </table>

        <h1>Promotions</h1>
        <table className="promo-tables">
            <tr className="promo-rows">
                <th className="promo-th">Promo Code</th>
                <th className="promo-th">Discount</th>
                <th className="promo-th">Manage Promotions</th>
            </tr>
            <tr className="promo-rows">
                <td>CINE20</td>
                <td>20% off total</td>
                <button className="price-btns">Suspend</button>
                <button className="price-btns">Update</button>
                <button className="price-btns">Delete</button>
            </tr>
            <tr className="promo-rows">
                <td>SORRY10</td>
                <td>10% off single ticket</td>
                <button className="price-btns">Suspend</button>
                <button className="price-btns">Update</button>
                <button className="price-btns">Delete</button>
            </tr>
            <tr className="promo-rows">
                <td>WEDNIGHT</td>
                <td>50% off Wed night shows</td>
                <button className="price-btns">Suspend</button>
                <button className="price-btns">Update</button>
                <button className="price-btns">Delete</button>
            </tr>
            <tr className="promo-rows">
                <td>ABEN</td>
                <td>bogo 50%</td>
                <button className="price-btns">Suspend</button>
                <button className="price-btns">Update</button>
                <button className="price-btns">Delete</button>
            </tr>
        </table>

        <br></br>
     
        <Link className="add-promo-btn" to="/addpromo">Add Promo</Link>

    </div>
    );
};

export default PricingPromo;