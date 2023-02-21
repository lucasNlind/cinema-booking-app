import './checkout.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
    return (
        <div className="checkoutWrap">
            <h1 className="checkoutTitle">Select or Enter Payment Information</h1>
            <hr></hr>
            <div className="cardField">
                <form>
                    <input className="inputField" type="text" placeholder="Name"></input>
                    <input className="inputField" type="text" placeholder="Card Number"></input>
                </form>

                <div className="formatSideBySide">
                <span className="exp">Expiration date</span>
                <br></br>
                <select className="dropDownMonth">
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

                <select className="dropDownYear">
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

                <input className="cvv" type="text" placeholder="CVV"></input>
                
                </div>
            </div>
            
            <h3>Billing Address</h3>

            <div className="billingField">
                <form>
                    <input className="inputField" type="text" placeholder="Street Address"></input>
                    
                    <div className="condense">
                    <input className="city" type="text" placeholder="City"></input>
                    <input className="state" type="text" placeholder="State"></input>
                    <br></br>
                    <input className="zip" type="text" placeholder="Zip Code"></input>
                    </div>
                </form>
            </div>

            <h3>Promo Code</h3>

            <div className="promoField">
                <form>
                    <input className="inputField" type="text" placeholder="Promo Code"></input>
                </form>
            </div>

            <div className="buttonCenter">
            <Link className="seatBtn" to="/orderconfirmation">Confirm Order</Link>
            </div>
        </div>
    );
};

export default Checkout;