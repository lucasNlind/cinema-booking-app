import useInput from '../../hooks/input/use-input';

import { useState } from 'react';
import { resetPassword } from '../../features/auth/authSlice';
import { validateEmail } from '../../shared/utils/validation/email';
import { Box, Typography, InputLabel, TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';

const ForgotPassword = () => {

    const [didSubmit, setDidSubmit] = useState(false);

    const dispatch = useAppDispatch();

    const {
        text: email,
        shouldDisplayError: emailHasError,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputClearHandler: emailClearHandler
    } = useInput(validateEmail);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (emailHasError || !email.length) return;
        dispatch(resetPassword(email));
        setDidSubmit(true);
    }

    if (didSubmit) {
        return (
            <Box sx={{ color: 'white', width: '40vw', margin: 'auto', marginTop: '10vh', marginBottom: '10vh' }}>
                <Typography sx={{ width: '17vw', fontSize: '2vw', color: 'black', m: 'auto', mt: '3vh', textAlign: 'center' }}>Forgot Password</Typography>
                <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center', mt: '3vh' }}>
                    An email has been sent. Please check your inbox for instructions on resetting your password.
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ color: 'white', width: '40vw', margin: 'auto', marginTop: '10vh', marginBottom: '10vh' }}>
            <Typography sx={{ width: '17vw', fontSize: '2vw', color: 'black', m: 'auto', mt: '3vh', textAlign: 'center' }}>Forgot Password</Typography>
            <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center', mt: '3vh' }}>
                If you've forgotten your password, enter your email below.
            </Typography>
            <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center', mb: '2vh' }}>
                A message will be sent with instructions for resetting your password.
            </Typography>
            <form onSubmit={onSubmitHandler}>
                <Box sx={{ width: '17vw', display: 'flex', flexDirection: 'column', m: 'auto' }}>
                    <InputLabel
                        sx={{
                            fontWeight: 500,
                            fontSize: '1vh',
                            color: 'black'
                        }}
                        htmlFor='email'
                    >Email</InputLabel>
                    <TextField
                        sx={{
                            m: 'auto',
                            width: '17vw',
                            mb: 1,
                            input: {
                                color: 'black',
                                fontSize: '1.5vh',
                                borderRadius: '5px' 
                            }
                        }}
                        helperText={emailHasError ? 'Enter a valid email' : ''}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        error={emailHasError}
                        value={email}
                        type='text'
                        name='activationCode'
                        id='activationCode'
                        variant='outlined'
                        size='small'
                    />
                    <Button
                        sx={{
                            width: '17vw',
                            color: 'white',
                            mb: '4vh',
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
                    >Send</Button>
                </Box>
            </form>
            
        </Box>
    );
};

export default ForgotPassword;
