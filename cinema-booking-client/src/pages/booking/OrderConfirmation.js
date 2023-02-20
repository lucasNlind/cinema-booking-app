import './orderConfirmation.css';

const OrderConfirmation = () => {
    return (
        <div className="confirmWrap">
            <h1>Purchase Completed!</h1>
            <hr></hr>
            {/**This is all hard coded at the moment but it will be better once we have the db */}

            <div className="orderSummary">
                Booking Number: #1000
                <br></br>
                Name of the Movie
                <div className="ticketTotal">
                    2 x Adult Tickets - $24.00
                    <br></br>
                    Online Booking Fee - $2.00
                    <br></br>
                    Taxes - $1.57
                    <br></br>
                    Order Total = $27.57
                </div>
            </div>

            <div className="emailSent">
                A confirmation email for this purchase has been sent to:
            </div>
        </div>
    );
};

export default OrderConfirmation;