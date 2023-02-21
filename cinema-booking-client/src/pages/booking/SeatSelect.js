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
                        <tr className="seatRow">
                            <th className="screenImg" colspan="12">Screen</th>
                        </tr>
                        <tr className="spaceFromScreen">
                        </tr>
                    </thead>
                    <tr className="seatRow">
                        <td><button className="seatChoiceBtn">A1</button></td>
                        <td><button className="seatChoiceBtn">A2</button></td>
                        <td><button className="seatChoiceBtn">A3</button></td>
                        <td><button className="seatChoiceBtn">A4</button></td>
                        <td><button className="seatChoiceBtn">A5</button></td>
                        <td><button className="seatChoiceBtn">A6</button></td>
                        <td><button className="seatChoiceBtn">A7</button></td>
                        <td><button className="seatChoiceBtn">A8</button></td>
                        <td><button className="seatChoiceBtn">A9</button></td>
                        <td><button className="seatChoiceBtn">A10</button></td>
                        <td><button className="seatChoiceBtn">A11</button></td>
                        <td><button className="seatChoiceBtn">A12</button></td>
                    </tr>
                    <tr className="seatRow">
                        <td><button className="seatChoiceBtn">B1</button></td>
                        <td><button className="seatChoiceBtn">B2</button></td>
                        <td><button className="seatChoiceBtn">B3</button></td>
                        <td><button className="seatChoiceBtn">B4</button></td>
                        <td><button className="seatChoiceBtn">B5</button></td>
                        <td><button className="seatChoiceBtn">B6</button></td>
                        <td><button className="seatChoiceBtn">B7</button></td>
                        <td><button className="seatChoiceBtn">B8</button></td>
                        <td><button className="seatChoiceBtn">B9</button></td>
                        <td><button className="seatChoiceBtn">B10</button></td>
                        <td><button className="seatChoiceBtn">B11</button></td>
                        <td><button className="seatChoiceBtn">B12</button></td>
                    </tr>
                    <tr className="seatRow">
                        <td><button className="seatChoiceBtn">C1</button></td>
                        <td><button className="seatChoiceBtn">C2</button></td>
                        <td><button className="seatChoiceBtn">C3</button></td>
                        <td><button className="seatChoiceBtn">C4</button></td>
                        <td><button className="seatChoiceBtn">C5</button></td>
                        <td><button className="seatChoiceBtn">C6</button></td>
                        <td><button className="seatChoiceBtn">C7</button></td>
                        <td><button className="seatChoiceBtn">C8</button></td>
                        <td><button className="seatChoiceBtn">C9</button></td>
                        <td><button className="seatChoiceBtn">C10</button></td>
                        <td><button className="seatChoiceBtn">C11</button></td>
                        <td><button className="seatChoiceBtn">C12</button></td>
                    </tr>
                    <tr className="seatRow">
                        <td><button className="seatChoiceBtn">D1</button></td>
                        <td><button className="seatChoiceBtn">D2</button></td>
                        <td><button className="seatChoiceBtn">D3</button></td>
                        <td><button className="seatChoiceBtn">D4</button></td>
                        <td><button className="seatChoiceBtn">D5</button></td>
                        <td><button className="seatChoiceBtn">D6</button></td>
                        <td><button className="seatChoiceBtn">D7</button></td>
                        <td><button className="seatChoiceBtn">D8</button></td>
                        <td><button className="seatChoiceBtn">D9</button></td>
                        <td><button className="seatChoiceBtn">D10</button></td>
                        <td><button className="seatChoiceBtn">D11</button></td>
                        <td><button className="seatChoiceBtn">D12</button></td>
                    </tr>
                </table>

            </div>
            
            <br></br>

            <div className="buttonCenter">
            <Link className="orderBtn" to="/ordersummary">Order Summary</Link>
            </div>

        </div>
    );
};

export default SeatSelect;