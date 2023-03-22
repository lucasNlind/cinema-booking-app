import useInput from '../../hooks/input/use-input';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reset, verifyEmail } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { Box, Typography, InputLabel, TextField, Button, CircularProgress } from '@mui/material';

const ConfirmEmail = () => {

    const [isVerified, setIsVerified] = useState(false);

    const {
        text: activationCode,
        shouldDisplayError: activationCodeHasError,
        inputChangeHandler: activationCodeChangeHandler,
        inputBlurHandler: activationCodeBlurHandler,
        inputClearHandler: activationCodeClearHandler
    } = useInput();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isLoading, isSuccess, isError } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            setIsVerified(true);
        }
    }, [isSuccess, dispatch]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (activationCodeHasError || !activationCode.length) return;
        const dispatchObject = { 
            'activationCode': activationCode,
            'email': user.email
        };
        dispatch(verifyEmail(dispatchObject));
    };

    const goToLoginPage = () => {
        navigate('/login')
    }

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    if (isVerified) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column',  color: 'white', width: '40vw', margin: 'auto', marginTop: '10vh', marginBottom: '10vh' }}>
                <Typography sx={{ fontSize: '3vw', color: 'black', textAlign: 'center', mt: '3vh' }}>Success!</Typography>
                <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center' }}>
                    Your email has been successfully verified. 
                </Typography>
                <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center' }}>
                    Click the link below to login:
                </Typography>
                    <Button
                        onClick={() => goToLoginPage()}
                        sx={{
                            margin: 'auto',
                            width: '17vw',
                            color: 'white',
                            mt: '2vh',
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
                    >Login</Button>
            </Box>
        )
    }

    return (
        <Box sx={{ color: 'white', width: '40vw', margin: 'auto', marginTop: '10vh', marginBottom: '10vh' }}>
            <Typography sx={{ fontSize: '3vw', color: 'black', textAlign: 'center', mt: '3vh' }}>Confirm Email</Typography>
            <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center', mt: '3vh' }}>
                A message with a confirmation code has been sent to your email.
            </Typography>
            <Typography sx={{ fontSize: '1.2vw', color: 'black', textAlign: 'center', mb: '2vh' }}>
                Please enter it below to activate your account.
            </Typography>
            <form onSubmit={onSubmitHandler}>
                <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <InputLabel
                            sx={{
                                fontWeight: 500,
                                fontSize: '1.5vh',
                                color: 'black'
                            }}
                            htmlFor='activationCode'
                        >Activation Code</InputLabel>
                        <TextField
                            sx={{
                                width: '17vw',
                                marginRight: '2vw',
                                mb: 1,
                                input: {
                                    color: 'black',
                                    fontSize: '1.5vh',
                                    borderRadius: '5px' 
                                }
                            }}
                            onChange={activationCodeChangeHandler}
                            onBlur={activationCodeBlurHandler}
                            error={activationCodeHasError}
                            value={activationCode}
                            type='text'
                            name='activationCode'
                            id='activationCode'
                            variant='outlined'
                            size='small'
                        />
                        {isError ? <Typography sx={{ color: 'red' }}>Invalid code. Please try again.</Typography> : ''}
                        <Button
                            sx={{
                                width: '17vw',
                                color: 'white',
                                mt: '2vh',
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
                        >Confirm Email</Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default ConfirmEmail;
