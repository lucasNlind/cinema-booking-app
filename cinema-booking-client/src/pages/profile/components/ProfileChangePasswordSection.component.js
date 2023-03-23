import axios from 'axios';
import useInput from '../../../hooks/input/use-input';

import { useState } from 'react';
import { logout } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../../hooks/redux/hooks';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import { Box, InputLabel, TextField, Button, CircularProgress, Typography } from '@mui/material';

const ProfileChangePasswordSection = ({ userData, isLoading, setIsLoading }) => {
    
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const dispatch = useAppDispatch();

    const {
        text: currentPassword,
        shouldDisplayError: currentPasswordHasError,
        inputChangeHandler: currentPasswordChangeHandler,
        inputBlurHandler: currentPasswordBlurHandler,
        inputClearHandler: currentPasswordClearHandler
    } = useInput(validatePasswordLength);

    const {
        text: newPassword,
        shouldDisplayError: newPasswordHasError,
        inputChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler,
        inputClearHandler: newPasswordClearHandler
    } = useInput(validatePasswordLength);

    const {
        text: confirmNewPassword,
        shouldDisplayError: confirmNewPasswordHasError,
        inputChangeHandler: confirmNewPasswordChangeHandler,
        inputBlurHandler: confirmNewPasswordBlurHandler,
        inputClearHandler: confirmNewPasswordClearHandler
    } = useInput(validatePasswordLength);

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) return;
        if (currentPasswordHasError || newPasswordHasError || confirmNewPasswordHasError) return;

        const requestObject = {
            'email': userData.email,
            'currentPassword': currentPassword,
            'newPassword': newPassword
        }

        setIsLoading(true);

        try {
            await axios.patch('http://localhost:3001/api/auth/change-password', requestObject);
            setIsLoading(false);
            window.alert('Your password has successfully been changed. You will now be logged out of your account.');
            dispatch(logout());
        } catch (error) {
            setIsLoading(false);
            setInvalidCredentials(true);
        }
    }

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ width: '40vw', height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <form onSubmit={handleSubmitChangePassword}>
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: '1vh' }}>
                    <InputLabel
                        sx={{
                            fontWeight: 500,
                            fontSize: '1.25vh',
                            color: 'black'
                        }}
                        htmlFor='currentPassword'
                    >Current Password</InputLabel>
                    <TextField
                        sx={{
                            width: '17vw',
                            marginRight: '2vw',
                            input: {
                                color: 'black',
                                fontSize: '1.25vh',
                                borderRadius: '5px' 
                            }
                        }}
                        value={currentPassword}
                        onChange={currentPasswordChangeHandler}
                        onBlur={currentPasswordBlurHandler}
                        error={currentPasswordHasError}
                        helperText={currentPasswordHasError ? 'Minimum 6 characters required' : ''}
                        type='password'
                        name='firstName'
                        id='firstName'
                        variant='outlined'
                        size='small'
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: '1vh' }}>
                    <InputLabel
                        sx={{
                            fontWeight: 500,
                            fontSize: '1.25vh',
                            color: 'black'
                        }}
                        htmlFor='newPassword'
                    >New Password</InputLabel>
                    <TextField
                        sx={{
                            width: '17vw',
                            mb: 1,
                            input: {
                                color: 'black',
                                fontSize: '1.25vh',
                                borderRadius: '5px' 
                            },
                            "& .MuiInputBase-input.Mui-disabled": {
                                backgroundColor: '#C7C7C7'
                            }
                        }}
                        value={newPassword}
                        onChange={newPasswordChangeHandler}
                        onBlur={newPasswordBlurHandler}
                        error={newPasswordHasError}
                        helperText={newPasswordHasError ? 'Minimum 6 characters required' : ''}
                        type='password'
                        name='newPassword'
                        id='newPassword'
                        variant='outlined'
                        size='small'
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: '1vh' }}>
                    <InputLabel
                        sx={{
                            fontWeight: 500,
                            fontSize: '1.25vh',
                            color: 'black'
                        }}
                        htmlFor='confirmNewPassword'
                    >Confirm New Password</InputLabel>
                    <TextField
                        sx={{
                            width: '17vw',
                            mb: 1,
                            input: {
                                color: 'black',
                                fontSize: '1.25vh',
                                borderRadius: '5px' 
                            }
                        }}
                        value={confirmNewPassword}
                        onChange={confirmNewPasswordChangeHandler}
                        onBlur={confirmNewPasswordBlurHandler}
                        error={confirmNewPassword.length > 0 && newPassword !== confirmNewPassword}
                        helperText={confirmNewPassword.length > 0 && newPassword !== confirmNewPassword ? 'Passwords must match' : ''}
                        type='password'
                        name='confirmNewPassword'
                        id='confirmNewPassword'
                        variant='outlined'
                        size='small'
                    />
                </Box>
                {invalidCredentials ? <Typography sx={{ mb: '1vh', color: 'red' }}>Invalid Credentials.</Typography> : ''}
                <Button
                    sx={{
                        width: '17vw',
                        color: 'white',
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
                >Change Password</Button>
            </form>
        </Box>
    );
};

export default ProfileChangePasswordSection;
