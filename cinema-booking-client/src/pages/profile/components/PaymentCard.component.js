import axios from 'axios';

import { Box, Typography, Button, CircularProgress } from "@mui/material"

const PaymentCard = (
    {
        email,
        paymentId,
        billingAddress,
        cardNumber,
        expirationDate,
        cardHolderName,
        isLoading,
        setIsLoading,
        triggerGetData,
        setTriggerGetData
    }) => {

    const handleRemovePayment = async () => {

        const response = window.confirm('Are you sure you\'d like to remove this payment method?');
        if (response) {
            setIsLoading(true);
            await axios.patch('http://localhost:3001/api/auth/remove-payment/' + paymentId, { email });
            setIsLoading(false);
            window.alert('Your profile has successfully been updated.');
            setTriggerGetData(triggerGetData + 1);
        }

    }

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '35vw', height: '10vh', display: 'inline-flex', border: '2px solid #C7C7C7', borderRadius: '10px', p: '2vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'inline-flex' }}>
                    <Typography><strong>Card number:</strong></Typography>
                    <Typography sx={{ ml: '1vw' }}>XXXX-XXXX-XXX-{cardNumber.slice(-4)}</Typography>
                </Box>
                <Box sx={{ display: 'inline-flex', mt: '1vh' }}>
                    <Typography><strong>Expiration date:</strong></Typography>
                    <Typography sx={{ ml: '1vw' }}>{expirationDate}</Typography>
                </Box>
                <Box sx={{ display: 'inline-flex', mt: '1vh' }}>
                    <Typography><strong>Name on card:</strong></Typography>
                    <Typography sx={{ ml: '1vw' }}>{cardHolderName}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '2vw' }}>
                <Box sx={{ display: 'inline-flex' }}>
                    <Typography><strong>Billing address:</strong></Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ ml: '1vw' }}>{billingAddress.streetName}</Typography>
                        <Typography sx={{ ml: '1vw' }}>{billingAddress.city}, {billingAddress.state}</Typography>
                        <Typography sx={{ ml: '1vw' }}>{billingAddress.zipCode}</Typography>
                    </Box>
                </Box>
                <Button
                    sx={{
                        width: '17vw',
                        mt: '1vh', 
                        color: 'white',
                        backgroundColor: 'red',
                        textTransform: 'none',
                        fontWeight: '600',
                        fontSize: '1.25vh',
                        ':hover': {
                            backgroundColor: 'red',
                        },
                    }}
                    variant='contained'
                    onClick={handleRemovePayment}
                >Remove this payment method</Button>
            </Box>
        </Box>
    );
};

export default PaymentCard;
