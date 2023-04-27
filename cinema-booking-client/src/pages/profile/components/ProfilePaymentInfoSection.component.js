
import axios from 'axios';
import PaymentCard from './PaymentCard.component';
import useInput from '../../../hooks/input/use-input';

import { useState } from 'react';
import { STATES } from '../../auth/utils/states';
import { useAppSelector } from '../../../hooks/redux/hooks';
import { validateExpirationDate } from '../../../shared/utils/validation/expirationDate';
import { validateCardNumberLength, validateNameLength, validateCvvLength, validateZipCodeLength } from '../../../shared/utils/validation/length';
import { Box, Typography, Button, CircularProgress, Modal, InputLabel, TextField, FormGroup, FormControlLabel, Checkbox, MenuItem } from '@mui/material';

const ProfilePaymentSection = ({ userData, isLoading, setIsLoading, triggerGetData, setTriggerGetData }) => {

    const [open, setOpen] = useState(false);
    const [isHomeAndBillingAddressEqual, setIsHomeAndBillingAddressEqual] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        text: cardNumber,
        shouldDisplayError: cardNumberHasError,
        inputChangeHandler: cardNumberChangeHandler,
        inputBlurHandler: cardNumberBlurHandler,
        inputClearHandler: cardNumberClearHandler
    } = useInput(validateCardNumberLength);

    const {
        text: expirationDate,
        shouldDisplayError: expirationDateHasError,
        inputChangeHandler: expirationDateChangeHandler,
        inputBlurHandler: expirationDateBlurHandler,
        inputClearHandler: expirationDateClearHandler
    } = useInput(validateExpirationDate);

    const {
        text: cardHolderName,
        shouldDisplayError: cardHolderNameHasError,
        inputChangeHandler: cardHolderNameChangeHandler,
        inputBlurHandler: cardHolderNameBlurHandler,
        inputClearHandler: ecardHolderNameClearHandler
    } = useInput(validateNameLength);

    const {
        text: cvv,
        shouldDisplayError: cvvHasError,
        inputChangeHandler: cvvChangeHandler,
        inputBlurHandler: cvvBlurHandler,
        inputClearHandler: cvvClearHandler
    } = useInput(validateCvvLength);

    const {
        text: billingStreetName,
        shouldDisplayError: billingStreetNameHasError,
        inputChangeHandler: billingStreetNameChangeHandler,
        inputBlurHandler: billingStreetNameBlurHandler,
        inputClearHandler: billingStreetNameClearHandler
    } = useInput(validateNameLength);

    const {
        text: billingCity,
        shouldDisplayError: billingCityHasError,
        inputChangeHandler: billingCityChangeHandler,
        inputBlurHandler: billingCityBlurHandler,
        inputClearHandler: billingCityClearHandler
    } = useInput(validateNameLength);

    const {
        text: billingState,
        shouldDisplayError: billingStateHasError,
        inputChangeHandler: billingStateChangeHandler,
        inputBlurHandler: billingStateBlurHandler,
        inputClearHandler: billingStateClearHandler
    } = useInput(validateNameLength);

    const {
        text: billingZipCode,
        shouldDisplayError: billingZipCodeHasError,
        inputChangeHandler: billingZipCodeChangeHandler,
        inputBlurHandler: billingZipCodeBlurHandler,
        inputClearHandler: billingZipCodeClearHandler
    } = useInput(validateZipCodeLength);

    const handleMatchBillingAddress = (e) => {
        setIsHomeAndBillingAddressEqual(e.target.checked);
    };

    const handleDiscardChanges = () => {
        const response = window.confirm('Are you sure you\'d like to discard your changes?');
        if (response) {
            setOpen(false);
        }
    };

    const clearInputHandler = () => {
        cardNumberClearHandler();
        expirationDateClearHandler();
        ecardHolderNameClearHandler();
        cvvClearHandler();
        billingStreetNameClearHandler();
        billingCityClearHandler();
        billingStateClearHandler();
        billingZipCodeClearHandler();
    }

    const handleAddPayment = async (e) => {

        e.preventDefault();

        if (
            cardNumberHasError ||
            expirationDateHasError ||
            cardHolderNameHasError ||
            cvvHasError ||
            billingStreetNameHasError ||
            billingCityHasError ||
            billingStateHasError ||
            billingZipCodeHasError
        ) {
            return
        }

        if (
            !cardNumber.length ||
            !expirationDate.length ||
            !cardHolderName.length ||
            !cvv.length
        ) {
            return;
        }

        let paymentInfo;

        if (isHomeAndBillingAddressEqual) {
            paymentInfo = {
                'email': userData.email,
                'billingAddress': userData.homeAddress,
                'cardNumber': cardNumber,   
                'expirationDate': expirationDate,
                'cardHolderName': cardHolderName,
                'cvv': cvv
            }
        } else {
            if (
                !billingStreetName.length ||
                !billingCity.length ||
                !billingZipCode.length
            ) {
                return;
            }

            paymentInfo = {
                'email': userData.email, 
                'billingAddress': {
                    'streetName': billingStreetName,
                    'city': billingCity,
                    'state': billingState,
                    'zipCode': billingZipCode
                },
                'cardNumber': cardNumber,
                'expirationDate': expirationDate,
                'cardHolderName': cardHolderName,
                'cvv': cvv
            }
        }

        setIsLoading(true);
        await axios.post('http://localhost:3001/api/auth/add-payment', paymentInfo);
        setIsLoading(false);
        setOpen(false);
        window.alert('Your profile has successfully been updated.');
        setTriggerGetData(triggerGetData + 1);
        clearInputHandler();
    }

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '40vw', height: '60vh', isplay: 'flex', flexDirection: 'column' }}>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ width: '40vw', height: '50vh', m: 'auto', mt: '30vh', backgroundColor: 'white' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: '2vw', pt: '2vh' }}>
                        <Typography sx={{ color: 'black', fontSize: '2vh' }}>Add Payment Method</Typography>
                        <form onSubmit={handleAddPayment}>
                            <Box sx={{ display: 'flex', flexDirection: 'column',  mt: '2vh' }}>
                                <Box sx={{ display: 'inline-flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <InputLabel
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1.5vh',
                                                color: 'black'
                                            }}
                                            htmlFor='cardNumber'
                                        >Card Number</InputLabel>
                                        <TextField
                                            sx={{
                                                width: '17vw',
                                                marginRight: '2vw',
                                                input: {
                                                    color: 'black',
                                                    fontSize: '1.5vh',
                                                    borderRadius: '5px' 
                                                },
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: '#C7C7C7'
                                                }
                                            }}
                                            value={cardNumber}
                                            onChange={cardNumberChangeHandler}
                                            onBlur={cardNumberBlurHandler}
                                            error={cardNumberHasError}
                                            helperText={cardNumberHasError ? 'Enter a valid card number' : ''}
                                            type='text'
                                            name='cardNumber'
                                            id='cardNumber'
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <InputLabel
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1.5vh',
                                                color: 'black'
                                            }}
                                            htmlFor='expirationDate'
                                        >Expiration Date</InputLabel>
                                        <TextField
                                            sx={{
                                                width: '17vw',
                                                input: {
                                                    color: 'black',
                                                    fontSize: '1.5vh',
                                                    borderRadius: '5px' 
                                                },
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: '#C7C7C7'
                                                }
                                            }}
                                            value={expirationDate}
                                            onChange={expirationDateChangeHandler}
                                            onBlur={expirationDateBlurHandler}
                                            error={expirationDateHasError}
                                            helperText={expirationDateHasError ? 'Expiration date should be MM/YY' : ''}
                                            type='text'
                                            name='expirationDate'
                                            id='expirationDate'
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'inline-flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
                                        <InputLabel
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1.5vh',
                                                color: 'black'
                                            }}
                                            htmlFor='cardHolderName'
                                        >Cardholder Name</InputLabel>
                                        <TextField
                                            sx={{
                                                width: '17vw',
                                                marginRight: '2vw',
                                                input: {
                                                    color: 'black',
                                                    fontSize: '1.5vh',
                                                    borderRadius: '5px' 
                                                },
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: '#C7C7C7'
                                                }
                                            }}
                                            value={cardHolderName}
                                            onChange={cardHolderNameChangeHandler}
                                            onBlur={cardHolderNameBlurHandler}
                                            error={cardHolderNameHasError}
                                            helperText={cardHolderNameHasError ? 'Enter your name' : ''}
                                            type='text'
                                            name='cardHolderName'
                                            id='cardHolderName'
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
                                        <InputLabel
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1.5vh',
                                                color: 'black'
                                            }}
                                            htmlFor='cvv'
                                        >CVV</InputLabel>
                                        <TextField
                                            sx={{
                                                width: '17vw',
                                                input: {
                                                    color: 'black',
                                                    fontSize: '1.5vh',
                                                    borderRadius: '5px' 
                                                },
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: '#C7C7C7'
                                                }
                                            }}
                                            value={cvv}
                                            onChange={cvvChangeHandler}
                                            onBlur={cvvBlurHandler}
                                            error={cvvHasError}
                                            helperText={cvvHasError ? 'Invalid Code' : ''}
                                            type='text'
                                            name='cvv'
                                            id='cvv'
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'inline-flex', mt: '1.5vh', height: '5vh' }}>
                                    <Typography sx={{ color: 'black', fontSize: '1.3vw', width: '30%', lineHeight: '4vh' }}>Billing Address</Typography>
                                    <Box sx={{ display: 'inline-flex', justifyContent: 'right', width: '40%' }}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={isHomeAndBillingAddressEqual}
                                                        onChange={handleMatchBillingAddress}
                                                    />
                                                }
                                                label="Same as home address"
                                                disabled={userData.homeAddress === null}
                                            />
                                        </FormGroup>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'inline-flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <InputLabel
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1.5vh',
                                                color: 'black'
                                            }}
                                            htmlFor='billingStreetName'
                                        >Street</InputLabel>
                                        <TextField
                                            sx={{
                                                width: '17vw',
                                                marginRight: '2vw',
                                                input: {
                                                    color: 'black',
                                                    fontSize: '1.5vh',
                                                    borderRadius: '5px' 
                                                },
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: '#C7C7C7'
                                                }
                                            }}
                                            value={isHomeAndBillingAddressEqual ? userData.homeAddress.streetName : billingStreetName}
                                            onChange={billingStreetNameChangeHandler}
                                            onBlur={billingStreetNameBlurHandler}
                                            error={billingStreetNameHasError}
                                            helperText={billingStreetNameHasError ? 'Enter a valid street name' : ''}
                                            type='text'
                                            name='billingStreetName'
                                            id='billingStreetName'
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <InputLabel
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1.5vh',
                                                color: 'black'
                                            }}
                                            htmlFor='billingCity'
                                        >City</InputLabel>
                                        <TextField
                                            sx={{
                                                width: '17vw',
                                                input: {
                                                    color: 'black',
                                                    fontSize: '1.5vh',
                                                    borderRadius: '5px' 
                                                },
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: '#C7C7C7'
                                                }
                                            }}
                                            value={isHomeAndBillingAddressEqual ? userData.homeAddress.city : billingCity}
                                            onChange={billingCityChangeHandler}
                                            onBlur={billingCityBlurHandler}
                                            error={billingCityHasError}
                                            helperText={billingCityHasError ? 'Enter a valid city' : ''}
                                            type='text'
                                            name='billingCity'
                                            id='billingCity'
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'inline-flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1vh' }}>
                                        <InputLabel
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1.5vh',
                                                color: 'black'
                                            }}
                                            htmlFor='billingState'
                                        >State</InputLabel>
                                        <TextField
                                            sx={{
                                                marginRight: '2vw', 
                                                width: '17vw',
                                                mb: 1,
                                                input: {
                                                    color: 'black',
                                                    fontSize: '1.5vh',
                                                    borderRadius: '5px' 
                                                },
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: '#C7C7C7'
                                                }
                                            }}
                                            value={isHomeAndBillingAddressEqual ? userData.homeAddress.state : billingState}
                                            onChange={billingStateChangeHandler}
                                            onBlur={billingStateBlurHandler}
                                            error={billingStateHasError}
                                            select
                                            name='billingState'
                                            id='billingState'
                                            variant='outlined'
                                            size='small'
                                        >
                                            {STATES.map((state) => {
                                                return(<MenuItem key={STATES.indexOf(state)} value={state}>{ state }</MenuItem>)
                                            })}
                                        </TextField>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1vh' }}>
                                        <InputLabel
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '1.5vh',
                                                color: 'black'
                                            }}
                                            htmlFor='billingZipCode'
                                        >ZIP Code</InputLabel>
                                        <TextField
                                            sx={{
                                                width: '17vw',
                                                input: {
                                                    color: 'black',
                                                    fontSize: '1.5vh',
                                                    borderRadius: '5px' 
                                                },
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: '#C7C7C7'
                                                }
                                            }}
                                            value={isHomeAndBillingAddressEqual ? userData.homeAddress.zipCode : billingZipCode}
                                            onChange={billingZipCodeChangeHandler}
                                            onBlur={billingZipCodeBlurHandler}
                                            error={billingZipCodeHasError}
                                            helperText={billingZipCodeHasError ? 'Enter a valid ZIP Code' : ''}
                                            type='text'
                                            name='billingZipCode'
                                            id='billingZipCode'
                                            variant='outlined'
                                            size='small'
                                        />
                                    </Box>
                                </Box>
                                <Button
                                    sx={{
                                        width: '36vw',
                                        color: 'white',
                                        mt: '2vh',
                                        backgroundColor: '#5F7C90',
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        fontSize: '1.25vh',
                                        ':hover': {
                                            backgroundColor: '#5F7C90',
                                        },
                                    }}
                                    variant='contained'
                                    type='submit'
                                >Save Payment Info</Button>
                                <Button
                                    sx={{
                                        width: '36vw',
                                        color: 'white',
                                        mt: '1vh', 
                                        backgroundColor: 'red',
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        fontSize: '1.25vh',
                                        ':hover': {
                                            backgroundColor: 'red',
                                        },
                                    }}
                                    variant='contained'
                                    onClick={handleDiscardChanges}
                                >Discard Changes</Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Modal>
            {!!userData.paymentInfo ? userData.paymentInfo.map((payment) => {
                return (
                    <Box key={userData.paymentInfo.indexOf(payment)} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '1.5vh', mb: '1vh', mt: '1vh' }}>
                            <strong>
                                Payment Method {userData.paymentInfo.indexOf(payment) + 1}
                            </strong>
                        </Typography>
                        <PaymentCard
                            email={userData.email}
                            paymentId={payment.paymentId}
                            billingAddress={payment.billingAddress}
                            cardNumber={payment.cardNumber}
                            expirationDate={payment.expirationDate}
                            cardHolderName={payment.cardHolderName}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            triggerGetData={triggerGetData}
                            setTriggerGetData={setTriggerGetData}
                        />
                    </Box>
                )
            }) : ''}
            {
                userData.paymentInfo.length < 3
                ? 
                <Button
                    sx={{
                        width: '17vw',
                        color: 'white',
                        mt: '2vh',
                        mb: '4vh',
                        backgroundColor: '#5F7C90',
                        textTransform: 'none',
                        fontWeight: '600',
                        fontSize: '1.5vh',
                        ':hover': {
                            backgroundColor: '#5F7C90',
                        },
                    }}
                    variant='contained'
                    onClick={handleOpen}
                >Add Payment Info</Button>
                :
                ''
            }
        </Box>
    );
};

export default ProfilePaymentSection;
