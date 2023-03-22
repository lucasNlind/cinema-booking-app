import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux/hooks';

import ProfileHomeSection from './components/ProfileHomeSection.component';
import ProfilePaymentSection from './components/ProfilePaymentInfoSection.component';
import ProfileChangePasswordSection from './components/ProfileChangePasswordSection.component';

const Profile = () => {

    const [activeTab, setActiveTab] = useState('home')

    const { user } = useAppSelector((state) => state.auth);

    console.log('user: ', user)

    return (
        <Box
            sx={{
                display: 'inline-flex',
                color: 'black',
                width: '100%',
                m: 'auto',
                mt: '10vh',
                mb: '10vh',
            }}
        >
            <Box sx={{ width: '30vw', height: '60vh', display: 'flex', flexDirection: 'column', m: 'auto', ml: '10vw' }}>
                <Typography sx={{ fontSize: '2vw', color: 'black', textAlign: 'left', mt: '3vh' }}>Profile</Typography>
                <Box sx={{ backgroundColor: 'black', width: '30vw', height: '2px' }}></Box>
                <Typography
                    sx={{
                        fontSize: '1vw',
                        mt: '2vh',
                        cursor: 'pointer',
                        transition: '0.2s ease-in-out',
                        ':hover': { transform: 'scale(1.03)' }
                    }}
                    onClick={() => setActiveTab('home')}
                >Home</Typography>
                <Typography
                    sx={{
                        fontSize: '1vw',
                        mt: '2vh',
                        cursor: 'pointer',
                        transition: '0.2s ease-in-out',
                        ':hover': { transform: 'scale(1.03)' }
                    }}
                    onClick={() => setActiveTab('payment')}
                >Payment Info</Typography>
                <Typography
                    sx={{
                        fontSize: '1vw',
                        mt: '2vh',
                        cursor: 'pointer',
                        transition: '0.2s ease-in-out',
                        ':hover': { transform: 'scale(1.03)' }
                    }}
                    onClick={() => setActiveTab('changePassword')}
                >Change Password</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: '50vw', mt: '15vh' }}>
                {activeTab === 'home' ? <ProfileHomeSection user={user} />: ''}
                {activeTab === 'payment' ? <ProfilePaymentSection user={user} />: ''}
                {activeTab === 'changePassword' ? <ProfileChangePasswordSection user={user} />: ''}
            </Box>
        </Box>
    );
};

export default Profile;