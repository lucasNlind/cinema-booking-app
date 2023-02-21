import React from 'react';
import './orderSummary.css'
import { Link } from 'react-router-dom';

const OrderSummary = () => {
    return (
        <div className="orderWrap">
            <h1 className="orderTitle">Order Summary</h1>
            <hr></hr>

            <div className="orderSummary">
                Name of the Movie
                <div className="ticketTotal">
                    <table className="ticketTable">
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

                    <table className="feeTable">
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

            <div className="updateOrder">
            <Link className="updateBtn" to="/ticketselect">Change Tickets</Link>

            <Link className="updateBtn" to="/single">Update Order</Link>

            <Link className="updateBtn" to="/checkout">Checkout</Link>
            </div>
        </div>
    );
};

export default OrderSummary;