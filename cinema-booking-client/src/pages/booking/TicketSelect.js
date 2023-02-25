import React from 'react';
import { Link } from 'react-router-dom';
import './ticketSelect.css';

//Ticket selection that has type of ticket, price, and a counter system to update
/**This is a very empty page and could use some edits to make it look fuller in design 
 * CHANGES NEEDED- Have an order total count (like how order summary does) on the side
 * -Make a plus minus system for selecting tickets (optional pretty)
*/
const TicketSelect = () => {
    return (
        <div className="ticket-wrap">
            <h1 className="ticket-title">Select Tickets</h1>
            <hr className="line-break"></hr>


{/**I know we want the plus and minus system, but we can change this later */}
            <div className="ticket-drops">Adults - $12.00
            <select className="dropdown">
                <option> 0 </option>
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
            </select>
            </div>

            <div className="ticket-drops">Children - $6.00
            <select className="dropdown">
                <option> 0 </option>
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
            </select>
            </div>

            <div className="ticket-drops">Seniors - $6.00
            <select className="dropdown">
                <option> 0 </option>
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
            </select>
            </div>

            <div className="button-align">
            <Link className="seat-btn" to="/seatselect">Select Seats</Link>
            </div>
            
        </div>
    );
};

export default TicketSelect;