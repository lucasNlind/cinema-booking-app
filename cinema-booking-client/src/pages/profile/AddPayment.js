import { Link } from 'react-router-dom';
import './addPayment.css';

const AddPayment = () => {
    return (
        <div className ="add-pay-wrap">
            <h1 className="enter-pay-title">Enter Payment Information</h1>
            <hr className="line-break"></hr>
            <div className="card-field">
                <form>
                    <input className="input-field" type="text" placeholder="Name"></input>
                    <input className="input-field"  type="text" placeholder="Card Number"></input>
                </form>

                <div className="format-side-by-side">
                    <span className="exp">Expiration date</span>
                    <br></br>
                    <select className="dropdown-dates">
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

                    <select className="dropdown-dates">
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

                <input className="cvv mod" type="text" placeholder="CVV"></input>
                
                </div>
            </div>
            
            <h3>Billing Address</h3>

            <div className="billing-field">
                <form>
                    <input className="input-field" type="text" placeholder="Street Address"></input>
                    
                    <div className="condense">
                        <input className="city mod" type="text" placeholder="City"></input>
                        <input className="state mod" type="text" placeholder="State"></input>
                        <br></br>
                        <input className="zip mod" type="text" placeholder="Zip Code"></input>
                    </div>
                    
                </form>
            </div>

            <div className="button-wrap">
                <Link className="add-btn" to="/profile">Add</Link>
            </div>
        </div>
    );
};

export default AddPayment;