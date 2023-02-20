import './seatSelect.css';
import { Link } from 'react-router-dom';

const SeatSelect = () => {
    return (
        <div className="seatWrap">
            <h1 className="seatTitle">Select Seats</h1>
            <hr></hr>

            <div className="seatingTable">
                <table>
                    <thead>
                        <tr>
                            <th colspan="12">Screen</th>
                        </tr>
                        <tr className="spaceFromScreen">
                        </tr>
                    </thead>
                    <tr>
                        <td><button>A1</button></td>
                        <td><button>A2</button></td>
                        <td><button>A3</button></td>
                        <td><button>A4</button></td>
                        <td><button>A5</button></td>
                        <td><button>A6</button></td>
                        <td><button>A7</button></td>
                        <td><button>A8</button></td>
                        <td><button>A9</button></td>
                        <td><button>A10</button></td>
                        <td><button>A11</button></td>
                        <td><button>A12</button></td>
                    </tr>
                    <tr>
                        <td><button>B1</button></td>
                        <td><button>B2</button></td>
                        <td><button>B3</button></td>
                        <td><button>B4</button></td>
                        <td><button>B5</button></td>
                        <td><button>B6</button></td>
                        <td><button>B7</button></td>
                        <td><button>B8</button></td>
                        <td><button>B9</button></td>
                        <td><button>B10</button></td>
                        <td><button>B11</button></td>
                        <td><button>B12</button></td>
                    </tr>
                    <tr>
                        <td><button>C1</button></td>
                        <td><button>C2</button></td>
                        <td><button>C3</button></td>
                        <td><button>C4</button></td>
                        <td><button>C5</button></td>
                        <td><button>C6</button></td>
                        <td><button>C7</button></td>
                        <td><button>C8</button></td>
                        <td><button>C9</button></td>
                        <td><button>C10</button></td>
                        <td><button>C11</button></td>
                        <td><button>C12</button></td>
                    </tr>
                    <tr>
                        <td><button>D1</button></td>
                        <td><button>D2</button></td>
                        <td><button>D3</button></td>
                        <td><button>D4</button></td>
                        <td><button>D5</button></td>
                        <td><button>D6</button></td>
                        <td><button>D7</button></td>
                        <td><button>D8</button></td>
                        <td><button>D9</button></td>
                        <td><button>D10</button></td>
                        <td><button>D11</button></td>
                        <td><button>D12</button></td>
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