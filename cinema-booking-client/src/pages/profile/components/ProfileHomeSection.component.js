import { STATES } from '../../auth/utils/states';
import useInput from '../../../hooks/input/use-input';

import { useEffect, useState } from 'react';
import { updateUserProfile } from '../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { validatePhoneNumber } from '../../../shared/utils/validation/phoneNumber';
import { validateNameLength, validateZipCodeLength } from '../../../shared/utils/validation/length';
import { Box, Typography, InputLabel, TextField, MenuItem, Switch, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileHomeSection = ({ userData, isLoading, setIsLoading, triggerGetData, setTriggerGetData }) => {

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isProfileModified, setIsProfileModified] = useState(true);

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
    } = useInput(validateNameLength);

    const {
        text: zipCode,
        shouldDisplayError: zipCodeHasError,
        inputChangeHandler: zipCodeChangeHandler,
        inputBlurHandler: zipCodeBlurHandler,
        inputClearHandler: zipCodeClearHandler
    } = useInput(validateZipCodeLength);

    const clearInputHandler = () => {
        firstNameClearHandler();
        lastNameClearHandler();
        phoneNumberClearHandler();
        streetNameClearHandler();
        cityClearHandler();
        zipCodeClearHandler();
    }

    const handleSubscribe = (e) => {
        setIsSubscribed(e.target.checked);
    };

    const handleDiscardChanges = () => {
        const response = window.confirm('Are you sure you\'d like to discard your changes?')
        if (response) {
            setIsEditingProfile(false);
            setIsProfileModified(true);
        }
    };

    const handleEditProfile = () => {
        setIsEditingProfile(true);
        setIsSubscribed(userData.isSubscribed);
    };

    const handleConfirmEditProfile = async (e) => {

        e.preventDefault();

        const newIsSubscribed = isSubscribed;
        const newCity = city === '' ? userData.homeAddress.city : city;
        const newLastName = lastName === '' ? userData.lastName : lastName;
        const newState = state === '' ? userData.homeAddress.state : state;
        const newFirstName = firstName === '' ? userData.firstName : firstName;
        const newZipCode = zipCode === '' ? userData.homeAddress.zipCode : zipCode;
        const newPhoneNumber = phoneNumber === '' ? userData.phoneNumber : phoneNumber;
        const newStreetName = streetName === '' ? userData.homeAddress.streetName : streetName;

        const newHomeAddress = {
            'streetName': newStreetName,
            'city': newCity,
            'state': newState,
            'zipCode': newZipCode
        }
        
        const newUserData = {
            'email': userData.email,
            newFirstName,
            newLastName,
            newPhoneNumber,
            newHomeAddress,
            newIsSubscribed
        }

        setIsLoading(true);
        await axios.patch('http://localhost:3001/api/auth/update-profile', newUserData);
        setIsLoading(false);

        setIsEditingProfile(false);
        window.alert('Your profile has successfully been updated.');
        setTriggerGetData(triggerGetData + 1);
        clearInputHandler();
        setIsSubscribed(userData.isSubscribed);
    };

    useEffect(() => {
        if (
            firstName !== '' ||
            lastName !== '' ||
            phoneNumber !== '' ||
            streetName !== '' ||
            city !== '' ||
            state !== '' ||
            zipCode !== '' ||
            isSubscribed !== userData.isSubscribed
        ) {
            setIsProfileModified(true);
        } else {
            setIsProfileModified(false);
        }
    }, [firstName, lastName, phoneNumber, streetName, city, state, zipCode, isSubscribed]);

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '40vw', height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <form onSubmit={handleConfirmEditProfile}>
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
                                },
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: '#C7C7C7',
                                }
                            }}
                            value={!isEditingProfile ? userData.firstName : firstName}
                            placeholder={userData.firstName}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler}
                            error={firstNameHasError}
                            helperText={firstNameHasError ? 'Enter your first name' : ''}
                            disabled={!isEditingProfile}
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
                                },
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: '#C7C7C7'
                                }
                            }}
                            value={!isEditingProfile ? userData.lastName : lastName}
                            placeholder={userData.lastName}
                            onChange={lastNameChangeHandler}
                            onBlur={lastNameBlurHandler}
                            error={lastNameHasError}
                            helperText={lastNameHasError ? 'Enter your last name' : ''}
                            disabled={!isEditingProfile}
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
                                },
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: '#C7C7C7'
                                }
                            }}
                            value={userData.email}
                            disabled
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
                                },
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: '#C7C7C7'
                                }
                            }}
                            value={!isEditingProfile ? userData.phoneNumber : phoneNumber}
                            placeholder={userData.phoneNumber}
                            onChange={phoneNumberChangeHandler}
                            onBlur={phoneNumberBlurHandler}
                            error={phoneNumberHasError}
                            disabled={!isEditingProfile}
                            helperText={phoneNumberHasError ? 'Enter a valid phone number' : ''}
                            type='text'
                            name='phoneNumber'
                            id='phoneNumber'
                            variant='outlined'
                            size='small'
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'inline-flex', mt: '1vh' }}>
                    <Switch sx={{ mt: '1vh' }} checked={!isEditingProfile ? userData.isSubscribed : isSubscribed} onChange={handleSubscribe} disabled={!isEditingProfile}/>
                    <Typography sx={{ lineHeight: '5vh', color: 'black' }}>Subscribed to promotions</Typography>
                </Box>
                <Typography sx={{ mt: '3vh', mb: '1vh', fontSize: '1vw' }}>Home Address</Typography>
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
                                },
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: '#C7C7C7'
                                }
                            }}
                            value={!isEditingProfile ? userData.homeAddress.streetName : streetName}
                            placeholder={userData.homeAddress.streetName}
                            onChange={streetNameChangeHandler}
                            onBlur={streetNameBlurHandler}
                            error={streetNameHasError}
                            disabled={!isEditingProfile}
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
                                },
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: '#C7C7C7'
                                }
                            }}
                            value={!isEditingProfile ? userData.homeAddress.city : city}
                            placeholder={userData.homeAddress.city}
                            onChange={cityChangeHandler}
                            onBlur={cityBlurHandler}
                            error={cityHasError}
                            disabled={!isEditingProfile}
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
                                },
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: '#C7C7C7'
                                }
                            }}
                            value={!isEditingProfile ? userData.homeAddress.state : state}
                            onChange={stateChangeHandler}
                            onBlur={stateBlurHandler}
                            error={stateHasError}
                            disabled={!isEditingProfile}
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
                                },
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: '#C7C7C7'
                                }
                            }}
                            value={!isEditingProfile ? userData.homeAddress.zipCode : zipCode}
                            placeholder={userData.homeAddress.zipCode}
                            onChange={zipCodeChangeHandler}
                            onBlur={zipCodeBlurHandler}
                            error={zipCodeHasError}
                            disabled={!isEditingProfile}
                            helperText={zipCodeHasError ? 'Enter a valid ZIP Code' : ''}
                            type='text'
                            name='zipCode'
                            id='zipCode'
                            variant='outlined'
                            size='small'
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'inline-flex', mt: '2vh' }}>
                    {
                        isEditingProfile 
                        ?
                        <Button
                            sx={{
                                width: '17vw',
                                color: 'white',
                                mb: '3vh',
                                mr: '2vw', 
                                backgroundColor: 'red',
                                textTransform: 'none',
                                fontWeight: '600',
                                fontSize: '1.5vh',
                                ':hover': {
                                    backgroundColor: 'red',
                                },
                            }}
                            variant='contained'
                            onClick={handleDiscardChanges}
                        >Discard Changes</Button>
                        :
                        <Button
                            sx={{
                                width: '17vw',
                                color: 'white',
                                mb: '3vh',
                                mr: '2vw', 
                                backgroundColor: '#5F7C90',
                                textTransform: 'none',
                                fontWeight: '600',
                                fontSize: '1.5vh',
                                ':hover': {
                                    backgroundColor: '#5F7C90',
                                },
                            }}
                            variant='contained'
                            onClick={handleEditProfile}
                        >Edit Profile</Button>
                    }
                    <Button
                        sx={{
                            width: '17vw',
                            color: 'white',
                            mb: '3vh',
                            backgroundColor: '#5F7C90',
                            textTransform: 'none',
                            fontWeight: '600',
                            fontSize: '1.5vh',
                            ':hover': {
                                backgroundColor: '#5F7C90',
                            },
                        }}
                        disabled={!isProfileModified}
                        variant='contained'
                        type='submit'
                    >Confirm</Button>
                </Box>
            </form>
        </Box>  
    );
};

export default ProfileHomeSection;
