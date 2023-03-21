import './register.css';
import useInput from '../../hooks/input/use-input';

import { Link } from 'react-router-dom';
import { STATES } from './utils/states';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { validateEmail } from '../../shared/utils/validation/email';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { validatePhoneNumber } from '../../shared/utils/validation/phoneNumber';
import { Box, Typography, InputLabel, TextField, Checkbox, CircularProgress, Button, MenuItem } from '@mui/material';
import { validateNameLength, validatePasswordLength, validateZipCodeLength } from '../../shared/utils/validation/length';

const Register = () => {
     
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    }

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
        // Below will be modified if user chooses to add billing address
        const addresses = [
            {
                streetName,
                city,
                state,
                zipCode
            }
        ]

        const newUser = {
            firstName,
            lastName,
            email,
            phoneNumber,
            addresses,
            password,
            isSubscribed
        }
        console.log('new user: ', newUser);
        dispatch(register(newUser));
        console.log('Successfully registered user')
    }

    if (isLoading) return <CircularProgress sx={{ marginTop: '64px'}} color='primary' />

    return (
        <Box sx={{ color: 'white', width: '40vw', margin: 'auto', marginTop: '10vh', border: '1px solid black', marginBottom: '10vh' }}>
            <Typography sx={{ fontSize: '3vw', color: 'black', textAlign: 'center', mt: '3vh' }}>Register</Typography>
            <form onSubmit={onSubmitHandler}>
                <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '5vh' }}>
                    <Box sx={{ display: 'inline-flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <InputLabel
                                sx={{
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
                                    color: 'black'
                                }}
                                htmlFor='firstName'
                            >First Name</InputLabel>
                            <TextField
                                sx={{
                                    width: '17vw',
                                    marginRight: '2vw',
                                    mb: 1,
                                    input: {
                                        color: 'black',
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
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
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
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
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
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
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
                                    color: 'black'
                                }}
                                htmlFor='streetName'
                            >Street Name</InputLabel>
                            <TextField
                                sx={{
                                    marginRight: '2vw',
                                    width: '17vw',
                                    mb: 1,
                                    input: {
                                        color: 'black',
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
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
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
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
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
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
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
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
                                        fontSize: '2vh',
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
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '2vh',
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
                                        fontSize: '2vh',
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
                    <Box sx={{ display: 'inline-flex', height: '5vh', mt: '2vh', mb: '2vh' }}>
                        <Checkbox sx={{ width: '2vw' }} label='Subscribe' onChange={() => handleSubscribe()} checked={isSubscribed}/>
                        <Typography sx={{ lineHeight: '5vh', color: 'black' }}>Subscribe to Promotions</Typography>
                    </Box>
                    <Button
                        sx={{
                            width: '35vw',
                            color: 'white',
                            m: 'auto',
                            mt: '2vh',
                            mb: '2vh',
                            backgroundColor: '#5F7C90',
                            textTransform: 'none',
                            fontWeight: '600',
                            fontSize: '2.5vh',
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
                            fontSize: '2.5vh',
                            ':hover': {
                                backgroundColor: '#5F7C90',
                            },
                        }}
                        variant='contained'
                        onClick={() => clearForm()}
                    >Clear</Button>
                </Box>
            </form>
        </Box>
    );
};

// <div className="register-wrap">
//     <h1 className="enter-pay-title">Registration</h1>
//     <hr className="line-break"></hr>

//     <div className="register-fields">
//     <div className="input-container">
//         <label>Full Name </label>
//         <input type="text" name="fname" required />
//     </div>

//     <div className="input-container">
//         <label>Phone Number </label>
//         <input type="text" name="phone" required />
//     </div>

//     <div className="input-container">
//         <label>Email Address</label>
//         <input type="text" name="email" required />
//     </div>

//     <div className="input-container">
//         <label>Password </label>
//         <input type="password" name="pass" required />
//     </div>

//     <div className="input-container">
//         <label>Address</label>
//         <input type="text" name="homeAddress" />
//     </div>

//     <div className="input-container">
//         <label>Subscribe to Emails</label>
//         <input type="checkbox" name="subscription" />
//     </div>

//     <br></br>

//     <Link className="register-pay-info" to="/addpayment">Add Payment Info</Link>

//     <br></br>

//     <div className="button-container">
//         <input className="register-pay-info" type="submit" />
//     </div>

//     </div>
// </div>

export default Register;