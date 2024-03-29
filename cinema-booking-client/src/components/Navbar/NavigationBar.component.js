import './navbarElements.css';

import React from 'react';
import logo from '../../assets/logo-design-color.png';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { Box, Typography } from '@mui/material';
import { logout, reset } from '../../features/auth/authSlice';

const NavbarElements = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, jwt, isSuccess } = useAppSelector((state) => state.auth);

    const goToHomePage = () => {
        navigate('/')
    };

    const goToLoginPage = () => {
        navigate('/login');
    };

    const goToRegisterPage = () => {
        navigate('/register');
    };

    const goToProfilePage = () => {
        navigate('/profile');
    };

    const goToAdminConsolePage = () => {
        navigate('/admin')
    }

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    };

    useEffect(() => {   
        if (isSuccess) {
            dispatch(reset());
        }
    }, [isSuccess, dispatch]);

    // console.log('jwt: ', jwt);
    // console.log('user: ', user);

    if (!user || (user && !jwt)) {
        return (
            <Box sx={{ width: '100vw', height: '8vh', display: 'inline-flex', backgroundColor: '#496A81' }}>
                <Box sx={{ display: 'flex', width: '20vw' }}>
                    <img src={logo} alt='logo' style={{ margin: 'auto', height: '6vh', cursor: 'pointer' }} onClick={() => goToHomePage()} />
                    <Typography sx={{ color: 'white', lineHeight: '8vh', fontSize: '1.8vw', ml: '1vw' }}>C3 Cinemas</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '50vw' }}></Box>
                <Box sx={{ display: 'flex', width: '30vw', mr: '2vw' }}>
                    <Typography
                        onClick={() => goToHomePage()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Home</Typography>
                    <Typography
                        onClick={() => goToLoginPage()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Login</Typography>
                    <Typography
                        onClick={() => goToRegisterPage()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Register</Typography>
                </Box>
            </Box>
        );
    } else if (user && user.type === 'USER') {
        return (
            <Box sx={{ width: '100vw', height: '8vh', display: 'inline-flex', backgroundColor: '#496A81'}}>
                <Box sx={{ display: 'flex', width: '20vw' }}>
                    <img src={logo} alt='logo' style={{ margin: 'auto', height: '6vh', cursor: 'pointer' }} onClick={() => goToHomePage()} />
                    <Typography sx={{ color: 'white', lineHeight: '8vh', fontSize: '1.8vw', ml: '1vw' }}>C3 Cinemas</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '50vw' }}></Box>
                <Box sx={{ display: 'flex', width: '30vw', mr: '2vw' }}>
                    <Typography
                        onClick={() => goToHomePage()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Home</Typography>
                    <Typography
                        onClick={() => goToProfilePage()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Profile</Typography>
                    <Typography
                        onClick={() => logoutHandler()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Logout</Typography>
                </Box>
            </Box>
        )
    } else if (user && user.type === 'ADMIN') {
        return (
            <Box sx={{ width: '100vw', height: '8vh', display: 'inline-flex', backgroundColor: '#496A81', margin: 'auto', listStyle: 'none' }}>
                <Box sx={{ display: 'flex', width: '20vw' }}>
                    <img src={logo} alt='logo' style={{ margin: 'auto', height: '6vh', cursor: 'pointer' }} onClick={() => goToHomePage()} />
                    <Typography sx={{ color: 'white', lineHeight: '8vh', fontSize: '1.4vw', ml: '1vw' }}>C3 Cinemas Admin Portal</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '46vw' }}></Box>
                <Box sx={{ display: 'flex', width: '30vw', mr: '2vw' }}>
                    <Typography
                        onClick={() => goToHomePage()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Home</Typography>
                    <Typography
                        onClick={() => goToAdminConsolePage()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Console</Typography>
                    <Typography
                        onClick={() => logoutHandler()}
                        sx={{
                            color: 'white',
                            lineHeight: '8vh',
                            cursor: 'pointer',
                            fontSize: '18px',
                            ml: '6vw'
                        }}
                    >Logout</Typography>
                </Box>
            </Box>
        )
    }

}
export default NavbarElements;
