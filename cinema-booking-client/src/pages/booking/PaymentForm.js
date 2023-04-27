import { Button, Box, Checkbox, FormControlLabel, FormGroup, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import useInput from "../../hooks/input/use-input";
import { validateExpirationDate } from "../../shared/utils/validation/expirationDate";
import { validateCardNumberLength, validateCvvLength, validateNameLength, validateZipCodeLength } from "../../shared/utils/validation/length";
import { useState } from "react";

import { STATES } from "../auth/utils/states";

const PaymentForm = ({ setSelectedPaymentCard, userData, isProvidingPaymentInfo, setIsProvidingPaymentInfo, isHomeAndBillingAddressEqual, setIsHomeAndBillingAddressEqual }) => {

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
    }

    const handleSavePayment = () => {

        let paymentCard;

        if (
            cardNumberHasError ||
            expirationDateHasError ||
            cardHolderNameHasError || 
            cvvHasError ||
            billingStreetNameHasError ||
            billingCityHasError ||
            billingStateHasError || 
            billingZipCodeHasError
        ) return;

        if (
            !cardNumber.length ||
            !expirationDate.length ||
            !cardHolderName.length ||
            !cvv.length
        ) return;

        if (isHomeAndBillingAddressEqual) {
            paymentCard = {
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
            ) return;

            paymentCard = {
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

        setSelectedPaymentCard(paymentCard);

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto', mt: '2vh' }}>
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
                        disabled={!isProvidingPaymentInfo}
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
                        disabled={!isProvidingPaymentInfo}
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
                        disabled={!isProvidingPaymentInfo}
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
                        disabled={!isProvidingPaymentInfo}
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
                <Typography sx={{ color: 'black', fontSize: '1.3vw', width: '40%', lineHeight: '4vh' }}>Billing Address</Typography>
                {userData.homeAddress !== {} ?
                    <Box sx={{ display: 'inline-flex', justifyContent: 'right', width: '60%' }}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isHomeAndBillingAddressEqual}
                                        onChange={handleMatchBillingAddress}
                                        disabled={!isProvidingPaymentInfo}
                                    />
                                }
                                label="Same as home address"
                            />
                        </FormGroup>
                    </Box>
                : '' }
                
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
                        disabled={!isProvidingPaymentInfo}
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
                        disabled={!isProvidingPaymentInfo}
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
                        disabled={!isProvidingPaymentInfo}
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
                        disabled={!isProvidingPaymentInfo}
                        helperText={billingZipCodeHasError ? 'Enter a valid ZIP Code' : ''}
                        type='text'
                        name='billingZipCode'
                        id='billingZipCode'
                        variant='outlined'
                        size='small'
                    />
                </Box>
            </Box>
            <Button disabled={!isProvidingPaymentInfo} sx={{ mt: '2vh' }} onClick={handleSavePayment}>Add Payment Info</Button>
        </Box>
    );  
};

export default PaymentForm;
