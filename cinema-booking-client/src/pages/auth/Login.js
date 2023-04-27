import useInput from '../../hooks/input/use-input';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import { validateEmail } from '../../shared/utils/validation/email';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { validatePasswordLength } from '../../shared/utils/validation/length';
import { Box, Typography, InputLabel, TextField, Button, CircularProgress } from '@mui/material';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading, isSuccess, isAuthenticated, isError } = useAppSelector((state) => state.auth);

    const {
        text: email,
        shouldDisplayError: emailHasError,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputClearHandler: emailClearHandler
    } = useInput(validateEmail);

    const {
        text: password,
        shouldDisplayError: passwordHasError,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        inputClearHandler: passwordClearHandler
    } = useInput(validatePasswordLength);

    const clearForm = () => {
        emailClearHandler();
        passwordClearHandler();
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (emailHasError || passwordHasError) return;
        if (!email.length || !password.length) return;
        const loginUser = {
            email,
            password
        }
        dispatch(login(loginUser));
    };

    const goToForgotPasswordPage = () => {
        navigate('/forgot-password');
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            clearForm();
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        if (!isAuthenticated) return;
        navigate('/')
    }, [isAuthenticated, navigate]);

    

    if (isLoading) return <CircularProgress sx={{ width: '100%', height: '100%', margin: 'auto' }} color='primary' />

    return (
        <Box sx={{ color: 'white', width: '40vw', margin: 'auto', marginTop: '10vh', marginBottom: '10vh' }}>
            <Typography sx={{ width: '17vw', fontSize: '2vw', color: 'black', m: 'auto', textAlign: 'center' }}>Login</Typography>
            <form onSubmit={onSubmitHandler} style={{ width: '30vw', margin: 'auto', }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto', marginTop: '3vh' }}>
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
                    {isError ? <Typography sx={{ color: 'red' }}>Invalid credentials. Please try again.</Typography> : ''}
                    <Typography
                        sx={{
                            color: '#C7C7C7',
                            cursor: 'pointer',
                            ':hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => goToForgotPasswordPage()}
                    >Forgot password</Typography>
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
                        type='submit'
                    >Login</Button>
                </Box>
            </form>
            
        </Box>
    );
};

export default Login;