import { Link } from 'react-router-dom';
import './addPayment.css';

const AddPayment = () => {
    return (
        <div className ="addPayWrap">
            <h1 className="enterPayTitle">Enter Payment Information</h1>
            <hr></hr>
            <div className="cardField">
                <form>
                    <input type="text" placeholder="Name"></input>
                    <input type="text" placeholder="Card Number"></input>
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
            <hr></hr>

            <div className="billingField">
                <form>
                    <input type="text" placeholder="Street Address"></input>
                    
                    <div className="condense">
                    <input className="city" type="text" placeholder="City"></input>
                    <input className="state" type="text" placeholder="State"></input>
                    <br></br>
                    <input className="zip" type="text" placeholder="Zip Code"></input>
                    </div>
                </form>
            </div>

            <div className="buttonWrap">
                <Link className="addBtn" to="/profile">Add</Link>
            </div>
        </div>
    );
};

export default AddPayment;