import './orderConfirmation.css';
import { Link } from 'react-router-dom';


//This is the order confirmation component with the totals, and sends the email for confirmation
const OrderConfirmation = () => {
    return (
        <div className="confirm-wrap">

            <h1>Purchase Completed!</h1>

            <hr className="line-break"></hr>

            {/**This is all hard coded at the moment but it will be better once we have the db */}

            <div className="order-summary">
                Booking Number: #1000
                <br></br>
                Name of the Movie
                <div className="ticket-total">
                    2 x Adult Tickets - $24.00
                    <br></br>
                    Online Booking Fee - $2.00
                    <br></br>
                    Taxes - $1.57
                    <br></br>
                    Order Total = $27.57
                </div>
            </div>

            <div className="email-sent">
                A confirmation email for this purchase has been sent to:
            </div>

            <Link className="home-btn" to="/">Continue Shopping</Link>
        </div>
    );
};

export default OrderConfirmation;