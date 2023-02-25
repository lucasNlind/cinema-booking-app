import './seatSelect.css';
import { Link } from 'react-router-dom';

//This component has the buttons for every seat available in the theater
// Maybe can be condensed for ease, also needs legend for available seats and such
const SeatSelect = () => {
    return (
        <div className="seat-wrap">
            <h1 className="seat-title">Select Seats</h1>
            <hr className="line-break"></hr>

            <div className="seating-table">
                <table classname="table-seats">
                    <thead className="seat-head">
                        <tr className="seat-row">
                            <th className="screen-img" colspan="12">Screen</th>
                        </tr>
                        <tr className="space-from-screen">
                        </tr>
                    </thead>
                    <tr className="seat-row">
                        <td><button className="seat-choice-btn">A1</button></td>
                        <td><button className="seat-choice-btn">A2</button></td>
                        <td><button className="seat-choice-btn">A3</button></td>
                        <td><button className="seat-choice-btn">A4</button></td>
                        <td><button className="seat-choice-btn">A5</button></td>
                        <td><button className="seat-choice-btn">A6</button></td>
                        <td><button className="seat-choice-btn">A7</button></td>
                        <td><button className="seat-choice-btn">A8</button></td>
                        <td><button className="seat-choice-btn">A9</button></td>
                        <td><button className="seat-choice-btn">A10</button></td>
                        <td><button className="seat-choice-btn">A11</button></td>
                        <td><button className="seat-choice-btn">A12</button></td>
                    </tr>
                    <tr className="seat-row">
                        <td><button className="seat-choice-btn">B1</button></td>
                        <td><button className="seat-choice-btn">B2</button></td>
                        <td><button className="seat-choice-btn">B3</button></td>
                        <td><button className="seat-choice-btn">B4</button></td>
                        <td><button className="seat-choice-btn">B5</button></td>
                        <td><button className="seat-choice-btn">B6</button></td>
                        <td><button className="seat-choice-btn">B7</button></td>
                        <td><button className="seat-choice-btn">B8</button></td>
                        <td><button className="seat-choice-btn">B9</button></td>
                        <td><button className="seat-choice-btn">B10</button></td>
                        <td><button className="seat-choice-btn">B11</button></td>
                        <td><button className="seat-choice-btn">B12</button></td>
                    </tr>
                    <tr className="seat-row">
                        <td><button className="seat-choice-btn">C1</button></td>
                        <td><button className="seat-choice-btn">C2</button></td>
                        <td><button className="seat-choice-btn">C3</button></td>
                        <td><button className="seat-choice-btn">C4</button></td>
                        <td><button className="seat-choice-btn">C5</button></td>
                        <td><button className="seat-choice-btn">C6</button></td>
                        <td><button className="seat-choice-btn">C7</button></td>
                        <td><button className="seat-choice-btn">C8</button></td>
                        <td><button className="seat-choice-btn">C9</button></td>
                        <td><button className="seat-choice-btn">C10</button></td>
                        <td><button className="seat-choice-btn">C11</button></td>
                        <td><button className="seat-choice-btn">C12</button></td>
                    </tr>
                    <tr className="seat-row">
                        <td><button className="seat-choice-btn">D1</button></td>
                        <td><button className="seat-choice-btn">D2</button></td>
                        <td><button className="seat-choice-btn">D3</button></td>
                        <td><button className="seat-choice-btn">D4</button></td>
                        <td><button className="seat-choice-btn">D5</button></td>
                        <td><button className="seat-choice-btn">D6</button></td>
                        <td><button className="seat-choice-btn">D7</button></td>
                        <td><button className="seat-choice-btn">D8</button></td>
                        <td><button className="seat-choice-btn">D9</button></td>
                        <td><button className="seat-choice-btn">D10</button></td>
                        <td><button className="seat-choice-btn">D11</button></td>
                        <td><button className="seat-choice-btn">D12</button></td>
                    </tr>
                </table>

            </div>
            
            <br></br>

            <div className="button-center">
            <Link className="order-btn" to="/ordersummary">Order Summary</Link>
            </div>

        </div>
    );
};

export default SeatSelect;