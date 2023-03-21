import './checkout.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
    return (
        <div className="checkout-wrap">
            <h1 className="checkout-title">Select or Enter Payment Information</h1>
            <hr className="line-break"></hr>
            <div className="card-field">
                <form>

                    <input className="input-field" type="text" placeholder="Name" required></input>
                    <input className="input-field" type="text" placeholder="Card Number" required></input>

                </form>

                <div className="format-side-by-side">

                    <span className="exp" required>Expiration date</span>
                    <br></br>

                    <select className="dropdown-dates" required>
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

                    <select className="dropdown-dates" required>
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

                    <input className="cvv mod" type="text" placeholder="CVV" required></input>

                    <br></br>
                
                    <select className="dropdown-card-type">
                        <option> -Card Type- </option>
                        <option> Visa </option>
                        <option> MasterCard </option>
                        <option> Discover </option>
                        <option> American Express </option>
                    </select>
                </div>
            </div>
            
            <h3>Billing Address</h3>

            <div className="billing-field">
                <form>
                    <input className="input-field" type="text" placeholder="Street Address" required></input>
                    
                    <div className="condense">
                        <input className="city mod" type="text" placeholder="City" required></input>
                        <input className="state mod" type="text" placeholder="State" required></input>
                        <br></br>
                        <input className="zip mod" type="text" placeholder="Zip Code" required></input>
                    </div>
                </form>

            </div>

            <h3>Promo Code</h3>

            <div className="promo-field">
                <form>
                    <input className="input-field mod" type="text" placeholder="Promo Code"></input>
                </form>
            </div>

            <div className="btn-center">
                <Link className="confirm-btn" to="/orderconfirmation">Confirm Order</Link>
            </div>
        </div>
    );
};

export default Checkout;