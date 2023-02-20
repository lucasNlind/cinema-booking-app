import React from 'react';
import './orderSummary.css'
import { Link } from 'react-router-dom';

const OrderSummary = () => {
    return (
        <div className="orderWrap">
            <h1 className="orderTitle">Order Confirmation</h1>
            <hr></hr>

            <div className="orderSummary">
                Name of the Movies
                <div className="ticketTotal">
                    2 x Adult Tickets - $24.00
                    <br></br>
                    Online Booking Fee - $2.00
                    <br></br>
                    Taxes - $1.57
                    <br></br>
                    Total = $27.57
                </div>
            </div>

            <div className="updateOrder">
            <Link className="updateBtn" to="/ticketselect">Change Tickets</Link>
            <br></br>
            <br></br>
            <br></br>
            <Link className="updateBtn" to="/single">Update Order</Link>
            <br></br>
            <br></br>
            <br></br>
            <Link className="updateBtn" to="/checkout">Checkout</Link>
            </div>
        </div>
    );
};

export default OrderSummary;