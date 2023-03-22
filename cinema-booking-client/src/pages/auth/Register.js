import useInput from '../../hooks/input/use-input';

import { STATES } from './utils/states';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { validateEmail } from '../../shared/utils/validation/email';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { validatePhoneNumber } from '../../shared/utils/validation/phoneNumber';
import { Box, Typography, InputLabel, TextField, Checkbox, CircularProgress, Button, MenuItem, Switch, FormGroup, FormControlLabel } from '@mui/material';
import { validateNameLength, validatePasswordLength, validateZipCodeLength, validateCardNumberLength, validateCvvLength } from '../../shared/utils/validation/length';
import { validateExpirationDate } from '../../shared/utils/validation/expirationDate';

const Register = () => {
     
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isProvidingPaymentInfo, setIsProvidingPaymentInfo] = useState(false);
    const [isHomeAndBillingAddressEqual, setIsHomeAndBillingAddressEqual] = useState(false);

    const {
        text: firstName,
        shouldDisplayError: firstNameHasError,
        inputChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        inputClearHandler: firstNameClearHandler
    } = useInput(validateNameLength);

    const {
        text: lastName,
        shouldDisplayError: lastNameHasError,
        inputChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        inputClearHandler: lastNameClearHandler
    } = useInput(validateNameLength);

    const {
        text: email,
        shouldDisplayError: emailHasError,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputClearHandler: emailClearHandler
    } = useInput(validateEmail);

    const {
        text: phoneNumber,
        shouldDisplayError: phoneNumberHasError,
        inputChangeHandler: phoneNumberChangeHandler,
        inputBlurHandler: phoneNumberBlurHandler,
        inputClearHandler: phoneNumberClearHandler
    } = useInput(validatePhoneNumber);

    const {
        text: streetName,
        shouldDisplayError: streetNameHasError,
        inputChangeHandler: streetNameChangeHandler,
        inputBlurHandler: streetNameBlurHandler,
        inputClearHandler: streetNameClearHandler
    } = useInput(validateNameLength);

    const {
        text: city,
        shouldDisplayError: cityHasError,
        inputChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        inputClearHandler: cityClearHandler
    } = useInput(validateNameLength);

    const {
        text: state,
        shouldDisplayError: stateHasError,
        inputChangeHandler: stateChangeHandler,
        inputBlurHandler: stateBlurHandler,
        inputClearHandler: stateClearHandler
    } = useInput(validateNameLength);

    const {
        text: zipCode,
        shouldDisplayError: zipCodeHasError,
        inputChangeHandler: zipCodeChangeHandler,
        inputBlurHandler: zipCodeBlurHandler,
        inputClearHandler: zipCodeClearHandler
    } = useInput(validateZipCodeLength);

    const {
        text: password,
        shouldDisplayError: passwordHasError,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        inputClearHandler: passwordClearHandler
    } = useInput(validatePasswordLength);

    const {
        text: confirmPassword,
        shouldDisplayError: confirmPasswordHasError,
        inputChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        inputClearHandler: confirmPasswordClearHandler
    } = useInput(validatePasswordLength);

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

    const handleSubscribe = (e) => {
        setIsSubscribed(e.target.checked);
    }

    const handleProvidePaymentInfo = (e) => {
        setIsProvidingPaymentInfo(e.target.checked);
    }

    const handleMatchBillingAddress = (e) => {
        setIsHomeAndBillingAddressEqual(e.target.checked);
    }

    const clearForm = () => {
        firstNameClearHandler();
        lastNameClearHandler();
        emailClearHandler();
        phoneNumberClearHandler();
        streetNameClearHandler();
        cityClearHandler();
        stateClearHandler();
        zipCodeClearHandler();
        passwordClearHandler();
        confirmPasswordClearHandler();
        cardNumberClearHandler();
        expirationDateClearHandler();
        ecardHolderNameClearHandler();
        cvvClearHandler();
        billingStreetNameClearHandler();
        billingCityClearHandler();
        billingStateClearHandler();
        billingZipCodeClearHandler();
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            clearForm();
            navigate('/confirm-email');
        }
    }, [isSuccess, dispatch]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) return;

        let homeAddress;
        let paymentInfo;

        if (isProvidingPaymentInfo) {
            if (
                firstNameHasError ||
                lastNameHasError ||
                emailHasError ||
                phoneNumberHasError ||
                streetNameHasError ||
                cityHasError ||
                stateHasError ||
                zipCodeHasError || 
                passwordHasError ||
                confirmPasswordHasError ||
                cardNumberHasError ||
                expirationDateHasError ||
                cardHolderNameHasError || 
                cvvHasError ||
                billingStreetNameHasError ||
                billingCityHasError ||
                billingStateHasError || 
                billingZipCodeHasError
            ) {
                return;
            }

            if (
                !firstName.length || 
                !lastName.length || 
                !email.length || 
                !phoneNumber.length ||
                !streetName.length ||
                !city.length ||
                !state.length ||
                !zipCode.length ||
                !password.length ||
                !confirmPassword.length ||
                !cardNumber.length ||
                !expirationDate.length ||
                !cardHolderName.length ||
                !cvv.length
            ) {
                return;
            }

            if (isHomeAndBillingAddressEqual) {
                homeAddress = {
                    streetName,
                    city,
                    state,
                    zipCode
                };

                paymentInfo = [
                    {
                        'billingAddress': homeAddress,
                        'cardNumber': cardNumber,
                        'expirationDate': expirationDate,
                        'cardHolderName': cardHolderName,
                        'cvv': cvv
                    }
                ]

            } else {
                if (
                    !billingStreetName.length ||
                    !billingCity.length ||
                    !billingZipCode.length
                ) {
                    return;
                }

                homeAddress = {
                    streetName,
                    city,
                    state,
                    zipCode
                };

                paymentInfo = [
                    {
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
                ]
            }

            const newUser = {
                firstName,
                lastName,
                email,
                phoneNumber,
                homeAddress,
                paymentInfo,
                password,
                isSubscribed
            }

            console.log('[Register.js] New User (with payment info): ', newUser);
            dispatch(register(newUser));

        } else {
            if (
                firstNameHasError ||
                lastNameHasError ||
                emailHasError ||
                phoneNumberHasError ||
                streetNameHasError ||
                cityHasError ||
                stateHasError ||
                zipCodeHasError || 
                passwordHasError ||
                confirmPasswordHasError
            ) {
                return;
            }
            if (
                !firstName.length || 
                !lastName.length || 
                !email.length || 
                !phoneNumber.length ||
                !streetName.length ||
                !city.length ||
                !state.length ||
                !zipCode.length ||
                !password.length ||
                !confirmPassword.length
            ) {
                return;
            }
    
            homeAddress = [{
                streetName,
                city,
                state,
                zipCode
            }];

            const newUser = {
                firstName,
                lastName,
                email,
                phoneNumber,
                homeAddress,
                password,
                isSubscribed
            }

            console.log('[Register.js] New User: ', newUser);
            dispatch(register(newUser));
        }
    }

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 'auto', justifyContent: 'center' }}>
            <form onSubmit={onSubmitHandler}>
                <Box sx={{ display: 'inline-flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto', mt: '2vh', mr: '3vw' }}>
                        <Typography sx={{ fontSize: '2.5vw', color: 'black', textAlign: 'center', mt: '5vh', mb: '4vh' }}>Register</Typography>
                        <Box sx={{ display: 'inline-flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <InputLabel
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '1.5vh',
                                        color: 'black'
                                    }}
                                    htmlFor='firstName'
                                >First Name</InputLabel>
                                <TextField
                                    sx={{
                                        width: '17vw',
                                        marginRight: '2vw',
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={firstName}
                                    onChange={firstNameChangeHandler}
                                    onBlur={firstNameBlurHandler}
                                    error={firstNameHasError}
                                    helperText={firstNameHasError ? 'Enter your first name' : ''}
                                    type='text'
                                    name='firstName'
                                    id='firstName'
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
                                    htmlFor='lastName'
                                >Last Name</InputLabel>
                                <TextField
                                    sx={{
                                        width: '17vw',
                                        mb: 1,
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={lastName}
                                    onChange={lastNameChangeHandler}
                                    onBlur={lastNameBlurHandler}
                                    error={lastNameHasError}
                                    helperText={lastNameHasError ? 'Enter your last name' : ''}
                                    type='text'
                                    name='lastName'
                                    id='lastName'
                                    variant='outlined'
                                    size='small'
                                />
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
                                    htmlFor='email'
                                >Email</InputLabel>
                                <TextField
                                    sx={{
                                        marginRight: '2vw',
                                        width: '17vw',
                                        mb: 1,
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={email}
                                    onChange={emailChangeHandler}
                                    onBlur={emailBlurHandler}
                                    error={emailHasError}
                                    helperText={emailHasError ? 'Enter a valid email' : ''}
                                    type='text'
                                    name='email'
                                    id='email'
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
                                    htmlFor='phoneNumber'
                                >Phone Number</InputLabel>
                                <TextField
                                    sx={{
                                        width: '17vw',
                                        mb: 1,
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={phoneNumber}
                                    onChange={phoneNumberChangeHandler}
                                    onBlur={phoneNumberBlurHandler}
                                    error={phoneNumberHasError}
                                    helperText={phoneNumberHasError ? 'Enter a valid phone number' : ''}
                                    type='text'
                                    name='phoneNumber'
                                    id='phoneNumber'
                                    variant='outlined'
                                    size='small'
                                />
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
                                    htmlFor='streetName'
                                >Street</InputLabel>
                                <TextField
                                    sx={{
                                        marginRight: '2vw',
                                        width: '17vw',
                                        mb: 1,
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={streetName}
                                    onChange={streetNameChangeHandler}
                                    onBlur={streetNameBlurHandler}
                                    error={streetNameHasError}
                                    helperText={streetNameHasError ? 'Enter a valid street name' : ''}
                                    type='text'
                                    name='streetName'
                                    id='streetName'
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
                                    htmlFor='city'
                                >City</InputLabel>
                                <TextField
                                    sx={{
                                        width: '17vw',
                                        mb: 1,
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={city}
                                    onChange={cityChangeHandler}
                                    onBlur={cityBlurHandler}
                                    error={cityHasError}
                                    helperText={cityHasError ? 'Enter a valid city' : ''}
                                    type='text'
                                    name='city'
                                    id='city'
                                    variant='outlined'
                                    size='small'
                                />
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
                                    htmlFor='state'
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
                                        }
                                    }}
                                    value={state}
                                    onChange={stateChangeHandler}
                                    onBlur={stateBlurHandler}
                                    error={stateHasError}
                                    select
                                    name='state'
                                    id='state'
                                    variant='outlined'
                                    size='small'
                                >
                                    {STATES.map((state) => {
                                        return(<MenuItem key={STATES.indexOf(state)} value={state}>{ state }</MenuItem>)
                                    })}
                                </TextField>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <InputLabel
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '1.5vh',
                                        color: 'black'
                                    }}
                                    htmlFor='zipCode'
                                >ZIP Code</InputLabel>
                                <TextField
                                    sx={{
                                        width: '17vw',
                                        mb: 1,
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={zipCode}
                                    onChange={zipCodeChangeHandler}
                                    onBlur={zipCodeBlurHandler}
                                    error={zipCodeHasError}
                                    helperText={zipCodeHasError ? 'Enter a valid ZIP Code' : ''}
                                    type='text'
                                    name='zipCode'
                                    id='zipCode'
                                    variant='outlined'
                                    size='small'
                                />
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
                                    htmlFor='password'
                                >Password</InputLabel>
                                <TextField
                                    sx={{
                                        marginRight: '2vw',
                                        width: '17vw',
                                        mb: 1,
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={password}
                                    onChange={passwordChangeHandler}
                                    onBlur={passwordBlurHandler}
                                    error={passwordHasError}
                                    helperText={passwordHasError ? 'Minimum 6 characters required' : ''}
                                    type='password'
                                    name='password'
                                    id='password'
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
                                    htmlFor='password'
                                >Confirm Password</InputLabel>
                                <TextField
                                    sx={{
                                        width: '17vw',
                                        mb: 1,
                                        input: {
                                            color: 'black',
                                            fontSize: '1.5vh',
                                            borderRadius: '5px' 
                                        }
                                    }}
                                    value={confirmPassword}
                                    onChange={confirmPasswordChangeHandler}
                                    onBlur={confirmPasswordBlurHandler}
                                    error={confirmPassword.length > 0 && password !== confirmPassword}
                                    helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords must match' : ''}
                                    type='password'
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    variant='outlined'
                                    size='small'
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column',  height: '5vh', mt: '2vh', mb: '5vh' }}>
                            <Box sx={{ display: 'inline-flex' }}>
                                <Switch checked={isSubscribed} onChange={handleSubscribe}/>
                                <Typography sx={{ lineHeight: '4vh', color: 'black' }}>I would like to subscribe to promotions</Typography>
                            </Box>
                            <Box sx={{ display: 'inline-flex' }}>
                                <Switch checked={isProvidingPaymentInfo} onChange={handleProvidePaymentInfo}/>
                                <Typography sx={{ lineHeight: '4vh', color: 'black' }}>I would like to provide my payment info now</Typography>
                            </Box>
                        </Box>
                        <Button
                            sx={{
                                width: '35vw',
                                color: 'white',
                                m: 'auto',
                                mb: '2vh',
                                backgroundColor: '#5F7C90',
                                textTransform: 'none',
                                fontWeight: '600',
                                fontSize: '2vh',
                                ':hover': {
                                    backgroundColor: '#5F7C90',
                                },
                            }}
                            variant='contained'
                            type='submit'
                        >Register</Button>
                        <Button
                            sx={{
                                width: '35vw',
                                color: 'white',
                                m: 'auto',
                                mb: '3vh',
                                backgroundColor: '#5F7C90',
                                textTransform: 'none',
                                fontWeight: '600',
                                fontSize: '2vh',
                                ':hover': {
                                    backgroundColor: '#5F7C90',
                                },
                            }}
                            variant='contained'
                            onClick={() => clearForm()}
                        >Clear</Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto', mt: '2vh', ml: '3vw' }}>
                        <Typography sx={{ fontSize: '2.5vw', color: 'black', textAlign: 'center', mt: '5vh', mb: '4vh' }}>Payment Info (optional)</Typography>
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
                                    value={isHomeAndBillingAddressEqual ? streetName : billingStreetName}
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
                                    value={isHomeAndBillingAddressEqual ? city : billingCity}
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
                                    value={isHomeAndBillingAddressEqual ? state : billingState}
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
                                    value={isHomeAndBillingAddressEqual ? zipCode : billingZipCode}
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
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default Register;
