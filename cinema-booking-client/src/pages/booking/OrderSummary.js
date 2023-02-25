import React from 'react';
import './orderSummary.css'
import { Link } from 'react-router-dom';

//This is the component for summary of tickets, it is currently hard coded for the demo
// This shows order total and the buttons to edit order / go back through the user's order
// NEEDS TO SAVE THE DATA IN THE FIELDS IF YOU GO BACK IN THE ORDER (TA stated)
const OrderSummary = () => {
    return (
        <div className="order-wrap">
            <h1 className="order-title">Order Summary</h1>
            <hr className="line-break"></hr>

            <div className="order-summary">
                Name of the Movie
                <div className="ticket-total">
                    <table className="ticket-tables">
                        <tr>
                            <th>Ticket Type</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Cost</th>
                        </tr>
                        <tr>
                            <td>Adult Ticket</td>
                            <td>$12.00</td>
                            <td>2</td>
                            <td>$24.00</td>
                        </tr>
                    </table>

                    <table className="ticket-tables">
                        <tr>
                            <th>Fee Type</th>
                            <th>Cost</th>
                        </tr>
                        <tr>
                            <td>Online Booking Fee</td>
                            <td>$2.00</td>
                        </tr>
                        <tr>
                            <td>Taxes</td>
                            <td>$1.57</td>
                        </tr>
                    </table>
                    
                    <br></br>
                    Order Total = $27.57
                </div>
            </div>

            <div className="update-order">
                <Link className="update-btn" to="/ticketselect">Change Tickets</Link>
                <Link className="update-btn" to="/single">Update Order</Link>
                <Link className="update-btn" to="/checkout">Checkout</Link>
            </div>
        </div>
    );
};

export default OrderSummary;