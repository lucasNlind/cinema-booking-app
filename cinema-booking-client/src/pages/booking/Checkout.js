import './checkout.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
    return (
        <div className="checkoutWrap">
            <h1 className="checkoutTitle">Select or Enter Payment Information</h1>
            <hr></hr>
            <div className="cardField">
                <form>
                    <input type="text" placeholder="Name"></input>
                    <input type="text" placeholder="Card Number"></input>
                </form>

                Expiration date
                <br></br>
                <select className="dropDown">
                <option> -Month- </option>
                <option> January </option>
                <option> Feburary </option>
                <option> March </option>
                <option> April </option>
                <option> May </option>
                <option> June </option>
                <option> July </option>
                <option> August </option>
                <option> September </option>
                <option> October </option>
                <option> November </option>
                <option> December </option>
                </select>

                <select className="dropDown">
                <option> -Year- </option>
                <option> 2023 </option>
                <option> 2024 </option>
                <option> 2025 </option>
                <option> 2026 </option>
                <option> 2027 </option>
                <option> 2028 </option>
                <option> 2029 </option>
                <option> 2030 </option>
                </select>

                <form>
                    <input type="text" placeholder="CVV"></input>
                </form>
            </div>
            <h3>Billing Address</h3>
            <hr></hr>

            <div className="billingField">
                <form>
                    <input type="text" placeholder="Street"></input>
                    <input type="text" placeholder="City"></input>
                    <input type="text" placeholder="State"></input>
                    <input type="text" placeholder="Zip Code"></input>
                </form>

            </div>

            <h3>Promo Code</h3>
            <hr></hr>

            <div className="promoField">
                <form>
                    <input type="text" placeholder="Promo Code"></input>
                </form>
            </div>

            <div className="buttonCenter">
            <Link className="seatBtn" to="/orderconfirmation">Confirm Order</Link>
            </div>
        </div>
    );
};

export default Checkout;