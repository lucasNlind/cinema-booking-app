import { Link } from 'react-router-dom';
import './addpromo.css';

//for discount offered, may be easier to do dropdown of percentages off?
const AddPromo = () => {
    return (    
    <div  className="add-promo-wrap">
        <form>
            <div className="promo-input">
                <label>Promo Code</label>
                <input type="text" name="title" required />
            </div>

            <div className="promo-input">
                <label>Discount Offered</label>
                <input type="text" name="category" required />
            </div>

            <br></br>

            <div className="button-container">
                <Link className="submit-promo-btn" to="/pricingpromo">Submit</Link>
            </div>
        </form>
    </div>
    );
};

export default AddPromo;