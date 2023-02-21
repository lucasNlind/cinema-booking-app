import './seatSelect.css';
import { Link } from 'react-router-dom';

const SeatSelect = () => {
    return (
        <div className="seatWrap">
            <h1 className="seatTitle">Select Seats</h1>
            <hr></hr>

            <div className="seatingTable">
                <table classname="tableSeats">
                    <thead className="seatHead">
                        <tr>
                            <th colspan="12">Screen</th>
                        </tr>
                        <tr className="spaceFromScreen">
                        </tr>
                    </thead>
                    <tr>
                        <td><button className="seatBtn">A1</button></td>
                        <td><button className="seatBtn">A2</button></td>
                        <td><button className="seatBtn">A3</button></td>
                        <td><button className="seatBtn">A4</button></td>
                        <td><button className="seatBtn">A5</button></td>
                        <td><button className="seatBtn">A6</button></td>
                        <td><button className="seatBtn">A7</button></td>
                        <td><button className="seatBtn">A8</button></td>
                        <td><button className="seatBtn">A9</button></td>
                        <td><button className="seatBtn">A10</button></td>
                        <td><button className="seatBtn">A11</button></td>
                        <td><button className="seatBtn">A12</button></td>
                    </tr>
                    <tr>
                        <td><button className="seatBtn">B1</button></td>
                        <td><button className="seatBtn">B2</button></td>
                        <td><button className="seatBtn">B3</button></td>
                        <td><button className="seatBtn">B4</button></td>
                        <td><button className="seatBtn">B5</button></td>
                        <td><button className="seatBtn">B6</button></td>
                        <td><button className="seatBtn">B7</button></td>
                        <td><button className="seatBtn">B8</button></td>
                        <td><button className="seatBtn">B9</button></td>
                        <td><button className="seatBtn">B10</button></td>
                        <td><button className="seatBtn">B11</button></td>
                        <td><button className="seatBtn">B12</button></td>
                    </tr>
                    <tr>
                        <td><button className="seatBtn">C1</button></td>
                        <td><button className="seatBtn">C2</button></td>
                        <td><button className="seatBtn">C3</button></td>
                        <td><button className="seatBtn">C4</button></td>
                        <td><button className="seatBtn">C5</button></td>
                        <td><button className="seatBtn">C6</button></td>
                        <td><button className="seatBtn">C7</button></td>
                        <td><button className="seatBtn">C8</button></td>
                        <td><button className="seatBtn">C9</button></td>
                        <td><button className="seatBtn">C10</button></td>
                        <td><button className="seatBtn">C11</button></td>
                        <td><button className="seatBtn">C12</button></td>
                    </tr>
                    <tr>
                        <td><button className="seatBtn">D1</button></td>
                        <td><button className="seatBtn">D2</button></td>
                        <td><button className="seatBtn">D3</button></td>
                        <td><button className="seatBtn">D4</button></td>
                        <td><button className="seatBtn">D5</button></td>
                        <td><button className="seatBtn">D6</button></td>
                        <td><button className="seatBtn">D7</button></td>
                        <td><button className="seatBtn">D8</button></td>
                        <td><button className="seatBtn">D9</button></td>
                        <td><button className="seatBtn">D10</button></td>
                        <td><button className="seatBtn">D11</button></td>
                        <td><button className="seatBtn">D12</button></td>
                    </tr>
                </table>
            </div>

            <div className="buttonCenter">
            <Link className="orderBtn" to="/ordersummary">Order Summary</Link>
            </div>

        </div>
    );
};

export default SeatSelect;