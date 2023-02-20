import React from 'react';
import { Link } from 'react-router-dom';
import './ticketSelect.css';

/**This is a very empty page and could use some edits to make it look fuller in design */
const TicketSelect = () => {


    return (
        <div className="ticketWrap">
            <h1 className="ticketTitle">Select Tickets</h1>
            <hr className="lineBreak"></hr>


{/**I know we want the plus and minus system, but we can change this later */}
            <div className="ticketDrops">Adults - $12.00
            <select className="dropDown">
                <option> 0 </option>
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
            </select>
            </div>

            <div className="ticketDrops">Children - $6.00
            <select className="dropDown">
                <option> 0 </option>
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
            </select>
            </div>

            <div className="ticketDrops">Seniors - $6.00
            <select className="dropDown">
                <option> 0 </option>
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
            </select>
            </div>

            <div className="buttonCenter">
            <Link className="seatBtn" to="/seatselect">Select Seats</Link>
            </div>
            
        </div>
    );
};

export default TicketSelect;